import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const ProgressChart = () => {
  // 模拟数据
  const data = [
    { name: '1月', 完成: 65, 计划: 70, 延期: 5 },
    { name: '2月', 完成: 78, 计划: 75, 延期: 3 },
    { name: '3月', 完成: 85, 计划: 80, 延期: 2 },
    { name: '4月', 完成: 92, 计划: 85, 延期: 1 },
    { name: '5月', 完成: 88, 计划: 90, 延期: 4 },
    { name: '6月', 完成: 95, 计划: 95, 延期: 0 },
  ];

  const areaData = [
    { name: '周一', 技术部: 75, 设计部: 60, 数据部: 85 },
    { name: '周二', 技术部: 80, 设计部: 65, 数据部: 88 },
    { name: '周三', 技术部: 85, 设计部: 70, 数据部: 90 },
    { name: '周四', 技术部: 82, 设计部: 75, 数据部: 92 },
    { name: '周五', 技术部: 88, 设计部: 80, 数据部: 95 },
    { name: '周六', 技术部: 90, 设计部: 85, 数据部: 97 },
    { name: '周日', 技术部: 92, 设计部: 88, 数据部: 98 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-text-primary font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 月度进度对比 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">月度进度对比</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="完成" 
              fill="var(--primary)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="计划" 
              fill="var(--secondary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 部门进度趋势 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">部门进度趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="技术部" 
              stackId="1"
              stroke="var(--primary)" 
              fill="var(--primary)" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="设计部" 
              stackId="1"
              stroke="var(--secondary)" 
              fill="var(--secondary)" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="数据部" 
              stackId="1"
              stroke="var(--success)" 
              fill="var(--success)" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 图例 */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-text-secondary">技术部</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded"></div>
          <span className="text-text-secondary">设计部</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-text-secondary">数据部</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart; 