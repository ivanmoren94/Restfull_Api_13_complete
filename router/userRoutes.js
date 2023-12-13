const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
} = require("../controllers/usersControllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", patchById);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
