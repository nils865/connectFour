import type { CoinList, CoinState } from '../types';
import {
	collectionToElementArray,
	columnCount,
	displayGamefield,
	getGamefield,
	isColumnFull,
	spawnCoin,
} from './GameController';
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
	// check for best pos

	private generateBestPos() {
		// TODO implement check for best position
		this.generatePossibleGamefields(getGamefield(), 'yellowCoin').forEach(
			e => {
				displayGamefield(e["field"])
			}
		)
	}

	private generatePossibleGamefields(
		gamefield: HTMLCollection,
		team: CoinState
	) {
		// TODO generate all possible gamefields from a position
		const gamefields: outputType[] = [];

		for (let i = 0; i < columnCount; i++) {
			gamefields.push(this.generateGamefield(gamefield, i, team));
		}

		return gamefields

		// .filter(e => {
		// 	const winDetection = new WinDetection(e['slot'], e['field']);

		// 	if (winDetection.WinState["state"]) {
		// 		console.warn("Unused Branch: ")
		// 		console.log(e['slot'].parentElement)

		// 		return null
		// 	}

		// 	return e;
		// });
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
