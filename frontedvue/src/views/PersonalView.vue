<script>
    import { defineComponent, ref, watch,  } from "vue"
    import { useStore } from "vuex";
    export default defineComponent({
        setup() {
            const store = useStore();
            let photo = ref();
            let username = ref();

            photo.value = store.getters['user']?.studentObj?.photo;
            username.value = store.getters['user']?.studentObj?.name;

            const student = JSON.parse(sessionStorage.getItem('profile')).studentObj; 

            watch(() => store.state.user, (val, old) => {
                console.log("state2",val);
                if(val != null) {
                    photo.value = val?.studentObj?.photo;
                    username.value = val?.studentObj?.name;
                }
                
                console.log('get watch to update')   
            },{
                    immediate: true
            });
            return {
                student, photo, username
            }
        },
        data(){      
            return {

            }
        }
    })
</script>

<template>
    <div id="personalPage">
        <div id="leftBar">
            <div v-if="photo == null">
                <div v-if="student.gender == '男'">
                    <img class="side_img" src="../assets/img/boy.png" alt="Avatar"/>
                </div>
                <div v-if="student.gender == '女'">
                    <img class="side_img" src="../assets/img/woman.png" alt="Avatar"/>
                </div>
            </div>
            <div v-else>
                <div>
                    <img class="side_img" :src="photo"/>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <span>{{ username }} 您好 </span>
            </div>
            
            
            <ul class="personalSideBar">
                <li>
                    <router-link to="/personal/information">個人資訊</router-link>
                </li>
                <li>
                    <router-link to="/personal/changepassword">更改密碼</router-link>
                </li>
                <li>
                    <router-link to="/personal/order">查看個人訂單</router-link>
                </li>
                <li>
                    <router-link to="/personal/message">聊天室</router-link>
                </li>
                <li>
                    <router-link to="/personal/shop">我的商城-商品管理</router-link>
                </li>
                <li>
                    <router-link to="/personal/shoporder">我的商城-商城訂單</router-link>
                </li>
            </ul>
        </div>
        <div id="rightPage">
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </div>
</template>

<style>
.side_img {
    height: 200px;
    width: 200px;
    border: 3px solid #555;
    border-color: black;
    border-radius: 50%;
}

#personalSideBar {
    text-align: center; 
}

#personalPage {
    display: flex;
}

#leftBar{
    position: fixed;
    top: 100px;
    width: 20%;
    height: 100%;
    padding: 30px;
    background-color: gainsboro;
}

#leftBar ul{
    list-style-type: none;
    padding-left: 0;
}

#leftBar ul li{
    margin: 20px 0;
}

#leftBar ul li a{
    color: black;
    margin: 10px;
    text-decoration: none;
}

#leftBar ul li a:hover{
    color: gray;
}

#rightPage {
    margin-left: 350px;
    margin-top: 50px;
    padding: 50px;
    /* height: 1500px; */
    width:100%;
}
</style>