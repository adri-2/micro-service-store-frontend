import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="surface flex items-center justify-between p-5">
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${color} text-lg text-white shadow-sm`}>
        {icon}
      </span>
    </div>
  );
};

export default StatCard;