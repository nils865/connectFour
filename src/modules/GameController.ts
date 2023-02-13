import { notification, winstate, coin } from '../stores';
import type { CoinState, CoinList } from '../types';

export const columnCount: number = 7;
export const rowCount: number = 6;

export function collectionToElementArray(collection: HTMLCollection) {
	const output: HTMLElement[] = [];

	for (let i = 0; i < collection.length; i++) {
		output.push(collection[i] as HTMLElement);
	}

	return output;
}

export function displayGamefield(gamefield: HTMLCollection) {
	// const field: CoinState[][] = new Array(gamefield.length).map(e => new Array(gamefield[0].children.length))
	const field: string[] = [
		"",
		"",
		"",
		"",
		"",
		"",
	]

	for (let i = 0; i < gamefield.length; i++) {
		const column = gamefield[i]
		
		for (let j = 0; j < column.children.length; j++) {
			let slot = column.children[j].children[0].classList;

			if (slot.contains("redCoin")) {
				field[j] += "r "
			} else if (slot.contains("yellowCoin")) {
				field[j] += "y "
			} else {
				field[j] += "- "
			}
		}
	}

	console.log("\n---------\n")

	field.forEach(e => {
		console.log(e)
	})
}

export function getGamefield() {
	const gamefield = document.createElement('div');

	for (let i = 0; i < columnCount; i++) {
		const column = document.createElement('div');
		column.classList.add('column');
		column.id = `column${i}`;

		gamefield.appendChild(column);
	}

	const columns = document.getElementsByClassName('column');

	for (let i = 0; i < columns.length; i++) {
		for (let j = 0; j < columns[i].children.length; j++) {
			const slot = document.createElement('div');
			slot.classList.add('slot');

			const coin = document.createElement('div');

			if (getCoinState(columns[i].children[j]) != null) {
				coin.classList.add(
					'coin',
					`${getCoinState(columns[i].children[j])}`
				);
			}

			slot.appendChild(coin);

			gamefield.children[i].appendChild(slot);
		}
	}

	return gamefield.children;
}

export function getAllCoins(fn: Function) {
	const elements = document.getElementsByClassName('column');

	for (let i = 0; i < elements.length; i++) {
		const children = elements[i].children;

		for (let j = 0; j < children.length; j++) {
			const currentChild = children[j].children[0];

			fn(currentChild);
		}
	}
}

export function isColumnFull(e: HTMLElement): boolean {
	return e.children[0].children[0].classList.contains('coin');
}

export function switchCoin() {
	let coinState = null;
	coin.subscribe(value => (coinState = value));

	if (coinState === 'redCoin') {
		coin.set('yellowCoin');
	} else {
		coin.set('redCoin');
	}
}

export function refreshGame() {
	winstate.set(false);
	coin.set('redCoin');
	notification.set(`It's <span style="color: red">reds</span> turn`);

	getAllCoins((e: HTMLElement) => {
		e.classList.remove('coin');
		e.classList.remove('blink');

		if (e.classList.contains('redCoin')) {
			e.classList.remove('redCoin');
		} else if (e.classList.contains('yellowCoin')) {
			e.classList.remove('yellowCoin');
		}
	});
}

export function getCoinState(slot: Element): CoinState {
	if (slot.children[0].classList.contains('redCoin')) {
		return 'redCoin';
	} else if (slot.children[0].classList.contains('yellowCoin')) {
		return 'yellowCoin';
	}

	return null;
}

export function spawnCoin(e: HTMLElement): CoinList {
	const children: HTMLCollection = e.children;

	for (let i = children.length - 1; i >= 0; i--) {
		const child = children[i] as HTMLElement;

		if (child.children[0].classList.contains('coin')) continue;

		let currentCoin = null;
		coin.subscribe(value => (currentCoin = value));

		child.children[0].classList.add(currentCoin);
		child.children[0].classList.add('coin');

		const output = {
			children: children,
			index: i,
		};

		switchCoin();
		return output;
	}
}
