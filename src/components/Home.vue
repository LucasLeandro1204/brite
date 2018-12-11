<template>
  <JsonFetch
    v-bind="{
      path,
      fields,
      search,
      field,
      order,
    }"
    >
    <template slot-scope="scope">
      <span v-for="({ date }) in scope.data">{{ date }}<br></span>

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
      field: 'date',
      order: 'desc',
    }),

    computed: {
      fields () {
        return {
          date: {
            type: Date,
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

