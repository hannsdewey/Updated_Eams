const router = require("express").Router();
let EmpDetails = require("../models/EmpDetails");

router.route("/").get((req, res) => {
  EmpDetails.find()
    .then((empDetails) => res.json(empDetails))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const address = req.body.address;

  const newEmpDetails = new EmpDetails({
    fullname,
    email,
    phonenumber,
    address,
  });

  newEmpDetails
    .save()
    .then(() => res.json("Employee Details added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
