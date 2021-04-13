const router = require('express').Router();
const Accounts = require('./accounts-model');
const mw = require("./accounts-middleware");


router.get('/:id', mw.checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res) => {
  // DO YOUR MAGIC
  const newAccount = { ...req.body, name: req.body.name.trim() };
  Accounts.create(newAccount)
    .then(
      account => {
        res.status(201).json(account)
      }
    ).catch(err => {
      console.log(err)
      res.status(500).json(err.message);
    })
})

router.put('/:id', mw.checkAccountNameUnique, mw.checkAccountPayload, mw.checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const newAccount = { ...req.body, name: req.body.name.trim() };
  Accounts.updateById(id, newAccount)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message)
    })
});

router.delete('/:id', mw.checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  Accounts.deleteById(id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })

})

router.get('/', (req, res) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error.message);
    });
});

module.exports = router;
