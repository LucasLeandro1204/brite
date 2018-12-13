<template>
  <JsonFetch
    v-bind="{
      path,
      fields,
      search,
      sort,
    }"
    >
    <div slot-scope="{ data, loading, INDEX }" class="px-8 py-4 max-w-2xl mx-auto">
      <header class="mb-4 flex flex-col sm:flex-row sm:items-center">
        <h1 class="font-thin mb-2 sm:mb-0">Payments</h1>

        <input class="rounded border-grey-light sm:ml-4 py-1 px-2 border-2" placeholder="Search data" v-model="search">
      </header>

      <JsonUpdate
        @updated="INDEX"
        :path="path">

        <DataTable
          slot-scope="{ UPDATE }"
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

          <FieldPrice v-bind="scope" slot="amount" slot-scope="scope" />

          <FieldEdit @change="value => UPDATE(scope.row.id, 'description', value)" v-bind="scope" title="Edit description" slot="description" slot-scope="scope" />
        </DataTable>
      </JsonUpdate>

      <Pagination
        class="mt-4"
        @paginate="page => SET_PAGE(page, loading)"
        v-bind="{
          per_page,
          current_page,
          total: data.length,
        }" />
    </div>
  </JsonFetch>
</template>

<script>
  import DataTable from './Data/Table';
  import JsonFetch from './Json/Fetch';
  import FieldEdit from './Field/Edit';
  import Pagination from './Pagination';
  import JsonUpdate from './Json/Update';
  import FieldPrice from './Field/Price';

  export default {
    components: {
      DataTable,
      JsonFetch,
      FieldEdit,
      Pagination,
      JsonUpdate,
      FieldPrice,
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

