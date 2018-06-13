import Coach from '../../models/coach';
import Token from '../../common/token';
import constants from '../../constants/constants';

const authController = {
	signup: (req, res, next) => {
        let coach = new Coach({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        if (!req.body.password) {
            next(new Error("No Password Provided"));
        }

        let token = new Token(coach).getToken();
        coach.save((err) => {
            if (err) {
                return next(new Error("Error in Saving Profile"))
            }
            res.json({
                success: true,
                message: constants.CREATED_USER,
                token: token
            });   
        });
    },

    login: (req, res, next) => {
        Coach.findOne({
            email: req.body.email
        }).select('name email password username').then((coach) => {

            if (!coach) {
                next(new Error(constants.USER_NOT_EXITS));
            }
            if (!req.body.password) {
                next(new Error("No Password Provided"));
            }
            
            let validPassword = coach.comparePassword(req.body.password);

            if (!validPassword) {
                next(new Error(constants.INVALID_PASS));
                // res.status(402).send({message: constants.INVALID_PASS});
            } else {
                console.log("Coach :" , coach);
                let token = new Token(coach).getToken();
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
};

export default authController;
