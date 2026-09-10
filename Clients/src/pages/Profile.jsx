import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/users/userSlice.js';

import CloudinaryUpload from '../Components/CloudinaryUpload.jsx';

export default function Profile() {
  const { currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
  username: currentUser.username,
  email: currentUser.email,
  avatar: currentUser.avatar,
});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageUpload = async (imageUrl) => {
  try {
    dispatch(updateUserStart());

    const res = await fetch(`/api/users/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: imageUrl,
      }),
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }

    // Update Redux immediately
    dispatch(updateUserSuccess(data));

    // Update Profile image immediately
    setFormData((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));

    setUpdateSuccess(true);

  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdateSuccess(false);
      dispatch(updateUserStart());

      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
       credentials: 'include',
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/signout');
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div>
          <p className='text-red-700 mt-5'>
        {error ? error : ''}
      </p>

      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      </div>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <img
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover self-center mt-2'
        />

        <CloudinaryUpload onUpload={handleImageUpload} />

        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='email'
          placeholder='email'
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-[#29483F] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>

        <span
          onClick={handleSignOut}
          className='text-red-700 cursor-pointer'
        >
          Sign out
        </span>
      </div>

    
    </div>
  );
}
