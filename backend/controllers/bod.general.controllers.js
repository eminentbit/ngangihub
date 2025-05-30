import Attendance from "../models/bod.attendance.model.js";
import Meeting from "../models/bod.meeting.model.js";
import BodResolution from "../models/bod.resolution.model.js";
import User from "../models/user.model.js";

// Fetch all members
export const fetchMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "bod" }).sort({ createdAt: -1 });

    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchResolutions = async (req, res) => {
  try {
    const resolutions = await BodResolution.find().sort({ createdAt: -1 });
    res.status(200).json(resolutions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchAttendance = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const attendance = await Attendance.find({ meetingId }).sort({
      createdAt: -1,
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createResolution = async (req, res) => {
  try {
    const resolution = await BodResolution.create(req.body);
    res.status(201).json(resolution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
