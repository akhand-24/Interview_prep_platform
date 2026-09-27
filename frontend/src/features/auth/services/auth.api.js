import axios from 'axios'
import { BASE_URL } from '../../../../config'

export async function register({username,email,password})
{
    try{

       const respose= await axios.post(`${BASE_URL}/api/register`,{
            username,email, password
        },{
            withCredentials:true
        })

        return respose.data ;
    }
    catch(err)
    {
        console.log(err)
    }

}

export async function login({email,password})
{
    try {

        const response= await axios.post(`${BASE_URL}/api/login`,{
            email,password
        }, { withCredentials: true})

        return response.data;
        
    } catch (error) {
        console.log(error)
    }
}

export async function logout()
{
    try {

        const response= await axios.post(`${BASE_URL}/api/logout`, { withCredentials: true})

        return response.data;
        
    } catch (error) {
        console.log(error)
    }
}

export async function getme()
{
    try {

        const response= await axios.post(`${BASE_URL}/api/getme`, { withCredentials: true})

        return response.data;
        
    } catch (error) {
        console.log(error)
    }
}



