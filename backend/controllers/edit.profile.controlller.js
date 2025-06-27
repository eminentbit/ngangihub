import User from "../models/user.model.js";

export const editProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log("User Id form edit profile form backend: ", userId)
        const { firstName, lastName, email, phone, location } = req.body;

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                email,
                phoneNumber: phone,
                location,
            },
            { new: true }
        ).select("-password"); 

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error! Please Try Again" });
    }
};