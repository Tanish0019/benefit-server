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
        } , (err) => {
            console.log(err);
        })
    } ,
    get : (req, res) => {

        console.log(req.decoded);
        console.log(req.body);

        Client.findOne({
            email : req.decoded.email
        }).then((client) => {
            res.json(client);
        } , (err) => {
            console.log(err);
        })
    },

    editMeasurements: (req, res) => {
        Client.findOneAndUpdate({
            _id: req.decoded.id
        }, {$set:{measurements: req.body.measurements}}, 
        {new: true}).then(data => {
            res.json({
                success: true,
                message: "measurements updated",
                data: data
            });
        }, (err) => {
            res.json({
                success: false,
                message: "Client not found"
            });
        });
    }
};

export default profileController;
