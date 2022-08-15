<script>
    import { defineComponent, onMounted, reactive } from 'vue';

    export default defineComponent({
        setup() {
            const shopOrderList = reactive({});
            onMounted(async()=> {
                
            })
        }
    })
</script>
<template>
    <div id="collectionPage">
       <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row" >
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>商城訂單</h4>
                    </div>
                    <div v-for="(item, key) in collectionList.getCollectionList" :key="key" class="d-flex flex-row justify-content-between align-items-center p-3 mt-4 px-3 rounded" style="background: #E0E0E0;" >                  
                        <div class="mr-1">
                            <router-link :to="`/product/${item._id}`" style="text-decoration: none; color: inherit;">
                                <img class="rounded" :src="item.productDetail.images[0]"  width="90"/>
                            </router-link> 
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">{{ item.name }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">{{ item.category }}-{{ item.subcategory }}</h6>
                        </div>            
                        <div>
                            <h6 class="text-grey mt-1" style="width:100px">NT$ {{ item.productDetail.price }}</h6>
                        </div>
                        <!-- <div class="d-flex align-items-center">
                            <button class="edit_delete_btn" @click="deleteProduct(item._id)">
                                <img style="width:30px" src="../assets/img/bin.png">
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>