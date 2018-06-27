import Client from '../models/client';
import Tracking from '../models/tracking'

const trackingController = {
	getDetails: (req, res, next) => {
		Tracking.find({
			client: req.decoded.id
		}).then(data => {
			res.json({
				success: true,
				message: "Tracking details found",
				data: data
			})
		}).catch(err => {
			return next(new Error("Some Error Occured"));
		})
	},

	postDetails: (req, res, next) => {
        Tracking.findOneAndUpdate({
            client: req.decoded.id ,
            date: req.body.date,
            time: req.body.time
        }, req.body, {
        	upsert: true,
        	new: true
        }).then((data) => {
        	res.json({
                success: true,
                message: "Tracking details Updated",
                data: data
            });
        }).catch(err => {
            return next(new Error("Some Error Occured"));
        })
    }
}

export default trackingController;