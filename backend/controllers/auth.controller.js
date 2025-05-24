import User from "../models/user.model.js";

export const checkSession = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(user);
    const isValidPassword = await user.comparePassword(password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.user = { id: user._id };
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
