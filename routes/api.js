import express from 'express';

import authRouter from './auth' ;

// import authenticate from '../middlewares/authenticate';


let router = express.Router();



router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.json({
      message: 'Hello world!'
    })
});

export default router;
