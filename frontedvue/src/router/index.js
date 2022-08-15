import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import HomeView from '../views/HomeView.vue';
import SideBarView from '../views/SideBarView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import PersonalView from '../views/PersonalView.vue';
import PersonalInformationView from '../views/PersonalInformationView.vue'
import PersonalShopView from '../views/PersonalShopView.vue';
import PersonalOrderView from '../views/PersonalOrderView.vue';
import ChatMessageView from '../views/ChatMessageView.vue';
import CollectionView from '../views/CollectionView.vue';
import PersonalChangePasswordView from '../views/PersonalChangePasswordView.vue';
import PersonalShopAddProductView from '../views/PersonalShopAddProductView.vue';
import PersonalShopEditProductView from '../views/PersonalShopEditProductView.vue';
import PersonalShopListProductView from '../views/PersonalShopListProductView.vue';
import PersonalShopOrderView from '../views/PersonalShopOrderView';

import ProductsView from '../views/ProductsView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import SellerView from '../views/SellerView.vue';
import ChatMessage from '../views/ChatMessageView.vue';
import SellerChatView from '../views/SellerChatView.vue';

const history = createWebHashHistory();
const router = createRouter({
    history: history,
    routes:[
        {
            path:'/',
            name:'home',
            //component: defineAsyncComponent(()=>import('../views/HomeView.vue'))
            component: HomeView
        },
        {
            path:'/:category',
            name:'sidebar',
            component: SideBarView,
            //component: defineAsyncComponent(()=>import('../views/SideBarView.vue')),
            children:[
                {
                    path:'',
                    name:'product_default',
                    component: ProductsView,
                    // component: defineAsyncComponent(()=>import('../views/ProductsView.vue')),
                },
                {
                    path:'/:category/:type',
                    name:'product',
                    component: ProductsView,
                    // component: defineAsyncComponent(()=>import('../views/ProductsView.vue')),
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component: LoginView
            // component: defineAsyncComponent(()=>import('../views/LoginView.vue')),
        },
        {
            path:'/signup',
            name:'signup',
            component: SignUpView
            // component: defineAsyncComponent(()=>import('../views/SignUpView.vue')),
        },
        {
            path:'/personal',
            name:'personal',
            component: PersonalView,
            // component: defineAsyncComponent(()=>import('../views/PersonalView.vue')),
            children:[
                {
                    path:'',
                    name:'information_default',
                    component: PersonalInformationView,
                    // component: defineAsyncComponent(()=>import('../views/PersonalInformationView.vue')),
                },
                {
                    path:'/personal/information',
                    name:'information',
                    component: PersonalInformationView,
                    // component: defineAsyncComponent(()=>import('../views/PersonalInformationView.vue')),
                },
                {
                    path:'/personal/changepassword',
                    name:'changepassword',
                    component: PersonalChangePasswordView
                    // component: defineAsyncComponent(()=>import('../views/PersonalChangePasswordView.vue')),
                },
                {
                    path:'/personal/order',
                    name:'order',
                    component: PersonalOrderView,
                    // component: defineAsyncComponent(()=>import('../views/PersonalOrderView.vue')),
                },
                {
                    path:'/personal/message',
                    name:'message',
                    component: ChatMessageView,
                    // component: defineAsyncComponent(()=>import('../views/ChatMessageView.vue')),
                },
                {
                    path:'/personal/shop',
                    name:'shop',
                    component: PersonalShopView,
                    // component: defineAsyncComponent(()=>import('../views/PersonalShopView.vue')),
                    children: [
                        {
                            path:'',
                            name:'shop_personalProduct',
                            component: PersonalShopListProductView,
                            // component: defineAsyncComponent(()=>import('../views/PersonalShopListProductView.vue')),
                        },
                        {
                            path:'/personal/shop/addProduct',
                            name:'shop_addProduct',
                            component: PersonalShopAddProductView,
                            // component: defineAsyncComponent(()=>import('../views/PersonalShopAddProductView.vue')),
                        },
                        {
                            path:'/personal/shop/editProduct/:id',
                            name:'shop_editProduct',
                            component: PersonalShopEditProductView
                            // component: defineAsyncComponent(()=>import('../views/PersonalShopEditProductView.vue')),
                        }
                    ]
                },
                {
                    path:'/personal/shopOrder',
                    name:'shopOrder',
                    component: PersonalShopOrderView,
                },

            ]
        },
        {
            path:'/collection',
            name:'collection',
            component: CollectionView
            // component: defineAsyncComponent(()=>import('../views/CollectionView.vue')),
        },
        {
            path:'/product/:id',
            name:'productdetail',
            component: ProductDetailView
            // component: defineAsyncComponent(()=>import('../views/ProductDetailView.vue')),
        },
        {
            path:'/seller/:id',
            name:'seller',
            component: SellerView
            // component: defineAsyncComponent(()=>import('../views/SellerView.vue')),
        },
        {
            path:'/chatMessage',
            name:'chatMessage',
            component: ChatMessage
        },
        {
            path:'/sellerChat/:id',
            name:'sellerchat',
            component: SellerChatView
        }
    ]
})

export default router;