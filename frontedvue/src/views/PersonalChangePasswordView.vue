<template>
    <form id="update_Password_form" class="change_password_box"  @submit.prevent="updatePassword" method="post">
        <div class="row each_col">
            <div class="col-2 font_span">
                <span>舊密碼:</span>
            </div>
            <div class="col-4">
                <input class="field_class" name="name" type="text" v-model="passwordObj.oldPassword" />
            </div>
                    
        </div>
        <div class="row each_col">
            <div class="col-2 font_span">
                <span>新密碼:</span>
            </div>
            <div class="col-4">
                <input class="field_class" name="email" type="text" v-model="passwordObj.newPassword" />
            </div>
        </div>
        <div class="row each_col">
            <div class="col-2 font_span">
                <span>再次確認:</span>
            </div>
            <div class="col-4">
                <input class="field_class" name="phone" type="text"  v-model="passwordObj.confirmNewPassword"/>
            </div>
        </div>
        <div class="row each_col button_row" style="text-align: right;">
            <div class="col-6">
                <button class="btn btn-success update_Btn" type="submit" form="update_Password_form" >更改密碼</button>
            </div>
        </div>
    </form>
    
</template>

<script>
import { defineComponent, reactive } from "vue" 
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import { changePasswrod } from '../api';
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        store.dispatch('user', JSON.parse(sessionStorage.getItem('profile')));
        
        const passwordObj = reactive({
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:''
        })
        const _id = store.getters['user'].studentObj._id;

        async function updatePassword() {
            if(passwordObj.newPassword === passwordObj.confirmNewPassword) {
                await changePasswrod({
                    _id: _id,
                    oldPassword: passwordObj.oldPassword,
                    newPassword: passwordObj.newPassword
                }).then(res=> {           
                    alert('change success');     
                    router.push('/personal');  
                }).catch((error)=>{
                    alert(error.response.data.message);
                })
            }else {
                alert('please check the new password and the confrim password');
            }
            
        }


        return {
            passwordObj, updatePassword
        }
    },
    
})
</script>

<style>
    .change_password_box{
        margin-left: 100px;
        margin-top: 100px;
    }
</style>