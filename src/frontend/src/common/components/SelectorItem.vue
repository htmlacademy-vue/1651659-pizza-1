<template>
  <span :class="`filling filling--${itemValue}`">
    {{ itemName }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    itemValue: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
  },
};
</script>
