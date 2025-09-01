import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  Filter,
  TrendingUp,
  Users,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // 项目统计数据
  const projectStats = [
    { name: '进行中', value: 12, color: '#3B82F6' },
    { name: '已完成', value: 8, color: '#10B981' },
    { name: '已暂停', value: 3, color: '#F59E0B' },
    { name: '已取消', value: 1, color: '#EF4444' }
  ];

  // 任务统计数据
  const taskStats = [
    { name: '待开始', value: 25, color: '#6B7280' },
    { name: '进行中', value: 18, color: '#3B82F6' },
    { name: '审核中', value: 8, color: '#F59E0B' },
    { name: '已完成', value: 32, color: '#10B981' }
  ];

  // 部门表现数据
  const departmentData = [
    { name: '技术部', completed: 15, total: 20, efficiency: 85 },
    { name: '设计部', completed: 8, total: 12, efficiency: 78 },
    { name: '数据部', completed: 6, total: 8, efficiency: 92 },
    { name: '市场部', completed: 12, total: 15, efficiency: 80 }
  ];

  // 工作量分析数据
  const workloadData = [
    { name: '张三', tasks: 8, hours: 45, efficiency: 92 },
    { name: '李四', tasks: 6, hours: 38, efficiency: 88 },
    { name: '王五', tasks: 10, hours: 52, efficiency: 85 },
    { name: '赵六', tasks: 7, hours: 42, efficiency: 90 },
    { name: '钱七', tasks: 5, hours: 35, efficiency: 95 }
  ];

  // 时间线分析数据
  const timelineData = [
    { date: '1月1日', completed: 5, started: 8 },
    { date: '1月2日', completed: 7, started: 6 },
    { date: '1月3日', completed: 4, started: 9 },
    { date: '1月4日', completed: 8, started: 5 },
    { date: '1月5日', completed: 6, started: 7 },
    { date: '1月6日', completed: 9, started: 4 },
    { date: '1月7日', completed: 5, started: 8 }
  ];

  // 风险分析数据
  const riskAnalysis = [
    { project: '移动端应用开发', risk: 'high', impact: 'critical', probability: 0.3 },
    { project: '企业官网重构', risk: 'medium', impact: 'moderate', probability: 0.5 },
    { project: '数据分析平台', risk: 'low', impact: 'low', probability: 0.2 },
    { project: '客户管理系统', risk: 'high', impact: 'high', probability: 0.4 }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-success';
    if (efficiency >= 80) return 'text-primary';
    if (efficiency >= 70) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">数据分析</h1>
          <p className="text-text-secondary mt-2">项目进度、团队表现和风险分析</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg p-1">
            <Filter className="w-4 h-4 text-text-muted" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-text-primary"
            >
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
              <option value="year">本年</option>
            </select>
          </div>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">83%</div>
              <div className="text-sm text-text-secondary">项目完成率</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">24</div>
              <div className="text-sm text-text-secondary">已完成项目</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">1,240</div>
              <div className="text-sm text-text-secondary">总工时</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-danger/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">3</div>
              <div className="text-sm text-text-secondary">高风险项目</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 项目进度分布 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">项目进度分布</h2>
            <PieChart className="w-5 h-5 text-text-muted" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={projectStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {projectStats.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-text-secondary">{item.name}</span>
                <span className="text-sm font-medium text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 部门表现对比 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">部门表现对比</h2>
            <BarChart3 className="w-5 h-5 text-text-muted" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3B82F6" name="已完成" />
                <Bar dataKey="total" fill="#6B7280" name="总任务" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 团队成员工作量分析 */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">团队成员工作量分析</h2>
          <Users className="w-5 h-5 text-text-muted" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">成员</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">任务数</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">工时</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">效率</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">状态</th>
              </tr>
            </thead>
            <tbody>
              {workloadData.map((member, index) => (
                <tr key={index} className="border-b border-border hover:bg-bg-tertiary transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-text-primary">{member.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-text-primary">{member.tasks}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-text-primary">{member.hours}h</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-medium ${getEfficiencyColor(member.efficiency)}`}>
                      {member.efficiency}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        member.efficiency >= 90 ? 'bg-success' :
                        member.efficiency >= 80 ? 'bg-primary' :
                        member.efficiency >= 70 ? 'bg-warning' : 'bg-danger'
                      }`}></div>
                      <span className="text-sm text-text-secondary">
                        {member.efficiency >= 90 ? '优秀' :
                         member.efficiency >= 80 ? '良好' :
                         member.efficiency >= 70 ? '一般' : '需改进'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 任务完成趋势 */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">任务完成趋势</h2>
          <LineChart className="w-5 h-5 text-text-muted" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10B981" name="已完成" strokeWidth={2} />
              <Line type="monotone" dataKey="started" stroke="#3B82F6" name="新开始" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 项目风险分析 */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">项目风险分析</h2>
          <AlertTriangle className="w-5 h-5 text-text-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskAnalysis.map((project, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-text-primary">{project.project}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.risk)}`}>
                  {project.risk === 'high' && '高风险'}
                  {project.risk === 'medium' && '中风险'}
                  {project.risk === 'low' && '低风险'}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">影响程度:</span>
                  <span className="text-text-primary capitalize">{project.impact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">发生概率:</span>
                  <span className="text-text-primary">{(project.probability * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">风险评分:</span>
                  <span className={`font-medium ${getRiskColor(project.risk)}`}>
                    {Math.round(project.probability * 100)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 智能分析报告 */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">AI 智能分析报告</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h3 className="font-medium text-success mb-2">✅ 积极趋势</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• 项目完成率较上月提升 8%</li>
                <li>• 团队平均效率达到 87%</li>
                <li>• 高风险项目数量减少 2 个</li>
                <li>• 客户满意度评分上升</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <h3 className="font-medium text-warning mb-2">⚠️ 需要关注</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• 技术部工作量过载，建议增加人手</li>
                <li>• 3个项目存在延期风险</li>
                <li>• 部分任务依赖关系复杂</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-medium text-primary mb-2">💡 优化建议</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• 建议优化任务分配机制</li>
                <li>• 加强跨部门协作流程</li>
                <li>• 建立更完善的风险预警系统</li>
                <li>• 定期进行团队技能培训</li>
              </ul>
            </div>
            
            <div className="p-4 bg-bg-tertiary rounded-lg">
              <h3 className="font-medium text-text-primary mb-2">📊 预测分析</h3>
              <div className="text-sm text-text-secondary space-y-2">
                <p>基于当前趋势，预计下月：</p>
                <ul className="space-y-1">
                  <li>• 项目完成率将达到 88%</li>
                  <li>• 团队效率提升至 90%</li>
                  <li>• 高风险项目减少至 1 个</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 