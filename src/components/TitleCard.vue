<template>
  <div class="text-5xl mb-5 mt-10 font-bold">
    {{ this.title }}
  </div>
</template>

<script>
export default {
  name: "TitleCard",

  data: () => ({


  }),
  props: {
    title: String
  }
};
</script>
