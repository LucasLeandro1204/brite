<template>
  <nav v-if="last_page > 1">

    <a
      href="#"
      @click.prevent="go(current_page - 1)">
       <
    </a>

    <a
      href="#"
      @click.prevent="go(current_page + 1)">
       >
    </a>

    <ul>
      <li>
        <a
          href="#"
          :key="page + index"
          @click.prevent="go(page)"
          v-for="(page, index) in pages"
          v-text="page"></a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number,
        required: true,
      },

      last_page: {
        type: Number,
        required: true,
      },

        type: Number,
      current_page: {
        required: true,
      },

        type: Number,
      limit: {
        default: 3,
      },

      margin: {
        type: Number,
        default: 1,
      },
    },

    computed: {
      /**
       * Too complex to comment.
       * Sorry.
       */
      pages () {
        if (this.last_page <= this.limit + 2) {
          return this.last_page;
        }

        const pages = {};
        const half_range = Math.floor(this.limit / 2);

        for (let i = 0; i < this.margin; i++) {
          pages[i] = i + 1;
        }

        let low_range = this.current_page - half_range > 0
          ? this.current_page - 1 - half_range
          : 0;

        let high_range = low_range + this.limit - 1;

        if (high_range >= this.last_page) {
          high_range = this.last_page - 1;
          low_range = high_range - this.limit + 1;
        }

        for (let index = low_range; index <= high_range && index <= this.last_page - 1; index++) {
          pages[index] = index + 1;
        }

        if (low_range > this.margin) {
          pages[low_range - 1] = '...';
        }

        if (high_range + 1 < this.last_page - this.margin) {
          pages[high_range + 1] = '...';
        }

        for (let index = this.last_page - 1; index >= this.last_page - this.margin; index--) {
          pages[index] = index + 1;
        }

        return pages;
      },
    },

    methods: {
      go (page) {
        if (page == this.current_page || page == '...') {
          return;
        }

        this.$emit('paginate', page);
      },
    },
  };
</script>
