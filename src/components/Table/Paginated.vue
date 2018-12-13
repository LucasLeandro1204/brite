<template>
  <JsonFetch
    v-bind="{
      path,
      fields,
      search,
      sort,
    }"
    >
    <component :is="tag" slot-scope="{ data, loading, INDEX }">
      <JsonUpdate
        @updated="INDEX"
        :path="path">

        <TableBase
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

          <span slot="date" slot-scope="{ value }" class="px-6 py-2" v-text="value.toLocaleDateString()"></span>

          <FieldPrice v-bind="scope" slot="amount" slot-scope="scope" />

          <FieldEdit @change="value => UPDATE(scope.row.id, 'description', value)" v-bind="scope" title="Edit description" slot="description" slot-scope="scope" />
        </TableBase>
      </JsonUpdate>

      <Pagination
        class="mt-4"
        @paginate="page => SET_PAGE(page, loading)"
        v-bind="{
          per_page,
          current_page,
          total: data.length,
        }" />
    </component>
  </JsonFetch>
</template>

<script>
  import TableBase from './Base';
  import JsonFetch from '@/components/Json/Fetch';
  import FieldEdit from '@/components/Field/Edit';
  import Pagination from '@/components/Pagination';
  import JsonUpdate from '@/components/Json/Update';
  import FieldPrice from '@/components/Field/Price';

  export default {
    components: {
      TableBase,
      JsonFetch,
      FieldEdit,
      Pagination,
      JsonUpdate,
      FieldPrice,
    },

    props: {
      search: {
        type: String,
        required: false,
        default: '',
      },

      path: {
        type: String,
        required: true,
      },

      fields: {
        type: Array,
        required: true,
      },

      tag: {
        type: String,
        required: false,
        default: 'div',
      },
    },

    data: () => ({
      sort: {
        field: 'date',
        order: 'desc',
      },
      current_page: 1,
      per_page: 10,
    }),

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

