<script>
    import useVuelidate from '@vuelidate/core';
    import { required, email, minLength, sameAs } from '@vuelidate/validators';
    import { defineComponent,reactive, computed } from 'vue';
    import { signup } from '../api';

    export default defineComponent({
        name: "SignUp",
        setup() {
            const state =  reactive({
                username:'',
                password:'',
                password_confirm:'',
                name:'',
                email:'',
                gender:'',
                phone:'',
            })

            const rules = computed(()=> {
                return {
                    username: {required, minLength:minLength(6)},
                    password: {required, minLength:minLength(6)},
                    password_confirm: {required, sameAs:sameAs(state.password)},
                    name: {required, minLength:minLength(2)},
                    email: {required, email},
                    gender:{required},
                    phone: {required, minLength:minLength(10)},
                }
            })
            const v$ = useVuelidate(rules, state);
            return {state, v$}
        },
        data() {
            return{               
                genderList:[
                    {item:'男'},
                    {item:'女'}
                ]
            }
        },
        methods: {
            async SignUpSubmit() {
                this.v$.$validate()
                if(!this.v$.$error){               
                    await signup({
                        username: this.state.username,
                        password: this.state.password,
                        name: this.state.name,
                        email: this.state.email,
                        gender: this.state.gender,
                        phone: this.state.phone,    
                    }).then((res)=>{
                        console.log(res)
                        alert('Form successfully submit')
                        this.$router.push('/login')  
                    }).catch((error)=>{
                        alert(error.response.data.message)                    
                    })
                }else{
                    alert('Form failed validation')
                }
            }
        }
    })
</script>
<template>
    <div class="form_box main">
        <form id="signup_form" class="form_class" @submit.prevent="SignUpSubmit" method="post">
            <div class="form_div">
                <div class="row">
                    <h1>註冊帳戶</h1>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">帳號:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="username_txt" v-model="state.username" type="text" placeholder="Username" autofocus>
                        <span v-if="v$.username.$error">
                            {{ v$.username.$errors[0].$message }}
                        </span>                      
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-3">
                        <h5 class="title">密碼:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_txt" v-model="state.password" type="text" placeholder="Password">
                        <span v-if="v$.password.$error">
                            {{ v$.password.$errors[0].$message }}
                        </span> 
                    </div>
                </div>
                 <div class="row">              
                    <div class="col-3">
                        <h5 class="title">確認密碼:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_confirm_txt" v-model="state.password_confirm" type="text" placeholder="Password Confirm">
                        <span v-if="v$.password_confirm.$error">
                            {{ v$.password_confirm.$errors[0].$message }}
                        </span> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <h5 class="title">信箱:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="email_txt" v-model="state.email" type="text" placeholder="Email" autofocus>
                        <span v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </span>                      
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">姓名:</h5>
                    </div>                             
                    <div class="col-4">
                        <input class="field_class" name="name_txt"  v-model="state.name"  type="text" placeholder="Name">
                        <span v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$message }}
                        </span> 
                    </div>
                    <div class="col-2">
                        <h5 class="title">性別:</h5>
                    </div>
                
                    <div class="col-3">
                        <select class="form-select form-select-sm field_class" aria-label="Default select example" v-model="state.gender">
                            <option v-for="gender in genderList" :value="gender.item" >
                                {{ gender.item }}
                            </option>
                        </select>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-3">
                        <h5 class="title">電話:</h5>
                    </div>  
                    <div class="col-9">
                        <input class="field_class" name="phone_txt" v-model="state.phone"  type="text" placeholder="Phone">
                        <span v-if="v$.phone.$error">
                            {{ v$.phone.$errors[0].$message }}
                        </span> 
                    </div>
                </div>                  
                <button class="submit_class" type="submit" form="signup_form">註冊</button>
            </div>
        </form>
    </div>
</template>
<style>
.col-2{
    padding:0px;
}
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90.5vh;
    width: 100%;
}

.form_box {
    display: flex;
    justify-content: center;
}
.form_class {
    width: 600px;
    padding: 40px;
    border-radius: 8px;
    background-color: white;
    font-family: 'system-ui';
    box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
}
.form_div {
    text-transform: uppercase;
}
.form_div > label {
    letter-spacing: 1px;
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
    margin-bottom: 10px;
    font-family: 'system-ui';
    font-size: 0.9rem;
    letter-spacing: 1px;
}
.submit_class {
    border-style: none;
    border-radius: 5px;
    background-color: #FFE6D4;
    padding: 8px 20px;
    font-family: 'system-ui';
    text-transform: uppercase;
    letter-spacing: .8px;
    display: block;
    margin: auto;
    margin-top: 10px;
    box-shadow: 2px 2px 5px rgb(0,0,0,0.2);
    cursor: pointer;
}

.title{

    margin-top: 15px;
    margin-bottom: 10px;
}
</style>
