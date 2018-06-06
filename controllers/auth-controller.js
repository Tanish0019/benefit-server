import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';
import {OAuth2Client} from 'google-auth-library';
import config from '../config/config' ;

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
    signup: (req, res ,next) => {
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

    login: (req, res , next) => {
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
    googleLogin: (req, res , next) => {
        // console.log(req.body)
        Client.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                user = new Client({
                    name: req.body.name,
                    email: req.body.email,
                    googleToken: req.body.googleToken
                });

            }
            user.save().then(data => {
                let token = req.body.googleToken;
                verify(token)
                    .then(data => {
                        console.log(data);
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
            }).catch(err => {
                console.error(err);
                next(err);
            })


        });
    }
};

export default authController;
