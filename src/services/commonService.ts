import AppConstants from "../AppConstants";
import { Dimensions } from "react-native";

class CommonService {

    isLandscape(){
        const {height, width } = Dimensions.get('window')
        return width >= height;
    }
}

export default new CommonService();
