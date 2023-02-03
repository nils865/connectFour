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
        Blink.convertAllBlinks();
        return true;
    }

    return false;
}

type Pos = { x: number, y: number }

const getColumnId = (slot: HTMLElement):number => parseInt(slot.parentElement.id[slot.parentElement.id.length - 1]);
const getSlot = (pos: Pos): HTMLElement => document.getElementsByClassName('column')[pos.x].children[pos.y] as HTMLElement;
const verifySlotPos = (pos: Pos): boolean => pos.x < columnCount && pos.x >= 0 && pos.y < rowCount && pos.y >= 0;

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
    let startPos: number = -1;
    for (let i = getColumnId(coins[index] as HTMLElement); i >= 0 && startPos < 0; i--) {
        if (state != getCoinState(getSlot({ x: i, y: index }))) startPos = i;
    }
    startPos++;

    // get row
    let count = 0;
    for (let i = startPos; i < columnCount && (state === getCoinState(getSlot({ x: i, y: index }))); i++) {
        Blink.addShouldBlink(getSlot({ x: i, y: index }).children[0] as HTMLElement);
        count++;
    }

    if (checkForFourInARow(count, state)) return true;

    Blink.removeAllShouldBlink();
    return false;
}

function checkDiagonal(coins: HTMLCollection, state: Coin, index: number, getNextElementPos: Function, getPrevElementPos: Function): boolean {
    // get startPos
    const newestPos: Pos = { x: getColumnId(coins[index] as HTMLElement), y: index };

    let startPos: Pos = getNextElementPos(newestPos);
    while (verifySlotPos(getPrevElementPos(startPos)) && getCoinState(getSlot(getPrevElementPos(startPos))) === state) {
        startPos = getPrevElementPos(startPos);
    }

    // calculate diagonal
    let currentPos: Pos = getPrevElementPos(startPos);
    let count = 0;
    while (verifySlotPos(getNextElementPos(currentPos)) && getCoinState(getSlot(getNextElementPos(currentPos))) == state) {
        currentPos = getNextElementPos(currentPos);
        Blink.addShouldBlink(getSlot(currentPos).children[0] as HTMLElement);
        count++;
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
    if (checkDiagonal(coins, state, index, (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y - 1 }), (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y + 1 }))) win = true;
    if (checkDiagonal(coins, state, index, (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y - 1 }), (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y + 1 }))) win = true;

    return win;
}
