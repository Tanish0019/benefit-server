/**
 * @api {get} /profile Read data of a User
 * @apiName GetProfile
 * @apiGroup Profile
 *
 * @apiSuccess {Boolean}  success      		Response status.
 * @apiSuccess {Object} client      		The client object containing all client details.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "success": true,
 *      "client": {
 *		"_id": "5b1164d91d75b0e8a4847403",
 *		"email": "user@gmail.com",
 *		"name": "User",
 *		"mobile": "999999999",
 *		"gender": "male",
 *		"goal": 2,
 *		"lifestyle": 1,
 *		"coach": "5b1164d91d75b0e8a4847404",
 *		"premium-expiry": "2018-09-22",
 *		"premium-start": "2018-08-22"
 *		}
 *     }
 */


/**
* @api {post} profile/update Update user's data
* @apiName PostProfileUpdate
* @apiGroup Profile
*
* @apiParam {String} 	name 		User's name.
* @apiParam {String}    mobile 		User's mobile number.
* @apiParam {String}    gender 		User's gender.
* @apiParam {Number}    goal 		User's goal.
* @apiParam {Number} 	lifestyle 	User's goal.
*
*
* @apiSuccess {Boolean}  success      		Response status.
* @apiSuccess {Object} client      		The client object containing all client details after updating.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "success": true,
*      "client": {
*		"_id": "5b1164d91d75b0e8a4847403",
*		"email": "user@gmail.com",
*		"name": "User",
*		"mobile": "999999999",
*		"gender": "male",
*		"goal": 2,
*		"lifestyle": 1,
*		"coach": "5b1164d91d75b0e8a4847404",
*		"premium-expiry": "2018-09-22",
*		"premium-start": "2018-08-22"
*		}
*     }
*/

/**
* @api {post} profile/measurements Post/Update user's measurements
* @apiName PostMeasurements
* @apiGroup Profile
*
* @apiParam {String} 	date 		date on which measurement was taken.
* @apiParam {Number}    weight 		User's weight.
* @apiParam {Number}    height 		User's height.
* @apiParam {Number}    waist 		User's waist measurements.
* @apiParam {Number} 	neck 		User's neck measurements.
* @apiParam {Number} 	hip 		User's hip measurements.
*
* @apiSuccess {Boolean}  success      	Response status.
* @apiSuccess {String}   message		Response message.
* @apiSuccess {Object}   data		    The object containing all measurements of the client.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "success": true,
*	   "message": "Measurements Updated"
*      "data": {
*		"_id": "5b1164d91d75b0e8a4847403",
*		"client": "5b1164d91d75b0e8a4847404",
*		"weight": 69,
*		"height": 195,
*		"waist": 34,
*		"neck": 1,
*		"hip": 1
*		}
*     }
*/

/**
* @api {get} profile/measurements/history Read User's measurements
* @apiName GetMeasurementHistory
* @apiGroup Profile
*
*
* @apiSuccess {Boolean}  success      	Response status.
* @apiSuccess {String}   message		Response message.
* @apiSuccess {Object}   data    The measurement object containing all measurements of the client.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "success": true,
*	   "message": "Measurements History"
*      "data": [{
*		"_id": "5b1164d91d75b0e8a4847403",
*		"client": "5b1164d91d75b0e8a4847404",
*		"weight": 69,
*		"height": 195,
*		"waist": 34,
*		"neck": 1,
*		"hip": 1
*		}, {
*		"_id": "5b1164d91d75b0e8a4847403",
*		"client": "5b1164d91d75b0e8a4847404",
*		"weight": 69,
*		"height": 195,
*		"waist": 34,
*		"neck": 1,
*		"hip": 1
*		}, {
*		"_id": "5b1164d91d75b0e8a4847403",
*		"client": "5b1164d91d75b0e8a4847404",
*		"weight": 69,
*		"height": 195,
*		"waist": 34,
*		"neck": 1,
*		"hip": 1
*		}]
*     }
*/

/**
* @api {get} profile/measurements/latest Read User's latest measurements
* @apiName GetMeasurementLatest
* @apiGroup Profile
*
*
* @apiSuccess {Boolean}  success      	Response status.
* @apiSuccess {String}   message		Response message.
* @apiSuccess {Object}   data    		The object containing all measurements of the client.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "success": true,
*	   "message": "Latest Measurement"
*      "data": {
*		"_id": "5b1164d91d75b0e8a4847403",
*		"client": "5b1164d91d75b0e8a4847404",
*		"weight": 69,
*		"height": 195,
*		"waist": 34,
*		"neck": 1,
*		"hip": 1
*		}
*     }
*/
