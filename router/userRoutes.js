const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  findUsersByLetter,
  insertManyUsers,
  getUsersByAge
} = require("../controllers/usersControllers");

const router = require("express").Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Obtiene la collection completa de usuarios
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 */
router.get("/", getUsers); // Obtiene todos los usuarios

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Cantidad de usuarios
 *     description: Obtiene la cantidad de usuarios que hay en la collections Users
 *     responses:
 *       200:
 *         description: Obtiene el count
 */
router.get("/count", countUsers); // Obtiene el recuento total de usuarios
// Se podria poner otra que se llame name ya que las solicitudes a /name se capturarían correctamente por esa ruta específica, 
//ya que Express coincide con las rutas en orden y la primera que coincida se ejecutará.
// router.get("/name", findByName); // Nueva ruta para buscar por nombre



router.get("/filterByLetters/:letters", findUsersByLetter); // Filtra usuarios por letras en sus nombres
router.get('/age/:age', getUsersByAge);
// IMPORTANTE: Las rutas con IDs específicos deben ir siempre debajo de las rutas simples
// Rutas con parámetros dinámicos o específicos

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     description: Obtiene un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *       404:
 *         description: Usuario no encontrado para el ID proporcionado.
 */
router.get("/:id", getUserById); // Obtiene un usuario por su ID
router.patch("/:id", patchById); // Actualiza un usuario por su ID
router.post("/insertUsers", insertManyUsers); // Agrega un nuevo usuario
router.post("/", addUser); // Agrega un nuevo usuario
router.delete("/:id", deleteUser); // Elimina un usuario por su ID

module.exports = router;
