const db = require('../database/connections');

class BlockedDatesController {
  async index(req, res) {
    const models = await db('blocked_date').select('*');

    return res.json(models);
  }

  async show(req, res) {
    const { id } = req.params;

    const [model] = await db('blocked_date').where('id', id);

    return res.json(model);
  }

  async create(req, res) {
    const { start, end } = req.body;

    await db('blocked_date').insert([ { start, end } ]);

    return res.status(201).send();
  }

  async update(req, res) {
    const { id } = req.params;

    await db('blocked_date').where('id', id)
    .update({ ...req.body });

    return res.status(204).send();
  }

  async remove(req, res) {
    const { id } = req.params;

    await db('blocked_date').where('id', id).del();

    return res.status(204).send();
  }
}

module.exports = BlockedDatesController;