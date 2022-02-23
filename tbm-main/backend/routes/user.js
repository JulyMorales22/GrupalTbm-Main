import express from "express";
import user from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import userMidd from "../middlewares/user.js";
import roleMidd from "../middlewares/role.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/register",userMidd.existingUser, roleMidd.getRoleUser, user.registerUser);
router.post("/registerAdminUser", auth, admin, userMidd.existingUser, user.registerAdminUser);
router.post("/login", user.login);
router.get("/listUsers/:name?", auth, admin, user.listAllUser);
router.get("/listUser/:name?", auth, admin, user.listUsers);
router.get("/getRole/:email", auth, user.getUserRole);
router.get("/findUser/:_id", auth, validId, admin, user.findUser);
//Se le puede agregar el userMidd.existingUser
//El admin sobra porque cualquier usuario se puede actualizar a él mismo
router.put("/updateUser", auth, user.updateUser);
router.put("/updateUserAdmin", auth, admin, user.updateUserAdmin);
router.put("/deleteUser/:_id", auth, admin, user.deleteUser);// se le agrego id a la ruta

export default router;
 