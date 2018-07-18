import config from "../config/config";
import jsonwebtoken from "jsonwebtoken";
import constants from "../constants/constants";

export default (token) => {

    if (token) {
        jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
            console.log(decoded , token)
            if (err) {
                return false;
            } else {
                return true
            }
        });
    } else {
        return false;

    }
};
