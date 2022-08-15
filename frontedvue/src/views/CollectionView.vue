<script>
import { defineComponent, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { getCollectionById, deleteCollection } from "../api";

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const collectionList = reactive({
            getCollectionList:[
                {
                    _id: '',
                    name: '',
                    category: '',
                    subcategory: '',
                    productDetail: {
                        images: '',
                        price: 0
                    }
                }
            ]
        })
        onMounted(async() =>{  
            await getCollectionById({
                userId: store.getters['user']?.studentObj?._id
            }).then(res => {
                console.log(res);
                collectionList.getCollectionList = res?.data?.returnObj?.collectionProductId;
                
            })
        });
        async function deleteProduct(id) {
            await deleteCollection({
                productId: id,
                userId: store.getters['user']?.studentObj?._id
            }).then(res => {
                console.log(res);
                collectionList.getCollectionList = res?.data?.returnObj?.collectionProductId;
                alert('刪除成功');
            })
        };
        async function gotoChatMessage(id) {
            router.push()
        }

        const collectionTotalPrice = computed(() => {
            let totalPrice = 0;
            collectionList.getCollectionList.forEach((item) => {
                totalPrice += item.productDetail.price;
            })
            return totalPrice;
        })

        return {
            collectionList, deleteProduct, collectionTotalPrice, gotoChatMessage
        }
    }
})
</script>
<template>
    <div id="collectionPage">
       <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row" >
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>購物車</h4>
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
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold" style="width:100px">NT$ {{ item.productDetail.price }}</h6>
                        </div>
                        <div>
                            <button style="border-radius: 5px;">
                                <router-link :to="`/chatMessage`" style="text-decoration: none; color: inherit;">
                                    <h6 class="text-grey mt-2" style="width:100px;">與賣家確認</h6>
                                </router-link>    
                            </button>
                        </div>
                        <div class="d-flex align-items-center">
                            <button class="edit_delete_btn" @click="deleteProduct(item._id)">
                                <img style="width:30px" src="../assets/img/bin.png">
                            </button>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 mt-4 px-3 rounded">
                        <h5 class="font-weight-bold">總金額: NT$ {{ collectionTotalPrice }}</h5>
                    </div>
                    <!-- <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">下訂單</button></div> -->
                </div>
            </div>
        </div>
    </div>    
</template>



<style>
#collectionPage {
    padding-top: 100px;
}
</style>