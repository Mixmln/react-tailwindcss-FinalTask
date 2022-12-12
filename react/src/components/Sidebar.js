import React from 'react';
import SidebarFilter from './SidebarFilter';

export default function Sidebar() {
  return (
    <div className='w-1/5  h-4/6 bg-orange-100 absolute top-24 left-14 rounded-xl shadow-xl'>
      <header className='flex iiems-center justify-around bg-orange-200 rounded-xl'>
        <h3 className='w-6/12 text-center p-3 font-bold tracking-wider text-lg'>Filters</h3>
      </header>
      <SidebarFilter></SidebarFilter>
    </div>
  );
}
