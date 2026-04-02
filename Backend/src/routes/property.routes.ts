import { Router } from 'express';
import { PropertyController } from '../controller/property.controller.js';
import { decodeUserIfLoggedIn, protect, restrictTo } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', decodeUserIfLoggedIn, PropertyController.getActive);

router.post('/',
  protect,
  restrictTo('agent'),
  upload.array('images', 5),
  PropertyController.create
);

router.delete('/:id',
  protect,
  restrictTo('agent'),
  PropertyController.delete
);

router.get('/my-listings', protect, restrictTo('agent'), PropertyController.getMyListings);


export default router;