const { db, DbController } = require('../database/connections');

const dbController = new DbController(db, 'service_types');

class ServiceTypeController {
  async index(req, res) {

    const services = await dbController.findMany();

    return res.json(services)
  }

  async show(req, res) {
    const { id } = request.params;

    const model = await dbController.findFirst(id)

    return res.json(model)
  }

  async create(req, res) {

    const { description, value, duration } = request.body
    const data = { description, value, duration }
    
    await dbController.create(data);

    return res.status(201).end();
  }

  async update(req, res) {
    const { id } = request.params;

    await dbController.update(id, req.body);

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = request.params;

    await dbController.delete(id)

    return res.status(204).send();
  }
}

module.exports = ServiceTypeController;