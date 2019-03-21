<template>
  <button v-if="show" @click="clearCompleted">Clear Completed</button>
</template>
<script>
export default {
  name: "todo-clear",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      eventBus.$emit("clearCompleted");
    }
  }
};
</script>
