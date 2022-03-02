const express = require('express')
const app = require('express')()
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')

const razorpay = new Razorpay({
    key_id:'rzp_test_iVsooFXKAdGL4q',
    key_secret:'ybsLhjklU1nxW7BQTVKOznka'
})
   
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,"client","build")));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build/', 'index.html'));
    console.log("Port :5000");
})


// app.get('/logo.svg', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'logo.svg'))
// })

app.post('/verification', (req, res) => {
	// do a validation
	const secret = '123456789'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
    console.log("request from client",req.body);
	const payment_capture = 1
	const amount = req.body.amount * 100
	const currency = 'INR'

	const options = {
		amount,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

app.listen(5000, () => {
	console.log('Server Listening on 5000')
})
