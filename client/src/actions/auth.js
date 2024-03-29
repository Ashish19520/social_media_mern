import * as api from '../api'
import {AUTH,LOGOUT} from "../constants.js/actionTypes"

export const signin=(formData,navigate)=>async(dispatch)=>{
        try{
            const {data}=await api.signIn(formData);
            dispatch({type:AUTH,data})
            navigate('/')
        }
        catch(error){
            console.log(error);
        }
}
export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        const {data}=await api.signup(formData);
        dispatch({type:AUTH,data});
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}