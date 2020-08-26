import AppConstants from "../AppConstants";
import interceptorService from './interceptorService'

class ApplicationService {

    async searchUsers(username: string){

        try{
            const url = AppConstants.domain+'/search/users?q='+username;
            let response = await interceptorService.doRequest(url);    

            if (response.isSuccess){
                return response
            }
            else{
                return null
            }
        }catch{
            return null;
        }


    }
}

export default new ApplicationService();
