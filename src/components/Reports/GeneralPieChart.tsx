// src/components/Reports/GeneralPieChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type ResumenGeneralItem } from '../../api/reportesService';

interface Props { data: ResumenGeneralItem[]; }

const GeneralPieChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(d => ({
    name: d.nivel,
    value: Number(d.cantidad),
  }));

  // Colores por defecto (Recharts asigna si no se definen; dejamos algunos)
  const COLORS = ['#4ECDC4','#FF6B6B','#FFE66D','#95A5A6','#2ECC71'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={110} label>
          {chartData.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GeneralPieChart;
