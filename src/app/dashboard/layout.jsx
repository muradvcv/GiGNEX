import DashboradSidebar from '@/components/dashboard/DashboradSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
  return (
    <div className='min-h-screen'>
      <DashboradSidebar/>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;