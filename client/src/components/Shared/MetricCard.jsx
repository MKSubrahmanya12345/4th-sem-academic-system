import React from 'react';

const MetricCard = ({ label, value, subtext, color = 'accent' }) => {
  const colorMap = {
    accent: 'text-accent',
    success: 'text-green-600',
    warning: 'text-orange-500',
    danger: 'text-red-600',
  };

  return (
    <div className="boxy-card flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</h3>
        <div className={`text-4xl font-black ${colorMap[color] || 'text-black'}`}>
          {value}
        </div>
      </div>
      {subtext && (
        <p className="mt-4 text-[10px] font-bold uppercase text-gray-400 border-t pt-2 border-gray-100">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
