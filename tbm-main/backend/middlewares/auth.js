import jwt from "jsonwebtoken";
                                                     // 0        1
//Bearer: portador del toke =>toke: esta guardando (bearer, tokenjahsb), lo vemos en headers postman
const auth = async (req, res, next) => {
  let token = req.header("Authorization");//authorization es una manera de autoridad 
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  token = token.split(" ")[1];//split para separar, donde haya un espacio separelo y nos quedan como dos string, obtenemos la posicion 1 que es la que nos interesa 
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  try {
    req.user = jwt.verify(token, process.env.SK_JWT);// req.user va la info del usuario : verify una funcion de jwt para verificar el token
    next();
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Authorization denied: Invalid token" });
  }
};

export default auth;
