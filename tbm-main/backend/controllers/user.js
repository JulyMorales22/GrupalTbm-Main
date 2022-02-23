import User from "../models/user.js";
import bcrypt from "../lib/bcrypt.js";
import jwt from "../lib/jwt.js";
import userService from "../services/user.js";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = await bcrypt.hassGenerate(req.body.password);

  const schema = new User({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const registerAdminUser = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.role)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hassGenerate(req.body.password);

  const userRegister = new User({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userRegister.save();

  if (!result)
    return res.status(400).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const listUsers = async (req, res) => {
  const userList = await User.find({
    $and: [
      { name: new RegExp(req.params["name"], "i") }, //"i" para que no distinga entre mayúsculas y minúsculas
      { dbStatus: "true" },
    ],
  })
    .populate("role")
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "Empty users list" })
    : res.status(200).send({ userList });
};

const listAllUser = async (req, res) => {
  const userList = await User.find({
    name: new RegExp(req.params["name"], "i"),
  })
    .populate("role")
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "Empty users list" })
    : res.status(200).send({ userList });
};
//trae la informacion segun el usuario
const findUser = async (req, res) => {
  const userfind = await User.findById({ _id: req.params["_id"] })
    .populate("role")
    .exec();
  return !userfind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ userfind });
};

//el nombre del rol del usuario
const getUserRole = async (req, res) => {
  let userRole = await User.findOne({ email: req.params["email"] })
    .populate("role")
    .exec();
  if (!userRole) return res.status(400).send({ message: "No search results" });

  userRole = userRole.role.name;
  return res.status(200).send({ userRole });
};

//admin puede actualizar -- se realizan cambios en el condicional inicial, se cambia la funcion hassCompare por hassGenerate
const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email || !req.body.role)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    //modificamos esto
    const findUser = await User.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hassGenerate(req.body.password);
  }

  //Changes está bien
  let changes = await userService.isChanges(req.body, pass);
  if (changes)
    return res.status(400).send({ mesagge: "you didn't make any changes" });

  //¿Qué sucede con el rol?
  const userUpdated = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role
  });

  return !userUpdated
    ? res.status(400).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

//realizamos update para que un mismo usuario se actualice 
const updateUser = async (req, res) => {
  console.log(req.user);
  if (!req.body._id ||!req.body.name || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });
  
  let pass = "";

  if (!req.body.password) {
    //modificamos esto
    const findUser = await User.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hassGenerate(req.body.password);
  }

  //Changes está bien
  let changes = await userService.isChanges(req.body, pass);
  if (changes)
    return res.status(400).send({ mesagge: "you didn't make any changes" });

  //¿Qué sucede con el rol?
  const userUpdated = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
  });

  return !userUpdated
    ? res.status(400).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};



const deleteUser = async (req, res) => {
  if (!req.params["_id"]) return res.status(400).send("Incomplete data");

  const userDeleted = await User.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !userDeleted
    ? res.status(400).send({ message: "User no found" })
    : res.status(200).send({ message: "User deleted" });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const userLogin = await User.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
  return res.status(400).send({ message: "Wrong email or password" });

  let pass = await bcrypt.hassCompare(req.body.password, userLogin.password);

  if (!pass)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Login error" })
    : res.status(200).send({ token });
};

export default {
  registerUser,
  registerAdminUser,
  listUsers,
  listAllUser,
  findUser,
  updateUser,
  deleteUser,
  login,
  getUserRole,
  updateUserAdmin
};
