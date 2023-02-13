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

			slot.appendChild(document.createElement('div'));

			this.field.children[pos].appendChild(slot);
		}
	}
}
