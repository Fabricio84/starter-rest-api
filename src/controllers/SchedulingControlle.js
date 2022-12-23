const { db, DbController } = require('../database/connections');

const dbController = new DbController(db, 'schedules');

class SchedulingController {
  async index(req, res) {
    const models = await dbController.findMany();

    return res.json(models)
  }

  async show(req, res) {
    const { id } = request.params;

    const model = await dbController.findFirst(id)

    return res.json(model)
  }

  async create(req, res) {
    const { start, end, serviceTypeID, customerID } = request.body
    const data = { start, end, serviceTypeID, customerID }

    await dbController.create(data)

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = request.params;

    await dbController.update(id, data)

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = request.params;

    await dbController.delete(id)

    return res.status(204).send();
  }
}

module.exports = SchedulingController;