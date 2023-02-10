import { winstate, notification } from '../../stores';
import type { CoinList, CoinState } from '../../types';
import {
	getCoinState,
	columnCount,
	rowCount,
	getGamefield,
} from './GameController';

type Pos = { x: number; y: number };

export function checkForWin(coinList: CoinList) {
	const winDetection = new WinDetection(
		coinList['children'][coinList['index']] as HTMLElement,
		getGamefield()
	);
	const winArgs = winDetection.WinState;

	if (winArgs['state']) {
		winstate.set(true);
		winDetection.addBlink();
		if (winArgs['winner'] === 'redCoin')
			notification.set('<span style="color: red">Red</span> won!');
		else if (winArgs['winner'] === 'yellowCoin')
			notification.set('<span style="color: yellow">Yellow</span> won!');
	}

	return winDetection.WinState;
}

export class WinDetection {
	private output: {
		state: boolean;
		elements: HTMLElement[];
		winner: CoinState;
	};
	private lastCoin: Coin;
	private columns: HTMLCollection;
	private connectedElements: HTMLElement[][];

	public constructor(slot: HTMLElement, gamefield: HTMLCollection) {
		this.output = { state: false, elements: [], winner: null };
		this.lastCoin = new Coin(slot);
		this.columns = gamefield;

		this.connectedElements = [
			this.checkColumn(),
			this.checkRow(),
			this.checkDiagonal(
				(pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y - 1 }),
				(pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y + 1 })
			),
			this.checkDiagonal(
				(pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y - 1 }),
				(pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y + 1 })
			),
		];

		this.connectedElements.forEach(e => {
			if (e.length >= 4) {
				this.output['state'] = true;
				this.output['winner'] = this.lastCoin.State;
				e.forEach(c => {
					if (!this.output['elements'].includes(c))
						this.output['elements'].push(c);
				});
			}
		});
	}

	public addBlink() {
		this.output['elements'].forEach(e => {
			const coin = new Coin(e);
			document
				.getElementsByClassName('column')
				[coin.ColumnId].children[coin.SlotId].children[0].classList.add(
					'blink'
				);
		});
	}

	public get WinState() {
		return this.output;
	}

	public get ConnectedElements() {
		return this.connectedElements;
	}

	private checkColumn(): HTMLElement[] {
		let list: HTMLElement[] = [];

		for (let i = this.lastCoin.SlotId; i < rowCount; i++) {
			if (
				this.lastCoin.State !=
				getCoinState(this.columns[this.lastCoin.ColumnId].children[i])
			)
				break;

			list.push(this.getSlot({ x: this.lastCoin.ColumnId, y: i }));
		}

		return list;
	}

	private checkRow(): HTMLElement[] {
		let list: HTMLElement[] = [];

		// get starting pos
		let startPos = -1;
		for (let i = this.lastCoin.ColumnId; i >= 0 && startPos < 0; i--) {
			if (
				this.lastCoin.State !=
				getCoinState(this.getSlot({ x: i, y: this.lastCoin.SlotId }))
			)
				startPos = i;
		}
		startPos++;

		// get row
		for (
			let i = startPos;
			i < columnCount &&
			this.lastCoin.State ===
				getCoinState(this.getSlot({ x: i, y: this.lastCoin.SlotId }));
			i++
		) {
			list.push(this.getSlot({ x: i, y: this.lastCoin.SlotId }));
		}

		return list;
	}

	private checkDiagonal(
		getNextElementPos: Function,
		getPrevElementPos: Function
	): HTMLElement[] {
		let list: HTMLElement[] = [];
		const newestPos = {
			x: this.lastCoin.ColumnId,
			y: this.lastCoin.SlotId,
		};

		// get start pos
		let startPos: Pos = getNextElementPos(newestPos);
		while (
			verifySlotPos(getPrevElementPos(startPos)) &&
			getCoinState(this.getSlot(getPrevElementPos(startPos))) ===
				this.lastCoin.State
		) {
			startPos = getPrevElementPos(startPos);
		}

		let currentPos: Pos = getPrevElementPos(startPos);
		while (
			verifySlotPos(getNextElementPos(currentPos)) &&
			getCoinState(this.getSlot(getNextElementPos(currentPos))) ==
				this.lastCoin.State
		) {
			currentPos = getNextElementPos(currentPos);
			list.push(this.getSlot(currentPos));
		}

		return list;
	}

	private getSlot(pos: Pos) {
		return this.columns[pos.x].children[pos.y] as HTMLElement;
	}
}

const verifySlotPos = (pos: Pos): boolean =>
	pos.x < columnCount && pos.x >= 0 && pos.y < rowCount && pos.y >= 0;

class Coin {
	private element: HTMLElement;
	private slotId: number;
	private columnId: number;
	private state: CoinState;

	public constructor(element: HTMLElement) {
		this.element = element;

		this.columnId = parseInt(
			this.element.parentElement.id[
				this.element.parentElement.id.length - 1
			]
		);

		this.calcSlotId();
		this.calcState();
	}

	public get Element(): HTMLElement {
		return this.element;
	}

	public get SlotId(): number {
		return this.slotId;
	}

	public get ColumnId(): number {
		return this.columnId;
	}

	public get State(): CoinState {
		return this.state;
	}

	private calcSlotId(): void {
		const parent = this.element.parentElement;

		for (let i = 0; i < parent.children.length; i++) {
			if (parent.children[i] == this.element) {
				this.slotId = i;
				break;
			}
		}
	}

	private calcState(): void {
		if (this.element.children[0].classList.contains('yellowCoin'))
			this.state = 'yellowCoin';
		else if (this.element.children[0].classList.contains('redCoin'))
			this.state = 'redCoin';
		else this.state = null;
	}
}
