<script lang="ts">
	import {
		columnCount,
		displayGamefield,
		getGamefield,
		rowCount,
		spawnCoin,
	} from '../modules/GameController';
	import { notification, winstate, coin, gamemode } from '../stores';
	import { AI } from '../modules/AI';
	import { checkForWin } from '../modules/WinGame';

	const ai: AI = new AI();

	function click(e: MouseEvent) {
		if ($winstate) return;

		let target = e.target as HTMLElement;

		if (target.classList.contains('coin'))
			target = target.parentElement as HTMLElement;
		if (target.classList.contains('slot'))
			target = target.parentElement as HTMLElement;

		if (
			target.classList.contains('column') &&
			target.id.startsWith('column')
		) {
			const coinList = spawnCoin(target);

			if (coinList == null) return;

			const winArgs = checkForWin(coinList);

			if (!winArgs['state'] && $gamemode == 'onePlayer') {
				checkForWin(ai.spawnCoin());
			}

			displayGamefield(getGamefield())
		} else return;

		if ($winstate) return;
		else if ($coin == 'redCoin')
			$notification = `It's <span style="color: red">reds</span> turn`;
		else if ($coin == 'yellowCoin')
			$notification = `It's <span style="color: yellow">yellows</span> turn`;
	}
</script>

<div>
	<h1>{@html $notification}</h1>
	<div id="gamefield">
		{#each Array(columnCount) as _, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={click} id="column{i}" class="column">
				{#each Array(rowCount) as _}
					<div class="slot">
						<div />
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

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
