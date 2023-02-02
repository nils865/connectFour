import { winstate, notification } from "../../stores";
import type { Coin } from "../../types";
import { Blink, getCoinState, columnCount, rowCount } from "./GameController";

function win(team: Coin) {
    winstate.set(true);

    if (team === 'redCoin') {
        notification.set('Red won!');
    } else {
        notification.set('Yellow won!');
    }
}

export function checkForWin(coins: HTMLCollection, index: number) {
    const newestElement = coins[index];
    const state: Coin = getCoinState(newestElement);
    let count = 0;

    // check if its a column
    for (let i = index; i <= 5; i++) {
        if (state != getCoinState(coins[i])) {
            count = 0;
            break;
        }

        Blink.addShouldBlink(coins[i].children[0] as HTMLElement);
        count++;

        if (count >= 4) {
            win(state);
            return;
        }
    }
    Blink.removeAllShouldBlink();

    // check if its a row
    const getColumnId = (e: HTMLElement): number => parseInt(e.id[e.id.length - 1]);

    const currentColumn = getColumnId(newestElement.parentElement as HTMLElement);

    // get starting pos
    let startingColumn: number = currentColumn;

    for (let i = currentColumn; i > 0; i--) {
        const nextElement = document.getElementById(`column${i - 1}`).children[index].children[0] as HTMLElement;

        if (nextElement.classList.contains(state)) {
            startingColumn = i - 1;
        } else {
            break;
        }
    }

    count = 0;

    for (let i = startingColumn; i < columnCount; i++) {
        const element: HTMLElement = document.getElementById(`column${i}`).children[index].children[0] as HTMLElement;

        if (element.classList.contains(state)) {
            Blink.addShouldBlink(element as HTMLElement);
            count++;
        } else {
            break;
        }

        if (count >= 4) {
            win(state);
            return;
        }
    }
    Blink.removeAllShouldBlink();

    // check if its a diagonal
    let startingPos = { x: currentColumn, y: index };
    for (let x = startingPos['x']; x >= 0; x--) {
        if ((startingPos['x'] - 1) < 0) break;
        if ((startingPos['y'] + 1) >= rowCount) break;

        const nextElement = document.getElementById(`column${x - 1}`).children[startingPos['y'] + 1].children[0] as HTMLElement;

        if (nextElement.classList.contains(state)) {
            startingPos['x'] = x - 1;
            startingPos['y'] = startingPos['y'] + 1;
        } else {
            break;
        }
    }
    
    Blink.addShouldBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
    count = 1;
    for (let x = startingPos['x']; x < columnCount; x++) {
        if ((startingPos['x'] + 1) >= columnCount) break;
        if ((startingPos['y'] - 1) < 0) break;

        const nextElement = document.getElementById(`column${x + 1}`).children[startingPos['y'] - 1].children[0] as HTMLElement;

        if (nextElement.classList.contains(state)) {
            startingPos['x'] = x + 1;
            startingPos['y'] = startingPos['y'] - 1;

            Blink.addShouldBlink(nextElement as HTMLElement);
            count++;
        } else {
            break;
        }

        if (count >= 4) {
            win(state);
            return;
        }
    }
    Blink.removeAllShouldBlink();

    // but now the other way
    startingPos = { x: currentColumn, y: index };
    Blink.addShouldBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
    for (let x = startingPos['x']; x >= 0; x--) {
        if ((startingPos['x'] - 1) < 0) break;
        if ((startingPos['y'] - 1) < 0) break;

        const nextElement = document.getElementById(`column${x - 1}`).children[startingPos['y'] - 1].children[0] as HTMLElement;

        if (nextElement.classList.contains(state)) {
            startingPos['x'] = x - 1;
            startingPos['y'] = startingPos['y'] - 1;
        } else {
            break;
        }
    }

    count = 1;
    for (let x = startingPos['x']; x < columnCount; x++) {
        if ((startingPos['x'] + 1) >= columnCount) break;
        if ((startingPos['y'] + 1) >= rowCount) break;

        const nextElement = document.getElementById(`column${x + 1}`).children[startingPos['y'] + 1].children[0] as HTMLElement;

        if (nextElement.classList.contains(state)) {
            startingPos['x'] = x + 1;
            startingPos['y'] = startingPos['y'] + 1;

            Blink.addShouldBlink(nextElement as HTMLElement);
            count++;
        } else {
            break;
        }

        if (count >= 4) {
            win(state);
            return;
        }
    }

    Blink.removeAllShouldBlink();
}