/*
 * Created on June 11, 2019
 * Dr.Chain Project
 * @author: Jae-Hyeong Kim, Su-Min Lee, Won-Hyo Choi
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');

// signup router function
router.get('/signup', (req, res) => {
  fs.readFile('signup/signup.html', (err, data) => {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});


module.exports = router;
