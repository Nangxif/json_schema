<template>
  <div class="Ass"></div>
</template>
<script>
export default {
  name: "Ass",
  data() {
    return {
      b: { b: [String("ccc")] }
    };
  },
  mounted() {
    this.$emit("aa", {
      ...this.b
    });
  }
};
</script>
