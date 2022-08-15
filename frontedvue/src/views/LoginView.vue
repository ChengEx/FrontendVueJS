<template>
    <div class="form_box main">
        <form id="login_form" class="form_class"  @submit.prevent="LoginSubmit" method="post">
            <div class="form_div">
                <label>Account:</label>
                <input class="field_class" name="login_txt" type="text" placeholder="email" v-model="loginForm.username" autofocus>
                <label>Password:</label>
                <input id="pass" class="field_class" name="password_txt" type="password" placeholder="password" v-model="loginForm.password">
                <button class="submit_class" type="submit" form="login_form">Login</button>
            </div>
            <div class="info_div">
                <p>還沒有帳號嗎? 
                    <router-link to="/signup" style="text-decoration: none;">
                        Sign up
                    </router-link>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref, reactive } from 'vue';
import { login } from '../api';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Login',
    components: {},
    setup() {
        const router = useRouter();
        const store = useStore();
        let loginForm = reactive({
            username:'',
            password:''
        });

        const LoginSubmit = () => {
            login(loginForm).then(res => {
                //console.log(res.data);
                sessionStorage.setItem('profile', JSON.stringify(res.data));
                store.dispatch('user',res.data);
                router.push('/');
            }).catch((error)=>{
                alert(error.response.data.message)
            })
        }
        return { loginForm, LoginSubmit }
    }
})
</script>

<style>
    * {
        padding: 0px;
        margin: 0px;
    }
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70.5vh;
        width: 100%;
    }
    .form_box {
        display: flex;
        justify-content: center;
    }
    .form_class {
        width: 500px;
        padding: 50px;
        border-radius: 8px;
        background-color: white;
        font-family: 'system-ui';
        box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
    }
    .form_div > label {
        letter-spacing: 3px;
        font-size: 1rem;
    }
    .info_div {
        text-align: center;
        margin-top: 20px;
    }
    .info_div {
        letter-spacing: 1px;
    }
    .field_class {
        width: 100%;
        border-radius: 6px;
        border-style: solid;
        border-width: 1px;
        padding: 5px 0px;
        text-indent: 6px;
        margin-top: 10px;
        margin-bottom: 20px;
        font-family: 'system-ui';
        font-size: 0.9rem;
        letter-spacing: 2px;
    }
    .submit_class {
        border-style: none;
        border-radius: 5px;
        background-color: #FFE6D4;
        padding: 8px 20px;
        font-family: 'system-ui';
        /* text-transform: uppercase; */
        letter-spacing: .8px;
        display: block;
        margin: auto;
        margin-top: 10px;
        box-shadow: 2px 2px 5px rgb(0,0,0,0.2);
        cursor: pointer;
    }
   
</style>