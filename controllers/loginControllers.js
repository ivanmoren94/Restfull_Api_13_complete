const LoginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils");


const signup = async (req, res) => {
    try {
        // Crea un nuevo objeto de modelo utilizando los datos enviados en la solicitud POST
        const data = new LoginModel({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10), // Encripta la contraseña utilizando bcrypt con un factor de coste de 10
            role: req.body.role,
        });

        // Guarda el objeto de modelo en la base de datos
        const savedUser = await data.save();

        // Devuelve una respuesta de estado 200 (éxito) con los datos del usuario guardado en formato JSON
        res.status(200).json({ status: "succeeded", savedUser, error: null });
    } catch (error) {
        console.log(error)
        // Maneja diferentes tipos de errores y devuelve respuestas correspondientes

        // Si el código de error es 11000, indica que el correo electrónico ya existe en la base de datos
        if (error.code === 11000) {
            return res
                .status(409)
                .json({ status: "failed", data: null, error: "El correo ya existe" });
        }

        // Si el error incluye el mensaje "data and salt arguments required", indica que falta información para encriptar la contraseña
        if (error.message.includes("data and salt arguments required")) {
            return res
                .status(404)
                .json({ status: "Failed", data: null, error: error.message });
        }

        // Para cualquier otro tipo de error, devuelve una respuesta de estado 404 (no encontrado) con el mensaje de error correspondiente
        res
            .status(404)
            .json({ status: "Failed", data: null, error: error.message });
    }
}

const login = async (req, res) => {

    try {
        // Busca en la base de datos un documento donde el campo "email" coincide con el valor enviado en la solicitud POST
        const data = await LoginModel.findOne({ email: req.body.email });
        console.log('data',data)
        if (data) {
            // Compara la contraseña enviada en la solicitud con la contraseña almacenada en el documento encontrado
            const validPassword = await bcrypt.compare(req.body.password, data.password);
            console.log(validPassword)
            if (validPassword) {
                try {
                    console.log('Hola')
                    // Genera un token JWT (JSON Web Token) que contiene el email y rol del usuario
                    // Utiliza una clave secreta almacenada en la variable de entorno "TOKEN_SECRET"
                    // El token expira después de 15 minutos
    
                    // OPCIÓN 1 ANTES DE UTILIZAR LA FUNCIÓN generateToken
                    // const token = await jwt.sign(
                    //   { email: data.email, role: data.role },
                    //   process.env.TOKEN_SECRET,
                    //   { expiresIn: "1min" }
                    // );
    
                   
    
                    // OPCIÓN 2 DESPUÉS DE UTILIZAR LA FUNCIÓN generateToken
                    const user = { id: data.id,email: data.email, role: data.role };
                    const token = generateToken(user, false);
                    const refreshToken = generateToken(user, true);
                    console.log(token)
                    // Devuelve una respuesta de estado 200 (éxito) con los datos del usuario y el token en formato JSON
                    res.status(200).json({
                        status: "succeeded",
                        data: {
                            id: data._id,
                            email: data.email,
                            role: data.role,
                            token,
                            refreshToken,
                        },
                        error: null,
                    });
                } catch (error) {
                    res.status(404).json({ status: "failed", data: null, error: error.message });
                }
            } else {
                // Devuelve una respuesta de estado 401 (no autorizado) indicando que el email y contraseña no coinciden
                res.status(401).json({
                    status: "failed",
                    data: null,
                    error: "Email y contraseña no coinciden",
                });
            }
        } else {
            // Devuelve una respuesta de estado 401 (no autorizado) indicando que el email y contraseña no coinciden
            res.status(401).json({
                status: "failed",
                data: null,
                error: "Email y contraseña no coinciden",
            });
        }
    } catch (error) {
        // Devuelve una respuesta de estado 404 (no encontrado) indicando un error en caso de que ocurra una excepción
        res.status(404).json({ status: "failed", data: null, error: error.message });
    }

}

// El token de refresco es utilizado en sistemas de autenticación y autorización para obtener un nuevo token de acceso cuando el token actual ha expirado.
// En lugar de solicitar al usuario que inicie sesión nuevamente, el token de refresco permite renovar el token de acceso sin requerir las credenciales del
// usuario. El token de refresco es un token de largo plazo que se emite junto con el token de acceso inicial y se almacena en el cliente. Cuando el token
// de acceso expira, el cliente envía el token de refresco al servidor de autenticación para obtener un nuevo token de acceso válido. Esto permite al usuario
//  mantener su sesión activa y acceder a recursos protegidos sin tener que iniciar sesión repetidamente. El uso del token de refresco mejora la seguridad al
//   limitar la exposición del token de acceso y al permitir su renovación de forma segura y controlada.

const refreshToken =  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Acceso denegado" });
    }
  
    const user = { email: req.user.email, role: req.user.role };
    const token = generateToken(user, false);
    const refreshToken = generateToken(user, true);
  
    res.status(200).json({
      status: "succeeded",
      data: {
        token,
        refreshToken,
      },
      error: null,
    });
}


module.exports = { signup , login , refreshToken };