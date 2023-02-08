import type { CoinList } from "../../types";
import {
    columnCount,
    getGamefield,
    isColumnFull,
    spawnCoin,
} from "./GameController";
import { WinDetection } from "./WinGame";

export class AI {
    private columns: HTMLCollection;

    public constructor() {
        this.columns = document.getElementsByClassName("column");
    }

    public spawnCoin(): CoinList {
        if (!this.checkForDefense()) {
            const currentColumn = Math.floor(Math.random() * columnCount);

            if (isColumnFull(this.columns[currentColumn] as HTMLElement))
                return this.spawnCoin();
            else return spawnCoin(this.columns[currentColumn] as HTMLElement);
        }
    }

    // check for win
    // check for defense
    private checkForDefense() {
        for (let i = 0; i < columnCount; i++) {
            const currentGamefield = this.generateGamefield(i);
            if (currentGamefield === null) continue;

            const winDetection = new WinDetection(
                currentGamefield["slot"],
                currentGamefield["field"]
            );

            if (winDetection.WinState["state"]) {
                spawnCoin(this.columns[i] as HTMLElement);
                return true;
            }
        }

        return false;
    }
    // check for best pos

    private generateGamefield(pos: number) {
        const gamefield = getGamefield();

        let top = -1;

        for (let i = 0; i < gamefield[pos].children.length; i++) {
            if (
                !gamefield[pos].children[i].children[0].classList.contains(
                    "coin"
                )
            )
                top = i;
        }

        if (top <= -1) return null;

        gamefield[pos].children[top].children[0].classList.add(
            "coin",
            "redCoin"
        );

        return {
            slot: gamefield[pos].children[top] as HTMLElement,
            field: gamefield,
        };
    }
}
