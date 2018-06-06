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
        Client.findOne({
            _id : req.decoded.id
        }).then(client => {
            let updatedMeasurements = {
                ...client.measurements,
                ...req.body.measurements
            }
            client.measurements = updatedMeasurements;
            client.save().then(data => {
                res.json({
                    success: true,
                    message: "measurements updated",
                    data: data.measurements
                });
            }, (err) => {
                res.json({
                    success: false,
                    message: "some error occured"
                });
            })
        });
    }
};

export default profileController;
