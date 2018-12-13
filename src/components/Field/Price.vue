<template>
  <span
    class="flex text-xs font-bold">
    <span
      class="mx-auto px-2 py-1 rounded-full"
      :class="value > 0 ? 'bg-green-lightest text-green-dark' : 'bg-red-lightest text-red-dark'"
      v-text="value">
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true,
      },
    },
  };
</script>
