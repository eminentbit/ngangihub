import User from "../models/user.model.js";

const verifyIfBod = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const user = await User.findById(req.user.id);
    console.log(user);

    if (user.role !== "bod") {
      return res
        .status(403)
        .json({ message: "Forbidden - BOD access required" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while verifying BOD role" });
  }
};

export default verifyIfBod;
