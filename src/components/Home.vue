<template>
  <div class="px-8 py-4 max-w-2xl mx-auto">
    <header class="mb-4 flex flex-col sm:flex-row sm:items-center">
      <h1 class="font-thin mb-2 sm:mb-0">Payments</h1>

      <input class="rounded border-grey-light sm:ml-4 py-1 px-2 border-2" placeholder="Search data" v-model="search">
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
            <span class="px-6 py-2" v-text="value.toLocaleDateString()"></span>
          </template>

          <template slot="amount" slot-scope="{ value }">
            <span
              class="flex text-xs font-bold">
              <span
                class="mx-auto px-2 py-1 rounded-full"
                :class="value > 0 ? 'bg-green-lightest text-green-dark' : 'bg-red-lightest text-red-dark'"
                v-text="value">

                </span>
              </span>
          </template>
        </DataTable>

        <Pagination
          class="mt-4"
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
  import Pagination from './Pagination';
  import JsonUpdate from './Json/Update';

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
      per_page: 10,
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

