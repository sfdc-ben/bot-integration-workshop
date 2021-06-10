const functions = require('firebase-functions');
const app = require('express')()
const main = require('express')()
const cors = require('cors');

const {
  getStoreIsOpen
} = require('./apis/storeIsOpen')

const {
  getShipments,
  getShipmentDetails
} = require('./apis/shipmentStatus')

// const {
//     getOrderStatus
// } = require('./apis/orderStatus')

// const {
//     postReturnOrder
// } = require('./apis/returnOrder')

// const {
//     postCustomAlert
// } = require('./apis/customAlert')

app.get('/stores/:storeName', getStoreIsOpen)
app.get('/shipments/:email', getShipments)
app.get('/shipments/order/:order', getShipmentDetails)
// app.get('/orders/status/:orderId', getOrderStatus)
// app.post('/return', postReturnOrder)
// app.post('/alert', postCustomAlert)

app.use(cors({ origin: true }))
main.use(cors({ origin: true }))
main.use('/api/v1', app)
exports.exampleIntDemo = functions.https.onRequest(main)