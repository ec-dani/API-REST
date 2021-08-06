/* eslint-disable consistent-return */
const User = require('../models/user');
const usuariomidd = require('../middlewares/usuarioMidd');

function createUser(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    avatar: req.body.avatar,
    password: req.body.password,
  });
  user.save((err, savedUser) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
    return res.status(200).send({
      message: 'Usuario guardado',
      savedUser,
      token: usuariomidd.createToken(user),
    });
  });
}

function logIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Err ${err}` });
    if (!user) return res.status(404).send({ message: 'No existe el usuario' });

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) return res.status(500).send({ message: `Error ${err}` });
      if (isMatch) {
        return res.status(200).send({
          message: 'Login correcto',
          token: usuariomidd.createToken(user),
        });
      }
      return res.status(404).send({ message: 'login incorrecto' });
    });
  });
}


function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!users) return res.status(404).send({ message: 'No hay usuarios' });

    return res.status(200).send(users);
  });
}

function getUser(req, res) {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user) return res.status(404).send({ message: 'No existe usuario' });
    return res.status(200).send(user);
  });
}
//
function updateUser(req, res) {
  const update = req.body;

  User.findOneAndUpdate({ email: req.params.email }, update, { new: true }, (err, userUpdate) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!userUpdate) return res.status(404).send({ message: 'No existe el usuario, no se puede actualizar' });

    return res.status(200).send({ message: 'Usario actualizado', userUpdate });
  });
}


function deleteUser(req, res) {
  User.findOneAndDelete({ email: req.params.email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

    return res.status(200).send({ message: 'Usuario borrado', user });
  });
}

module.exports = {
  createUser,
  logIn,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
