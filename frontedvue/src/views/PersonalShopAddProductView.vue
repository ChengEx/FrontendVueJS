<script>
    import { defineComponent, onMounted, reactive, ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { getAllCategory, addProduct } from '../api';
    export default defineComponent({
        setup() {
            const router = useRouter();
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
            let addProductObj = reactive({
                _id: store.getters['user']?.studentObj?._id,
                name:'',
                category:'',
                categoryEN:'',
                subcategory:'',
                subcategoryEN:'',
                price: 0,
                description:'',
                status:'',
                photo:[]
            });

            const categoryList = reactive({
                list:[{
                    categoryName: '',
                    categoryNameEN: '',
                    subCategory:[]
                }]
            });
            const subCategoryList = reactive({
                list:[{
                    subCategoryName:'',
                    subCategoryNameEN: ''
                }]
            });
            const statusList = reactive({
                list:[
                    { statusItem: '全新' },
                    { statusItem: '九成新' },
                    { statusItem: '可正常使用' }
                ]
            });

            let picc= [];
            let imageFile = ref('');
            let imageUrl = reactive({
                photo:''
            })

            let imgArray = reactive([]);

            // function handleImageSelected(event: any) {
            //     if (event.target.files.length === 0) {
            //         imageFile.value = '';
            //         imageUrl.photo = '';
            //         return;
            //     }
            //     imageFile.value = event.target.files[0];
            // }

            function onfile(event){
                console.log("event", event);
                let file = event.target.files[0]
                let filereader = new FileReader();
                filereader.readAsDataURL(file)
                
                filereader.addEventListener("load",() => {
                    imageUrl.photo = filereader.result;
                    
                    if(imgArray.length === 9) {
                        alert("最多新增9張圖片");
                    }else{
                        //reactive add img
                        imgArray.push(filereader.result);
                    }              
                    console.log("imgArray", imgArray);
                })
            }

            watch(() => addProductObj.category, (val, old) =>{
                console.log("old", val);
                categoryList.list.forEach(element => {                 
                    if(val === element.categoryName){
                        subCategoryList.list = element.subCategory
                    }
                }, {
                    immediate: true
                })
            });
            onMounted(async()=> {
                await getAllCategory().then(res=> {
                    categoryList.list = res?.data?.categoryObj;     
                })
            })
            async function addProductSubmit() {
                addProductObj.photo = imgArray;
                await addProduct({
                    _id: addProductObj._id,
                    name: addProductObj.name,
                    category: addProductObj.category,
                    subcategory: addProductObj.subcategory,
                    images: addProductObj.photo,
                    description: addProductObj.description,
                    price: addProductObj.price,
                    status: addProductObj.status
                }).then(res => {
                    console.log("success",res);
                    alert("新增成功");
                })

                router.push('/personal/shop');
            }
            function cancel() {
                router.push('/personal/shop');
            }

            function deletePhoto(key) {
                console.log("key", key);
                imgArray.splice(imgArray.indexOf(key),1);
                console.log("delete imgArray",imgArray);
            }
            
            return {
                addProductObj, addProductSubmit, categoryList, cancel, subCategoryList, statusList, picc, onfile, deletePhoto, imgArray
            }
        }
    })
</script>
<template>
    <form id="add_Product_form" @submit.prevent="addProductSubmit" method="post">
        <div class="pic" style="padding-left: 0px;">
            <div class="addProduct_left">

                <div style="text-align: left;">
                    <span style="margin-right: 50px;">商品圖片:</span>
                    <input name="file_input" type="file" @change.prevent="onfile">
                </div>
                <div class="mutiple_pic_box">                       
                    <div v-for="(image, key) in imgArray" class="img_box">
                        <img class="mutiple_pic" :src="image" />
                        <button class="multiple_btn" @click.prevent="deletePhoto(image)">
                            <img class="multiple_btn_icon" src="../assets/img/close.png" />
                        </button>
                    </div>              
                </div>
                
            </div>
            <div class="addProduct_right">
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>商品名稱:</span>
                    </div>
                    <div class="col-8">
                        <input class="field_class" name="name" type="text" v-model="addProductObj.name" />
                    </div>   
                </div>
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>分類:</span>
                    </div>
                    <div class="col-8">
                        <select class="form-select form-select-sm field_class" aria-label="Default select example" v-model="addProductObj.category">
                            <option v-for="item in categoryList.list" :value="item.categoryName">
                                {{ item.categoryName }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>子分類:</span>
                    </div>
                    <div class="col-8">
                        <select class="form-select form-select-sm field_class" aria-label="Default select example" v-model="addProductObj.subcategory">
                            <option v-for="item in subCategoryList.list" :value="item.subCategoryName">
                                {{ item.subCategoryName }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>售價:</span>
                    </div>
                    <div class="col-8">
                        <input class="field_class" name="price" type="text" v-model="addProductObj.price" />
                    </div>
                </div>
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>商品狀態:</span>
                    </div>
                    <div class="col-8">
                        <select class="form-select form-select-sm field_class" aria-label="Default select example" v-model="addProductObj.status">
                            <option v-for="item in statusList.list" :value="item.statusItem">
                                {{ item.statusItem }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row each_col">
                    <div class="col-3 font_span">
                        <span>敘述:</span>
                    </div>
                    <div class="col-8">
                        <textarea name="mytext"
                            style="margin-top: 10px; padding:5px"
                            v-model="addProductObj.description"
                            required>
                        </textarea>
                    </div>
                </div>
                <div class="row each_col button_row" style="text-align: right;">
                    <div class="col-7"></div>
                    <div class="col-2" style="margin-right: 5px;">
                        <button class="btn btn-secondary update_Btn" type="submit" @click="cancel" >取消</button>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-success update_Btn" type="submit" form="add_Product_form" >新增</button>
                    </div>
                </div>

            </div>
        </div>
    </form>
    
</template>


<style>
    figure {
        border: 2px solid #f00;
        margin: auto;
        line-height: 400px;
        text-align: center;

    }
    .information_img {
        display: inline-block;  
        line-height:1;
        max-width: 100%;
        max-height: 100%;
        background: #ccc;
	    vertical-align: middle;
    }
    .addProduct_left {
        margin-top: 50px;
        width:100%;
    }
    .addProduct_left .input_file {
        margin-top: 50px;
        margin-left: 80px;
    }
    .addProduct_right {
        margin-top: 20px;
        margin-left: 50px;
        width: 100%;
    }
    .font_span {
        line-height:50px;
        text-align: right;
    }
    .each_col {
        margin-top: 20px;
    }
    textarea {
        border-radius: 5px;
        border: 1px solid black;
        height: 200px;
        width: 100%;
    }
    .button_row {
        align-self: flex-end;
    }
    .update_Btn{

        float:right
        /* justify-content: right; */
    }
    .mutiple_pic {
        width:130px;
    }
    .mutiple_pic_box {
        display: flex;
        flex-wrap: wrap
    }
    .img_box {
        display: flex;
        border: 2px solid gray;
        border-radius: 5px;
        padding: 10px;
        width:170px;
        margin: 10px;
    }
    .multiple_btn {
        float: right;
        height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-color: transparent;
        background-color: transparent;
    }
    .multiple_btn_icon {
        height: 20px;
        width: 20px;
    }
     
</style>