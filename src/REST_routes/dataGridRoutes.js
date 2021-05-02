const express = require('express');
const router = express.Router();
//const { getTransactions, addTransaction, deleteTransaction } = require('../REST_controllers/transactions');
const {getAppointments, crudAppointments } = require('../REST_controllers/dataGridControllers');

router
  // .route('/')
  // //.get(getAppointments)
  // .post(getAppointments);

// router
//   .route('/:id')
//   .delete(deleteTransaction);
router
  .route('/DataSource')
  .post(getAppointments);

router
  .route('/Insert')
  .post(crudAppointments);

router
  .route('/Update')
  .post(crudAppointments);

router
  .route('/Delete')
  .post(crudAppointments);
  
module.exports = router;