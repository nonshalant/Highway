const express = require('express');  
const routes = require('./Routes/api/api');    
const connectDB = require('./config/db');
const cors = require('cors');
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
    origin: 'https://highway-client.onrender.com',
    credentials: true,
};

app.use(cors(corsOptions));

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