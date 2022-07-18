const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET NFT Data. */
router.get('/:id', (req, res, next) => {
  fs.readFile('assets/heisters-data.json', (err, data) => {
    if (err) throw err;
    const heisters = JSON.parse(data);
    const heister = heisters[req.params.id];
    res.json(heister);
  });
})

module.exports = router;
