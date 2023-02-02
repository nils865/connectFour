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

export class Blink {
    public static addShouldBlink(e: HTMLElement) {
        e.classList.add('shouldBlink');
    }
    
    public static removeAllShouldBlink() {
        getAllCoins((e: HTMLElement) => {
            if (e.classList.contains('shouldBlink')) {
                e.classList.remove('shouldBlink')
            }
        });
    }
    
    public static convertAllBlinks() {
        getAllCoins((e: HTMLElement) => {
            if (e.classList.contains('shouldBlink')) {
                e.classList.add('blink')
            }
        });
    
        this.removeAllShouldBlink();
    }
}

export function refreshGame() {
    winstate.set(false);
    coin.set('redCoin');
    notification.set('It\'s reds turn');
    
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

export function switchCoin() {
    let coinState = null;
    coin.subscribe((value) => coinState = value);

    if (coinState === 'redCoin') {
        coin.set('yellowCoin');
    } else {
        coin.set('redCoin');
    }
}