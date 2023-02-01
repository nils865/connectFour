<script lang="ts">
  import AI from "./components/AI.svelte";
  import Game from "./components/Game.svelte";

  let mode = "twoP";
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
    <option value="twoP">2p</option>
    <option value="oneP">1p</option>
  </select>
  {#if mode === "twoP"}
    <Game />
  {/if}
  {#if mode === "oneP"}
    <h1>W.I.P.</h1>
  {/if}
</div>
