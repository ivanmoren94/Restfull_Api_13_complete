const userModel = require("../Models/userModels");

let USERS = [
  { id: 0, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 1, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 2, name: "Usuario 3", email: "usuario3@example.com" },
];

const getUsers = async (req, res) => {
  const data = await userModel.find();
  res.status(200).json({ status: "succeeded", data, error: null });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  res.send(user);
};

// //Metodo patch para obtener un unico usuario
const patchById = (req, res) => {
  //Convertimos el id de la URL en un entero
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  //Buscamos en el array por el valor que queremos buscar, en este caso por id
  const user = USERS.find((user) => user.id === userId);

  if (!user) {
    res.send("El usuario no existe");
  }

  if (name) {
    user.name = req.body.name;
  }

  if (email) {
    user.email = req.body.email;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name, email } = req.body;
  const newIndex = USERS.length + 1;

  const newUser = {
    id: newIndex,
    name: name,
    email: email,
  };

  USERS.push(newUser);

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  const filteredUsers = USERS.filter((user) => user.id !== userId);

  if (filteredUsers.length === USERS.length) {
    res.send("El usuario no existe");
  } else {
    USERS = filteredUsers;
    res.send(filteredUsers);
  }
};

module.exports = { getUsers, getUserById, patchById, addUser, deleteUser };
