// controllers/createNjangi.controller.js
import createNjangiFlow from "../services/createNjangiFlow.js";
import { nanoid } from "nanoid";

const createNjangi = async (req, res) => {
  try {
    const njangiId = `njangi_${nanoid(8)}`;
    console.log("Data from the frontend:", req.body);
    console.log("Njangi ID:", njangiId);
    const result = await createNjangiFlow(req.body, njangiId, res);
    res.status(201).json({
      success: true,
      message: "Njangi created successfully and sent for approval.",
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

export default createNjangi;
