import type { CoinList, CoinState } from '../types';
import {
	columnCount,
	displayGamefield,
	getGamefield,
	isColumnFull,
	spawnCoin,
} from './GameController';
import { VirtualGamefield } from './VirtualGamefield';
import { WinDetection } from './WinGame';

type outputType = {
	slot: HTMLElement;
	field: HTMLCollection;
};

export class AI {
	private columns: HTMLCollection;

	public constructor() {
		this.columns = document.getElementsByClassName('column');
	}

	public spawnCoin(): CoinList {
		this.generateBestPos();

		const attack = this.checkForWin('yellowCoin');
		if (attack != null) return attack;

		const defend = this.checkForWin('redCoin');
		if (defend != null) return defend;

		const currentColumn = Math.floor(Math.random() * columnCount);

		if (isColumnFull(this.columns[currentColumn] as HTMLElement))
			return this.spawnCoin();
		else return spawnCoin(this.columns[currentColumn] as HTMLElement);
	}

	// generate best position for the AI
	private generateBestPos(): number {
		const yellowGameboards: VirtualGamefield[] = Array.from(
			{ length: columnCount },
			() => new VirtualGamefield()
		).filter((e, i) => {
			e.fill(document.getElementsByClassName('column'));

			e.edit(i, 'top', 'yellowCoin');

			const winDetection = new WinDetection(
				e.getSlot(i, 'top')['element'],
				e.Field
			);

			if (winDetection.WinState['state']) return null;

			return e;
		});

		const possibleMoves: {
			move: VirtualGamefield;
			children: VirtualGamefield[];
		}[] = Array.from({ length: columnCount }, () => {
			return { move: null, children: [] };
		});

		possibleMoves.forEach((e, i) => {
			e['move'] = yellowGameboards[i];
			e['children'] = Array.from(
				{ length: columnCount },
				() => new VirtualGamefield()
			);

			e['children'].forEach((f, j) => {
				f.fill(e.move.Field);
				f.edit(j, 'top', 'redCoin');
			});
		});

		// ! debug output REMOVE LATER
		possibleMoves.forEach(e => {
			e.children.forEach(f => {
				f.showField();
			});
		});

		return -1;
	}

	private checkForWin(team: CoinState) {
		for (let i = 0; i < columnCount; i++) {
			const currentGamefield = this.generateGamefield(
				getGamefield(),
				i,
				team
			);
			if (currentGamefield === null) continue;

			const winDetection = new WinDetection(
				currentGamefield['slot'],
				currentGamefield['field']
			);

			if (winDetection.WinState['state']) {
				return spawnCoin(this.columns[i] as HTMLElement);
			}
		}

		return null;
	}

	private generateGamefield(
		gamefield: HTMLCollection,
		pos: number,
		team: CoinState
	): outputType {
		let top = -1;

		for (let i = 0; i < gamefield[pos].children.length; i++) {
			if (
				!gamefield[pos].children[i].children[0].classList.contains(
					'coin'
				)
			)
				top = i;
		}

		if (top <= -1) return null;

		gamefield[pos].children[top].children[0].classList.add(
			'coin',
			`${team}`
		);

		return {
			slot: gamefield[pos].children[top] as HTMLElement,
			field: gamefield,
		};
	}
}
