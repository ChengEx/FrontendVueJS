<script>
    import { defineComponent, onMounted, reactive, ref } from "vue";
    import { useStore } from "vuex";
    import { getChatRoomByUserId } from '../api';
    import ChatBox from '../components/ChatBox.vue';
    export default defineComponent({
      components: {
        ChatBox
      },
        setup() {
            const store = useStore();
            const currentChatRoom = ref(null);
            const currentUserId = store.getters['user']?.studentObj?._id;
            const chatroomList = reactive({
                list:[{
                    id:'',
                    user1Id:{},
                    user2Id:{},
                    message:[{
                        userid:'',
                        time:'',
                    }]
                }]
            })
            onMounted(async() =>{
                await getChatRoomByUserId({
                    userId: store.getters['user']?.studentObj?._id
                }).then(res=> {
                    console.log("chat list",res);
                    chatroomList.list = res?.data?.returnObj;
                })
            })
            function letsChat(item) {
                currentChatRoom.value = item;
                console.log("test", currentChatRoom.value);
            }
            return {
                letsChat, currentChatRoom, chatroomList, currentUserId
            }
        }
    })
</script>

<template>
  <div class="wrapper" style="display: flex; width: 100%;">
    <!-- Sidebar  -->
    <nav style="width:350px;">
      <!-- <div style="height: 1px; border-bottom: 1px solid #00388b"></div> -->
      <ul class="list-unstyled components">
        <li class="active mb-1"
          v-on:click="letsChat(item)"
          v-for="item in chatroomList.list"
          :key="item._id"
          style="border: 2px solid gray; border-radius: 5px;">
        <!-- v-show="item.id != currentUserId" -->
          <div v-if="item.user1Id._id !== currentUserId" class="d-flex" style="cursor: pointer; padding-left:15px; padding-top: 10px; padding-bottom: 10px; width: 100%">
            <div style="width: 30%">
            <!-- user photo -->
              <div v-if="!item.user1Id.photo"  style="display:flex;">
                <img v-if="item.user1Id.gender === '男'" 
                  src="../assets/img/boy.png"
                  style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 3px solid #555;"/>
                <img v-if="item.user1Id.gender === '女'" 
                  src="../assets/img/woman.png"
                  style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 3px solid #555;"/>
              </div>
              <div v-else>
                <img
                  :src="item.user1Id.photo"
                  style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 3px solid #555;"
                />
              </div>
            </div>
            <div style="padding: 10px 0px 0px; width: 50%; display: flex; justify-content: space-between">
            <!-- user name -->
              <h5 style="line-height: 2; margin-left: 20px;">{{item.user1Id.name}}</h5>
            </div>
          </div>

          <div v-else class="d-flex" style="cursor: pointer; padding-left:15px; padding-top: 10px; padding-bottom: 10px; width: 100%">
            <div style="width: 30%">
            <!-- user photo -->
              <div v-if="item.user2Id.photo == undefined"  style="display:flex;">
                <img v-if="item.user2Id.gender === '男'" 
                  src="../assets/img/boy.png"
                  style="width: 70px; height: 70px;  border-radius: 50%; background: white; border: 3px solid #555;"/>
                <img v-if="item.user2Id.gender === '女'" 
                  src="../assets/img/woman.png"
                  style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 3px solid #555;"/>
              </div>
              <div v-else>
                <img
                  :src="item.user2Id.photo"
                  style="width: 70px; height: 70px; border-radius: 50%; background: white; border: 3px solid #555;"
                />
              </div>
            </div>
            <div style="padding: 10px 0px 0px; width: 50%; display: flex; justify-content: space-between">
            <!-- user name -->
              <h5 style="line-height: 2; margin-left: 20px;">{{item.user2Id.name}}</h5>
            </div>
          </div>
          <!-- <div style="height: 1px; border-bottom: 1px solid #00388b"></div> -->
        </li>
      </ul>
    </nav>

    <!-- Page Content  -->
    <div style="width: 100%; height: 84vh; border: 2px  solid gray" v-if="currentChatRoom===null">
      <div class="my-4">
        <img  width="200px" class="br-50" />
      </div>
      <div style="text-align: center;">
        <h2>歡迎來到聊天室</h2>
      </div>
    </div>
    <div v-else style="width: 100%;">
      <ChatBox :currentChatRoom="currentChatRoom" />
    </div>
  </div>

</template>

<style>
.wrapper {
  display: flex;
  width: 100%;
}
</style>