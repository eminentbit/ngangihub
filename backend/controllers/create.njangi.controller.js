// controllers/createNjangi.controller.js
import { createNjangiFlow } from "../services/createNjangiFlow";

export const createNjangi = async (req, res) => {
  try {
    const result = await createNjangiFlow(req.body);
    res.status(201).json({
      success: true,
      message: "Njangi created successfully",
      ...result,
    });
  } catch (error) {
    console.log("Error creating Njangi:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong during Njangi creation.",
    });
  }
};
