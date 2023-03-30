import * as api from '../api'
import {AUTH,LOGOUT} from "../constants.js/actionTypes"

export const signin=(formData,navigate)=>async(dispatch)=>{
        try{
            navigate('/')
        }
        catch(error){
            console.log(error);
        }
}
export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}