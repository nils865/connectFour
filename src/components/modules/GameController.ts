import { notification, winstate, coin } from "../../stores";

export const columnCount: number = 7;
export const rowCount: number = 6;

function getAllCoins(fn: Function) {
    const elements = document.getElementsByClassName('column');

    for (let i = 0; i < elements.length; i++) {
        const children = elements[i].children;

        for (let j = 0; j < children.length; j++) {
            const currentChild = children[j].children[0];

            fn(currentChild);
        }
    }
}

export function addBlink(e: HTMLElement) {
    e.classList.add('shouldBlink');
}

export function refreshGame() {
    winstate.set(false);
    coin.set('redCoin');
    notification.set('It\'s reds turn');
    console.log("refresh");
    
    getAllCoins((e: HTMLElement) => {
        console.log(e)
        e.classList.remove('coin');
        e.classList.remove('blink');
        
        if (e.classList.contains('redCoin')) {
            e.classList.remove('redCoin');
        } else if (e.classList.contains('yellowCoin')) {
            e.classList.remove('yellowCoin');
        }
    });
}

export function removeBlink() {
    getAllCoins((e: HTMLElement) => {
        if (e.classList.contains('shouldBlink')) {
            e.classList.remove('shouldBlink')
        }
    });
}

export function blink() {
    getAllCoins((e: HTMLElement) => {
        if (e.classList.contains('shouldBlink')) {
            e.classList.add('blink')
        }
    });

    removeBlink();
}