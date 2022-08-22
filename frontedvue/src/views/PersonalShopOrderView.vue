<script>
    import { defineComponent, onMounted, reactive } from 'vue';
    import { useStore } from 'vuex';
    import { getShopOrder, updateOrderStatus } from '../api';

    export default defineComponent({
        setup() {
            const store = useStore();
            const shopOrderList = reactive({
                getOrderList:[{
                    _id:'',
                    sellerId: {},
                    buyerId: {
                        name:''
                    },
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
                await getShopOrder({
                    userId: store.getters['user']?.studentObj?._id
                }).then(res=> {
                    console.log("list123",res);
                    shopOrderList.getOrderList = res?.data?.returnObj;
                })
            });

            // watch(() => props.currentChatRoom , (newVal, oldVal) => {
            //   if (newVal !== oldVal) {
            //     console.log("newVal", newVal);
            //     chat.chatItem = newVal;
            //   }
            // });

            async function changeStatus(id, newStatus){
                await updateOrderStatus({
                    orderId: id,
                    status: newStatus
                }).then(res => {

                })
            }

            return {
                shopOrderList, changeStatus
            }
        }
    })
</script>
<template>
       <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row" >
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>商城訂單</h4>
                    </div>
                    <div v-for="(item, key) in shopOrderList.getOrderList" :key="key" class="d-flex flex-row justify-content-between align-items-center p-3 mt-4 px-3 rounded" style="background: #E0E0E0;" >                  
                        <div class="mr-1">
                            <router-link :to="`/product/${item._id}`" style="text-decoration: none; color: inherit;">
                                <img class="rounded" :src="item.productId.productDetail.images[0]"  width="90"/>
                            </router-link> 
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">{{ item.productId.name }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">NT${{ item.productId.productDetail.price }}</h6>
                        </div>
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h6 class="font-weight-bold">買家: {{ item.buyerId.name }}</h6>
                        </div>
                        <div >
                            <select v-model="item.status" @change="changeStatus(item._id, item.status)">
                                <option value="處理中">處理中</option>
                                <option value="交易完成">交易完成</option>
                            </select>   
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
</template>