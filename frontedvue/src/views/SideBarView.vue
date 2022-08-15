<script>
    import { defineComponent, reactive, onMounted, watch, ref } from "vue"
    import { useRoute } from "vue-router";

    import { useStore } from "vuex";


    export default defineComponent({
        setup() {
            const route = useRoute();
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
            store.dispatch('category', JSON.parse(sessionStorage.getItem('categoryList')));
            const categoryList = reactive({
                list:[{
                    categoryName:'',
                    categoryNameEN:'',
                    subCategory:[]
                }]
            })
            const subCategory = reactive({   
                categoryNameEN:'', 
                list:[
                    {
                        subCategoryName:'',
                        subCategoryNameEN:''
                    }
                ]
            });
            const mainPath = ref();
            const secondPath = ref();
            onMounted(async ()=> {  
                const splitPath = route.path.split('/');
                if(splitPath.length === 2) {
                    mainPath.value = splitPath[1];
                }
                else if(splitPath.length === 3) {
                    mainPath.value = splitPath[1];
                    secondPath.value = splitPath[2];
                }
                categoryList.list = store.getters['category'].categoryObj;
                console.log('categoryList.list', categoryList.list);
                categoryList.list.forEach(element => {
                    if(mainPath.value === element.categoryNameEN){
                        subCategory.categoryNameEN = element.categoryNameEN;
                        subCategory.list = element.subCategory;                          
                    }
                })
            })

            
            return {
                categoryList, mainPath, subCategory
            }
        }
    })
</script>
<template>
    <div id="personalPage">
        <div id="leftBar">
            <ul class="personalSideBar">
                <li v-for="(item, key) in subCategory.list" :key="key">
                    <router-link class="nav-link" aria-current="page" :to="`/${mainPath}/${item.subCategoryNameEN}`"> 
                        {{ item.subCategoryName }}
                    </router-link>
                </li>
            </ul>
        </div>
        <div id="rightPage">
            <router-view :key="$route.fullPath"></router-view>        
        </div>
    </div>
</template>

<style>
#rightPage {
    margin-left: 350px;
    margin-top: 50px;
    padding: 50px;
    width:100%;
}
.sidebar_btn {
    width: 100%;
    padding: 5px;
    font-size: 20px;
    border-radius: 10px;
    border: none;
}
.sidebar_btn:hover {
    background-color: gray;
    opacity: 0.5;
}

</style>