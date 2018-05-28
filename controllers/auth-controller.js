import Client from '../models/client';
import Token from '../common/token';
import constants from '../constants/constants';



let authController = {
    signup: (req, res) => {
      let user = new Client({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      let token = new Token(user).getToken();
      user.save((err) => {
        if(err) {
          res.send(err);
          return;
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
        if(err) {
          throw err;
        }
        if(!user) {
          res.status(401).send({ message: constants.USER_NOT_EXITS });
        } else {
          let validPassword = user.comparePassword(req.body.password);
          if(!validPassword) {
            res.status(402).send({ message: constants.INVALID_PASS });
          } else {
            let token = new Token(user).getToken();
            res.json({
              success: true,
              message: constants.LOGIN_SUCCESS,
              token: token
            });
          }
        }
      });
    }

    loginGoogle: (req, res) => {
      Client.findOne({
        email: req.body.email
      }).select('name email password').exec((err, user) => {
        if(err) {
          throw err;
        }
        if(!user) {
          res.status(401).send({ message: constants.USER_NOT_EXITS });
        } else {
          let validGoogleToken = 1;//TODO validate google auth token
          if(!validPassword) {
            res.status(402).send({ message: "Failed.\nLogin again." });
          } else {
            let token = new Token(user).getToken();
            res.json({
              success: true,
              message: constants.LOGIN_SUCCESS,
              token: token
            });
          }
        }
      });
    }

    
};



export default authController;
