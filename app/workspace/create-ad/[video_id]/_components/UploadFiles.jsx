import { FilePlus, ImageUp, X } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'

function UploadFiles({ videoData }) {
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  }
  const removeImage = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  }

  return (
    <div className='p-5 shadow rounded-xl mt-5'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <ImageUp className='p-2 bg-blue-600 text-white h-10 w-10 rounded-md' />
        Image/Video Upload
      </h2>
      <hr className='my-3' />
      <div className=''>
        <label className='text-gray-500'>Upload Images or Videos for your Ads</label>
        <label htmlFor='fileUpload'>
          <div className='p-5 bg-secondary border-dashed mt-2 rounded-xl cursor-pointer flex items-center flex-col'>
            <FilePlus className='size-10 text-gray-400' />
            <h2>Click here to Upload files</h2>
          </div>
        </label>
        <input type='file' className='invisible' id='fileUpload'
          accept='image/*,video/*'
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 cursor-pointer'>
        {files.map((file, index) => {
          const previewUrl = URL.createObjectURL(file);
          const isVideo = file.type.startsWith('video/');
          return (
            <div key={index} className='relative'>
              <X className='absolute text-white text-sm bg-black/50 rounded-full p-1 cursor-pointer' onClick={() => removeImage(index)} />
              {isVideo ? (
                <video src={previewUrl}
                  className='w-[90px] h-[70px] object-cover rounded-lg'
                  controls={false}
                  muted
                />
              ) : (
                <Image src={previewUrl} alt='images' width={150} height={150}
                  className='w-[90px] h-[70px] object-cover rounded-lg' />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UploadFiles
