<script>
    import { deleteProductById } from '../api';
    export default{
        props: {
           product: {
               type: Object
           }
        },
        methods: {
            async deleteProduct(id) {
                // await deleteProductById({
                //     _id: id,
                //     userId: this.$store.getters['user'].studentObj._id
                // }).then(res => {
                //     console.log("delete",res);
                //     alert("成功刪除");
                // })
            }
        }
    }
  
</script>
<template>
    <div class="card col-3" style=" border: none">
        <div class="each_card">
            <router-link :to="`/product/${product._id}`" style="text-decoration: none; color: inherit;">
                <img class="card-img-top mt-1 pCard_img" :src="product?.productDetail?.images[0]">
                <div class="card-body pb-0">
                    <div class="row pt-3">
                    <h6 class="col-auto me-auto p-0">{{product.name}}</h6>
                    <h6 class="col-auto p-0">NT$ {{product?.productDetail?.price}}</h6>
                    </div>      
                </div>
            </router-link> 
        </div>
        
    </div>
</template>


<style>
.each_card{
    border:2px  solid gray;
    border-radius: 5px;
    padding: 2px; 
    margin:10px
}
.edit_delete_btn {       
    height: 30px;  
    width:30px;
    margin-left: 3px;
    flex-direction: column;
    justify-content: center;
    border-color: transparent;
    background-color: transparent;
}

.pCard_img {
    float: left;
    width: 100%;
    height: 280px;
    object-fit: cover;
}

</style>