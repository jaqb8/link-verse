<script lang="ts">
  import "../app.css";
  import { user, userData } from "$lib/firebase";

  // preload global data - this will be available to all routes
  // and $ subscripbes to changes so it prevents multiple fetches
  $user;
  $userData;
</script>

<div class="min-h-screen flex flex-col">
  <slot />
</div>
