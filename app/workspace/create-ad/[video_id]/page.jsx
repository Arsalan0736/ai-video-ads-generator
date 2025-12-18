"use client"
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Script from './_components/Script';

function CreateVideo() {
  const { video_id } = useParams();
  const [videoData, setVideoData] = useState({});
  const convex = useConvex();
  useEffect(() => {
    GetVideoData();
  }, []);
  const GetVideoData = async () => {
    const result = await convex.query(api.videoData.GetVideoDataById, {
      vid: video_id
    });
    console.log(result);
    setVideoData(result);
  }

  const onHandleInputChange=(field,value)=>{
    setVideoData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <div>
      <h2 className='font-bold text-2xl'>Create Video Ad</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
        <div className='md:col-span-2'>
          <Script videoData={videoData} onHandleInputChange={onHandleInputChange} />
        </div>
        <div>
          Preview
        </div>
      </div>
    </div>
  )
}

export default CreateVideo
