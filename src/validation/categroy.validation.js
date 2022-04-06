const { body, param } = require('express-validator');
const { User } = require('../model/user.model');
const { promise } = require('bcrypt/promises');
const { query } = require('express');
const { Category } = require('../model/categroy.model');
const mongoDbServiceCategroy = require("../service/mongoDbService")({ model: Category});


module.exports = {
    //  GET  /categroy
    categoryget: [
        param('id').custom(value => {
            return mongoDbServiceCategroy.getDocumentById(value)
            .then((category) => {
                if(!category){
                return Promise.reject('can not found ID')
                }
            })
        }).optional()
    ],
    // POST  /categroy
    categorypost:[
        body('categoryName', "categroy name is required").exists()
    ],
    // PUT /categroy
    categroyput:[
        body('categoryName','categroy name is required').exists()
    ],
    // DELETE  /categroy
    categroydelete:[
        param('id').custom(value => {
            return mongoDbServiceCategroy.getDocumentById(value)
            .then((category) => {
                if(!category){
                return Promise.reject('can not found ID')
                }
            })
        }),
    ]
}