<template>
  <div>
    <div class="flex" :key="row[id]" v-for="row in chunk">
      <div :class="classes" :key="column" v-for="(classes, column) in columns">
        <slot :name="column" :value="row[column]">
          {{ row[column] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      columns: {
        type: Object,
        required: true,
        validator: object => Object.keys(object).length > 0,
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
