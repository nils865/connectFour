import { winstate, notification } from "../../stores";
import type { CoinState } from "../../types";
import { getCoinState, columnCount, rowCount } from "./GameController";

type winOutput = { state: boolean; elements: HTMLElement[] };
type Pos = { x: number; y: number };

export class WinDetection {
    private output: winOutput;
    private lastCoin: Coin;
    private columns: HTMLCollection;

    public constructor(slot: HTMLElement) {
        this.output = { state: false, elements: [] };
        this.lastCoin = new Coin(slot);
        this.columns = document.getElementsByClassName("column");

        const lists: HTMLElement[][] = [
            this.checkColumn(),
            this.checkRow(),
            this.checkDiagonal(
                (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y - 1 }),
                (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y + 1 })
            ),
            this.checkDiagonal(
                (pos: Pos): Pos => ({ x: pos.x - 1, y: pos.y - 1 }),
                (pos: Pos): Pos => ({ x: pos.x + 1, y: pos.y + 1 })
            ),
        ];

        lists.forEach((e) => {
            if (e.length >= 4) {
                this.output["state"] = true;
                e.forEach((c) => {
                    if (!this.output["elements"].includes(c))
                        this.output["elements"].push(c);
                });
            }
        });
    }

    public addBlink() {
        this.output["elements"].forEach((e) => {
            e.children[0].classList.add("blink");
        });
    }

    public get WinState(): winOutput {
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
            list.push(getSlot({ x: i, y: this.lastCoin.SlotId }));
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
