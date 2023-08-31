<script lang="ts">
  import { UserLink } from "$lib/components";
  import type { LayoutData, PageData } from "./$types";

  export let data: LayoutData;
</script>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-7xl font-bold">
    @{data.username}
  </h1>

  <img
    src={data.photoURL ?? "/user.png"}
    alt="photoURL"
    width="200"
    class="mx-auto mt-8 mask mask-circle"
  />

  <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
  <ul class="list-none">
    {#each data.links as item}
      <UserLink {...item} />
    {/each}
  </ul>
</main>
