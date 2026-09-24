import  UserService  from "../services/users.service.js";

const userService = new UserService();

export const getUsers = async (req, res) => {
    try {

        const users = await userService.getAllUsers();

        res.status(200).json({
            status: "success",
            payload: users
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }
    
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.json(user);
      } catch (error) {
        res.status(500).send('Error del servidor');
      }
};

export const createUser = async (req, res) => {
     try {
    if (!req.body.firstName) return res.status(400).send('Falta nombre');
    if (!req.body.lastName) return res.status(400).send('Falta apellido');
    if (!req.body.email) return res.status(400).send('Falta email');
    if (!req.body.password) return res.status(400).send('Falta password');

    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ status: 'error', data: null });

    if (req.body.role === 'admin') {
      return res.status(403).send('No se puede crear un admin desde este endpoint');
    }

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'customer'
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

export const updateUser = async (req, res) => {
    try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.json(user);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

export const deleteUser = async (req, res) => {
    try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};