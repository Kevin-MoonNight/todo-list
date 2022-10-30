<template>
    <div class="w-full h-full max-w-4xl min-h-screen p-16 space-y-6 bg-white">
        <div class="font-sans antialiased leading-normal tracking-wider text-left text-gray-900">
            <h1 class="px-4 py-2 mx-auto text-4xl font-bold tracking-widest">
                TodoList
            </h1>

            <div class="mt-16">
                <div>
                    <label for="todo" class="block mb-2 font-medium text-gray-900 text-md">
                        Todo
                    </label>
                    <textarea v-model="describe" id="todo" rows="4"
                        class="block p-2.5 w-full text-sm border-black border-2" placeholder="Your todo...">
                    </textarea>
                </div>

                <div class="flex justify-end mt-4">
                    <button v-on:click="create"
                        class="px-4 py-2 text-xl font-semibold transition-all hover:bg-black hover:text-white">
                        新增
                    </button>
                </div>
            </div>

            <div v-if="loading" class="mt-8 space-y-8">
                <ContentLoader></ContentLoader>
                <ContentLoader></ContentLoader>
                <ContentLoader></ContentLoader>
            </div>
            <div v-else class="mt-8">
                <ul v-for="todo in todos" class="mt-8 space-y-8 font-normal">
                    <hr />
                    <TodoListItem :key="todo.id" :todo="todo" :getTodos="getTodos" />
                </ul>
                <p v-if="todos.length === 0" class="p-4 text-xl font-semibold text-center text-red-500">
                    尚無資料
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import TodoListItem from './TodoListItem.vue';
import { ContentLoader } from 'vue-content-loader'

export default {
    components: {
        TodoListItem,
        ContentLoader
    },
    setup() {
        const url = import.meta.env.VITE_API_URL;
        const todos = ref([]);
        const describe = ref("");
        const loading = ref(true);

        const getTodos = () => {
            loading.value = true;

            fetch(url, {
                method: 'GET'
            }).then(response => {
                return response.json()
            }).then(res => {
                todos.value = res;
                loading.value = false;
            }).catch(error => {
                console.log(error);
            })
        }

        const create = () => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ describe: describe.value })
            }).then(response => {
                describe.value = ""
                getTodos()
            }).catch(error => {
                console.log(error);
            })
        };

        getTodos();

        return {
            todos,
            describe,
            loading,
            getTodos,
            create
        };
    }
}
</script>