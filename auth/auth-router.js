const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');

router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'please provide email and password',
    });
  }
});

router.get('/register', (req, res) => {
  res.status(200).json({ message: 'registration page' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        console.log('user', user);

        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);

          res.status(200).json({
            message: 'welcome to the airbnb optimal pricing API',
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: 'please provide email and password',
    });
  }
});

router.get('/login', (req, res) => {
  res.status(200).json({ message: 'login page' });
});

function makeJwt(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const secret = process.env.JWT_SECRET || 'the secret';

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
