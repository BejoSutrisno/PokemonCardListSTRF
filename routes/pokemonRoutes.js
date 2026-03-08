const express = require('express');
const router = express.Router();
const db = require('../database'); // koneksi MySQL
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// List Pokémon
router.get('/list', (req,res)=>{
  db.query('SELECT * FROM pokemons', (err, results)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(results);
  });
});

// Add Pokémon
router.post('/add', upload.single('image'), (req,res)=>{
  const { name, type, level, ability } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  db.query(
    'INSERT INTO pokemons (name,type,level,ability,image) VALUES (?,?,?,?,?)',
    [name,type,level,ability,imagePath],
    (err,result)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json({id: result.insertId});
    }
  );
});

// Delete Pokémon
router.delete('/delete/:id',(req,res)=>{
  const id = req.params.id;
  db.query('DELETE FROM pokemons WHERE id=?',[id],(err,result)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json({deleted:true});
  });
});

module.exports = router;