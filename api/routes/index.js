//Get Router Module from express
const express = require('express');
const router = express.Router();

const ctrlAuth = require('../controller/authenticationController');


// Hotel routes
/*router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne);*/

//Test route for authentication
router
  .route('/test')
  .get(ctrlAuth.authenticate,(req,res)=>{
    res.status(200).json({
      success: true,
      message: 'Hat geklappt',
      username: req.username
    });
  });

// Authentication
router
  .route('/register')
  .post(ctrlAuth.register);

  router
    .route('/token')
    .post(ctrlAuth.token);

module.exports = router;
