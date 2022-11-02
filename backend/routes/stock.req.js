const router = require('express').Router();
let Stock_req_Schema = require('../models/stock.req');

router.route('/addreqest').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const supplier = req.body.supplier;
    const Date = req.body.Date;
    const Time = req.body.Time;
    const Site = req.body.Site;
    const Price = req.body.Price;
    const userName = req.body.userName;
    const status = "Send";

    const channel_booking = new Stock_req_Schema({Price,name, email, telephone1, supplier,Date,Time, Site, status,userName,Price});

    channel_booking.save()
        .then(() => res.json('Channel Booking Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/deleteReq/:id").delete(async (req, res) => {
        let id = req.params.id;
        Stock_req_Schema.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"Book Cancled"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with  Data",error: err.message});
        });
    });

router.route("/allreqests").get(async (req, res) => {
        Stock_req_Schema.find()
                .then(ChannelBooking => res.json(ChannelBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allreqests/:userName").get(async (req, res) => {
        Stock_req_Schema.find({userName : req.params.userName , status : 'Send'})
                .then(ChannelBooking => res.json(ChannelBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/allServiceUnBooking/:userName").get(async (req, res) => {
        Stock_req_Schema.find({userName : req.params.userName , status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allServiceUnbooking").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/pending").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Send'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/reqAccept").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Accept'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});



router.route("/reqReject").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Reject'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/reqComplete").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Complete'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/reqSend").get(async (req, res) => {
        Stock_req_Schema.find({status : 'Shipped'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/statusUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Unbooking';

        const statusUpdate={
          status
        }
        const update = await Stock_req_Schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/statusUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const statusUpdate={
          status
        }
        const update = await Stock_req_Schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/AcceptUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Accept';

        const statusUpdate={
          status
        }
        const update = await Stock_req_Schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/editreqest/:id").put(async (req,res) => {
        let id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const telephone1 = req.body.telephone1;
        const supplier = req.body.supplier;
        const Date = req.body.Date;
        const Time = req.body.Time;
        const Site = req.body.Site;
        const Price = req.body.Price;

        const statusUpdate={
                name, email, telephone1,supplier,Date,Time,Site,Price
        }
        const update = await Stock_req_Schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Channel book Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/deletereq/:id").delete(async (req, res) => {
        let id = req.params.id;
        Stock_req_Schema.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({status :"request Deleted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
        let result = await Stock_req_Schema.find({
            "$or":[
                {name:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });

module.exports = router;