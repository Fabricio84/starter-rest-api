const { db, DbController } = require('../database/connections');

const dbController = new DbController(db, 'blocked_date');

class BlockedDatesController {
  async index(req, res) {
    const models = await dbController.findMany();

    return res.json(models);
  }

  async show(req, res) {
    const { id } = req.params;

    const model = await dbController.findFirst(id);

    return res.json(model);
  }

  async create(req, res) {
    const { start, end } = req.body;

    await dbController.create({ start, end });

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = req.params;

    await dbController.update(id, req.body);

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = req.params;

    await dbController.delete(id);

    return res.status(204).send();
  }
}

module.exports = BlockedDatesController;