import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline} from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import { urlFor, client } from '../client';
import { fetchUser } from '../utils/fetchUser';

export const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;

  const savePin = (id) => {
    if(!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
        })
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
  }

  return (
    <div className='ml-1 mr-1 mt-2 mb-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img className='w-full' src={urlFor(image).width(250).url()} alt='user-post' />
      {postHovered && (
        <div
          className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          style={{height: '100%'}}
        >
          <div className='flex items-center justify-between'>
            <div 
              className='flex gap-2 items-center cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user-profile/${postedBy._id}`)
              }}
            >
              <img 
                className='w-8 h-8 rounded-full object-cover'
                src={postedBy?.image} 
                alt='user-profile'
              />
              <p className='font-semibold text-white capitalize'>{postedBy?.userName}</p>
            </div>
            {alreadySaved ? (
              <div className='flex items-center'>
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id)
                }}
                type='button' className='bg-white flex items-center gap-2 text-black font-bold text-sm p-1 pl-3 pr-3 rounded-full opacity-70 hover:100 hover:shadow-md'>
                  {save?.length} 
                  <FaBookmark />
                </button>
              </div>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id)
                }}
                type='button' className='flex justify-center items-center bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none'
              >
                <FaRegBookmark />
              </button>
            )}
          </div>

          

          <div className='flex justify-between items-center gap-2 w-full'>
            {destination && (
              <a 
                href={destination}
                target='_blank'
                rel='noreferrer'
                className='bg-white flex items-center gap-2 text-black font-bold text-sm p-1 pl-3 pr-3 rounded-full opacity-70 hover:100 hover:shadow-md'
              >
                <BsFillArrowUpRightCircleFill />
                {destination.length > 15 ? `${destination.slice(12, 20)}...` : destination}
              </a>
            )}
            <div className='flex gap-2'>
              <div className=''>
                <a 
                  href={`${image?.asset?.url}?dl=`} 
                  download 
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {postedBy?._id === user?.googleId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id)
                  }}
                  type='button' className='flex justify-center items-center bg-white p-1.5 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none'
                  style={{minWidth: '2rem', minHeight: '2rem'}}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      </div>
    </div>
  )
}