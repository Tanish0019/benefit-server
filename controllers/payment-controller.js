import request from 'request';
import config from '../config/config' ;

const paymentController = {

    getAccessToken: (req, res, next) => {

        let url = "https://test.instamojo.com/oauth2/token/";

        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'} ,
            url: url,
            formData: {
                grant_type: 'client_credentials',
                client_id: config.INSTAMOJO_CLIENT_ID,
                client_secret: config.INSTAMOJO_CLIENT_SECRET
            }
        }, function (error, response, body) {
            body = JSON.parse(body);
            res.send("production"+body.access_token);
          //  res.send("production+body.expresstoken)
        });
    }

};

export default paymentController;