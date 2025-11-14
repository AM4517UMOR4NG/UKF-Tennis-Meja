require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const registrationsRouter = require('./routes/registrations');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

// serve uploads static
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// serve frontend static files
app.use(express.static(path.join(__dirname, '../ukf-tt-frontend/dist')));

app.use('/api/registrations', registrationsRouter);
app.use('/api/admin', adminRouter);

// serve frontend for all non-api routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ukf-tt-frontend/dist/index.html'));
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server running on port', PORT);
      // open browser automatically
      const { exec } = require('child_process');
      const url = `http://localhost:${PORT}`;
      switch (process.platform) {
        case 'win32':
          exec(`start ${url}`);
          break;
        case 'darwin':
          exec(`open ${url}`);
          break;
        default:
          exec(`xdg-open ${url}`);
      }
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();

