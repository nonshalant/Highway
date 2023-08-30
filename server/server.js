const express = require('express');  
const routes = require('./Routes/api/api');    
const connectDB = require('./config/db');
const cors = require('cors');
// const session = require('express-session');
// const crypto = require('crypto');
// const sessionSecret = crypto.randomBytes(32).toString('hex');;
// const http = require('http');
// const {Server} = require('socket.io');

// setup express 
const app = express();

// Connect DB
connectDB();

const PORT = process.env.PORT || 10000

// Middleware 
app.use(express.json({extended: true}))
const corsOptions = {
    origin: 'https://highway-client-server.onrender.com',
    credentials: true,
};

app.use(cors(corsOptions));

app.options('/auth', cors(corsOptions), (req, res) => {
    // Set appropriate CORS headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200); // Respond with a 200 status
});

// app.use(session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7, // Set the session cookie's maximum age (e.g., 1 week)
//         secure: false, // Set to true if you are using HTTPS
//         httpOnly: true, // Recommended for security reasons
//     },
// }));

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
app.set('port', 10000)

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