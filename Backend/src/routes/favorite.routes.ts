import { Router } from 'express';
import { FavoriteController } from '../controller/favorite.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.post('/:propertyId', restrictTo('user'), FavoriteController.toggleFavorite);
router.get('/my-list', restrictTo('user'), FavoriteController.getFavorites);

export default router;