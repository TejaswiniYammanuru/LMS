import React from 'react';
import { assets } from "../../assets/assets";
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import Loading from '../student/Loading';

const Navbar = () => {
  const { user, isLoaded } = useUser();  

  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <>
      <div className='flex justify-between items-center px-8 h-16 bg-white'>
        <Link to="/">
          <img src={assets.logo} alt="logo" className='w-28 lg:w-32' />
        </Link>

        <div className='flex items-center gap-4'>
          <p className='text-gray-700 text-sm font-medium'>
            Hi! {user ? user.fullName : 'Developer'}
          </p>
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <img 
              className='w-8 h-8 rounded-full' 
              src={assets.profile_img} 
              alt="profile" 
            />
          )}
        </div>
      </div>
      <div className='border-b border-gray-200'></div>
    </>
  );
};

export default Navbar;