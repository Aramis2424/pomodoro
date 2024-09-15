<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  todo: JSON
})

const todos = ref([])

watch(() => props.todo, (doneTodo) => {
  todos.value.push(doneTodo)
})

</script>

<template>
    <header>
        Выполненные задачи:
    </header>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ ` ${todo.text}, ${todo.cost}` }}
    </li>
  </ul>
</template>

<style scoped>
ul {
    margin-top: 20px;
}

header {
    font-size: large;
    margin-bottom: 15px;
}

</style>
