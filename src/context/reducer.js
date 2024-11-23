/* eslint-disable default-case */

export const ACTION = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    UPDATE_CART : "UPDATE_CART",
    AUTHORIZE : "AUTHORIZE",
    LOADING : "LOADING",
    HIDE_LOADING : "HIDE_LOADING",
}
const updateLocalStorage = (state) =>{
    localStorage.setItem("state",JSON.stringify(state));
    return state;
}
const reducer = (state,action) => {
    // quy uoc trong action  se co 2 du lieu: type,payload
    switch (action.type) {
        case ACTION.LOGIN_SUCCESS:return updateLocalStorage({...state,user: action.payload.user,jwt: action.payload.jwt,role: action.payload.role});
        case ACTION.UPDATE_CART: return updateLocalStorage({...state, cart: action.payload});
        case ACTION.AUTHORIZE: return updateLocalStorage({...state, jwt: action.payload});
        default: return state;
    }
}
export default reducer;