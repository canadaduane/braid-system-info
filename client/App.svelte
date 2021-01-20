<script lang="ts">
  import listen from "braid-protocol/dist/client";

  let cpuTemp;
  (async () => {
    for await (const data of listen("http://localhost:2000/time")) {
      console.log(data);
    }
  })();
</script>

<main>
  <h1>CPU Temp</h1>
  {#if cpuTemp !== undefined}
    <value>{cpuTemp}</value>
  {:else}
    <value class="unknown">Unknown</value>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  value {
    color: #666;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
