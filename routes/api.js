import express from 'express';

import authRouter from './auth' ;
import profileRoutes from './profile' ;
import authenticate from "../middlewares/authenticate";


let router = express.Router();


router.use('/auth', authRouter);
router.use('/profile', authenticate, profileRoutes);

router.get('/', (req, res) => {
    res.json({
        message: 'Hello world!'
    })
});

router.use(function (error, req, res, next) {
    res.json({
        success: false,
        mesage: error.message
    });
});

export default router;
