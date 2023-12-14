const userModel = require("../models/userModels"); // Importa el modelo de usuario
const emailService = require("../services/emailService")

const getUsers = async (req, res) => {
  try {
    const data = await userModel.find(); // Busca todos los usuarios en la base de datos

    res.status(200).json({ status: "succeeded", data, error: null }); // Devuelve los usuarios encontrados
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const user = await userModel.findById(userId); // Busca un usuario por su ID
    res.status(200).json({ status: "succeeded", user, error: null }); // Devuelve el usuario encontrado
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const patchById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const { name, email } = req.body; // Obtiene el nuevo nombre y correo electrónico del usuario

    const user = await userModel.findById(userId); // Busca un usuario por su ID

    if (!user) {
      return res.status(404).send("El usuario no existe"); // Si el usuario no existe, devuelve un mensaje de error
    }

    if (name) {
      user.name = name; // Actualiza el nombre del usuario si se proporciona un nuevo nombre
    }

    if (email) {
      user.email = email; // Actualiza el correo electrónico del usuario si se proporciona uno nuevo
    }

    await user.save(); // Guarda los cambios en la base de datos
    res.status(200).json({ status: "succeeded", user, error: null }); // Devuelve el usuario actualizado
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body; // Obtiene el nombre y correo electrónico del nuevo usuario

    const newUser = new userModel({ // Crea un nuevo modelo de usuario con los datos proporcionados
      name,
      email,
    });

    await newUser.save(); // Guarda el nuevo usuario en la base de datos
    
    // Envía un correo electrónico cada vez que se agrega un nuevo usuario
    await emailService.sendEmail(
      email, 
      `Gracias por registrarte ${name}`, 
      `Se ha agregado un nuevo usuario: ${name} (${email}). Gracias por registrarte.`
    );
    res.status(201).json({ status: "succeeded", newUser, error: null }); // Devuelve el nuevo usuario creado
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const user = await userModel.findById(userId); // Busca un usuario por su ID

    if (!user) {
      return res.status(404).send("El usuario no existe"); // Si el usuario no existe, devuelve un mensaje de error
    }

    await userModel.findByIdAndDelete(userId); // Elimina el usuario de la base de datos
    res.status(200).send({ status: "succeeded", error: null }); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const countUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    res.status(200).json({ status: "succeeded", cantidad: totalUsers, error: null });
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message });
  }
}

const findUsersByLetter = async (req, res) => {
  try {
    const letters = req.params.letters;
    const usersWithLetter = await userModel.find({ name: { $regex: letters, $options: 'i' } });
    if (usersWithLetter.length === 0) {
      return res.status(404).json({ status: "succeeded", data: null, error: `No se encontraron usuarios con la letra "${letters}" en su nombre` });
    }
    res.status(200).json({ status: "succeeded", data: usersWithLetter, error: null });
  } catch (error) {
    res.status(500).json({ status: "failed", data: null, error: error.message });
  }
}


module.exports = { getUsers, getUserById, patchById, addUser, deleteUser , countUsers , findUsersByLetter }; // Exporta las funciones para su uso en otros archivos
