import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ycce1db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema with more fields
const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gmail: { type: String, required: true },
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Example route
app.get('/users', async (req, res) => {
  const users = await User.find({}, 'loginId');
  res.json(users);
});
// Register endpoint
app.post('/register', async (req, res) => {
  const { fname, lname, gmail, loginId, password } = req.body;
  try {
    const user = new User({ fname, lname, gmail, loginId, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { loginId, password } = req.body;
  try {
    const user = await User.findOne({ loginId, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert dummy users on server start (for demo only)
async function insertDummyUsers() {
  const users = [
    { fname: 'John', lname: 'Doe', gmail: 'john@example.com', loginId: 'user1', password: 'pass1' },
    { fname: 'Jane', lname: 'Doe', gmail: 'jane@example.com', loginId: 'user2', password: 'pass2' },
    { fname: 'Jim', lname: 'Beam', gmail: 'jim@example.com', loginId: 'user3', password: 'pass3' }
  ];
  for (const u of users) {
    const exists = await User.findOne({ loginId: u.loginId });
    if (!exists) {
      await User.create(u);
    }
  }
}
insertDummyUsers();

app.listen(5000, () => console.log('Server running on port 5000'));
