# Brite Challenge

## Approach

I did the Fetch / Update components based in how Apollo works. so you have a component to Fetch the json, another to Update and the Table do display that data.

To style the components I used Tailwindcss, which is a incredible powerfull and simple utility-first framwork. He allows me to create beautifull and consistent components. (I do work with SCSS too, whenever is needed).

## Follow-up Questions

#### How long did you spend on the test? Would you do anything differently if you had more time?

About 12 hours.

Yes, I would refact Fetch Json entirely to make possible to paginate / filter in backend and add more tests.

#### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

You can use custom components to display the data row (e.g Field/Edit.vue and Field/Price.vue), that turns possible to display whatever data you want (object, json) as you want.
You can have a custom component to represent the data states too (loading, error and empty). In this case, I only implemented the empty state, whenever a search doesn't find any result.

The pagination is a separated component too so you can reuse.


#### What is one CSS property that you recently learned about that helped you solve a problem?

`fill: currentColor`

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test:unit
```
