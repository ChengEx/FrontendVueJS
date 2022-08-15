<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: ["currentChatRoom"],
        setup() {
            
        },
        watch: {
            currentChatRoom: function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getMessages();
                }
            }
        },
        methods: {
            getMessages() {

            }
        }
    })
</script>
<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <header>
      <div style="height: 60px; background: lightgrey">
        <img :src="currentPeerUser.URL" width="40px" class="br-50 header-image" />
        <div class="header-image">
          <h6 class="mt-2" style="font-weight: 600">{{currentPeerUser.name}}</h6>
        </div>
      </div>
    </header>
    <div style="background: #efe9e2; flex: 1; overflow-y: auto">
      <h2 class="welcome">Welcome to Chatbox</h2>
      <div class="text-outer">
        <div
          :class="item.idFrom === currentUserId ? 'textFrom' : 'textTo'"
          class="text-inner"
          v-for="item in listMessage"
          :key="item.id"
        >
          <h6>{{item.content}}</h6>
        </div>
      </div>
    </div>
    <footer>
      <div style="min-height: 60px; background: lightgrey">
        <div style="display: flex; padding: 15px">
          <!-- <img
            class="mr-3 pointer"
            src="../assets/picture.png"
            alt="select picture"
            width="30px"
            height="30px"
          />
          <img
            class="mr-3 pointer"
            src="../assets/sticker.png"
            alt="select sticker"
            width="30px"
            height="30px"
          />
          <input
            type="text"
            style="width: 85%; border: 1px solid transparent; border-radius: 4px;
            padding: 5px 10px;
            "
            class="mr-3"
            v-model="inputValue"
            v-on:keyup.enter="sendMessage(inputValue)"
          />
          <img
            class="mr-2 pointer"
            src="../assets/send.png"
            alt="select sticker"
            width="30px"
            height="30px"
            v-on:click="sendMessage(inputValue)"
          /> -->
        </div>
      </div>
    </footer>
  </div>
</template>