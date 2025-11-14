const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Registration = require('../models/Registration');

const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// POST /api/registrations (mahasiswa baru)
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { fullName, studentId, email, faculty, studyProgram, year, phone, interests } = req.body;
    if (!fullName || !studentId) return res.status(400).json({ success: false, message: 'Field wajib belum lengkap' });

    // duplicate basic check
    const exists = await Registration.findOne({ studentId });
    if (exists) return res.status(409).json({ success: false, message: 'NIM sudah terdaftar' });

    const reg = new Registration({
      fullName,
      studentId,
      email,
      faculty,
      studyProgram,
      year: year ? Number(year) : undefined,
      phone,
      interests: interests ? (typeof interests === 'string' ? interests.split(',') : interests) : []
    });

    if (req.file) {
      reg.photoUrl = `/uploads/${req.file.filename}`;
    }

    await reg.save();

    return res.json({ success: true, message: 'Pendaftaran diterima', registrationId: reg._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/registrations/tournaments/:id/register
router.post('/tournaments/:id/register', async (req, res) => {
  try {
    const { fullName, studentId, email, phone, category } = req.body;
    if (!fullName || !studentId) return res.status(400).json({ success: false, message: 'Field wajib belum lengkap' });

    const reg = new Registration({
      fullName, studentId, email, phone, interests: [ `tournament:${req.params.id}`, category || 'umum' ]
    });

    await reg.save();
    return res.json({ success: true, message: 'Pendaftaran turnamen diterima', registrationId: reg._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

