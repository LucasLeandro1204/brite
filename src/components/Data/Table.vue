<template>
  <div class="overflow-hidden overflow-x-auto">
    <table class="w-full bg-white text-sm p-0 text-left">
      <thead>
        <tr>
          <th
            :width="width"
            :key="key"
            class="px-6 py-4 border-b text-grey-dark"
            v-for="({ key, width, sortable, label }) in columns">

            <a
              href='#'
              v-if="sortable"
              @click.prevent="toggleSort(key)"
              class="text-grey-darkest flex self-center">
                {{ label }}

                <IconArrow class="self-start ml-2" v-if="sort.field == key" :flip="sort.order === 'asc'" />
            </a>

            <template v-else>
              {{ label }}
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :class="index % 2 ? 'hover:bg-grey-lightest' : 'bg-grey-lightest hover:bg-grey-lighter'" :key="row[id]" v-for="(row, index) in chunk">
          <td
            :width="column.width"
            :key="column.key + row[id]"
            v-for="column in columns">

            <slot :name="column.key" :value="row[column.key]" :row="row">
              <span class="px-6 py-2 block" v-text="row[column.key]"></span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Orders from '@/core/orders';
  import IconArrow from '@/components/Icon/Arrow';

  export default {
    components: {
      IconArrow,
    },

    props: {
      columns: {
        type: Array,
        required: true,
        validator (columns) {
          return columns.length > 0 && columns.indexOf(({ key, label, width }) => ! (key && label && width));
        },
      },

      data: {
        type: Array,
        required: true,
      },

      sort: {
        type: Object,
        required: true,
        validate ({ field, order }) {
          return field
            && typeof field === 'String'
            && Orders.has(order);
        },
      },

      id: {
        type: String,
        required: false,
        default: 'id',
      },

      current_page: {
        type: Number,
        required: true,
      },

      per_page: {
        type: Number,
        required: true,
      },
    },

    computed: {
      /**
       * Get the current page data.
       */
      chunk () {
        return this.data.slice(
          this.per_page * (this.current_page - 1),
          this.per_page * this.current_page
        );
      },
    },

    methods: {
      toggleSort (field) {
        this.$emit('sort', {
          field,
          order: field === this.sort.field
            ? Orders.get(this.sort.order)
            : 'desc',
        });
      },
    },
  };
</script>
