import express from 'express';

import clientController from '../../controllers/coach/client-controller'
let router = express.Router();

router.get( '/', clientController.getMyClients);

export default router;
