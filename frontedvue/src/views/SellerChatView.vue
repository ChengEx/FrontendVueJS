<script>
    import { defineComponent, onMounted, reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { getChatRoomById, addMessageByRoomId, addOrder } from '../api';
    export default defineComponent({
        setup() {
            const route = useRoute();
            const store = useStore();
            const chatMessage = reactive({
                _id:'',
                user1Id:{},
                user2Id:{},
                productId:{
                    _id: '',
                    name: '',
                    productDetail:{
                        images: '',
                        price: 0
                    }                         
                }
                ,
                message:[]
            })
            const inputValue = ref("");
            const currentUserId = store.getters['user']?.studentObj?._id;
            onMounted(async() => {
                await getChatRoomById({
                    _id: store.getters['user']?.studentObj?._id,
                    productId: route.params.id
                }).then(res=> {
                    console.log("chat message",res);
                    chatMessage._id = res?.data?.returnObj._id;
                    chatMessage.user1Id = res?.data?.returnObj.user1Id;
                    chatMessage.user2Id = res?.data?.returnObj.user2Id;
                    chatMessage.productId = res?.data?.returnObj.productId;
                    chatMessage.message = res?.data?.returnObj.message;
                })
            });

            async function sendMessage(content) {
                let current = new Date();
                let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
                let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
                let dateTime = cDate + ' ' + cTime;
                if(content.trim()!==""){
                  await addMessageByRoomId({
                    _id: chatMessage._id,
                    userId: store.getters['user']?.studentObj?._id,
                    content: content.trim(),
                    time: dateTime
                  }).then(res => {
                      console.log("add message",res);
                      inputValue.value = "";
                      chatMessage.message = res?.data?.returnObj.message;
                  })
                }
                
            }

            async function sendOrder() {  
              if(confirm("請確認是否與賣家討論好交易方式，\n例如:現場面交、商品郵寄、現金匯款等等...。\n本平台僅提供撮合買賣家交易等功能，\n請交易時自行注意詐騙!")){
                //save order && delete collection
                console.log("seller",chatMessage.user2Id._id);
                console.log("productId",chatMessage.productId._id)
                await addOrder({
                  buyerId: store.getters['user']?.studentObj?._id,
                  sellerId: chatMessage.user2Id._id,
                  productId: chatMessage.productId._id
                }).then(res => {
                  console.log("add order",res);
                })
              }
            }
            return {
                chatMessage, currentUserId, sendMessage, sendOrder, inputValue
            }
        }
    })
</script>
<template>
<div class="container">
  <div style="display: flex; flex-direction: column; height: 100vh; padding-top: 100px;">
    <header>
      <div v-if="!chatMessage.user2Id.photo" style="height: 120px; background: lightgrey; display:flex;"  >
        <img v-if="chatMessage.user2Id.gender == '男'" src="../assets/img/boy.png" style="height: 100px;
            width: 100px;
            border: 3px solid #555;
            border-color: black;
            border-radius: 50%;
            margin-top: 10px;
            margin-left: 50px;"
            />
        <img v-if="chatMessage.user2Id.gender == '女'" src="../assets/img/woman.png" style="height: 100px;
            width: 100px;
            border: 3px solid #555;
            border-color: black;
            border-radius: 50%;
            margin-top: 10px;
            margin-left: 50px;"/>
        <div class="header-image">
          <h1 class="mt-4" style="margin-left: 20px;">{{ chatMessage.user2Id.name }}</h1>
        </div>
        <div style="margin-left: auto; display: flex">
            <h2 style="margin-top:40px;">{{ chatMessage.productId.name }}</h2>
            <h2 style="margin-top:40px; margin-left: 20px; margin-right: 30px;">${{ chatMessage.productId.productDetail.price }}</h2>
            <img style="width: 120px;" :src="chatMessage.productId.productDetail.images[0]"/>
        </div>
      </div>
      <div v-else style="height: 120px; background: lightgrey; display:flex;">
        <img :src="chatMessage.user2Id.photo" width="40px" style="height: 100px;
            width: 100px;
            border: 3px solid #555;
            border-color: black;
            border-radius: 50%;
            margin-top: 10px;
            margin-left: 50px;"/>
        <div class="header-image">
          <h1 class="mt-4" style="margin-left: 20px;">{{ chatMessage.user2Id.name }}</h1>
        </div>
        <div style="margin-left: auto; display: flex">
            <h2 style="margin-top:40px;">{{ chatMessage.productId.name }}</h2>
            <h2 style="margin-top:40px; margin-left: 20px; margin-right: 30px;">${{ chatMessage.productId.productDetail.price }}</h2>
            <img style="width: 120px;" :src="chatMessage.productId.productDetail.images[0]"/>
        </div>
      </div>
    </header>
    <div style="background: #efe9e2; flex: 1; overflow-y: auto">
      <h6 class="welcome">聊天室已開啟</h6>
      <div class="text-outer">
        <div v-for="item in chatMessage.message">
            <div v-if="item.userId === currentUserId" class="textFrom text-inner">
                <h6>{{item.content}}</h6>
            </div>
            <div v-else class="textTo text-inner">
                <h6>{{item.content}}</h6>
            </div>
        </div>
      </div>
    </div>
    <footer>
      <div style="min-height: 60px; background: lightgrey">
        <div style="display: flex; padding: 15px">
            <input
                type="text"
                style="width: 85%; border: 1px solid transparent; border-radius: 4px; padding: 5px 10px;"
                class="mr-3"
                v-model="inputValue"
                @keyup.enter="sendMessage(inputValue)"
            />
            <button
                class="ml-2 pointer"
                style="margin-left: 20px; width: 80px; border-radius: 5px;"
                @click="sendMessage(inputValue)">輸入</button>
            <button
                class="ml-2 pointer"
                style="margin-left: 20px; width: 80px; border-radius: 5px;"
                @click="sendOrder()">下單</button>
        </div>
      </div>
    </footer>
  </div>
</div>


</template>

<style>
.welcome {
  color: #635a5a;
  font-weight: 600;
  margin: 10px 0px 32px;
}
.br-50 {
  border-radius: 50%;
}
.header-image {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.text-outer {
  display: flex;
  flex-direction: column;
}
.text-inner {
  padding: 10px 10px 2px;
  border-radius: 0.5rem;
  width: 20%;
}
.textFrom {
  background: teal;
  color: white;
  margin: 0% 0% 20px 70%;
}
.textTo {
  background: lightcoral;
  color: black;
  margin: 0% 0% 20px 5%;
}
.pointer {
  cursor: pointer;
}
</style>