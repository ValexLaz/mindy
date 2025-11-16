// src/components/Reports/EvolutionLineChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { type EvolucionItem } from '../../api/reportesService';

interface Props { data: EvolucionItem[]; }

const EvolutionLineChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(d => ({
    mes: d.mes,
    promedio: Number(d.promedio),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="promedio" dot={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EvolutionLineChart;
