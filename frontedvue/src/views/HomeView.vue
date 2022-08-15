<script>
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { getAllCategory, getAllAnnouncement } from '../api';
import Carousel from '../components/Carousel.vue';
export default defineComponent({
    name:'Home',
    components:{
        Carousel
    },
    setup() {
        const store = useStore();
        const announcementList = reactive({
            list:[
                {
                    title:'',
                    content:'',
                    createdBy:{
                        name:''
                    }
                }
            ]
        })
        onMounted(async() => {
            await getAllCategory().then(res => {
                sessionStorage.setItem('categoryList', JSON.stringify(res.data));
                store.dispatch('category',res?.data?.categoryObj);
            })
            await getAllAnnouncement().then(res => {
                announcementList.list = res?.data?.returnObj;
            })
        })
        
        store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));

        return {
            announcementList
        }
    }

})
</script>
<template>
    <Carousel/>
    <div class="container">  
        <div class="row mt-3">
            <h1>平台公告</h1>
            <ul>
                <li v-for="(item, key) in announcementList.list">
                    {{item.title}}
                </li>
            </ul>
        </div>
    </div>
    
</template>


<style>

</style>
