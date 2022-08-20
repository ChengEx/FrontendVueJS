import axios from 'axios'

// const url = 'http://localhost:8080'
const url = 'http://localhost:4000'

const APIRequest = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json' },
})

//axios instance攔截器
APIRequest.interceptors.request.use((req)=>{  
  if (sessionStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profile')).token}`;
  }
  return req;
})

export const getAllCategory = () => {
  return APIRequest.get('/api/category/getAllCategory');
}
export const getCategoryByPath = (path) => {
  return APIRequest.post('/api/category/getCategoryByPath', path);
}
export const login = (loginData) => {
  return APIRequest.post('/api/student/login', loginData);
}
export const signup = (signUpData) => {
  return APIRequest.post('/api/student/register', signUpData);
}
export const getPersonalInformation = (_id) => {
  return APIRequest.post('/api/student/getPersonalInformation', _id);
}
export const updateInformation = (updateData) => {
  return APIRequest.post('/api/student/updateInformation', updateData);
}
export const changePasswrod = (passwordData) => {
  return APIRequest.post('/api/student/changePassword', passwordData);
}
export const addProduct = (addProductData) => {
  return APIRequest.post('/api/product/addProduct', addProductData);
}
export const getProductListByCategory = (category) => {
  return APIRequest.post('/api/product/getProductListByCategory', category);
}
export const getProductListBySubCategory = (subcategory) => {
  return APIRequest.post('/api/product/getProductListBySubCategory', subcategory);
}
export const getProductById = (productId) => {
  return APIRequest.post('/api/product/getProductById', productId);
}
export const getProductListByUserId = (userId) => {
  return APIRequest.post('/api/product/getProductListByUserId', userId);
}
export const updateProductById = (updateProductData) => {
  return APIRequest.post('/api/product/updateProductById', updateProductData);
}
export const deleteProductById = (productId) => {
  return APIRequest.post('/api/product/deleteProductById', productId);
}
export const addCollection = (collection) => {
  return APIRequest.post('/api/collection/addCollection', collection);
}
export const getCollectionById = (userId) => {
  return APIRequest.post('/api/collection/getCollectionById', userId);
}
export const deleteCollection = (collection) => {
  return APIRequest.post('/api/collection/deleteCollection', collection);
}

export const getAllAnnouncement = () => {
  return APIRequest.get('/api/announcement/getAll');
}

export const getChatRoomById = (_id) => {
  return APIRequest.post('/api/message/getChatRoomById', _id);
}
export const getChatRoomByUserId = (userId) => {
  return APIRequest.post('/api/message/getChatRoomByUserId', userId);
}
export const addChatRoom = (object) => {
  return APIRequest.post('/api/message/addChatRoom', object);
}
export const addMessageByRoomId = (object) => {
  return APIRequest.post('/api/message/addMessageByRoomId', object);
}
export const addOrder = (object) => {
  return APIRequest.post('/api/order/addOrder', object);
}
export const getPersonalOrder = (userId) => {
  return APIRequest.post('/api/order/getPersonalOrder', userId);
}
export const getShopOrder = (userId) => {
  return APIRequest.post('/api/order/getShopOrder', userId);
}