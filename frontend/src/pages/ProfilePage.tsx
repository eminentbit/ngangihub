import React, { useState } from 'react';
import { FaArrowLeft as ArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Njang Doe',
    email: 'john@example.com',
    phone: '+237 678 123 456',
    location: 'Douala, Cameroon',
    groupName: 'Unity Savings',
    role: 'Treasurer',
    monthlyContribution: '10,000 XAF',
    totalPayouts: '50,000 XAF',
  });

  // Handle input changes during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        onClick={() => navigate("/user/dashboard")}
        className="absolute left-4 top-4 text-sm flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-600 py-2 px-4 hover:rounded-md transition-colors duration-300 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-all duration-300"
        />
        Back to User
      </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Profile Picture and Header */}
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col items-center md:flex-row md:items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
                />
                <div className="text-center md:text-left mt-4 md:mt-0 md:ml-6">
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                  )}
                  <p className="text-sm text-gray-500">{profile.role}, {profile.groupName}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={toggleEditMode}
                  className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500">Contributions</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{profile.monthlyContribution}</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Saved</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">120,000 XAF</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">January 2023</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Personal Information</h2>
                <dl className="mt-4 space-y-4 text-gray-600">
                  <dt className="font-semibold">Email</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.location}</dd>
                  )}
                </dl>
              </div>
                <dl className="mt-4 space-y-4 text-gray-600">
                  <dt className="font-semibold">Group Name</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="groupName"
                        value={profile.groupName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.groupName}</dd>
                  )}

                  <dt className="font-semibold">Role</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="role"
                        value={profile.role}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.role}</dd>
                  )}

                  <dt className="font-semibold">Monthly Contribution</dt>
                  {isEditing ? (
                    <dd>
                      <input
                        type="text"
                        name="monthlyContribution"
                        value={profile.monthlyContribution}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </dd>
                  ) : (
                    <dd>{profile.monthlyContribution}</dd>
                  )}

                  <dt className="font-semibold">Total Payouts</dt>
                  <dd>{profile.totalPayouts}</dd>
                </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;