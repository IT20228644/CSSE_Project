const router = require('express').Router();
let supplier_schema = require('../models/supplier');

router.route('/addNewSupplier').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const address = req.body.address;
    const Supplier_data = new supplier_schema({name , email , telephone1 ,address });

    Supplier_data.save()
        .then(() => res.json('New Supplier Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});




router.route("/allSuppliers").get(async (req, res) => {
    supplier_schema.find()
            .then(suppliers => res.json(suppliers))
            .catch(err => res.status(400).json('No Data'))
});


router.route("/supllierUpdate/:id").put(async (req,res) => {
    let id = req.params.id;
    const {name , email , telephone1 ,address}= req.body;

    const reqUpdate={
        name , email , telephone1 ,address
    }
    const update = await supplier_schema.findByIdAndUpdate(id,reqUpdate).then(() => {
        res.status(200).send({status :"Supplier Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating Data",error: err.message});
    });


});

router.route("/deleteSupplier/:id").delete(async (req, res) => {
    let id = req.params.id;
    supplier_schema.findByIdAndDelete(id).then(() => {
            res.status(200).send({status :"Supplier Deleted"});
    }).catch((err) => {
        console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/search/:key").get(async (req, res) => {
    let result = await supplier_schema.find({
        "$or":[
            {name:{$regex:req.params.key}}
        ]
    })    
    res.send(result)
});

module.exports = router;