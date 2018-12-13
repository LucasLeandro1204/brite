<template>
  <div class="px-8 py-4 max-w-2xl mx-auto">
    <header class="mb-4 flex items-center">
      <h1 class="font-thin">Payments</h1>

      <input class="rounded border-grey-light ml-4 py-1 px-2 border-2" placeholder="Search data" v-model="search">
    </header>

    <JsonFetch
      v-bind="{
        path,
        fields,
        search,
        sort,
      }"
      >

      <template slot-scope="{ data, loading }">
        <DataTable
          @sort="sort => SET_SORT(sort, loading)"
          class="bg-white rounded-lg shadow"
          v-bind="{
            data,
            sort,
            per_page,
            current_page,
            columns: fields,
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
      sort: {
        field: 'date',
        order: 'desc',
      },
      current_page: 1,
      per_page: 15,
    }),

    computed: {
      path () {
        return 'payments';
      },

      fields () {
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
            type: Date,
            key: 'date',
            width: '10%',
            label: 'DATE',
            sortable: true,
            searchable: false,
          },
          {
            key: 'amount',
            label: 'AMOUNT',
            width: '10%',
            sortable: true,
            type: Number,
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

      SET_SORT (sort, loading) {
        if (loading) {
          return;
        }

        this.sort = sort;
      },
    },
  };
</script>

