<script lang="ts">
  import type { Mode } from "./components/GameController.svelte";
  import Game from "./components/Game.svelte";
  
  let mode: Mode = "twoPlayer";
</script>

<style>
  #mainPage {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100vw;
    height: 100vh ;
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
</style>

<div id="mainPage">
  <select bind:value={mode} name="mode" id="mode">
    <option value="twoPlayer">2p</option>
    <option value="onePlayer">1p</option>
  </select>
  {#if mode === "twoPlayer"}
    <Game />
  {/if}
  {#if mode === "onePlayer"}
    <h1>W.I.P.</h1>
  {/if}
</div>
