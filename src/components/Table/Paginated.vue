<template>
  <JsonFetch
    v-bind="{
      path,
      sort,
      fields,
      search,
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

      <div v-if="! loading && data.length < 1" class="flex flex-col md:flex-row mx-auto max-w-lg items-start mt-10">
        <img class="w-full md:w-1/2" src="@/assets/empty.svg">

        <div class="self-center text-center mt-10 md:mt-0 md:text-left md:ml-auto">
          <h2 class="text-4xl">Ooooppps....</h2>
          <p style="word-break: break-word" class="mt-4 text-lg max-w-xs">We can't find anything related to <span class="text-blue" v-text="search"></span></p>

          <button @click.prevent="$emit('reset')" class="bg-blue text-white px-4 py-2 rounded mt-8">
            Clear your search
          </button>
        </div>
      </div>

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

