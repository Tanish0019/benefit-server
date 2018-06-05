import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';
import {OAuth2Client} from 'google-auth-library';

const CLIENT_ID = '352356064520-5qtenuib63i9ukps3o6s50m97scg8050.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();
    return payload;
}


let authController = {
    signup: (req, res) => {
        let user = new Client({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        if(!req.body.password){
            throw new Error("No Password Provided");
        }

        let token = new Token(user).getToken();
        user.save((err) => {
            if (err) {
                throw err;
            }
            res.json({
                success: true,
                message: constants.CREATED_USER,
                token: token
            });
        });
    },

    login: (req, res) => {
        Client.findOne({
            email: req.body.email
        }).select('name email password').exec((err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                res.status(401).send({message: constants.USER_NOT_EXITS});
            }
            let validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.status(402).send({message: constants.INVALID_PASS});
            } else {
                let token = new Token(user).getToken();
                res.json({
                    success: true,
                    message: constants.LOGIN_SUCCESS,
                    token: token
                });
            }

        });
    },
    googleLogin: (req, res) => {
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
                        res.status(402).send({message: constants.INVALID_GTOKEN});
                    })
            }).catch(err => {
                console.error(err);
                throw err ;
            })


        });
    }
};

export default authController;
