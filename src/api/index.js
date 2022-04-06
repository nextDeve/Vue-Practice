import requests from './request.js'
import mockRequests from './mockIndex.js'
//三级联动
/// /product/getBaseCategoryList get 无参

export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

export const reqGetBannerlist = () => mockRequests.get('/banner')
export const reqGetFloorlist = () => mockRequests.get('/floor')

export const reqGetSearchList = (data) => requests({ url: "/list", method: 'post', data });
export const reqDetaiIndo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })

export const reqAddOrUpdateShopCart = (skuId, skuNum, CancelToken) => requests({ CancelToken: CancelToken, url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
export const reqDeletShopCart = (skuid) => requests({ url: `/cart/deleteCart/${skuid}`, method: 'DELETE' })
export const reqChangeShopCartState = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })


export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
export const reqUserRigester = (data) => requests({ url: '/user/passport/register', data, method: 'POST' })

export const reqUserLogin = (data) => requests({ url: 'user/passport/login', data, method: 'POST' })
export const reqUserInfo = () => requests({ url: 'user/passport/auth/getUserInfo', method: 'GET' })
export const reqLogOut = () => requests({ url: 'user/passport/logout', method: 'GET' })

export const reqAddressList = () => requests({ url: 'user/userAddress/auth/findUserAddressList', method: 'GET' })
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET' })
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

export const reqPayState = (orderId) => requests({ url: `payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
