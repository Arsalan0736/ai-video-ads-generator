import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Video } from 'lucide-react'
import React from 'react'

function Script({ videoData, onHandleInputChange }) {
  return (
    <div className='p-5 shadow rounded-xl'>
      <h2 className='font-bold text-lg flex gap-2 items-center'><Video className='p-2 bg-green-600 text-white h-10 w-10 rounded-md'/>Video Ads Script</h2>
      <hr className='my-3' />
      <div className=''>
        <label className='text-gray-500'>Video Project Topic</label>
        <Input className={'text-lg'} value={videoData?.topic || ''} readOnly />
      </div>
      <div className='mt-3'>
        <label className='text-gray-500'>Video Script</label>
        <Textarea className={'text-lg'}
            onChange={(e) => onHandleInputChange('script', e.target.value)}
          value={videoData?.script || (videoData?.scriptVariant?.[0]?.script ? videoData.scriptVariant[0].script.map(item => item.text || item.content || JSON.stringify(item)) : '')}
        />
      </div>
      <div className='grid grid-cols-3 gap-3 mt-5'>
        {videoData?.scriptVariant?.map((variant, index) => (
          <div key={index}
            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${variant?.script?.map(item => item.text || item.content || JSON.stringify(item)).join('\n\n') === videoData?.script ? 'border-primary bg-blue-100 text-primary' : ''}`}
            onClick={() => onHandleInputChange('script', variant?.script?.map(item => item.text || item.content || JSON.stringify(item)).join('\n\n') || '')}>
            <p className='text-xs line-clamp-3'>
              {variant?.script?.map(item => item.text || item.content || JSON.stringify(item)).join(' ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Script
