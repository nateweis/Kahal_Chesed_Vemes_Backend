const express = require('express')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3001 ; 

// /////////////////////////////////////////
// MiddleWear
// ////////////////////////////////////////

app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true)
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next();
})

// /////////////////////////////////////////
// Routes
// ////////////////////////////////////////
const userContoller = require('./controllers/userRoutes')
app.use('/users', userContoller)

const msgContoller = require('./controllers/msgRoutes')
app.use('/messages', userContoller)

// Stripe Charge Route
app.post("/stripeCheckout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.amount[0],
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(port, ()=>{console.log("Khala Chesed Vemes backend is running on port "+ port + (process.env.PORT? " :: env working" : " ") )})