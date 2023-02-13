import type { CoinState } from '../types';
import { columnCount, rowCount } from './GameController';

export class VirtualGamefield {
	private field: HTMLDivElement;

	public constructor() {
		this.field = document.createElement('div');

		this.addColumns();
	}

	public get Field() {
		return this.field.children;
	}

	public getSlot(column: number, row: number | 'top') {
		if (row === 'top') {
			for (
				let i = 0;
				i < this.field.children[column].children.length;
				i++
			) {
				if (
					this.field.children[column].children[
						i
					].children[0].classList.contains('coin')
				) {
					row = i;
					break;
				}
			}
		}

		// console.log(`${column} ${row}`)
		return this.field.children[column].children[row] as HTMLElement;
	}

	public showField() {
		// Springfield below
		const stringField: string[] = new Array(rowCount).fill('');

		for (let i = 0; i < columnCount; i++) {
			const column = this.field.children[i];

			for (let j = 0; j < rowCount; j++) {
				let slot = column.children[j].children[0].classList;

				if (slot.contains('redCoin')) {
					stringField[j] += 'R ';
				} else if (slot.contains('yellowCoin')) {
					stringField[j] += 'Y ';
				} else {
					stringField[j] += `${j} `;
				}
			}
		}

		console.log('\n---------------------------\n');

		stringField.forEach(e => {
			console.log(e);
		});
	}

	public edit(column: number, row: number | 'top', team: CoinState) {
		if (row === 'top') {
			for (
				let i = 0;
				i < this.field.children[column].children.length;
				i++
			) {
				if (
					!this.field.children[column].children[
						i
					].children[0].classList.contains('coin')
				)
					row = i;
			}
		}

		row = row === 'top' ? 0 : row;

		const slot =
			this.field.children[column].children[row].children[0].classList;

		slot.add(team);
		slot.add('coin');
	}

	public fill(collection: HTMLCollection) {
		for (let i = 0; i < collection.length; i++) {
			const column = collection[i];

			for (let j = 0; j < column.children.length; j++) {
				const slotClasses = column.children[j].children[0].classList;

				if (slotClasses.contains('redCoin')) {
					this.field.children[i].children[
						j
					].children[0].classList.add('coin');
					this.field.children[i].children[
						j
					].children[0].classList.add('redCoin');
				} else if (slotClasses.contains('yellowCoin')) {
					this.field.children[i].children[
						j
					].children[0].classList.add('coin');
					this.field.children[i].children[
						j
					].children[0].classList.add('yellowCoin');
				}
			}
		}
	}

	private addColumns() {
		for (let i = 0; i < columnCount; i++) {
			const column = document.createElement('div');
			column.classList.add('column');
			column.id = `column${i}`;

			this.field.appendChild(column);

			this.addSlots(i);
		}
	}

	private addSlots(pos: number) {
		for (let i = 0; i < rowCount; i++) {
			const slot = document.createElement('div');
			slot.classList.add('slot');

			slot.appendChild(document.createElement('div'));

			this.field.children[pos].appendChild(slot);
		}
	}
}
