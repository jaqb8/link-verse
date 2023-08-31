<script lang="ts">
  export let id = "default";
  export let icon = "default";
  export let url = "foo";
  export let title = "some cool title";
</script>

<li class="my-3">
  <a
    href={url}
    class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline"
    target="_blank"
  >
    <img src={`/${icon}.png`} alt={id} width="32" height="32" class="w-8" />
    <span class="text-lg text-white font-bold">{title}</span>
  </a>
</li>
