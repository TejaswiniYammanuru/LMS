import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from "../../assets/assets";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className="md:w-64 flex pl-8 pr-8 gap-4 border border-l-0 border-t-0 min-h-screen border-gray-200 text-base py-2 flex-col">
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end={item.path === '/educator'}
          className={({ isActive }) => 
            isActive 
              ? "py-2 px-3 rounded-md cursor-pointer flex gap-3 items-center bg-blue-50 text-blue-600"
              : "py-2 px-3 rounded-md cursor-pointer flex gap-3 items-center text-gray-700 hover:bg-gray-50"
          }
        >
          <img 
            src={item.icon} 
            alt="" 
            className="w-6 h-6"
          />
          <p className="font-medium">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;