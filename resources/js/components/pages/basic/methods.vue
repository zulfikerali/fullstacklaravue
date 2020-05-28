<template>
    <div>
        <h3> The number is: {{views}}</h3>
        <button @click="updateCounter(1)">Increase</button>
        <button @click="updateCounter(-1)">Decrease</button>
        <hr>
        <div v-for="(blog,i) in blogs" :key="i" v-if="blogs.length">
            <h1>{{blog.title}}</h1>
            <p>{{blog.post}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            views:0,
            blogs:[]
        }
    },
    methods:{
        updateCounter(number){
            this.views += number
        }
    },
    created(){
        this.views = 50
        let posts = [
             {
                    title:'This is Title 1',
                    post : 'This is Post 1',
                    id : 1,
                },{
                    title:'This is Title 2',
                    post : 'This is Post 2',
                    id : 2,
                },{
                    title:'This is Title 3',
                    post : 'This is Post 3',
                    id : 3,
                },{
                    title:'This is Title 4',
                    post : 'This is Post 5',
                    id : 4,
                },{
                    title:'This is Title 5',
                    post : 'This is Post 5',
                    id : 5,
                }
        ]

        this.blogs = posts
    }
}
</script>
