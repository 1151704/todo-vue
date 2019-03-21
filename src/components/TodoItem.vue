<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div
        class="todo-item-label"
        :class="{ completed : completed }"
        v-if="!editing"
        @dblclick="editTodo"
      >{{title}}</div>
      <input
        class="todo-item-edit"
        type="text"
        v-else
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-model="title"
        v-focus
      >
    </div>
    <div class="main-center">
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    ckeckAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  created() {
    eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    eventBus.$off("pluralize", this.handlePluralize);
  },
  watch: {
    ckeckAll: function(val) {
      this.completed = val ? true : this.todo.completed;
    }
  },
  methods: {
    removeTodo() {
      eventBus.$emit("removedTodo", this.id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim().length == 0) {
        this.title = this.beforeEditCache;
        return;
      }
      this.editing = false;
      this.finishedEdit();
    },
    finishedEdit() {
      eventBus.$emit("finishedEdit", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      this.finishedEdit();
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

