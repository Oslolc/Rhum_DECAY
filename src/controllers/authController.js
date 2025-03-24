const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Cet email est déjà utilisé' });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {

    console.log("🔹 Tentative de connexion :", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("🔹 Utilisateur trouvé :", user);

    if (!user) {
        console.log("❌ Utilisateur non trouvé :", email);
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Mot de passe correct ?", isMatch);
    if (!isMatch) {
        console.log("❌ Mot de passe incorrect pour :", email);
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log("✅ Connexion réussie pour :", email);

    res.json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error("❌ Erreur dans loginUser :", error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};