<template>
	<main class="flex justify-center bg-gray-50">
		<TodoList />
	</main>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
	components: {
		TodoList
	},
	setup() {
		return {
		}
	}
}
</script>