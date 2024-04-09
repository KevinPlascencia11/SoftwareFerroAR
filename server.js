const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos de Vue.js desde la carpeta 'dist'
const staticMiddleware = express.static(path.join(__dirname, 'dist'));

// Middleware para analizar solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para manejar el enrutamiento de la aplicación Vue.js en modo de historial de HTML5
app.use(history());

// Usar el middleware de archivos estáticos para servir la aplicación Vue.js
app.use(staticMiddleware);

// Manejar la solicitud POST para el registro de usuarios
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!username || !email || !password) {
        return res.status(400).send('Por favor, complete todos los campos.');
    }

    // Leer el archivo de usuarios y verificar si el nombre de usuario o correo ya existen
    fs.readFile('usuarios.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        const usuarios = data.split('\n');
        const existeUsuario = usuarios.some(user => {
            const [storedUsername, storedEmail] = user.split(':');
            return storedUsername === username;
        });

        const existeEmail = usuarios.some(user => {
            const [, storedEmail] = user.split(':');
            return storedEmail === email;
        });

        if (existeUsuario && existeEmail) {
            return res.status(400).send('El nombre de usuario y el correo ya existen.');
        } else if (existeUsuario) {
            return res.status(400).send('El nombre de usuario ya existe.');
        } else if (existeEmail) {
            return res.status(400).send('El correo electrónico ya existe.');
        }

        // Guardar los datos del usuario en el archivo .txt
        fs.appendFile('usuarios.txt', `${username}:${email}:${password}\n`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error interno del servidor');
            } else {
                return res.send('¡Registro exitoso!');
            }
        });
    });
});

// Manejar la solicitud POST para el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar que los campos de nombre de usuario y contraseña no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    // Leer el archivo de usuarios y verificar si las credenciales coinciden
    fs.readFile('usuarios.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        const usuarios = data.split('\n');
        const usuario = usuarios.find(user => {
            const [storedUsername, , storedPassword] = user.split(':');
            return storedUsername === username && storedPassword === password;
        });

        if (usuario) {
            return res.status(200).json({ message: '¡Inicio de sesión exitoso!' });
        } else {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }
    });
});

// Manejar la solicitud POST para restablecer la contraseña
app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    // Validar que los campos no estén vacíos
    if (!email || !newPassword) {
        return res.status(400).send('Por favor, complete todos los campos.');
    }

    // Leer el archivo de usuarios y buscar el usuario con el correo proporcionado
    fs.readFile('usuarios.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        const usuarios = data.split('\n');
        const index = usuarios.findIndex(user => {
            const [, storedEmail] = user.split(':');
            return storedEmail === email;
        });

        if (index === -1) {
            // El correo no existe en la base de datos
            return res.status(400).send('El correo electrónico no existe.');
        } else {
            // El correo existe, actualizar la contraseña
            const [username, , oldPassword] = usuarios[index].split(':');
            usuarios[index] = `${username}:${email}:${newPassword}`;

            // Guardar los datos actualizados en el archivo .txt
            fs.writeFile('usuarios.txt', usuarios.join('\n'), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                } else {
                    return res.send('¡Contraseña restablecida con éxito!');
                }
            });
        }
    });
});

// Configurar el servidor HTTPS
const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app);

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor HTTPS iniciado en el puerto ${port}`);
});