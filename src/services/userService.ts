import AppConstants from "../AppConstants";
import interceptorService from './interceptorService'

class UserService {

    async validateAdsCode(code: string){

        try{
            const url = AppConstants.domain+'/code/checkCode/'+code;
            let response = await interceptorService.doRequest(url);    
            
            if (response.isSuccess){
                return response.body
            }
            else{
                return null
            }
        }catch{
            return null;
        }


    }
}

export default new UserService();
