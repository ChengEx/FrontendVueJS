<script>
    import { getAllCategory } from '../api';
    import { reactive, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    export default {
        setup() {
            const result = reactive({
                list:{}
            });
            const store = useStore();
            const router = useRouter();

            onMounted(async () => { 
                await getAllCategory().then(res => {
                    //console.log("res",res);
                    result.list = res?.data?.categoryObj;

                    sessionStorage.setItem('categoryList', JSON.stringify(res.data));
                    store.dispatch('category',res?.data?.categoryObj);
                })
            })
            function logout(){
                sessionStorage.clear();
                store.dispatch('user', null);
                router.push('/');
            }
            return { result, logout };
        }
  }
</script>
<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navvv">
    <div class="container-fluid">
        <router-link class="navbar-brand " aria-current="page" to="/" style="margin-right: 30px; font-size:30px;" >校園二手市集</router-link>

        <div class="collapse navbar-collapse mt-3 mb-3" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">                
                <li v-for="item in result.list" class="nav-item insidefont" style="margin-right: 20px;" :key="item._id">
                    <router-link class="nav-link" aria-current="page" :to="`/${item.categoryNameEN}`">{{ item.categoryName }}</router-link>  
                </li>    
                <!-- <li class="nav-item">
                    <router-link class="nav-link insidefont" aria-current="page" to="/backstage">暫時後台</router-link>
                </li> -->
            </ul>
            <div v-if="!$store.getters['user']">
                <router-link class="nav-link insidefont mr-5" to="/login" style="text-decoration: none; color: inherit;">登入</router-link>
            </div>
            <div v-else>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="insidefont" to="/personal" style="text-decoration: none; color: inherit; margin-right: 15px;">個人</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="insidefont" to="/collection" style="text-decoration: none; color: inherit; margin-right: 15px;">購物車</router-link>
                    </li>
                    <li class="nav-item" >
                        <button class="insidefont" @click="logout" style="border: none; background: none; margin-right: 15px;">登出</button>   
                    </li>                
                </ul>            
            </div>
        </div>
    </div>
</nav>
</template>
<style>

#navvv {
    width: 100%;
    padding-right: 20px;
    position: fixed;
    height: 100px;
    line-height: 80px;
    font-size: 20px;
    margin-right: 10px;
    background-color: white;
    z-index: 10;
}

.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
}

.insidefont {
    font-size:20px;
}
</style>