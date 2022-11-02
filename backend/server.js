require('dotenv').config()
const express = require('express')
const app = express()
const dbConfig = require("./config/dbConfig")
const userRoute = require("./routes/userRoutes")
const cors = require('cors');



app.use(cors());
app.use(express.json())
app.use('/api/user',userRoute)






const item_add = require('./routes/item.add.js');
app.use('/itemadd', item_add);


const sites = require('./routes/sites.js');
app.use('/sites', sites);


const stockReq = require('./routes/stock.req.js');
app.use('/stockReq', stockReq);

const supplier = require('./routes/supplier.js');
app.use('/supplier', supplier);


const payment = require('./routes/payment.js');
app.use('/payment', payment);






const port  = process.env.PORT|| 5000;

app.listen(port,()=>console.log(`Backend Node Server start on port ${port}`))