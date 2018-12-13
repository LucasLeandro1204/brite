<script>
  import API from '@/core/api';

  export default {
    props: {
      path: {
        type: String,
        required: true,
      },

      id: {
        type: String,
        required: false,
        default: 'id',
      },
    },

    render () {
      return this.$scopedSlots.default(this.slot);
    },

    computed: {
      slot () {
        return {
          UPDATE: this.UPDATE,
        };
      },
    },

    methods: {
      async UPDATE (id, key, value) {
        const entity = await API.update(this.path, {
          [key]: value,
          [this.id]: id,
        }, this.id);

        this.$emit('updated', entity);
      },
    },
  };
</script>
