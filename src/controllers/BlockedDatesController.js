const { db, DbController } = require('../database/connections');

const store = new DbController(db, 'blocked_dates');

class BlockedDatesController {
  async index(req, res) {
    const models = await store.findMany();

    return res.json(models);
  }

  async show(req, res) {
    const { id } = req.params;

    const model = await store.findFirst(id);

    return res.json(model);
  }

  async create(req, res) {
    const { start, end } = req.body;

    await store.create({ start, end });

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = req.params;

    await store.update(id, req.body);

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = req.params;

    await store.remove(id);

    return res.status(204).send();
  }
}

module.exports = BlockedDatesController;