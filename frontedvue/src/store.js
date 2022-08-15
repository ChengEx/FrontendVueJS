import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        photo: null,
        category: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        photo: (state) => {
            return state.photo;
        },
        category: (state) => {
            return state.category;
        }
    },

    actions:{
        user(context, user) {
            context.commit('user', user);
        },
        photo(context, photo) {
            context.commit('photo', photo);
        },
        category(context, category) {
            context.commit('category', category);
        }


    },
    mutations:{
        user(state, user) {
            state.user = user;
        },
        photo(state, photo){
            state.photo = photo;
        },
        category(state, category){
            state.category = category;
        }
    }
  })
