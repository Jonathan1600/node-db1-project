const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const body = req.body;
  if (!body.name || !body.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof body.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (body.name.length < 3 || body.name.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof body.budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (body.budget < 0 || body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }

}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const name = req.body.name;
  const accounts = await Accounts.getAll();
  let nameTaken = false;

  accounts.forEach(element => {
    if (element.name == name.trim()) {
      nameTaken = true;
    }
  });

  nameTaken ? res.status(400).json({ message: "that name is taken" }) : next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const account = await Accounts.getById(id);
    if (!account) {
      res.status(404).json({ message: "account not found" })
    } else {
      req.account = account
      next()
    }
  } catch (e) {
    res.status(500).json(e.message)
  }
}
