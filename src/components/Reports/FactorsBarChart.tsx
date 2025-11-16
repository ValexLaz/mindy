// src/components/Reports/FactorsBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { type FactorItem } from '../../api/reportesService';

interface Props { data: FactorItem[]; }

const FactorsBarChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(d => ({
    factor: d.factor,
    frecuencia: Number(d.frecuencia),
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="factor" angle={-25} textAnchor="end" interval={0} height={60} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frecuencia" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FactorsBarChart;
