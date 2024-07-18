const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(helmet());
// app.use(cors({
//    origin: 'https://portfolio-frontend-mocha.vercel.app/contact', // Your frontend URL
//    methods: ['GET','POST','PUT','DELETE'],
//    credentials: true // Enable this if you need to include cookies in the requests


// }))
// MongoDB URI from environment variables
const mongoURI =  'mongodb+srv://marathe8459:CGuJOltNN08n1TJM@cluster0.oco9nvd.mongodb.net/Cluster0?retryWrites=true&w=majority';

    

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define a schema and model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

// using build command
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//  send the welcome page for the backend
// app.get('/',(req,res)=>{
//   res.send('Welcome to the backend')
// })

// get all the data 

app.get('/api/info',async (req,res)=>{
  const result = await Contact.find();
  res.send(result);
 

})

// Define routes
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();
    res.status(201).json({ message: 'Message received to the database',
      
     });
  } catch (error) {
    console.error('Error saving message:', error.message);
    res.status(500).json({ error: 'Error saving message' });
  }
});

// Start the server
const port = 5000 || process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

