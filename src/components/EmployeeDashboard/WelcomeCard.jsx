import React from 'react'
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const WelcomeCard = () => {
    const { user } = useAuth();
    return (
      <div className="flex items-center bg-[#1F1C2C] text-[#928DAB] p-4 rounded-lg shadow-md w-full">
        {/* Icon section */}
        <div className="text-3xl mr-4 text-[#928DAB]"><FaUser/></div>

        {/* Text + number */}
        <div className="flex flex-col">
          <p className="text-sm font-medium">Welcome Back</p>
          <p className="text-xl font-bold text-white"></p>
        <p className='text-xl font-bold'> {user.name} </p>
        </div>
      </div>
    );
}

export default WelcomeCard
