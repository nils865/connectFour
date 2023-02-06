import { columnCount, spawnCoin } from "./GameController";

export class AI {
    private columns: HTMLCollection;

    public constructor() {
        this.columns = document.getElementsByClassName('column');
    }

    public spawnCoin() {
        let currentColumn = Math.floor(Math.random() * columnCount);

        spawnCoin(this.columns[currentColumn] as HTMLElement)
    }

    // check for win
    // check for defense
    // check for best pos
}