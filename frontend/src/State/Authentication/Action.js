import axios from "axios"
import { API_URL, api } from "../../components/config/api" // Update this line to correctly import API_URL and api
import { 
    ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType"
import { REGISTER_FAILURE } from "./ActionType"
import { GET_USER_FAILURE } from "./ActionType"
import { ADD_TO_FAVORITE_FAILURE } from "./ActionType"

export const registerUser = (reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER")
        {
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }

        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success")
        
    } catch (error) {
     
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const loginUser = (reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData)
        if(data.jwt) localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        } else {
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data})
        console.log("login success") 
    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const getUser = (jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
    dispatch({type:GET_USER_SUCCESS,payload:data})
    console.log("user profile",data)
    } catch (error) {
        dispatch({type:GET_USER_FAILURE ,payload:error})
        console.log("error",error)
    }
}

export const addToFavorite = ({jwt,restaurantID})=>async(dispatch)=>{
    // dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
        const {data} = await api.put(`/api/restaurants/${restaurantID}/add-favorites`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
    dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
    console.log("ADDED TO FAVORITES",data)
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const logout = ()=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
       localStorage.clear();
    dispatch({type:LOGOUT})
    console.log("logout success")
    } catch (error) {
        console.log("error",error)
    }
}