import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { updateProfile, uploadProfileImage, reset, getProfile } from '../features/home/homeSlice';
import { MdAlternateEmail, MdPerson } from 'react-icons/md';
import Navbar from '../components/Navbar';
import './Profile.css';
import ProfilePhoto from '../assets/Profile Photo.png';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, isLoading } = useSelector((state: RootState) => state.home);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile data on mount if not loaded
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  // Sync local state with profile data when it changes
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
  };

  const handleSaveClick = async () => {
    // Validation
    if (!firstName.trim()) {
      setValidationError('Nama depan harus diisi');
      return;
    }
    if (!lastName.trim()) {
      setValidationError('Nama belakang harus diisi');
      return;
    }
    setValidationError('');

    try {
      await dispatch(updateProfile({ first_name: firstName, last_name: lastName })).unwrap();
      setIsEditMode(false);
      setNotifMessage('Profile berhasil diupdate');
      setShowSuccessNotif(true);
      setTimeout(() => setShowSuccessNotif(false), 3000);
    } catch (error: any) {
      setNotifMessage(error || 'Gagal mengupdate profile');
      setShowErrorNotif(true);
      setTimeout(() => setShowErrorNotif(false), 3000);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|png)/)) {
      alert('Format Image tidak sesuai. Hanya JPEG dan PNG yang diperbolehkan.');
      return;
    }

    // Validate file size (max 100kb)
    if (file.size > 100 * 1024) {
      alert('Ukuran file terlalu besar. Maksimum 100KB.');
      return;
    }

    try {
      await dispatch(uploadProfileImage(file)).unwrap();
      setNotifMessage('Profile picture berhasil diupdate');
      setShowSuccessNotif(true);
      setTimeout(() => setShowSuccessNotif(false), 3000);
    } catch (error: any) {
      setNotifMessage(error || 'Gagal mengupload profile picture');
      setShowErrorNotif(true);
      setTimeout(() => setShowErrorNotif(false), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(reset());
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <Navbar />

      {showSuccessNotif && (
        <div className="success-notification">
          {notifMessage}
        </div>
      )}

      {showErrorNotif && (
        <div className="error-notification">
          {notifMessage}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture-container" onClick={handleProfilePictureClick}>
            <img 
              src={profile?.profile_image || ProfilePhoto} 
              alt="Profile"
              className="profile-picture"
              onError={(e) => {
                e.currentTarget.src = ProfilePhoto;
              }}
            />
            <div className="edit-icon">✏️</div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <h2 className="profile-name">
            {profile?.first_name} {profile?.last_name}
          </h2>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <span className="input-icon"><MdAlternateEmail /></span>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nama Depan</label>
            <div className="input-with-icon">
              <span className="input-icon"><MdPerson /></span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditMode}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nama Belakang</label>
            <div className="input-with-icon">
              <span className="input-icon"><MdPerson /></span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditMode}
                className="form-input"
              />
            </div>
          </div>

          {validationError && (
            <div className="validation-error">
              {validationError}
            </div>
          )}

          {!isEditMode ? (
            <>
              <button className="btn-edit" onClick={handleEditClick}>
                Edit Profil
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-save" 
                onClick={handleSaveClick}
                disabled={isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={handleCancelClick}
                disabled={isLoading}
              >
                Batalkan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
