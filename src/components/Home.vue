<template>
  <JsonFetch
    v-bind="fetch"
    >
    <template slot-scope="scope">
      {{ scope }}
    </template>
  </JsonFetch>
</template>

<script>
  import JsonFetch from './Json/Fetch';

  export default {
    components: {
      JsonFetch,
    },

    computed: {
      fetch () {
        const url = '/json/payments.json';
        const cast = {
          date: Date,
        };

        return {
          url,
          cast,
        };
      },
    },
  };
</script>

