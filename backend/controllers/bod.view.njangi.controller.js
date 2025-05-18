import NjangiDraft from "../models/njangi.draft.model.js";
import asyncHandler from "express-async-handler";

// @desc    Get all Njangi drafts
// @route   GET /api/bod/njangi-drafts
// @access  Private (BOD only)
export const viewNjangiDrafts = asyncHandler(async (req, res) => {
  const drafts = await NjangiDraft.find()
    .populate("createdBy", "firstName lastName email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: drafts.length,
    data: drafts,
  });
});

// @desc    Get single Njangi draft
// @route   GET /api/bod/njangi-drafts/:id
// @access  Private (BOD only)
export const viewNjangiDraftById = asyncHandler(async (req, res) => {
  const draft = await NjangiDraft.findById(req.params.id).populate(
    "createdBy",
    "firstName lastName email"
  );

  if (!draft) {
    res.status(404);
    throw new Error("Njangi draft not found");
  }

  res.status(200).json({
    success: true,
    data: draft,
  });
});
