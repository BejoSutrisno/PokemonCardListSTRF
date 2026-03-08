const express = require('express');
const router = express.Router();
const db = require('../database'); // koneksi MySQL

// Login
router.post('/login',(req,res)=>{
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username=? AND password=?',[username,password],
    (err,results)=>{
      if(err) return res.status(500).json({error:err.message});
      if(results.length===0) return res.json({error:'Username atau password salah'});
      res.json({id:results[0].id, username:results[0].username, role:results[0].role});
    });
});

module.exports = router;