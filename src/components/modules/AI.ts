import type { CoinList } from "../../types";
import { columnCount, spawnCoin } from "./GameController";

export class AI {
    private columns: HTMLCollection;

    public constructor() {
        this.columns = document.getElementsByClassName('column');
    }

    public spawnCoin(): CoinList {
        const currentColumn = Math.floor(Math.random() * columnCount);

        return spawnCoin(this.columns[currentColumn] as HTMLElement)
    }

    // check for win
    // check for defense
    // check for best pos
}