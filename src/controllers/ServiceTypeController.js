const { db, DbController } = require('../database/connections');

const dbController = new DbController(db, 'service_types');

class ServiceTypeController {
  async index(req, res) {

    const services = await dbController.findMany();

    return res.json(services)
  }

  async show(req, res) {
    const { id } = req.params;

    const model = await dbController.findFirst(id)

    return res.json(model)
  }

  async create(req, res) {
    const { description, price, duration } = req.body
    
    await dbController.create({ description, price, duration });

    return res.status(201).end();
  }

  async update(req, res) {
    const { id } = req.params;

    await dbController.update(id, req.body);

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = req.params;

    await dbController.remove(id)

    return res.status(204).send();
  }
}

module.exports = ServiceTypeController;