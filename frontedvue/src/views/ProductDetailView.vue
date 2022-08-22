<script>
import { computed, defineComponent, onMounted, reactive, ref  } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductById, addCollection, getPersonalInformation, deleteCollection, addChatRoom } from '../api';
import { useStore } from 'vuex';

    export default defineComponent({
        setup() {
            const route = useRoute();
            const router = useRouter();
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
            const student = reactive({
                _id:'',
                name:'',
                collectionProductId: []
            });
            const studentId = store.getters['user']?.studentObj?._id;
            const student_id = ref({});
            student_id.value = store.getters['user']?.studentObj?._id;
            const product = reactive({
                getProduct:{
                    _id: '',
                    name: '',
                    category: '',
                    subcategory: '',
                    createdAt: '',
                    productDetail: {         
                        images: [],
                        description: '',
                        price: 0,
                        status: '',
                    },
                    // product creator
                    createdBy:{
                        _id: '',
                        name: '',
                        gender: '',
                        photo: '',
                        phone: '',
                        email: ''
                    }
                }
            });
            onMounted(async()=> {
                await getProductById({ 
                    _id: route.params.id 
                }).then(res => {
                    console.log('createdby',res)
                    product.getProduct = res?.data?.productObj;
                })

                await getPersonalInformation({
                     _id: store.getters['user']?.studentObj?._id  
                }).then(res => {
                    student.collectionProductId = res?.data?.studentObj?.collectionProductId;
                    console.log(student.collectionProductId);
                })

            });
            async function addCollectionSubmit() {
               
                if(store.getters['user']?.studentObj?._id === undefined) {
                    alert('請先登入會員');
                }else{
                    await addCollection({
                        productId: route.params.id,
                        userId: store.getters['user']?.studentObj?._id
                    }).then(res => {
                        console.log(res);
                    })
                    await getPersonalInformation({
                        _id: store.getters['user']?.studentObj?._id  
                    }).then(res => {
                        student.collectionProductId = res?.data?.studentObj?.collectionProductId;
                        console.log(student.collectionProductId);
                    })
                }
               
            };
            async function deleteCollectionSubmit() {
                if(store.getters['user']?.studentObj?._id === undefined) {
                    alert('請先登入會員');
                }else{
                    await deleteCollection({
                        productId: route.params.id,
                        userId: store.getters['user']?.studentObj?._id
                    }).then(res => {
                        console.log(res);
                    })
                    await getPersonalInformation({
                        _id: store.getters['user']?.studentObj?._id  
                    }).then(res => {
                        student.collectionProductId = res?.data?.studentObj?.collectionProductId;
                        console.log(student.collectionProductId);
                    })
                }
                
            };
            async function gotoChatRoom() {
                await addChatRoom({
                    user1Id: store.getters['user']?.studentObj?._id,
                    user2Id: product.getProduct.createdBy._id,
                    productId: product.getProduct._id
                }).then(res=> {
                    console.log("res is here",res?.data?.returnObj);
                    router.push({ path:`/sellerChat/${res?.data?.returnObj.productId}`, query:{status: true}});
                })

            }

            const createdDateFormate = computed(() => {
                let date = new Date(product.getProduct.createdAt);
                return date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
            })
            const collectionButtonCheck = computed(() => {
                if(student.collectionProductId.find(item => item == route.params.id) !== undefined) return true;             
            })

            return {
                studentId, product, createdDateFormate, addCollectionSubmit, collectionButtonCheck, deleteCollectionSubmit, gotoChatRoom, student_id
            }
        }
    })
</script>
<template> 
    <div class="producrDetail_Page">
        <div class="container">
            <div class="row">
                <div class="col-7">
                    <div style="margin-top: 20px;">
                        <img class="product_img" :src="product.getProduct.productDetail.images[0]" />
                    </div>
                    
                </div>
                <div class="col-5">
                    <div class="right_product_description" style="text-align: left; margin-top: 20px;">
                        <div class="row">
                            <h1 style="font-size: 60px;">{{ product.getProduct.name }}</h1>
                        </div>
                        <div class="row">
                            <div class="category_price">
                                <span style="font-size: 30px;">{{ product.getProduct.category }}-{{ product.getProduct.subcategory }}</span>                             
                            </div>

                        </div>
                        <div class="row" style="text-align: right;">
                            <span style="font-size: 30px;">NT$: {{ product.getProduct.productDetail.price }}</span>
                        </div>
                        <div class="row" style="display: flex;">
                            <div class="col-7">
                                <div class="row">
                                    <span>狀態: {{ product.getProduct.productDetail.status }}</span>
                                </div>
                                <div class="row">
                                    <span>建立時間: {{ createdDateFormate }}</span>
                                </div>
                            </div>
                            <div v-if="studentId !== undefined"  class="col-5" style="text-align: right; margin-top:10px;">
                                <div v-if="collectionButtonCheck" >
                                    <button class="favorite_btn" @click="deleteCollectionSubmit()">
                                        <img style="width:30px;" src="../assets/img/withHeart.png" />
                                        <span style="font-size: 20px;">刪除購物車</span>
                                    </button>                           
                                </div>
                                <div v-else >
                                    <button v-if="product.getProduct.createdBy._id !== student_id" class="favorite_btn" @click="addCollectionSubmit()">
                                        <img style="width:30px;" src="../assets/img/withoutHeart.png" />
                                        <span style="font-size: 20px;">加入購物車</span>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        
                        <hr class="hrhr mt-1">
                        <div class="row">
                            <span>敘述: {{ product.getProduct.productDetail.description }}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="row"  style="padding: 20px 200px; ">
                <div class="created_user">
                    <div class="row">
                        <div class="col-7">
                            <div class="row">
                                <div class="col-4">
                                    <div v-if="product.getProduct.createdBy.photo == null">
                                        <div v-if="product.getProduct.createdBy.gender == '男'">
                                            <img class="createdBy_img" src="../assets/img/boy.png" alt="Avatar"/>
                                        </div>
                                        <div v-if="product.getProduct.createdBy.gender == '女'">
                                            <img class="createdBy_img" src="../assets/img/woman.png" alt="Avatar"/>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            <img class="createdBy_img" :src="product.getProduct.createdBy.photo"/>
                                        </div>
                                    </div>
                                    <!-- <img class="createdBy_img" :src="product.getProduct.createdBy.photo"/> -->
                                </div>
                                <div class="col-8">
                                    <div class="row" style="text-align:left;">
                                        <h3>
                                            {{ product.getProduct.createdBy.name }}
                                        </h3> 
                                    </div>
                                    <div class="row" style="display: flex; margin-top: 20px;">                                      
                                        <button v-if="product.getProduct.createdBy._id !== student_id" class="detail_btn" @click="gotoChatRoom">私訊賣家</button>                                                                
                                        <router-link style="width:140px" :to="`/seller/${product.getProduct.createdBy._id}`">
                                            <button class="detail_btn" style="margin-left: 5px;">查看賣家商場</button>
                                        </router-link>
                                    </div>                        
                                </div>
                            </div>                       
                        </div>
                        <div class="col-5" style="text-align: left;">
                            <div class="row" style="margin-top: 10px;">
                                <h5>
                                    信箱: {{ product.getProduct.createdBy.email }}
                                </h5>                          
                            </div>
                            <div class="row" style="margin-top: 20px;">
                                <h5>
                                    手機: {{ product.getProduct.createdBy.phone }}
                                </h5>                          
                            </div>
                        </div>           
                    </div>
                    
                </div>    
            </div>
            <div class="row" style="margin-bottom: 50px;">
                <div v-for="(item, key) in product.getProduct.productDetail?.images" :key="key">
                    <img style="margin-top: 20px;" :src="item"/>
                </div>
            </div>

        </div>
            
    </div>
</template>



<style>
.producrDetail_Page{
    position: fixed;
    top: 100px;
    bottom:0;
    width: 100%;
    overflow-y:scroll;
    overflow-x:hidden;
}
.right_product_description {
    padding: 20px;
}
.category_price {
    display: flex;
}
.product_img{
    width: 100%;
}
.createdBy_img {
    height: 90px;
    width: 90px;
    border: 3px solid #555;
    border-color: black;
    border-radius: 50%;
}
.favorite_btn {
    padding:3px; 
    border-radius: 5px; 
    border: 2px solid red;
}
.created_user {
    border: 2px solid gray;
    padding: 20px;
    border-radius: 10px;
}
.detail_btn {
    width: 140px;
    border-radius: 5px;
    background-color: white;
}
.detail_btn:hover {
    background-color: rgb(196, 196, 196);
}

</style>