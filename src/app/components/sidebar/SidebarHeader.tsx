


'use client';

import { FiMenu } from 'react-icons/fi';

export default function SidebarHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Projects</h2>
      <button className="text-white">
        <FiMenu size={20} />
      </button>
    </div>
  );
}
