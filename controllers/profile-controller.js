import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';

let profileController = {
    update : (req, res) => {
        console.log(req.decoded);
        console.log(req.body);

        Client.findOneAndUpdate({
            email : req.decoded.email
        } , req.body , {new: true}).then((client) => {
            res.json(client)
        })
    }
};

export default profileController;
