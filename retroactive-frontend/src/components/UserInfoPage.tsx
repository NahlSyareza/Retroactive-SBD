import React, { useState } from 'react';
import './UserInfoPage.css'; // Import the CSS file

interface UserData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface UserInfoPageProps {
  userData: UserData | null;
}

const UserInfoPage: React.FC<UserInfoPageProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState<UserData | null>(userData);
  const [newPassword, setNewPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUserData) {
      setEditedUserData({
        ...editedUserData,
        [name]: value
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    if (editedUserData) {
      try {
        const response = await fetch('http://localhost:1466/user/editProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newName: editedUserData.name,
            newEmail: editedUserData.email,
            newPassword: newPassword,
            emailUser: userData?.email // Use the existing email to identify the user
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update profile');
        }

        const result = await response.json();
        console.log('User data saved:', result.data);
        setIsEditing(false);
        setEditedUserData(result.data); // Update the userData state with the new data
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error updating profile:', error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info-container">
      <div className="user-info-bubble title-bubble">
        <h2>User Information</h2>
      </div>
      <div className="user-info-bubble content-bubble">
        {isEditing ? (
          <div>
            <div className="form-group">
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="name"
                value={editedUserData?.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label><strong>Email:</strong></label>
              <input
                type="email"
                name="email"
                value={editedUserData?.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label><strong>Address:</strong></label>
              <input
                type="text"
                name="address"
                value={editedUserData?.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label><strong>Phone:</strong></label>
              <input
                type="text"
                name="phone"
                value={editedUserData?.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label><strong>New Password:</strong></label>
              <input
                type="password"
                name="password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="nav-btn" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <button className="nav-btn" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoPage;
