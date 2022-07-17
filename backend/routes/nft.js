const express = require('express');
const router = express.Router();

/* GET NFT Data. */
router.get('/:id', (req, res) => {
  res.send('NFT ' + req.params.id + ' here soon!')
})

module.exports = router;
