<script lang="ts">
    import { blink, columnCount, rowCount, addBlink, removeBlink } from "./modules/GameController";
    import { notification, winstate, coin } from "../stores";
    import type { Mode, Coin } from "../types";
    
    let gamemode: Mode = 'twoPlayer';

    function win(team: Coin) {
        $winstate = true;

        if (team === 'redCoin') {
            $notification = 'Red won!';
        } else {
            $notification = 'Yellow won!';
        }
    }

    function switchCoin() {
        if ($coin === 'redCoin') {
            $coin = 'yellowCoin';
        } else {
            $coin = 'redCoin';
        }
    }

    function getCoinState(slot: Element): Coin {
        if (slot.children[0].classList.contains('redCoin')) {
            return 'redCoin';
        } else if (slot.children[0].classList.contains('yellowCoin')) {
            return 'yellowCoin';
        }

        return null;
    }

    function checkForWin(coins: HTMLCollection, index: number) {
        const newestElement = coins[index];
        const state: Coin = getCoinState(newestElement);
        let count = 0;

        // check if its a column
        for (let i = index; i <= 5; i++) {
            if (state != getCoinState(coins[i])) {
                count = 0;
                break;
            }

            addBlink(coins[i].children[0] as HTMLElement);
            count++;

            if (count >= 4) {
                win(state);
                return;
            }
        }
        removeBlink();

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
                addBlink(element as HTMLElement);
                count++;
            } else {
                break;
            }

            if (count >= 4) {
                win(state);
                return;
            }
        }
        removeBlink();

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
        
        addBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
        count = 1;
        for (let x = startingPos['x']; x < columnCount; x++) {
            if ((startingPos['x'] + 1) >= columnCount) break;
            if ((startingPos['y'] - 1) < 0) break;

            const nextElement = document.getElementById(`column${x + 1}`).children[startingPos['y'] - 1].children[0] as HTMLElement;

            if (nextElement.classList.contains(state)) {
                startingPos['x'] = x + 1;
                startingPos['y'] = startingPos['y'] - 1;

                addBlink(nextElement as HTMLElement);
                count++;
            } else {
                break;
            }

            if (count >= 4) {
                win(state);
                return;
            }
        }
        removeBlink();

        // but now the other way
        startingPos = { x: currentColumn, y: index };
        addBlink(document.getElementById(`column${startingPos['x']}`).children[startingPos['y']].children[0] as HTMLElement);
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

                addBlink(nextElement as HTMLElement);
                count++;
            } else {
                break;
            }

            if (count >= 4) {
                win(state);
                return;
            }
        }

        removeBlink();
    }

    function spawnCoin(e: HTMLElement) {
        const children: HTMLCollection = e.children;

        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i] as HTMLElement;

            if (child.children[0].classList.contains('coin')) continue;

            child.children[0].classList.add($coin);
            child.children[0].classList.add('coin');

            checkForWin(children, i);

            switchCoin();
            break;
        }
    }

    function click(e: MouseEvent) {
        if ($winstate) return;

        let target = e.target as HTMLElement;

        if (target.classList.contains("coin")) {
            target = target.parentElement as HTMLElement;
        }

        if (target.classList.contains("slot")) {
            target = target.parentElement as HTMLElement;
        } 

        if (target.classList.contains("column") && target.id.startsWith("column")) {
            spawnCoin(target);
        }
        
        blink();
        
        if ($winstate) {
            return
        } else if ($coin == 'redCoin') {
            $notification = 'It\'s reds turn';
        } else if ($coin == 'yellowCoin') {
            $notification = 'It\'s yellows turn';
        }
    }
</script>

<style>
    #gamefield {
        width: fit-content;
        height: fit-content;
        padding: 10px;

        border-style: solid;
        border-radius: 10px;
        border-color: var(--txt);

        display: flex;
        flex-direction: row;

        z-index: 1;
    }

    .column {
        border-left: var(--txt) 4px solid;
        z-index: 69696969;
    }

    .column:hover {
        background-color: #0ee9da8a;
    }

    .column:last-child {
        border-right: var(--txt) 4px solid;
    }

    .slot {
        width: 5em;
        height: 5em;

        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slot:not(:first-child) {
        border-top: var(--txt) 1px solid;
    }

    .slot:last-child {
        border-bottom: var(--txt) 4px solid;
    }

    h1 {
        text-align: center;
    }
</style>

<div>
    <h1>{$notification}</h1>
    <div id="gamefield">
        {#each Array(columnCount) as _, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={click} id="column{i}" class="column">
                {#each Array(rowCount) as _}
                    <div class="slot">
                        <div></div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
