<template>
  <div class="font-sans bg-grey-lightest min-h-screen text-black px-8 py-4" id="app">
    <header class="mb-4 flex flex-col sm:flex-row sm:items-center max-w-2xl mx-auto">
      <h1 class="font-thin mb-2 sm:mb-0">Payments</h1>

      <input class="rounded border-grey-light sm:ml-4 py-1 px-2 border-2" placeholder="Search data" v-model="search">
    </header>

    <main>
      <TablePaginated
        tag="section"
        class="max-w-2xl mx-auto"
        path="payments"
        :fields="fields"
        :search="search"
        />
    </main>
  </div>
</template>

<script>
  import TablePaginated from '@/components/Table/Paginated';

  export default {
    components: {
      TablePaginated,
    },

    data: () => ({
      search: '',
    }),

    computed: {
      fields () {
        return [
          {
            key: 'id',
            label: 'ID',
            width: '30%',
          },
          {
            key: 'name',
            label: 'NAME',
            width: '15%',
          },
          {
            key: 'description',
            label: 'DESCRIPTION',
            width: '35%',
          },
          {
            type: Date,
            key: 'date',
            width: '10%',
            label: 'DATE',
            sortable: true,
            searchable: false,
          },
          {
            key: 'amount',
            label: 'AMOUNT',
            width: '10%',
            sortable: true,
            type: Number,
          },
        ]
      },
    },
  };
</script>

<style lang="postcss">
  /**
  * This injects Tailwind's base styles, which is a combination of
  * Normalize.css and some additional base styles.
  *
  * You can see the styles here:
  * https://github.com/tailwindcss/tailwindcss/blob/master/css/preflight.css
  *
  * If using `postcss-import`, use this import instead:
  *
  * @import "tailwindcss/preflight";
  */
  @tailwind preflight;

  /**
  * This injects any component classes registered by plugins.
  *
  * If using `postcss-import`, use this import instead:
  *
  * @import "tailwindcss/components";
  */
  @tailwind components;

  /**
  * Here you would add any of your custom component classes; stuff that you'd
  * want loaded *before* the utilities so that the utilities could still
  * override them.
  *
  * Example:
  *
  * .btn { ... }
  * .form-input { ... }
  *
  * Or if using a preprocessor or `postcss-import`:
  *
  * @import "components/buttons";
  * @import "components/forms";
  */

  /**
  * This injects all of Tailwind's utility classes, generated based on your
  * config file.
  *
  * If using `postcss-import`, use this import instead:
  *
  * @import "tailwindcss/utilities";
  */
  @tailwind utilities;

  /**
  * Here you would add any custom utilities you need that don't come out of the
  * box with Tailwind.
  *
  * Example :
  *
  * .bg-pattern-graph-paper { ... }
  * .skew-45 { ... }
  *
  * Or if using a preprocessor or `postcss-import`:
  *
  * @import "utilities/background-patterns";
  * @import "utilities/skew-transforms";
  */

  a {
    text-decoration: none;
  }
</style>
