import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';

let profileController = {
    update : (req, res) => {

        // console.log(req.decoded);
        // console.log(req.body);
        Client.findOneAndUpdate({
            email : req.decoded.email
        } , req.body , {new: true}).then((client) => {
            res.json({
                success : true ,
                data : client
            });
        }).catch((err) => {
            next(new Error('Error Retrieving Profile'))
        })
    } ,
    get : (req, res) => {

        // console.log(req.decoded);
        // console.log(req.body);
        Client.findOne({
            email : req.decoded.email
        }).then((client) => {
            res.json({
                success : true ,
                data : client
            });
        }).catch((err) => {
            next(new Error('Error Retrieving Profile'))
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
                    message: "Measurements Updated",
                    data: data.measurements
                });
            }).catch(err => {
                console.error(err);
                next(new Error('Error Updating Measurements'))
            })
        });
    }
};

export default profileController;
