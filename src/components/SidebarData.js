import React from 'react';
import { ImHome, ImUsers, ImPencil, ImClock2 } from 'react-icons/im';

export const SidebarData = [
  {
    title: 'Customers',
    path: '/customers',
    icon: <ImUsers />,
    className: 'nav-text',
  },
  {
    title: 'Manage Customers',
    path: '/manage-customers',
    icon: <ImPencil />,
    className: 'nav-text',
  },
  {
    title: 'History Logs',
    path: '/history-logs',
    icon: <ImClock2 />,
    className: 'nav-text',
  },
];

export default SidebarData;
