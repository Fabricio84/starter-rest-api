const { db, DbController } = require('../database/connections');

const dbController = new DbController(db, 'customers');

class CustomerController {
  async index(req, res) {
    // const models = await db('customers').select('*');
    const models = await dbController.findMany();

    return res.json(models);
  }

  async show(req, res) {
    const { id } = request.params;

    const [model] = await db('customers').where('id', id);

    return res.json(model)
  }

  async create(req, res) {
    const { name, phone, email, password } = request.body

    const user = await db('users').insert({ email, password });

    await db('customers').insert({ name, phone, userID: user.id });

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = request.params;

    await db('customers').where('id', id)
    .update({ ...req.body });

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = request.params;

    await db('customers').where('id', id).del();

    return res.status(204).send();
  }
}

module.exports = CustomerController;