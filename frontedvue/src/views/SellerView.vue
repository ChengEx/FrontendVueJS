<script>
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getProductListByUserId } from '../api';
import ProductCard from "../components/ProductCard.vue";

export default defineComponent({
    setup() {
        const route = useRoute();
        const student = reactive({
                getInformation:{
                    _id: '',
                    name: '',
                    email: '',
                    gender: '',
                    phone: '',
                    photo: '',
                    description: '',
                    createdAt: '',
                    productId:[
                        {
                            _id: '',
                            name: '',
                            productDetail:{
                                images: '',
                                price: 0
                            }                         
                        }
                    ] 
                }
            });
        onMounted(async()=>{
            await getProductListByUserId({
                _id: route.params.id
            }).then(res => {
                console.log(res);
                student.getInformation = res?.data?.getProductList;
            })
        })

        return {
            student
        }
    },
    components: {
        ProductCard
    }
})
</script>
<template>
    <div id="sellerPage">
        <div id="sellerTop">
            <div class="container">
                <div class="row">
                    <div class="col-4" style="margin-bottom: 50px;">
                        <div v-if="student.getInformation.photo == null" style="text-align: right;">
                            <div v-if="student.getInformation.gender == '男'"  style="padding-top: 50px;">
                                <img class="side_img" src="../assets/img/boy.png" alt="Avatar"/>
                            </div>
                            <div v-if="student.getInformation.gender == '女'"  style="padding-top: 50px;">
                                <img class="side_img" src="../assets/img/woman.png" alt="Avatar"/>
                            </div>
                        </div>
                        <div v-else>
                            <div style="padding-top: 50px; text-align: right;">
                                <img class="side_img" :src="student.getInformation.photo"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="row" style="text-align: left; padding-top: 60px; margin-left: 50px; display:flex;line-height:65px;" >                          
                            <h1 style="width: fit-content;">{{ student.getInformation.name }}</h1>                               
                            <span style="width: fit-content; vertical-align: bottom;">/{{ student.getInformation.gender }}</span>
                        </div>
                        <div class="row seller_field">
                            <div class="col-5" style="text-align: left; display: flex;">
                                <img style="width:30px; margin-right: 20px;" src="../assets/img/email.png"/>
                                <h5>{{ student.getInformation.email }}</h5>
                            </div>
                            <div class="col-5" style=" display: flex;">
                                <img style="width:30px; margin-right: 20px;" src="../assets/img/telephone-call.png"/>
                                <h5>{{ student.getInformation.phone }}</h5>
                            </div>
                        </div>
                        <div class="row seller_field">
                            <div class="col-9" style=" display: flex; ">
                                <img style="width:30px; margin-right: 20px;" src="../assets/img/description.png"/>
                                <h5>{{ student.getInformation.description }}</h5>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="container">
            <div class="row">
                <ProductCard v-for="(proudct, key) in student.getInformation.productId" :product="proudct"></ProductCard>
            </div>
        </div>
    </div>
</template>




<style>
    #sellerPage {
        padding-top: 100px;
    }
    #sellerTop {
        width:100%;
        height: auto;
        background-color: gainsboro;
    }
    .seller_field {
        margin-left: 50px; 
        margin-top: 20px;
    }
    .seller_field h5 {
        margin-bottom: 0px;
        margin-top: 3px;
    }
</style>