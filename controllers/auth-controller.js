import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';
import {OAuth2Client} from 'google-auth-library';
import config from '../config/config' ;
import rp from 'request-promise';
import request from 'request';

const IOS_CLIENT_ID = config.IOS_CLIENT_ID;
// const ANDROID_CLIENT_ID = config.ANDROID_CLIENT_ID ;
const WEB_CLIENT_ID = config.WEB_CLIENT_ID;

const client = new OAuth2Client(WEB_CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [IOS_CLIENT_ID, WEB_CLIENT_ID]
    });

    const payload = ticket.getPayload();
    return payload;
}


let authController = {
    signup: (req, res, next) => {
        let user = new Client({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        if (!req.body.password) {
            next(new Error("No Password Provided"));
        }

        let token = new Token(user).getToken();
        user.save((err) => {
            if (err) {
                next(new Error("Error in Saving Profile"))
            }
            res.json({
                success: true,
                message: constants.CREATED_USER,
                token: token
            });
        });
    },

    login: (req, res, next) => {
        Client.findOne({
            email: req.body.email
        }).select('name username password').then((user) => {
            console.log(!user);

            if (!user) {
                next(new Error(constants.USER_NOT_EXITS));
            }
            if (!req.body.password) {
                next(new Error("No Password Provided"));
            }
            if (!user.password) {
                next(new Error("Use Google Login"));
            }

            let validPassword = user.comparePassword(req.body.password);

            if (!validPassword) {
                next(new Error(constants.INVALID_PASS));
                // res.status(402).send({message: constants.INVALID_PASS});
            } else {
                let token = new Token(user).getToken();
                res.json({
                    success: true,
                    message: constants.LOGIN_SUCCESS,
                    token: token
                });
            }
        }).catch(err => {
            throw err;
        });
    },
    googleLogin: (req, res, next) => {
        // console.log(req.body)
        Client.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                throw err;
            }

            let token = req.body.googleToken;
            verify(token)
                .then(data => {
                    console.log(data);

                    if (!user) {
                        user = new Client({
                            name: req.body.name,
                            email: req.body.email,
                            // googleToken: req.body.googleToken
                        });
                    }
                    user.save().then(data => {


                    }).catch(err => {
                        console.error(err);
                        next(err);
                    });
                    // user.payload = data
                    let token = new Token(user).getToken();
                    res.json({
                        success: true,
                        message: constants.LOGIN_SUCCESS,
                        token: token
                    });
                })
                .catch(err => {
                    // console.log("Catched");
                    console.error(err);
                    next(new Error(constants.INVALID_GTOKEN));
                })
        })

    },
    facebookLogin: (req, res, next) => {
        // console.log(req.body)
        Client.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                throw err;
            }

            const inspectToken = req.body.fbToken;
            const app_id = config.FB_APP_ID;
            const app_secret = config.FB_CLIENT_SECRET;
            const url_me=`https://graph.facebook.com/me?access_token=${inspectToken}&fields=name,email`
            const url = `https://graph.facebook.com/debug_token?access_token=${app_id}|${app_secret}&input_token=${inspectToken}`;
            // console.log(url);


            request(url, function (error, response, body) {
                let data = JSON.parse(body).data;
                if (data.error) {
                    next(new Error(data.error.message));
                }
                if (data.app_id != app_id) {
                    next(new Error('Token Not Valid for App'));
                }
                // if(data.user_id != req.body.user_id) {
                //     next(new Error('User Does Not Match'));
                // }
                request(url_me , function (error , response_me , body_me) {
                    let profile = JSON.parse(body_me);
                    console.log(profile);
                    if (data.error) {
                        next(new Error(profile.error.message));
                    }
                    if(profile.email != req.body.email){
                        next(new Error('Email Does not Match'));
                    }


                    if (!user) {
                        user = new Client({
                            name: req.body.name,
                            email: req.body.email
                        });
                        user.save().then(data => {
                            console.log("New User Saved");
                        }).catch(err => {
                            console.error(err);
                            next(new Error('Unable to Save User'))
                        })
                    }


                    let token = new Token(user).getToken();
                    res.json({
                        success: true,
                        message: constants.LOGIN_SUCCESS,
                        token: token
                    });

                })

            });
        });
    },
};

export default authController;
