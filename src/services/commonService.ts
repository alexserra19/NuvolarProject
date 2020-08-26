import AppConstants from "../AppConstants";
import { Dimensions } from "react-native";

class CommonService {

    isLandscape(){
        const {height, width } = Dimensions.get('screen')
        return width >= height;
    }
}

export default new CommonService();
