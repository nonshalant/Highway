const express = require('express');  
const routes = require('./Routes/api/api');    
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(32).toString('hex');;
const http = require('http');
const {Server} = require('socket.io');

// setup express 
const app = express();

// Connect DB
// connectDB();

const PORT = process.env.PORT || 5000

// Middleware 
app.use(express.json({extended: true}))
// const corsOptions = {
//     origin: 'localhost:3000', // Replace with your frontend domain
//     credentials: true, // Allow credentials (cookies)
// };

// Configure session store 
// app.use(cors(corsOptions));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Set the session cookie's maximum age (e.g., 1 week)
        secure: false, // Set to true if you are using HTTPS
        httpOnly: true, // Recommended for security reasons
    },
}));

// Defining the Restfull Routes  
app.use('/user', require('./Routes/api/users'));
app.use('/auth', require('./Routes/api/auth'));
app.use('/profile', require('./Routes/api/profile'));
app.use('/cart', require('./Routes/api/cart'));
app.use('/favorite', require('./Routes/api/favorite'));
app.use('/address', require('./Routes/api/address')); 
app.use('/create-payment-intent', require('./Routes/api/checkout'));
app.use('/payment-success', require('./Routes/api/success'));
app.use(express.urlencoded({extended:false}));
app.use(routes); 
app.set('port', 5000)

app.listen(PORT, ()=>{
    console.log('listen', PORT)   
});  

// SOCKET IO SERVER 
// const server = http.createServer(app);

// const io = new Server(server, {
//     // cors: {
//     //     origin: 'http://localhost:3000',
//     //     methods: ["GET", "POST"]
//     // }
// });

// io.on('connection', (socket)=>{
//     console.log("user connected", `${socket.id}`)
// })

// server.listen(8000, ()=>{
//     console.log('server is running')
// });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shamirg:Nonshalant98@cluster0.g6ay98p.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);