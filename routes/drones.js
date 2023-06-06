const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then(allDrones => {
      console.log('allDrones', allDrones)
      res.render('drones/list', {drones: allDrones})
    })
    .catch(err => console.log(err));
});

router.get('/drones/create', (req, res, next) => {
  Drone.create()
    .then(newDrone => {
    console.log('newDrone', newDrone)
    res.render('drones/create-form', { drone: newDrone })
  })
    .catch(err => console.log(err));
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body
  Drone.create({ name, propellers, maxSpeed })
    .then(res.redirect('/drones'))
    .catch(err => {
      console.log(err)
      res.render('drones/create-form')
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  Drone.findById(req.params.id)
    .then(droneToUpdate => {
      res.render('drones/update-form', {drone: droneToUpdate})
    })
    .catch(err => console.log(err));
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, {new: true})
    .then(updatedDrone => {
      console.log('updatedDrone', updatedDrone)
      res.redirect('/drones')
    })
    .catch(err => {
      console.log(err)
      res.render('drones/update-form', {drone: droneToUpdate})
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  Drone.findByIdAndDelete(req.params.id)
    .then(deletedDrone => {
      console.log('deletedDrone', deletedDrone); 
      return Drone.find();
    })
    .then(allDrones => {
      res.render('drones/list', { drones: allDrones });
    })
    .catch(err => console.log(err));
});

module.exports = router;
