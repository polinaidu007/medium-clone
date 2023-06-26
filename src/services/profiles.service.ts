import axios from 'axios';
import config from '../config/default'

export async function followProfile(username : string, token : string){
    return (await axios({
        method : 'POST',
        url : `${config.apiUrl}/profiles/${username}/follow`,
        headers : {
            authorization: `Bearer ${token}`
        }
    })).data;
}