import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router();

// Both the routing methods work ‎😃

// router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.get('/', RestaurantsCtrl.apiGetRestaurants)
router.get('/id/:id', RestaurantsCtrl.apiGetRestaurantsById)
router.get('/cuisines', RestaurantsCtrl.apiGetRestaurantsCuisines)


// router
//     .route('/review')
//     .post(ReviewsCtrl.apiPostReview)
//     .put(ReviewsCtrl.apiUpdateReview)
//     .delete(ReviewsCtrl.apiDeleteReview)
router.post('/review', ReviewsCtrl.apiPostReview)
router.put('/review', ReviewsCtrl.apiUpdateReview)
router.delete('/review', ReviewsCtrl.apiDeleteReview)


export default router;