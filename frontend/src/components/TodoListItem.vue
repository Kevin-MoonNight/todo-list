<template>
    <div class="font-sans antialiased leading-normal tracking-wider text-left text-gray-900">
        <div class="px-6 py-4">
            <p class="block mb-2 font-medium text-gray-900 text-md">
                {{ date }}
            </p>

            <div v-if="modify">
                <textarea v-model="newDescribe" rows="8" class="block p-2.5 w-full text-md border-black border-2"
                    placeholder="Your todo...">
                </textarea>

                <div class="flex justify-end mt-4">
                    <button v-on:click="update"
                        class="px-2 py-2 text-sm font-semibold transition-all hover:bg-black hover:text-white">
                        提交
                    </button>
                    <button v-on:click="modify = false"
                        class="px-2 py-2 text-sm font-semibold transition-all hover:bg-black hover:text-white">
                        取消
                    </button>
                </div>
            </div>
            <div v-else class="">
                <p class="mt-4 font-medium text-md">
                    {{ todo.describe }}
                </p>

                <div class="flex items-center justify-end mt-4">
                    <button v-on:click="modify = true"
                        class="px-2 py-2 text-sm font-semibold transition-all hover:bg-black hover:text-white">
                        修改
                    </button>
                    <button v-on:click="destory"
                        class="px-2 py-2 text-sm font-semibold transition-all hover:bg-black hover:text-white">
                        刪除
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import { format, parseISO } from 'date-fns';

export default {
    props: {
        todo: {
            type: Object
        },
        getTodos: {
            type: Function
        }
    },
    setup(props) {
        const url = import.meta.env.VITE_API_URL;
        const { todo, getTodos } = props;
        const date = ref(format(parseISO(todo.createdAt), 'PPP'));
        const modify = ref(false);
        const newDescribe = ref(todo.describe);

        const update = () => {
            fetch(url + todo.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    describe: newDescribe.value
                })
            }).then(res => {
                getTodos();
                console.log('updated!');
            })
        };

        const destory = () => {
            fetch(url + todo.id, {
                method: 'DELETE'
            }).then(res => {
                getTodos();
                console.log('deleted!');
            })
        };

        return {
            todo,
            date,
            modify,
            newDescribe,
            update,
            destory
        };
    }
}
</script>