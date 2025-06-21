import User from "../models/user.model.js";

export const verifyIfBod = async (req, res, next) => {
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

    req.user = { ...req.user, isBod: true }; // Add isBod property to user object

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while verifying BOD role" });
  }
};

export const verifyIfMember = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const user = await User.findById(req.user.id);
    console.log(user);

    if (user.role !== "member" || user.role != "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Member access required" });
    }

    req.user = { ...req.user, isMember: true };

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while verifying BOD role" });
  }
};

export const verifyIfAdmin = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const user = await User.findById(req.user.id);
    console.log(user);

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }

    req.user = { ...req.user, isAdmin: true };

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while verifying BOD role" });
  }
};
