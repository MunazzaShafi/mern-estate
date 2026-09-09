import React from 'react'
import { useSelector } from 'react-redux';
import {useRef} from 'react';

export default function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
  return (
    
    <div className=" p-3 max-w-lg  mx-auto">
       <h1 className="text-3xl font-semibold text-[#29483F] text-center my-7">
            Your Profile
          </h1>
          <form className="flex flex-col gap-5">
            <img onClick={()=>fileRef.current.onClick()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover border-4 shadow-md self-center cursor-pointer"/>
            <input type="text" placeholder="Username" id="username" className="border p-3 rounded-lg"/>
            <input type="email" placeholder="Email" id="email" className="border p-3 rounded-lg"/>
            <input type="password" placeholder="Enter new password" id="password" className="border p-3 rounded-lg"/>

            <button className="bg-[#29483F] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-70">Update Profile</button>
          </form>
        <div className="flex justify-between mt-7">
          <span className=" text-red-600 font-bold cursor-pointer">
            Delete Account
          </span>
          <span className=" text-red-600 font-bold cursor-pointer">
            Sign Out
          </span>
        </div>
    </div>
  )
}





// import { useSelector, useState, useEffect, useRef } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';

// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
// } from '../redux/user/userSlice';

// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function Profile() {
//   const fileRef = useRef(null);

//   const { currentUser, loading, error } = useSelector(
//     (state) => state.user
//   );

//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//         setFilePerc(Math.round(progress));
//       },
//       () => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(updateUserStart());

//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());

//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }

//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());

//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }

//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);

//       const res = await fetch(
//         `/api/user/listings/${currentUser._id}`
//       );

//       const data = await res.json();

//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }

//       setUserListings(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] px-4 py-10">
//       <div className="max-w-5xl mx-auto">

//         {/* Page Heading */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#29483F] mb-3">
//             <span className="text-[#E8C98D] font-bold text-xl">
//               B
//             </span>
//           </div>

//           <h1 className="text-3xl font-semibold text-[#29483F]">
//             Your Profile
//           </h1>

//           <p className="text-sm text-[#7B817C] mt-2">
//             Manage your BellaEstate account
//           </p>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white border border-[#D8DED9] rounded-2xl shadow-sm p-6 md:p-8">

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">

//             {/* Profile Image */}
//             <div className="flex flex-col items-center">
//               <input
//                 onChange={(e) => setFile(e.target.files[0])}
//                 type="file"
//                 ref={fileRef}
//                 hidden
//                 accept="image/*"
//               />

//               <div
//                 onClick={() => fileRef.current.click()}
//                 className="relative cursor-pointer group"
//               >
//                 <img
//                   src={formData.avatar || currentUser.avatar}
//                   alt="profile"
//                   className="rounded-full h-28 w-28 object-cover border-4 border-[#E8C98D] shadow-md"
//                 />

//                 <div className="absolute inset-0 rounded-full bg-[#29483F]/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                   <span className="text-white text-xs font-medium">
//                     Change Photo
//                   </span>
//                 </div>
//               </div>

//               <p className="text-xs mt-3">
//                 {fileUploadError ? (
//                   <span className="text-red-600">
//                     Image must be less than 2 MB
//                   </span>
//                 ) : filePerc > 0 && filePerc < 100 ? (
//                   <span className="text-[#52796F]">
//                     Uploading {filePerc}%
//                   </span>
//                 ) : filePerc === 100 ? (
//                   <span className="text-[#52796F]">
//                     Image uploaded successfully
//                   </span>
//                 ) : (
//                   <span className="text-[#8A806F]">
//                     Click image to change
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* Inputs */}
//             <div>
//               <label className="block text-sm font-medium text-[#29483F] mb-2">
//                 Username
//               </label>

//               <input
//                 type="text"
//                 placeholder="Username"
//                 defaultValue={currentUser.username}
//                 id="username"
//                 onChange={handleChange}
//                 className="w-full border border-[#D8DED9] bg-[#FAFBFA] p-3 rounded-xl outline-none text-[#29483F] placeholder:text-[#A39B8D] focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F] transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-[#29483F] mb-2">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 placeholder="Email"
//                 id="email"
//                 defaultValue={currentUser.email}
//                 onChange={handleChange}
//                 className="w-full border border-[#D8DED9] bg-[#FAFBFA] p-3 rounded-xl outline-none text-[#29483F] placeholder:text-[#A39B8D] focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F] transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-[#29483F] mb-2">
//                 New Password
//               </label>

//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 id="password"
//                 onChange={handleChange}
//                 className="w-full border border-[#D8DED9] bg-[#FAFBFA] p-3 rounded-xl outline-none text-[#29483F] placeholder:text-[#A39B8D] focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F] transition"
//               />
//             </div>

//             {/* Update Button */}
//             <button
//               disabled={loading}
//               className="w-full bg-[#29483F] text-white p-3.5 rounded-xl font-medium hover:bg-[#203A33] transition disabled:opacity-70"
//             >
//               {loading ? 'Updating...' : 'Update Profile'}
//             </button>

//             {/* Create Listing */}
//             <Link
//               to="/create-listing"
//               className="w-full border border-[#29483F] text-[#29483F] p-3.5 rounded-xl font-medium text-center hover:bg-[#29483F] hover:text-white transition"
//             >
//               Create Listing
//             </Link>
//           </form>

//           {/* Account Actions */}
//           <div className="flex justify-between mt-7 pt-5 border-t border-[#E5E8E5]">
//             <button
//               onClick={handleDeleteUser}
//               className="text-sm text-red-600 hover:text-red-700 font-medium transition"
//             >
//               Delete account
//             </button>

//             <button
//               onClick={handleSignOut}
//               className="text-sm text-[#A67C3D] hover:text-[#8C672F] font-medium transition"
//             >
//               Sign out
//             </button>
//           </div>

//           {/* Messages */}
//           {error && (
//             <p className="text-red-600 text-sm text-center mt-5 bg-red-50 border border-red-100 rounded-lg p-3">
//               {error}
//             </p>
//           )}

//           {updateSuccess && (
//             <p className="text-[#52796F] text-sm text-center mt-5 bg-[#EEF2EF] border border-[#D8DED9] rounded-lg p-3">
//               Profile updated successfully!
//             </p>
//           )}
//         </div>

//         {/* Listings Section */}
//         <div className="mt-8">
//           <button
//             onClick={handleShowListings}
//             className="w-full bg-[#52796F] text-white p-3.5 rounded-xl font-medium hover:bg-[#466A61] transition"
//           >
//             Show My Listings
//           </button>

//           {showListingsError && (
//             <p className="text-red-600 text-sm text-center mt-4">
//               Error showing listings
//             </p>
//           )}

//           {userListings && userListings.length > 0 && (
//             <div className="mt-8">
//               <div className="mb-5">
//                 <h2 className="text-2xl font-semibold text-[#29483F]">
//                   Your Listings
//                 </h2>

//                 <p className="text-sm text-[#7B817C] mt-1">
//                   Properties you have added to BellaEstate
//                 </p>
//               </div>

//               <div className="flex flex-col gap-4">
//                 {userListings.map((listing) => (
//                   <div
//                     key={listing._id}
//                     className="bg-white border border-[#D8DED9] rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow-sm transition"
//                   >
//                     {/* Listing Image */}
//                     <Link to={`/listing/${listing._id}`}>
//                       <img
//                         src={listing.imageUrls[0]}
//                         alt="listing cover"
//                         className="h-20 w-20 rounded-lg object-cover border border-[#D8DED9]"
//                       />
//                     </Link>

//                     {/* Listing Name */}
//                     <Link
//                       className="text-[#29483F] font-semibold hover:text-[#A67C3D] transition truncate flex-1"
//                       to={`/listing/${listing._id}`}
//                     >
//                       <p>{listing.name}</p>
//                     </Link>

//                     {/* Actions */}
//                     <div className="flex flex-col items-end gap-2">
//                       <button
//                         onClick={() =>
//                           handleListingDelete(listing._id)
//                         }
//                         className="text-xs text-red-600 uppercase font-medium hover:text-red-700 transition"
//                       >
//                         Delete
//                       </button>

//                       <Link
//                         to={`/update-listing/${listing._id}`}
//                         className="text-xs text-[#52796F] uppercase font-medium hover:text-[#29483F] transition"
//                       >
//                         Edit
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {userListings && userListings.length === 0 && (
//             <div className="text-center mt-6">
//               <p className="text-sm text-[#8A806F]">
//                 You don't have any listings yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }