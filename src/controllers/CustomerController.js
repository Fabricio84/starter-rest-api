const { db, DbController } = require('../database/connections');

const dbUser = new DbController(db, 'users');
const dbController = new DbController(db, 'customers');

class CustomerController {
  async index(req, res) {
    const models = await dbController.findMany();

    return res.json(models);
  }

  async show(req, res) {
    const { id } = req.params;

    const model = await dbController.findFirst(id);

    return res.json(model)
  }

  async create(req, res) {
    const { name, phone, email, password } = req.body

    const [user] = await dbUser.create({ email, password, role: 'customer' });
    await dbController.create({ name, phone, userID: user.id });

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = req.params;

    await dbController.update(id, { ...req.body });

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = req.params;

    await dbController.remove(id);

    return res.status(204).send();
  }
}

module.exports = CustomerController;