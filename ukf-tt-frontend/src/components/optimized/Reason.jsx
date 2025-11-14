import React, { memo } from 'react';

const Reason = memo(({ icon, title, desc }) => {
  return (
    <div className="p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-sm border border-gray-700/30">
      <div className="text-lg mb-2 font-semibold text-blue-400">{icon}</div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-300 mt-1">{desc}</p>
    </div>
  );
});

Reason.displayName = 'Reason';

export default Reason;
