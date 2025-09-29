import React, { useState, useEffect } from 'react';
import { IconUser, IconMail, IconCalendar, IconShield, IconEdit, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../config/api';

const Profile = () => {
  const { logout, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      loadProfileData();
    } else {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  const loadProfileData = async () => {
    try {
      const userData = await getUserProfile();
      setProfileData(userData);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="error-message">
            <p>Failed to load profile data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profileData.picture ? (
              <img src={profileData.picture} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <IconUser size={48} />
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profileData.name || 'User'}</h1>
            <p className="profile-email">{profileData.email}</p>
            <div className="profile-badges">
              <span className="badge verified">
                <IconShield size={16} />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h2 className="section-title">Personal Information</h2>
          
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-icon">
                <IconUser size={20} />
              </div>
              <div className="detail-content">
                <label>Full Name</label>
                <p>{profileData.name || 'N/A'}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <IconMail size={20} />
              </div>
              <div className="detail-content">
                <label>Email Address</label>
                <p>{profileData.email || 'N/A'}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <IconUser size={20} />
              </div>
              <div className="detail-content">
                <label>Given Name</label>
                <p>{profileData.givenName || 'N/A'}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <IconUser size={20} />
              </div>
              <div className="detail-content">
                <label>Family Name</label>
                <p>{profileData.familyName || 'N/A'}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <IconCalendar size={20} />
              </div>
              <div className="detail-content">
                <label>Last Login</label>
                <p>{formatDate(profileData.lastLogin)}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <IconShield size={20} />
              </div>
              <div className="detail-content">
                <label>Account Status</label>
                <p className="status-verified">
                  <IconShield size={16} />
                  Verified Account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <button className="action-btn primary">
            <IconEdit size={18} />
            Edit Profile
          </button>
          <button className="action-btn secondary" onClick={logout}>
            <IconLogout size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
