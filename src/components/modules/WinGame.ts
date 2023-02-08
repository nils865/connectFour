import { winstate, notification } from "../../stores";
import type { CoinState } from "../../types";
import { Blink, getCoinState, columnCount, rowCount } from "./GameController";

type winOutput = { state: boolean; elements: HTMLElement[] };
type Pos = { x: number; y: number };

export class WinDetection {
    private output: winOutput;
    private lastCoin: Coin;
    private columns: HTMLCollection;

    public constructor(slot: HTMLElement) {
        this.output = { state: false, elements: null };
        this.lastCoin = new Coin(slot);
        this.columns = document.getElementsByClassName("column");

        const columnList = this.checkColumn();
        const rowList = this.checkRow();
        const diagOne = this.checkDiagonal(
            (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y - 1 }),
            (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y + 1 })
        );
        const diagTwo = this.checkDiagonal(
            (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y - 1 }),
            (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y + 1 })
        );

        if (
            columnList.length >= 4 ||
            rowList.length >= 4 ||
            diagOne.length >= 4 ||
            diagTwo.length >= 4
        )
            this.output["state"] = true;

        console.log(`Column`);
        console.log(columnList);

        console.log(`Row`);
        console.log(rowList);

        console.log(`Diag 1`);
        console.log(diagOne);

        console.log(`Diag 2`);
        console.log(diagTwo);
    }

    public getWinState(): winOutput {
        return this.output;
    }

    private checkColumn(): HTMLElement[] {
        let list: HTMLElement[] = [];

        for (let i = this.lastCoin.SlotId; i < rowCount; i++) {
            if (
                this.lastCoin.State !=
                getCoinState(this.columns[this.lastCoin.ColumnId].children[i])
            )
                break;

            list.push(
                this.columns[this.lastCoin.ColumnId].children[i] as HTMLElement
            );
        }

        return list;
    }

    private checkRow(): HTMLElement[] {
        let list: HTMLElement[] = [];

        // get starting pos
        let startPos = -1;
        for (let i = this.lastCoin.ColumnId; i >= 0 && startPos < 0; i--) {
            if (
                this.lastCoin.State !=
                getCoinState(getSlot({ x: i, y: this.lastCoin.SlotId }))
            )
                startPos = i;
        }
        startPos++;

        // get row
        for (
            let i = startPos;
            i < columnCount &&
            this.lastCoin.State ===
                getCoinState(getSlot({ x: i, y: this.lastCoin.SlotId }));
            i++
        ) {
            list.push(
                getSlot({ x: i, y: this.lastCoin.SlotId })
                    .children[0] as HTMLElement
            );
        }

        return list;
    }

    private checkDiagonal(
        getNextElementPos: Function,
        getPrevElementPos: Function
    ): HTMLElement[] {
        let list: HTMLElement[] = [];
        const newestPos = {
            x: this.lastCoin.ColumnId,
            y: this.lastCoin.SlotId,
        };

        // get start pos
        let startPos: Pos = getNextElementPos(newestPos);
        while (
            verifySlotPos(getPrevElementPos(startPos)) &&
            getCoinState(getSlot(getPrevElementPos(startPos))) ===
                this.lastCoin.State
        ) {
            startPos = getPrevElementPos(startPos);
        }

        let currentPos: Pos = getPrevElementPos(startPos);
        console.table(currentPos);
        while (
            verifySlotPos(getNextElementPos(currentPos)) &&
            getCoinState(getSlot(getNextElementPos(currentPos))) ==
                this.lastCoin.State
        ) {
            currentPos = getNextElementPos(currentPos);
            list.push(getSlot(currentPos));
        }

        return list;
    }
}

const getSlot = (pos: Pos): HTMLElement =>
    document.getElementsByClassName("column")[pos.x].children[
        pos.y
    ] as HTMLElement;

const verifySlotPos = (pos: Pos): boolean =>
    pos.x < columnCount && pos.x >= 0 && pos.y < rowCount && pos.y >= 0;

class Coin {
    private element: HTMLElement;
    private slotId: number;
    private columnId: number;
    private state: CoinState;

    public constructor(element: HTMLElement) {
        this.element = element;

        this.columnId = parseInt(
            this.element.parentElement.id[
                this.element.parentElement.id.length - 1
            ]
        );

        this.calcSlotId();
        this.calcState();
    }

    public get Element(): HTMLElement {
        return this.element;
    }

    public get SlotId(): number {
        return this.slotId;
    }

    public get ColumnId(): number {
        return this.columnId;
    }

    public get State(): CoinState {
        return this.state;
    }

    private calcSlotId(): void {
        const parent = this.element.parentElement;

        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] == this.element) {
                this.slotId = i;
                break;
            }
        }
    }

    private calcState(): void {
        if (this.element.children[0].classList.contains("yellowCoin"))
            this.state = "yellowCoin";
        else if (this.element.children[0].classList.contains("redCoin"))
            this.state = "redCoin";
        else this.state = null;
    }
}

// function endGame(team: Coin) {
//     winstate.set(true);

//     if (team === 'redCoin') {
//         notification.set(`<span style="color: red">Red</span> won!`);
//     } else {
//         notification.set(`<span style="color: yellow">Yellow</span> won!`);
//     }
// }

// function checkForFourInARow(count: number, state: Coin): boolean {
//     if (count >= 4) {
//         endGame(state);
//         Blink.convertAllBlinks();
//         return true;
//     }

//     return false;
// }

// type Pos = { x: number, y: number }

// const getColumnId = (slot: HTMLElement):number => parseInt(slot.parentElement.id[slot.parentElement.id.length - 1]);
// const getSlot = (pos: Pos): HTMLElement => document.getElementsByClassName('column')[pos.x].children[pos.y] as HTMLElement;
// const verifySlotPos = (pos: Pos): boolean => pos.x < columnCount && pos.x >= 0 && pos.y < rowCount && pos.y >= 0;

// function checkColumn(coins: HTMLCollection, state: Coin, index: number): boolean {
//     let count = 0;

//     for (let i = index; i < rowCount; i++) {
//         if (state != getCoinState(coins[i])) break

//         Blink.addShouldBlink(coins[i].children[0] as HTMLElement);
//         count++;
//     }

//     if (checkForFourInARow(count, state)) return true;

//     Blink.removeAllShouldBlink();
//     return false;
// }

// function checkRow(coins: HTMLCollection, state: Coin, index: number): boolean {
//     // get starting pos
//     let startPos: number = -1;
//     for (let i = getColumnId(coins[index] as HTMLElement); i >= 0 && startPos < 0; i--) {
//         if (state != getCoinState(getSlot({ x: i, y: index }))) startPos = i;
//     }
//     startPos++;

//     // get row
//     let count = 0;
//     for (let i = startPos; i < columnCount && (state === getCoinState(getSlot({ x: i, y: index }))); i++) {
//         Blink.addShouldBlink(getSlot({ x: i, y: index }).children[0] as HTMLElement);
//         count++;
//     }

//     if (checkForFourInARow(count, state)) return true;

//     Blink.removeAllShouldBlink();
//     return false;
// }

// function checkDiagonal(coins: HTMLCollection, state: Coin, index: number, getNextElementPos: Function, getPrevElementPos: Function): boolean {
//     // get startPos
//     const newestPos: Pos = { x: getColumnId(coins[index] as HTMLElement), y: index };

//     let startPos: Pos = getNextElementPos(newestPos);
//     while (verifySlotPos(getPrevElementPos(startPos)) && getCoinState(getSlot(getPrevElementPos(startPos))) === state) {
//         startPos = getPrevElementPos(startPos);
//     }

//     // calculate diagonal
//     let currentPos: Pos = getPrevElementPos(startPos);
//     let count = 0;
//     while (verifySlotPos(getNextElementPos(currentPos)) && getCoinState(getSlot(getNextElementPos(currentPos))) == state) {
//         currentPos = getNextElementPos(currentPos);
//         Blink.addShouldBlink(getSlot(currentPos).children[0] as HTMLElement);
//         count++;
//     }

//     if (checkForFourInARow(count, state)) return true;

//     Blink.removeAllShouldBlink();
//     return false;
// }

// export function checkForWin(coins: HTMLCollection, index: number): boolean {
//     const state: Coin = getCoinState(coins[index]);
//     let win: boolean = false;

//     if (checkColumn(coins, state, index)) win = true;
//     if (checkRow(coins, state, index)) win = true;
//     if (checkDiagonal(coins, state, index, (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y - 1 }), (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y + 1 }))) win = true;
//     if (checkDiagonal(coins, state, index, (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y - 1 }), (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y + 1 }))) win = true;

//     return win;
// }
