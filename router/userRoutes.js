const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  findUsersByLetter,
} = require("../controllers/usersControllers");

const router = require("express").Router();

router.get("/", getUsers); // Obtiene todos los usuarios
router.get("/count", countUsers); // Obtiene el recuento total de usuarios
// Se podria poner otra que se llame name ya que las solicitudes a /name se capturarían correctamente por esa ruta específica, 
//ya que Express coincide con las rutas en orden y la primera que coincida se ejecutará.
// router.get("/name", findByName); // Nueva ruta para buscar por nombre



router.get("/filterByLetters/:letters", findUsersByLetter); // Filtra usuarios por letras en sus nombres

// IMPORTANTE: Las rutas con IDs específicos deben ir siempre debajo de las rutas simples
// Rutas con parámetros dinámicos o específicos

router.get("/:id", getUserById); // Obtiene un usuario por su ID
router.patch("/:id", patchById); // Actualiza un usuario por su ID
router.post("/", addUser); // Agrega un nuevo usuario
router.delete("/:id", deleteUser); // Elimina un usuario por su ID

module.exports = router;
