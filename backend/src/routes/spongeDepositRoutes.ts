import { RequestHandler, Router } from 'express';
import SpongeDepositController from '../controllers/spongeDeposit';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router
    .get('/spongeDeposit', AuthMiddleware.ensureAuthenticated, SpongeDepositController.getUser)
    .post('/spongeDeposit', SpongeDepositController.createUser)
    .patch('/spongeDeposit', AuthMiddleware.ensureAuthenticated, SpongeDepositController.updateUser)   
    .delete('/spongeDeposit', AuthMiddleware.ensureAuthenticated, SpongeDepositController.deleteUser)

export default router;