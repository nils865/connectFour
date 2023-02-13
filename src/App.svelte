<script lang="ts">
	import { refreshGame } from './modules/GameController';
	import { gamemode } from './stores';
	import Game from './components/Game.svelte';
</script>

<div id="mainPage">
	<div id="globalHead">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img
			on:click={() => refreshGame()}
			id="refresh"
			src="./img/refresh.svg"
			alt="refresh"
			draggable="false" />
		<select
			on:change={() => refreshGame()}
			bind:value={$gamemode}
			name="mode"
			id="mode">
			<option value="twoPlayer">2p</option>
			<option value="onePlayer">1p</option>
		</select>
	</div>
	<Game />
</div>

<style>
	#mainPage {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		width: 100vw;
		height: 100vh;
		overflow: auto;
	}

	#mode {
		font-size: 1.25em;
		background-color: var(--bg);
		color: var(--txt);

		padding: 5px;
		border: 3px solid var(--txt);
		border-radius: 0.5em;
		width: 5em;
		text-align: center;
	}

	#refresh {
		width: 40px;
		height: 40px;

		margin-right: 1em;
		border-radius: 1;

		transition: all 0.1s ease-in-out;
	}

	#refresh:hover {
		cursor: pointer;

		background-color: #404040;
		border-radius: 10px;
	}

	#globalHead {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
