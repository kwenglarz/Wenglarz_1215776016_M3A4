const db = require('../config/db.manager');

exports.getAllCustomers = function (req, res) {
    const customers = db.getSalesCustomers().then(results => {
        console.log(results);
        res.status(200).json({
            status: 'successful',
            data: results.recordsets[0]
        }); // send all the data
    });
}

exports.getCustomersByID = function( req, res){
    const {id} = req.params; // get id
    res.status(200).json({
        status: 'no implemented'
    });
}

// must select the body to be raw -> JSON in Postman
exports.createNewCustomers = function( req, res){ 
    const {body} = req; // req.body (attribute)
    const {id} = req.params; // get id (attribute)
    
    res.status(200).json({
        status: 'no implemented'
    });
}

// must select the body to be raw->JSON in Postman
exports.patchCustomersByID = function( req, res){ 
    const {body} = req; // req.body (attribute)
    const {id} = req.params; // get id (attribute)

    res.status(200).json({
        status: 'no implemented'
    });
}

// must select the body to be raw->JSON in Postman
exports.deleteCustomersByID = function( req, res){ 
    const {body} = req;// req.body (attribute)
    const {id} = req.params;// get id

    res.status(200).json({
        status: 'no implemented'
    });
}