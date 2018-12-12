<template>
  <div class="overflow-hidden overflow-x-auto">
    <table class="w-full bg-white text-sm p-0 text-left">
      <thead>
        <tr>
          <th
            :width="column.width"
            :key="column.key"
            v-text="column.label"
            class="px-6 py-4 border-b text-grey-dark text-sm"
            v-for="column in columns">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :class="index % 2 ? 'hover:bg-grey-lightest' : 'bg-grey-lightest hover:bg-grey-lighter'" :key="row[id]" v-for="(row, index) in chunk">
          <td
            :width="column.width"
            :key="column.key + row[id]"
            class="px-6 py-3"
            v-for="column in columns">

            <slot :name="column.key" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
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
  };
</script>
