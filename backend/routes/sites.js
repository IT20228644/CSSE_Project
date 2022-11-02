const router = require('express').Router();
let Site_Schema = require('../models/sites');

router.route('/addSite').post((req,res) => {
    const location = req.body.location;
    const name = req.body.name;
    const address = req.body.address;
    const telephone = req.body.telephone;
    const email = req.body.email;


    const Medical_center = new Site_Schema({location ,name, address  ,telephone, email });

    Medical_center.save()
        .then(() => res.json('Site Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allSites").get(async (req, res) => {
        Site_Schema.find()
                .then(Service_center => res.json(Service_center))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteSite/:location").delete(async (req, res) => {
        let location = req.params.location;
        Site_Schema.findOneAndDelete({location : location}).then(() => {
                res.status(200).send({status :"Site Deleted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/SiteUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {location ,name, address  ,telephone  , email}= req.body;

        const Service_centerUpdate={
            location ,name, address  ,telephone, email 
        }
        const update = await Site_Schema.findByIdAndUpdate(id,Service_centerUpdate).then(() => {
            res.status(200).send({status :"Medical Center Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
        let result = await Site_Schema.find({
            "$or":[
                {location:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });

module.exports = router;