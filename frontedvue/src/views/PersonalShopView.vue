<script>
    import { defineComponent, ref } from "vue";
    import { useStore } from 'vuex';
    export default defineComponent({
        setup() {
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
        }
    })

</script>

<template>
    <div>
        <div class="row">
            <!-- <div class="row" style="text-align: right;">
                <div class="col-12">                
                    <router-link to="/personal/shop/editProduct">
                        <button class="btn btn-success" type="submit">新增商品 +</button>     
                    </router-link>               
                </div>
            </div> -->
        </div>
        <!-- <div class="row">
            <product v-for="item in group" /></product>
        </div> -->
        <div class="row route_box">
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </div>
        
</template>
<style>
    .route_box {
        margin-top: 50px;
    }   
</style>