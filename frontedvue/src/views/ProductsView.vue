<script>
    import { defineComponent, onMounted, reactive, ref } from "vue";
    import { useRoute } from "vue-router";
    import { useStore } from 'vuex';
    import { getProductListByCategory, getProductListBySubCategory } from '../api';
    // import SideBarViewVue from "./SideBarView.vue";
    import ProductCard from "../components/ProductCard.vue";
    export default defineComponent({
        setup() {
            const route = useRoute();
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
            const productList = reactive({
                list:[]
            })
            const mainPath = ref();
            const secondPath = ref();

            onMounted(async ()=> {

                const splitPath = route.path.split('/');
                if(splitPath.length === 2) {
                    mainPath.value = splitPath[1];
                    await getProductListByCategory(
                        { category: route.params.category }
                    ).then(res=> {
                        console.log("test",res);
                        productList.list = res?.data?.returnObjList;
                        
                    })
                }
                else if(splitPath.length === 3) {
                    mainPath.value = splitPath[1];
                    secondPath.value = splitPath[2];
                    console.log("cate", mainPath.value);
                    console.log("type", route.params.type);
                    await getProductListBySubCategory(
                        {   
                            category: mainPath.value, 
                            subcategory: route.params.type 
                        }
                    ).then(res => {
                        console.log("res",res);
                        productList.list = res?.data?.returnObjList;
                    })
                }
               
                
            })
            return {
                productList
            }
        },
        components: {
            ProductCard
        }
    })
</script>
<template>
    <div class="row" style="margin-left: 50px;">
        <ProductCard v-for="(proudct, key) in productList.list" :product="proudct"></ProductCard>
    </div>
</template>



<style>
.tetete {
    height: 1200px;
    background-color: red;
}
</style>