<template>
  <div>
    <slot v-bind="slot"></slot>
  </div>
</template>

<script>
  import API from '@/api';
  import { Search } from 'js-search';

  /**
   * Create searcher.
   */
  export const searcher = (key, indexes, documents) => {
    const search = new Search(key);

    indexes.forEach(index => search.addIndex(index));

    search.addDocuments(documents);

    return search;
  };

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
      path: {
        type: String,
        required: true,
      },

      fields: {
        type: Object,
        required: false,
        default: () => ({}),
      },

      perPage: {
        type: Number,
        required: false,
        default: 15,
      },

      id: {
        type: String,
        required: false,
        default: 'id',
      },

      search: {
        type: String,
        required: false,
        default: '',
      },
    },

    data: () => ({
      error: false,
      loading: false,
      raw: [],
      page: 1,
      searcher: null,
    }),

    computed: {
      /**
       * Filter documents.
       */
      filtered () {
        if (this.search) {
          return this.searcher.search(this.search);
        }

        return this.raw;
      },

      /**
       * Order documents filtered.
       */
      ordered () {
        return this.filtered;
      },

      /**
       * Get the current page data.
       */
      chunk () {
        return this.ordered.slice(
          this.perPage * (this.page - 1),
          this.perPage * this.page
        );
      },

      /**
       * Attributes to cast.
       */
      cast () {
        const cast = {};

        for (const key in this.fields) {
          const type = this.fields[key].cast;

          if (type) {
            cast[key] = type;
          }
        }

        return cast;
      },

      /**
       * Attributes to index.
       */
      indexes () {
        const indexes = [];

        for (const key in this.fields) {
          const searchable = this.fields[key].searchable;

          if (searchable) {
            indexes.push(key);
          }
        }

        return indexes;
      },

      /**
       * Slot bindings.
       */
      slot () {
        const total = this.filtered.length;
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
          REFETCH: this.FETCH,
        };
      },
    },

    created () {
      this.FETCH();
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

      FETCH () {
        if (this.loading) {
          return Promise.resolve();
        }

        this.loading = true;

        return API.get(this.path)
          .then(validate)
          .then(cast(this.cast))
          .then((data) => {
            this.raw = data;

            /**
             * Create searcher at first request.
             */
            if (this.searcher === null) {
              this.searcher = searcher(this.id, this.indexes, data);
            }
          })
          .catch((error) => {
            console.error(error);

            this.error = true;
          })
          .finally(() => this.loading = false);
      },

      /**
       * Index single document.
       */
      INDEX (document) {
        if (this.searcher) {
          this.searcher.addDocument(document);
        }
      },
    },
  };
</script>
