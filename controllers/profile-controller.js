import Client from '../models/client';
import Measurement from '../models/measurement' ;
import Token from '../common/token';
import constants from '../constants/constants';

let profileController = {
    update: (req, res, next) => {

        console.log(req.decoded);
        console.log(req.body);
        Client.findOneAndUpdate({
            email: req.decoded.email
        }, req.body, {new: true}).then((client) => {

            if (!client) {
                return next(new Error("Client Not Found"));
            }

            res.json({
                success: true,
                data: client
            });
        }).catch((err) => {
            return next(new Error('Error Retrieving Profile'))
        })
    },
    get: (req, res, next) => {

        // console.log(req.decoded);
        // console.log(req.body);
        Client.findOne({
            email: req.decoded.email
        }).then((client) => {

            if (!client) {
                return next(new Error("Client Not Found"));
            }

            res.json({
                success: true,
                data: client
            });
        }).catch((err) => {
            next(new Error('Error Retrieving Profile'))
        })
    },

    editMeasurements: (req, res, next) => {
        console.log(req.decoded);
        // date format DD/MM/YYYY 
        let date = req.body.date;
        delete req.body.date;

        Measurement.findOneAndUpdate({
            client: req.decoded.id,
            date: date
        }, req.body, {
            upsert: true,
            new: true
        }).then(measurement => {


            res.json({
                success: true,
                message: "Measurements Updated",
                data: measurement
            });
        }).catch(err => {
            console.error(err);
            next(new Error('Error Updating Measurements'))
        })
    },

    measurementsHistory: (req, res, next) => {
        Measurement.find({
            client: req.decoded.id
        }).limit(10).sort('-date').then(data => {
            res.json({
                success: true,
                message: "Measurements History",
                data: data
            });
        }).catch(err => {
            console.error(err);
            next(new Error('Error Fethcing Measurements'))
        })
    },


    measurementsLatest: (req, res, next) => {
        Measurement.findOne({
            client: req.decoded.id
        }).limit(1).sort('-date').then(data => {
            res.json({
                success: true,
                message: "Latest Measurement",
                data: data
            });
        }).catch(err => {
            console.error(err);
            next(new Error('Error Fethcing Measurements'))
        })
    }
}

export default profileController;
