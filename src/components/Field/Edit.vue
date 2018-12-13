<template>
  <span class="px-6 flex py-3">
    <span v-text="value"></span>

    <button
      class="pl-3 ml-auto self-start text-blue-dark"
      @click.prevent="edit">
      <IconEdit />
    </button>
  </span>
</template>

<script>
  import IconEdit from '@/components/Icon/Edit';

  export default {
    components: {
      IconEdit,
    },

    props: {
      value: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: false,
        default: '',
      },
    },

    methods: {
      edit () {
        const value = window.prompt(this.title, this.value);

        if (value === null || value === this.value) {
          return;
        }

        this.$emit('change', value);
      },
    },
  };
</script>
