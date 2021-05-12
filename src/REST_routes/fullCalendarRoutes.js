const express = require("express");
const router = express.Router();
//const { getTransactions, addTransaction, deleteTransaction } = require('../REST_controllers/transactions');
const {
  searchPatients,
  getAppointments,
  crudAppointments,
} = require("../REST_controllers/fullCalendarControllers");

router;
// .route('/')
// //.get(getAppointments)
// .post(getAppointments);

// router
//   .route('/:id')
//   .delete(deleteTransaction);

router.route("/patients").post(searchPatients);

router.route("/crud").post(crudAppointments);

//router.route("/getDataFull?").post(getAppointments);
router.route("/getDataFull?").get(getAppointments);

router.route("/crud/:batch").post(crudAppointments);

module.exports = router;
