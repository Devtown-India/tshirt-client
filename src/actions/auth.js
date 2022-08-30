import jwt from 'jsonwebtoken'
import axios from 'axios'
import { toast } from 'react-hot-toast'


export const loginUser =  (email, password) => async dispatch =>{
    try {
        const base_Url = 'http://localhost:8080'

        const res = await axios.post(`${base_Url}/api/v1/auth/login`, {
            email, password
        })
        const { data:{token,user},success,message } = res.data
           dispatch({
                type: "SET_LOADING",
                payload: { state:true }
            })

        if (success) {
            toast.success('Login Success')
            localStorage.setItem('token', token)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { token,user }
            })
        } else {
            toast.error(message)
            dispatch( {
                type: "LOGIN_FAILED",
                payload: { token: null }
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    } finally {
        dispatch({
            type: "SET_LOADING",
            payload: { state:false }
        })
    }
};




export const signupUser = (email, firstName, lastName, password) => async (dispatch) => {

    try {
        const base_Url = 'http://localhost:8080'

        const res = await axios.post(`${base_Url}/api/v1/auth/signup`, {
            email, firstName, lastName, password
        })
        const { user } = res.data
        dispatch({
            type:"SET_LOADING",
            payload:{state:true}
        })
        if (user) {
            toast.success('Signup Success')
            dispatch({
                type: "SIGNUP_SUCCESS",
                payload: {
                    signup: true
                }
            })
        } else {
            toast.error('Signup Failed')
            dispatch({
                type: "SIGNUP_FAILED",
                payload: { signup: false }
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    } finally{
         dispatch({
            type:"SET_LOADING",
            payload:{state:false}
        })
    }
};