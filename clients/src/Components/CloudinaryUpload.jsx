
import { useState } from 'react';

export default function CloudinaryUpload({ onUpload }) {

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpload = () => {

    setError(false);
    setUploading(true);

    window.cloudinary.openUploadWidget(
      {
      cloudName: "chldayob",

        uploadPreset: "mern_estate_profile",

        sources: ['local'],

        multiple: false,

        maxFiles: 1,

        resourceType: 'image',

        folder: 'mern-estate/profile-images',
      },

      (error, result) => {

        if (error) {

          console.log(error);

          setError(true);
          setUploading(false);

          return;
        }

        if (result.event === 'success') {

          const imageUrl = result.info.secure_url;

          console.log('Cloudinary Image URL:', imageUrl);

          onUpload(imageUrl);

          setUploading(false);
        }
      }
    );
  };

  return (

    <div className='flex flex-col items-center gap-2'>

      <button
        type='button'
        onClick={handleUpload}
        disabled={uploading}
        className='bg-slate-700 text-white px-4 py-2 rounded-lg hover:opacity-95 disabled:opacity-70'
      >
        {uploading
          ? 'Uploading...'
          : 'Upload Profile Image'}
      </button>

      {error && (
        <p className='text-red-700 text-sm'>
          Error uploading image
        </p>
      )}

    </div>

  );
}
