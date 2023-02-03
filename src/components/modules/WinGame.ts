import { winstate, notification } from "../../stores";
import type { Coin } from "../../types";
import { Blink, getCoinState, columnCount, rowCount } from "./GameController";

function win(team: Coin) {
    winstate.set(true);

    if (team === 'redCoin') {
        notification.set(`<span style="color: red">Red</span> won!`);
    } else {
        notification.set(`<span style="color: yellow">Yellow</span> won!`);
    }
}

function checkForFourInARow(count: number, state: Coin): boolean {
    if (count >= 4) {
        win(state);
        return true;
    }

    return false;
}

function checkColumn(coins: HTMLCollection, state: Coin, index: number): boolean {
    let count = 0;

    for (let i = index; i < rowCount; i++) {
        if (state != getCoinState(coins[i])) break

        Blink.addShouldBlink(coins[i].children[0] as HTMLElement);
        count++;
    }

    if (checkForFourInARow(count, state)) return true;

    Blink.removeAllShouldBlink();
    return false;
}

function checkRow(coins: HTMLCollection, state: Coin, index: number): boolean {
    // get starting pos
    const columns = document.getElementsByClassName('column') as HTMLCollection;

    let startPos: number = -1;
    for (let i = parseInt(coins[0].parentElement.id[coins[0].parentElement.id.length - 1]); i >= 0 && startPos < 0; i--) {
        if (state != getCoinState(columns[i].children[index])) startPos = i;
    }
    startPos++;

    // get row
    let count = 0;
    for (let i = startPos; i < columnCount; i++) {
        if (state === getCoinState(columns[i].children[index])) {
            Blink.addShouldBlink(columns[i].children[index].children[0] as HTMLElement);
            count++;
        }
        else break;
    }

    if (checkForFourInARow(count, state)) return true;

    Blink.removeAllShouldBlink();

    return false;
}

export function checkForWin(coins: HTMLCollection, index: number): boolean {
    const state: Coin = getCoinState(coins[index]);
    let win: boolean = false;

    if (checkColumn(coins, state, index)) win = true;
    if (checkRow(coins, state, index)) win = true;

    return win;
}

// export function checkForWin(coins: HTMLCollection, index: number) {
//     const newestElement = coins[index];
//     const state: Coin = getCoinState(newestElement);
//     let count = 0;

//     // check if its a column
//     for (let i = index; i <= 5; i++) {
//         if (state != getCoinState(coins[i])) {
//             if (checkForFourInARow(count, state)) return;

//             count = 0;
//             break;
//         }

//         Blink.addShouldBlink(coins[i].children[0] as HTMLElement);
//         count++;
//     }
//     Blink.removeAllShouldBlink();

//     // check if its a row
//     const getColumnId = (e: HTMLElement): number => parseInt(e.id[e.id.length - 1]);

//     const currentColumn = getColumnId(newestElement.parentElement as HTMLElement);

//     // get starting pos
//     let startingColumn: number = currentColumn;

//     for (let i = currentColumn; i > 0; i--) {
//         const nextElement = document.getElementById(`column${i - 1}`).children[index].children[0] as HTMLElement;

//         if (nextElement.classList.contains(state)) {
//             startingColumn = i - 1;
//         } else {
//             break;
//         }
//     }

//     count = 0;

//     for (let i = startingColumn; i < columnCount; i++) {
//         const element: HTMLElement = document.getElementById(`column${i}`).children[index].children[0] as HTMLElement;

//         if (element.classList.contains(state)) {
//             Blink.addShouldBlink(element as HTMLElement);
//             count++;
//         } else {
//             break;
//         }
//     }
//     if (checkForFourInARow(count, state)) return;

//     Blink.removeAllShouldBlink();

//     // check if its a diagonal
//     let startingPos = { x: currentColumn, y: index };
//     for (let x = startingPos['x']; x >= 0; x--) {
//         if ((startingPos['x'] - 1) < 0) break;
//         if ((startingPos['y'] + 1) >= rowCount) break;

//         const nextElement = document.getElementById(`column${x - 1}`).children[startingPos['y'] + 1].children[0] as HTMLElement;

//         if (nextElement.classList.contains(state)) {
//             startingPos['x'] = x - 1;
//             startingPos['y'] = startingPos['y'] + 1;
//         } else {
//             break;
//         }
//     }
    
//     Blink.addShouldBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
//     count = 1;
//     for (let x = startingPos['x']; x < columnCount; x++) {
//         if ((startingPos['x'] + 1) >= columnCount) break;
//         if ((startingPos['y'] - 1) < 0) break;

//         const nextElement = document.getElementById(`column${x + 1}`).children[startingPos['y'] - 1].children[0] as HTMLElement;

//         if (nextElement.classList.contains(state)) {
//             startingPos['x'] = x + 1;
//             startingPos['y'] = startingPos['y'] - 1;

//             Blink.addShouldBlink(nextElement as HTMLElement);
//             count++;
//         } else {
//             break;
//         }
//     }
//     if (checkForFourInARow(count, state)) return;

//     Blink.removeAllShouldBlink();

//     // but now the other way
//     startingPos = { x: currentColumn, y: index };
//     Blink.addShouldBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
//     for (let x = startingPos['x']; x >= 0; x--) {
//         if ((startingPos['x'] - 1) < 0) break;
//         if ((startingPos['y'] - 1) < 0) break;

//         const nextElement = document.getElementById(`column${x - 1}`).children[startingPos['y'] - 1].children[0] as HTMLElement;

//         if (nextElement.classList.contains(state)) {
//             startingPos['x'] = x - 1;
//             startingPos['y'] = startingPos['y'] - 1;
//         } else {
//             break;
//         }
//     }

//     count = 1;
//     for (let x = startingPos['x']; x < columnCount; x++) {
//         if ((startingPos['x'] + 1) >= columnCount) break;
//         if ((startingPos['y'] + 1) >= rowCount) break;

//         const nextElement = document.getElementById(`column${x + 1}`).children[startingPos['y'] + 1].children[0] as HTMLElement;

//         if (nextElement.classList.contains(state)) {
//             startingPos['x'] = x + 1;
//             startingPos['y'] = startingPos['y'] + 1;

//             Blink.addShouldBlink(nextElement as HTMLElement);
//             count++;
//         } else {
//             if (checkForFourInARow(count, state)) return;
            
//             break;
//         }
//     }
//     if (checkForFourInARow(count, state)) return;

//     Blink.removeAllShouldBlink();
// }
