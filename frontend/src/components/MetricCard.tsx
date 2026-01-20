// src/components/MetricCard.tsx
import React, { type ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const MetricCard = ({ title, value, icon }: MetricCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  );
};

export default MetricCard;
