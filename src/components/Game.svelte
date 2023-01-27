<script lang="ts">
    type Coin = 'redCoin' | 'yellowCoin';

    const columnCount: number = 7;
    const rowCount: number = 6;
    let coin: Coin = 'redCoin';

    function switchCoin() {
        if (coin === 'redCoin') {
            coin = 'yellowCoin';
        } else {
            coin = 'redCoin';
        }
    }

    function spawnCoin(e: HTMLElement) {
        const children: HTMLCollection = e.children;

        // console.log(children)

        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i] as HTMLElement;

            if (child.children[0].classList.contains('coin')) continue;

            child.children[0].classList.add(coin);
            child.children[0].classList.add('coin');
            switchCoin();
            break;
        }

    }

    function click(e: MouseEvent) {
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

</style>

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

