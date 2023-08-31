<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <slot />
{:else}
  <p class="flex flex-col gap-3 text-error my-10">
    You must be signed in to view this page.
    <a href="/login" class="btn btn-primary sm:mx-20">Sign in</a>
  </p>
{/if}
