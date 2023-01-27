<script lang="ts">
  import Game from "./components/Game.svelte";
</script>

<style>
  #mainPage {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh ;
    overflow: auto;
  }
</style>

<div id="mainPage">
  <Game />
</div>

