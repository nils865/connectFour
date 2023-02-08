import { notification, winstate, coin } from "../../stores";
import type { CoinState, CoinList } from "../../types";

export const columnCount: number = 7;
export const rowCount: number = 6;

function getAllCoins(fn: Function) {
    const elements = document.getElementsByClassName("column");

    for (let i = 0; i < elements.length; i++) {
        const children = elements[i].children;

        for (let j = 0; j < children.length; j++) {
            const currentChild = children[j].children[0];

            fn(currentChild);
        }
    }
}

function switchCoin() {
    let coinState = null;
    coin.subscribe((value) => (coinState = value));

    if (coinState === "redCoin") {
        coin.set("yellowCoin");
    } else {
        coin.set("redCoin");
    }
}

export function refreshGame() {
    winstate.set(false);
    coin.set("redCoin");
    notification.set(`It's <span style="color: red">reds</span> turn`);

    getAllCoins((e: HTMLElement) => {
        e.classList.remove("coin");
        e.classList.remove("blink");

        if (e.classList.contains("redCoin")) {
            e.classList.remove("redCoin");
        } else if (e.classList.contains("yellowCoin")) {
            e.classList.remove("yellowCoin");
        }
    });
}

export function getCoinState(slot: Element): CoinState {
    if (slot.children[0].classList.contains("redCoin")) {
        return "redCoin";
    } else if (slot.children[0].classList.contains("yellowCoin")) {
        return "yellowCoin";
    }

    return null;
}

export function spawnCoin(e: HTMLElement): CoinList {
    const children: HTMLCollection = e.children;

    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i] as HTMLElement;

        if (child.children[0].classList.contains("coin")) continue;

        let currentCoin = null;
        coin.subscribe((value) => (currentCoin = value));

        child.children[0].classList.add(currentCoin);
        child.children[0].classList.add("coin");

        const output = {
            children: children,
            index: i,
        };

        switchCoin();
        return output;
    }
}
