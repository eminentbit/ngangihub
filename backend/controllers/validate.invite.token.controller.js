import Invite from "../models/invite.model.js";

export const validateInviteToken = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res
      .status(400)
      .json({
        valid: false,
        status: "missing",
        message: "No invite token provided.",
      });
  }

  try {
    const invite = await Invite.findOne({ inviteToken: token });

    if (!invite) {
      return res
        .status(404)
        .json({
          valid: false,
          status: "invalid",
          message: "Invalid or used invite token.",
        });
    }

    if (
      invite.status === "expired" ||
      (invite.expiresAt && invite.expiresAt < new Date())
    ) {
      return res
        .status(410)
        .json({
          valid: false,
          status: "expired",
          message: "Invite token has expired.",
        });
    }

    if (invite.status === "accepted") {
      return res
        .status(200)
        .json({
          valid: false,
          status: "accepted",
          message: "Invite already accepted. Please login.",
        });
    }

    // Token is valid
    return res.json({ valid: true, status: "valid", invite });
  } catch (error) {
    console.error("Error validating invite token:", error);
    res
      .status(500)
      .json({
        valid: false,
        status: "error",
        message: "Server error validating invite token.",
      });
  }
};
