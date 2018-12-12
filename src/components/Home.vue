<template>
  <div class="p-8 max-w-2xl mx-auto">
    <header class="mb-3">
      <h1 class="font-thin mb-3">Payments</h1>

      <input class="border" v-model="search">
    </header>

    <JsonFetch
      v-bind="{
        path,
        fields,
        search,
        field,
        order,
      }"
      >

      <template slot-scope="{ data, loading }">
        <DataTable
          class="bg-white rounded-lg shadow"
          v-bind="{
            data,
            columns,
            per_page,
            current_page,
          }">

          <template slot="date" slot-scope="{ value }">
            {{ value.toLocaleDateString() }}
          </template>
        </DataTable>

        <Pagination
          @paginate="page => SET_PAGE(page, loading)"
          v-bind="{
            per_page,
            current_page,
            total: data.length,
          }" />
      </template>
    </JsonFetch>
  </div>
</template>

<script>
  import DataTable from './Data/Table';
  import JsonFetch from './Json/Fetch';
  import JsonUpdate from './Json/Update';
  import Pagination from '@/components/Pagination';

  export default {
    components: {
      DataTable,
      JsonFetch,
      Pagination,
      JsonUpdate,
    },

    data: () => ({
      search: '',
      field: 'date',
      order: 'desc',
      current_page: 1,
      per_page: 15,
    }),

    computed: {
      fields () {
        return {
          date: {
            type: Date,
            searchable: false,
          },
          name: String,
          description: String,
          amount: String,
        };
      },

      path () {
        return 'payments';
      },

      columns () {
        return [
          {
            key: 'id',
            label: 'ID',
            width: '30%',
          },
          {
            key: 'name',
            label: 'NAME',
            width: '15%',
          },
          {
            key: 'description',
            label: 'DESCRIPTION',
            width: '35%',
          },
          {
            key: 'date',
            label: 'DATE',
            width: '10%',
          },
          {
            key: 'amount',
            label: 'AMOUNT',
            width: '10%',
          },
        ];
      },
    },

    watch: {
      search () {
        this.SET_PAGE(1);
      },
    },

    methods: {
      SET_PAGE (page, loading) {
        if (loading) {
          return;
        }

        this.current_page = page;
      },
    },
  };
</script>

