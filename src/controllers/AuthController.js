const { db, DbController } = require('../database/connections');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dbController = new DbController(db, 'users');
const saltRounds = 8;

class AuthController {
  async register(req, res) {
    const { email, password: passwordRaw } = req.body;
    const password = await bcrypt.hash(passwordRaw, saltRounds);

    await dbController.create({ email, password })

    return res.status(201).send();
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await dbController.findFirst({ where: { email }});

    if (!user) 
      return res.status(401).json({ message: 'Email não existe na nossa base de dados!'});

    const isMatch = bcrypt.compareSync(password, user?.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Email ou Senha incorretos!'});
    
    const accessToken = jwt.sign({ email: user.email }, String(process.env.JWT_SECRET));

    res.json({ accessToken });
  }

  // implementar recuperação de senha por meio de link via emails
  async changePassword(req, res) {
    // Read username and password from request body
    const { password, newPassword } = req.body;
    const { email }  = req.user;

    const user = await db('users').where({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Ops não foi possivel trocar sua senha, senha atual invalida!'});
    }

    try {
      await dbController.update(user.id, { password: newPassword });
    } catch (error) {
      return res.status(401).json({ message: 'Ops não foi possivel trocar sua senha, por favor tente mais tarde!'});
    }

    return res.status(204).send();
  }
}

export default AuthController;