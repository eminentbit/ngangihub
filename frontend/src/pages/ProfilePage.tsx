import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/create.auth.store";
import { secureGet, securePut } from "../utils/axiosClient";
import { UserCircle } from "lucide-react";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  // Local state for form and editing
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    groupName: "",
    role: "",
    totalPayouts: "",
  });
  const [originalProfile, setOriginalProfile] = useState({ ...profile });
  const [isSaving, setIsSaving] = useState(false);

  // Initialize profile from user whenever user changes
  useEffect(() => {
    if (user) {
      const init = {
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email || "N/A",
        phone: user.phone || "N/A",
        location: user.location || "N/A",
        groupName: user.groupName || "N/A",
        role: user.role || "N/A",
        totalPayouts: String(user.totalPayouts || "0"),
      };
      setProfile(init);
      setOriginalProfile(init);
    }
  }, [user]);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await secureGet("/auth/session");
        setUser(res.data.user);
      } catch (err) {
        console.error("An error occurred", err);
        setUser(null);
      }
    };
    checkSession();
  }, [setUser]);

  // Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // const toggleEditMode = useCallback(() => {
  //   if (isEditing) {
  //     // If switching off, revert changes
  //     setProfile(originalProfile);
  //   }
  //   setIsEditing((prev) => !prev);
  // }, [isEditing, originalProfile]);

  const handleCancel = useCallback(() => {
    setProfile(originalProfile);
    setIsEditing(false);
  }, [originalProfile]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Example PUT request; adjust endpoint as needed
      const payload = {
        firstName: profile.fullName.split(" ")[0],
        lastName: profile.fullName.split(" ").slice(1).join(" "),
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        groupName: profile.groupName,
      };
      const res = await securePut("/user/profile", payload);
      setUser(res.data.user);
      setOriginalProfile(profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed", err);
      // Optionally show a toast or error message
    } finally {
      setIsSaving(false);
    }
  }, [profile, setUser]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => navigate("/user/dashboard")}
          className="absolute left-4 top-4 text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-600 py-2 px-4 hover:rounded-md transition-colors duration-200"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to User
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-shadow duration-200 hover:shadow-2xl">
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="flex flex-col items-center md:flex-row">
                {!user.profilePicUrl ? (
                  <UserCircle className="w-24 h-24 text-gray-400" />
                ) : (
                  <img
                    src={user.profilePicUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
                  />
                )}
                <div className="text-center md:text-left mt-4 md:mt-0 md:ml-6">
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.fullName}
                    </h1>
                  )}
                  <p className="text-sm text-gray-500">
                    {profile.role}, {profile.groupName}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 space-x-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 transition-shadow duration-200 hover:shadow">
                <p className="text-sm text-gray-500">Total Payouts</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {profile.totalPayouts}
                </p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 transition-shadow duration-200 hover:shadow">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  Personal Information
                </h2>
                <dl className="mt-4 space-y-4 text-gray-600">
                  <dt className="font-semibold">Email</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.email}</dd>
                  )}

                  <dt className="font-semibold">Phone</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.phone}</dd>
                  )}

                  <dt className="font-semibold">Location</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.location}</dd>
                  )}
                </dl>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  Group Info
                </h2>
                <dl className="mt-4 space-y-4 text-gray-600">
                  <dt className="font-semibold">Group Name</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="groupName"
                        value={profile.groupName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.groupName}</dd>
                  )}

                  <dt className="font-semibold">Role</dt>
                  <dd>{profile.role}</dd>

                  {/* <dt className="font-semibold">Monthly Contribution</dt> */}
                  {/* {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="monthlyContribution"
                        value={profile.monthlyContribution}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.monthlyContribution}</dd>
                  )} */}

                  <dt className="font-semibold">Total Payouts</dt>
                  <dd>{profile.totalPayouts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
