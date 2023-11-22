<template>
  <div class="flex justify-center relative">
    <button type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 ">{{this.title}}</button>
  </div>
</template>
  
<script>
export default {
  name: "mainButton",

  data: () => ({

  }),
  props:{
    title: String,
  }
};
</script>
  