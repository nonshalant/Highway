
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//         })
//           console.log('Mongo connected!!!')
//     } catch (error) {
//         console.error(error.message)
//         process.exit(1)
//     }
// } 

// module.exports = connectDB

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://shamirg:Nonshalant98@cluster0.g6ay98p.mongodb.net/?retryWrites=true&w=majority";


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
