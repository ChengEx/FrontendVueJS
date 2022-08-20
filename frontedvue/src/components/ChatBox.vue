<script>
    import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { getChatRoomById, addMessageByRoomId } from '../api';

    export default defineComponent({
        props: {
           currentChatRoom: {
               type: Object
           }
        },
        setup(props) {
            const store = useStore();
            const chat = reactive({
              chatItem:{
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
                },
                message:[]
              }
            });
            const inputValue = ref("");
            const currentUserId = store.getters['user']?.studentObj?._id;
            onMounted(async() => {
              console.log("props",props.currentChatRoom);
              chat.chatItem = props.currentChatRoom;
            }),
            watch(() => props.currentChatRoom , (newVal, oldVal) => {
              if (newVal !== oldVal) {
                console.log("newVal", newVal);
                chat.chatItem = newVal;
              }
            });
            
            async function sendMessage(content) {
                let current = new Date();
                let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
                let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
                let dateTime = cDate + ' ' + cTime;
                await addMessageByRoomId({
                    _id: chat.chatItem._id,
                    userId: store.getters['user']?.studentObj?._id,
                    content: content.trim(),
                    time: dateTime
                }).then(res => {
                    console.log("add message",res);
                    // this.$nextTick(()=> {
                    //   this.$ref.chatbox.scrollTop = this.$ref.chatbox.scrollHeight
                    // })
                    inputValue.value = "";
                    chat.chatItem.message = res?.data?.returnObj.message;
                })
            }
            return {
              chat, currentUserId, sendMessage, inputValue
            }
        },
        
    })
</script>
<template>
  <div style="display: flex; flex-direction: column; height: 84vh;  border: 2px  solid gray ">
    <header>
      <div style="height: 100px; background: lightgrey">
        <div style="margin-left: auto; display: flex">
            <img style="width: 120px;" :src="chat.chatItem.productId.productDetail.images[0]"/>
            <h2 style="margin-top:25px; margin-left: 20px;">{{ chat.chatItem.productId.name }}</h2>
            <h2 style="margin-top:25px;">${{ chat.chatItem.productId.productDetail.price }}</h2>
        </div>
      </div>
    </header>
    <div style="background: #efe9e2; flex: 1; overflow-y: auto">
      <h6 class="welcome">聊天室已開啟</h6>
      <div class="text-outer">
        <div v-for="item in chat.chatItem.message">
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
        </div>
      </div>
    </footer>
  </div>
</template>