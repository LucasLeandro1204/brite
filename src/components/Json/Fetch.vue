<script>
  import API from '@/core/api';
  import { Search } from 'js-search';
  import Orders from '@/core/orders';

  /**
   * Sort array.
   *
   * @todo use something like https://github.com/jherax/array-sort-by
   */
  export const sort = (data, field, type = String, order = 'desc') => {
    if (type == Date || type == Number) {
      const multiplier = order == 'desc' ? -1 : 1;

      return data.sort((a, b) => (a[field] > b[field] ? 1 : -1) * multiplier);
    }

    const sorted = data.sort();

    if (order == 'desc') {
      return sorted.reverse();
    }

    return sorted;
  };

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
        type: Array,
        required: true,
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

      sort: {
        type: Object,
        required: true,
        validate ({ field, order }) {
          return field
            && typeof field === 'String'
            && Orders.has(order);
        },
      },

      search: {
        type: String,
        required: false,
        default: '',
      },
    },

    render () {
      return this.$scopedSlots.default(this.slot);
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
       * Fields as key => value.
       */
      fieldsKeyed () {
        return this.fields.reduce((fields, field) => {
          fields[field.key] = field;

          return fields;
        }, {});
      },

      /**
       * Order documents filtered.
       */
      ordered () {
        /**
         * Sort order maybe null.
         */
        if (this.sort.order === null) {
          return this.filtered;
        }

        const field = this.fieldsKeyed[this.sort.field] || {};

        return sort(this.filtered, this.sort.field, field.type || field || String, this.sort.order);
      },

      /**
       * Attributes to cast.
       */
      cast () {
        const cast = {};

        for (const field of this.fields) {
          const type = field.type;

          /**
           * String is the default type.
           * So we do not have to cast a string as string.
           */
          if (type && type !== String) {
            cast[field.key] = type;
          }
        }

        return cast;
      },

      /**
       * Attributes to index.
       */
      indexes () {
        const indexes = [];

        /**
         * Searchable by default.
         */
        for (const field of this.fields) {
          const searchable = field.searchable;

          if (typeof searchable === 'undefined' || searchable) {
            indexes.push(field.key);
          }
        }

        return indexes;
      },

      /**
       * Slot bindings.
       */
      slot () {
        return {
          data: this.ordered,
          error: this.error,
          loading: this.loading,
          REFETCH: this.FETCH,
          INDEX: this.INDEX,
        };
      },
    },

    created () {
      this.FETCH();
    },

    methods: {
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
       * Index one or more documents.
       */
      INDEX (document) {
        if (this.searcher) {
          this.searcher.addDocuments(
            Array.isArray(document)
              ? document
              : [ document ]
          );
        }

        this.FETCH();
      },
    },
  };
</script>
