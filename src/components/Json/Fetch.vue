<template>
  <div>
    <slot v-bind="slot"></slot>
  </div>
</template>

<script>
  /**
   * Data must be an array of objects.
   */
  export const validate = (data) => {
    if (! Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    const isNotAnObject = data.find(col => Object.getPrototypeOf(col) !== Object.prototype);

    if (isNotAnObject) {
      throw new Error('Invalid data.');
    }

    return data;
  };

  /**
   * Cast the data.
   */
  export const cast = (castMap) => (data) => data.map((row) => {
    /**
     * Better to run through castMap instead of the entire row object.
     */
    for (const key in castMap) {
      const value = row[key];

      if (value) {
        row[key] = new castMap[key](value);
      }
    }

    return row;
  });

  export default {
    props: {
      url: {
        type: String,
        required: true,
      },

      cast: {
        type: Object,
        required: false,
        default: () => ({}),
      },

      perPage: {
        type: Number,
        required: false,
        default: 15,
      },
    },

    data: () => ({
      error: false,
      loading: true,
      raw: [],
      page: 1,
    }),

    computed: {
      data () {
        return this.raw;
      },

      chunk () {
        return this.data.slice(
          this.perPage * (this.page - 1),
          this.perPage * this.page
        );
      },

      slot () {
        const total = this.data.length;
        const last_page = Math.floor((total + (this.perPage - 1)) / this.perPage);

        return {
          data: this.chunk,
          error: this.error,
          loading: this.loading,
          meta: {
            total,
            last_page,
            page: this.page,
          },
          SET_PAGE: this.SET_PAGE,
        };
      },
    },

    created () {
      fetch(this.url)
        .then(response => response.json())
        .then(validate)
        .then(cast(this.cast))
        .then((data) => {
          this.raw = data;
        })
        .catch((error) => {
          console.error(error);

          this.error = true;
        })
        .finally(() => this.loading = false);
    },

    methods: {
      SET_PAGE (page) {
        if (! Number.isInteger(page)) {
          throw new Error('Page should be an integer');
        }

        if (this.loading) {
          return;
        }

        this.page = page;
      },
    },
  };
</script>
