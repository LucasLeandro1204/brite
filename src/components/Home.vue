<template>
  <JsonFetch
    v-bind="{
      path,
      fields,
      search,
    }"
    >
    <template slot-scope="scope">
      {{ scope.data.map(a => a.name) }}

      <input class="border" v-model="search">
    </template>
  </JsonFetch>
</template>

<script>
  import JsonFetch from './Json/Fetch';

  export default {
    components: {
      JsonFetch,
    },

    data: () => ({
      search: '',
    }),

    computed: {
      fields () {
        return {
          date: {
            cast: Date,
            sortable: true,
          },
          id: {
            searchable: true,
          },
          name: {
            searchable: true,
          },
          description: {
            searchable: true,
          },
          amount: {
            searchable: true,
          },
        };
      },

      path () {
        return 'payments';
      },
    },
  };
</script>

