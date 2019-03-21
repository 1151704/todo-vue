<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
    <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">Active</button>
    <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">Completed</button>
  </div>
</template>
<script>
export default {
  name: "todo-filtered",
  data() {
    return {
      filter: "all"
    };
  },
  methods: {
    changeFilter(newFilter) {
      this.filter = newFilter;
      eventBus.$emit("filterChange", this.filter);
    }
  }
};
</script>
