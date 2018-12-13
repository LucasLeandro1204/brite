<template>
  <nav v-if="last_page > 1">
    <ul class="list-reset flex">
      <li>
        <a
          href="#"
          class="btn"
          :class="{ 'btn-disabled': current_page <= 1 }"
          @click.prevent="go(current_page - 1)">
          <IconArrow horizontal />
        </a>
      </li>
      <li>
        <a
          href="#"
          class="btn mr-12"
          :class="{ 'btn-disabled': current_page >= last_page }"
          @click.prevent="go(current_page + 1)">
          <IconArrow horizontal flip />
        </a>
      </li>
      <li
        :key="page + index"
        class="hidden sm:block"
        v-for="(page, index) in pages">

        <a
          href="#"
          class="btn"
          :class="{ 'btn-disabled': page == '...', 'btn-active': page == current_page }"
          @click.prevent="go(page)"
          v-text="page"></a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import IconArrow from '@/components/Icon/Arrow';

  export default {
    components: {
      IconArrow,
    },

    props: {
      total: {
        type: Number,
        required: true,
      },

      per_page: {
        type: Number,
        required: true,
      },

      current_page: {
        type: Number,
        required: true,
      },

      limit: {
        type: Number,
        default: 3,
      },

      margin: {
        type: Number,
        default: 1,
      },
    },

    computed: {
      last_page () {
        return Math.floor((this.total + (this.per_page - 1)) / this.per_page)
      },

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
        if (page == '...' || page < 1 || page > this.last_page) {
          return;
        }

        this.$emit('paginate', page);
      },
    },
  };
</script>

<style lang="postcss">
  .btn {
    @apply w-8 h-8 flex items-center justify-center bg-white mr-2 rounded text-black
  }

  .btn-disabled {
    @apply cursor-default bg-grey-lighter
  }

  .btn-active {
    @apply bg-blue-lightest text-blue-dark
  }
</style>
