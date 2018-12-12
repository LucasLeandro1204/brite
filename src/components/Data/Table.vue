<template>
  <div>
    <div class="flex" :key="row[id]" v-for="row in data">
      <div :class="classes"  v-for="(classes, column) in columns">
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
    },
  };
</script>
