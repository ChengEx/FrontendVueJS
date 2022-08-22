<script>
import { defineComponent, onMounted, reactive } from 'vue';
import { getPersonalOrder } from '../api';
import { useStore } from 'vuex';
export default defineComponent({
    setup(){
        const store = useStore();
        const personalOrderList = reactive({
            list:[{
                sellerId: {},
                buyerId: {},
                productId: {
                    _id:'',
                    name:'',    
                    productDetail:{
                        images:[],
                        price:0
                    }
                },
                status:'',
                createdAt: ''
            }]
        });
        onMounted(async()=> {
            await getPersonalOrder({
                userId: store.getters['user']?.studentObj?._id
            }).then(res => {
                console.log("personal order",res);
                personalOrderList.list = res?.data?.returnObj;
            })
        })

        function dateFormate(dateTime) {
            let date = new Date(dateTime);
            return date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
        } 

        return {
            personalOrderList, dateFormate
        }
    }
})
</script>
<template>
    <!-- <div>
        hi this is personal order page
    </div> -->
    <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row" >
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>個人訂單</h4>
                    </div>
                    <div v-for="(item, key) in personalOrderList.list" :key="key" class="d-flex flex-row justify-content-between align-items-center p-3 mt-4 px-3 rounded" style="background: #E0E0E0;" >                  
                        <div class="mr-1">               
                            <img class="rounded" :src="item.productId.productDetail.images[0]"  width="90"/>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">{{ item.productId.name }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">NT$ {{ item.productId.productDetail.price }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">{{ dateFormate(item.createdAt) }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <button style="border-radius: 5px;">
                                <router-link :to="{path:`/sellerChat/${item.productId._id}`, query:{status: false}}" style="text-decoration: none; color: inherit;">
                                    <h6 class="text-grey mt-2" style="width:100px;">與賣家確認</h6>
                                </router-link>    
                            </button>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h5 class="font-weight-bold">{{ item.status }}</h5>
                        </div>
                        <!-- <div>
                            <button style="border-radius: 5px;">
                                <router-link :to="`/sellerChat/${item._id}`" style="text-decoration: none; color: inherit;">
                                    <h6 class="text-grey mt-2" style="width:100px;">與賣家確認</h6>
                                </router-link>    
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
</template>



<style>

</style>