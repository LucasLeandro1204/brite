<template>
  <div class="p-8">
    <h1 class="font-thin mb-3">Payments</h1>

    <input class="border" v-model="search">

    <div class="bg-white p-8">
      <JsonFetch
        v-bind="{
          path,
          fields,
          search,
          field,
          order,
        }"
        >

        <template slot-scope="{ data, meta, SET_PAGE }">
          <DataTable
            :columns="columns"
            :data="data">

            <template slot="date" slot-scope="{ value }">
              {{ value.toLocaleDateString() }}
            </template>
          </DataTable>

          {{ meta }}

          <Pagination @paginate="SET_PAGE" v-bind="meta" />
        </template>
      </JsonFetch>
    </div>
  </div>
</template>

<script>
  import DataTable from './Data/Table';
  import JsonFetch from './Json/Fetch';
  import Pagination from '@/components/Pagination';

  export default {
    components: {
      DataTable,
      JsonFetch,
      Pagination,
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
        return {
          id: '20%',
          name: '20%',
          description: '20%',
          date: '10%',
          amount: '10%',
        };

        return [
          'id',
          'name',
          'description',
          'date',
          'amount',
        ];
      },
    },
  };
</script>

