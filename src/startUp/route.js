const express = require('express');
const user = require('../route/user.route');
const category = require('../route/categroy.route');
const auth = require('../route/auth.route');
const appointment = require('../route/appointment.route');
const presciption = require('../route/prescription.route');

module.exports = (app)=>{
    app.use(express.json());
    app.use('/api/user', user);
    app.use('/api/category', category);
    app.use('/api/auth', auth);
    app.use('/api/appointment', appointment);
    app.use('/api/presciption', presciption);
};