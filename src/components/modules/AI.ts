import type { CoinList } from "../../types";
import { columnCount, spawnCoin } from "./GameController";

export class AI {
    private columns: HTMLCollection;

    public constructor() {
        this.columns = document.getElementsByClassName("column");
    }

    public spawnCoin(): CoinList {
        const currentColumn = Math.floor(Math.random() * columnCount);

        if (this.isColumnFull(this.columns[currentColumn] as HTMLElement))
            return this.spawnCoin();
        else return spawnCoin(this.columns[currentColumn] as HTMLElement);
    }

    // check for win
    // check for defense
    // check for best pos

    private isColumnFull(e: HTMLElement): boolean {
        return e.children[0].children[0].classList.contains("coin");
    }
}
