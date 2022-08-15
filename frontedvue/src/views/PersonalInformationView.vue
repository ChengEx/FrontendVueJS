<script>
    import { defineComponent, reactive, ref, onMounted } from "vue";
    import { useStore } from 'vuex';
    import { getPersonalInformation, updateInformation } from '../api';

    export default defineComponent({
        setup() {
            const store = useStore();
            store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
            const student = reactive({
                _id:'',
                name:'',
                email:'',
                phone:'',
                description:''
            });
            const photo = ref('');
            const studenrObjectID = store.getters['user']?.studentObj?._id;  
            let localStorage_student = JSON.parse(sessionStorage.getItem('profile'));

            console.log("test123",localStorage_student);
            onMounted(async() => {
                await getPersonalInformation({
                    _id: studenrObjectID
                }).then(res => {
                    student._id = res.data.studentObj._id;
                    photo.value = res.data.studentObj.photo;
                    student.name = res.data.studentObj.name;
                    student.email = res.data.studentObj.email;
                    student.phone = res.data.studentObj.phone;
                    student.description = res.data.studentObj.description;
                })
            })
            function onfile(event){
                const file=event.target.files[0]
                let filereader=new FileReader();
                filereader.readAsDataURL(file)
                filereader.addEventListener("load",()=>{
                    photo.value = filereader.result;
                    //console.warn(photo.value);
                })
            }

            async function updateSubmit() {
                await updateInformation({
                    _id: student._id,
                    photo: photo.value,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    description: student.description
                }).then(res => {
                    //check update data
                    console.log("test",res.data.beforeUpdateObj)
                    alert('Update Success');
                    localStorage_student.studentObj = res.data.beforeUpdateObj
                    store.dispatch('user',localStorage_student);
                })
            }
        
            return {
                student, photo, onfile, updateSubmit
            }
        },

    })
</script>
<template>
    <form id="update_Information_form" @submit.prevent="updateSubmit" method="post">
        <div class="pic" style="padding-left: 0px;">
            <div class="information_left">
                <div class="row" style="width:auto; padding-right: 0;">
                    <figure style="width: 400px;">
                        <img class="information_img" :src="photo"/>
                    </figure>
                    
                </div>
                <div class="row input_file">
                    <input name="file_input" type="file" @change="onfile" />
                </div>
                
            </div>
            <div class="information_right">
                <div class="row each_col">
                    <div class="col-2 font_span">
                        <span>姓名:</span>
                    </div>
                    <div class="col-8">
                        <input class="field_class" name="name" type="text" v-model="student.name" />
                    </div>
                    
                </div>
                <div class="row each_col">
                    <div class="col-2 font_span">
                        <span>信箱:</span>
                    </div>
                    <div class="col-8">
                        <input class="field_class" name="email" type="text" v-model="student.email" />
                    </div>
                </div>
                <div class="row each_col">
                    <div class="col-2 font_span">
                        <span>手機:</span>
                    </div>
                    <div class="col-8">
                        <input class="field_class" name="phone" type="text" v-model="student.phone" />
                    </div>
                </div>
                <div class="row each_col">
                    <div class="col-2 font_span">
                        <span>介紹:</span>
                    </div>
                    <div class="col-8">
                        <textarea name="mytext"
                            style="margin-top: 10px; padding:5px"
                            v-model="student.description"
                            required>
                        </textarea>
                    </div>
                </div>
                <div class="row each_col button_row" style="text-align: right;">
                    <div class="col-10">
                        <button class="btn btn-success update_Btn" type="submit" form="update_Information_form" >更新資料</button>
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
    .pic {
        display: flex;
        width: 100%;
    }
    .information_left {
        margin-top: 50px;
        margin-left: 80px;
    }
    .information_left .input_file {
        margin-top: 50px;
        margin-left: 80px;
    }
    .information_right {
        margin-top: 20px;
        margin-left: 100px;
        width: 100%;
    }
    .font_span {
        line-height:50px;
    }
    .each_col {
        margin-top: 20px;
    }
    textarea {
        border-radius: 5px;
        border: 1px solid black;
        height:300px;
        width: 100%;
    }
    .button_row {
        align-self: flex-end;
    }
    .update_Btn{

        float:right
        /* justify-content: right; */
    }



</style>