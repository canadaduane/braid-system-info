<script lang="ts">
  import listen from "braid-protocol/dist/client";

  let datetime;
  (async () => {
    for await (const data of listen("http://localhost:2000/time")) {
      const value = JSON.parse(data.value);
      if (value !== null) {
        datetime = value.datetime;
      }
    }
  })();

  let cpuTemp;
  (async () => {
    for await (const data of listen("http://localhost:2000/cpu/temperature")) {
      const value = JSON.parse(data.value);
      if (value !== null) {
        cpuTemp = value.main;
      }
    }
  })();
</script>

<main>
  <h1>Date & Time</h1>
  {#if datetime !== undefined}
    <value>{datetime}</value>
  {:else}
    <value class="unknown">Unknown</value>
  {/if}

  <h1>CPU Temp</h1>
  {#if cpuTemp !== undefined}
    <value>{cpuTemp.toFixed(1)}</value>
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
    margin-bottom: 21.44px;
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
  @media (max-width: 640px) {
    h1 {
      font-size: 2.5em;
    }

    value {
      font-size: 2em;
    }
  }
</style>
