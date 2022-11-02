const router = require('express').Router();
const Item_Schema = require('../models/item.add')
router.route('/addItem').post((req, res) => {

    const name = req.body.name;
    const date = req.body.date;
    const price = req.body.price;
    const brand = req.body.brand;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const image = req.body.image;

    const item = new Item_Schema({ name, date, price, brand, description, quantity, image });

    item.save()
        .then(() => res.json('Item Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/allItems").get(async (req, res) => {
    Item_Schema.find()
        .then(brand => res.json(brand))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteItem/:id").delete(async (req, res) => {
    let id = req.params.id;
    Item_Schema.findOneAndDelete({ _id: id }).then(() => {
        res.status(200).send({ status: "Item Deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Deleting Data", error: err.message });
    });
});

router.route("/ItemUpdate/:id").put(async (req, res) => {
    let id = req.params.id;
    const { name, date, price, brand, description, quantity, image } = req.body;

    const ItemUpdate = {
        name, date, price, brand, description, quantity, image
    }
    const update = await Item_Schema.findByIdAndUpdate(id, ItemUpdate).then(() => {
        res.status(200).send({ status: "Item Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});


router.route("/search/:key").get(async (req, res) => {
    let result = await Item_Schema.find({
        "$or": [
            { name: { $regex: req.params.key } }
        ]
    })
    res.send(result)
});


module.exports = router;