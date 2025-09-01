import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Activity, 
  BarChart3, 
  PieChart 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  const stats = [
    {
      title: '进行中项目',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Target,
      color: 'primary'
    },
    {
      title: '待处理任务',
      value: '48',
      change: '-5',
      changeType: 'negative',
      icon: Clock,
      color: 'warning'
    },
    {
      title: '完成率',
      value: '85%',
      change: '+3%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'success'
    },
    {
      title: '风险项目',
      value: '3',
      change: '+1',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'danger'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: '移动端应用开发',
      department: '技术部',
      progress: 75,
      status: '进行中',
      dueDate: '2024-02-15',
      members: 8,
      priority: 'high'
    },
    {
      id: 2,
      name: '企业官网重构',
      department: '设计部',
      progress: 45,
      status: '进行中',
      dueDate: '2024-03-01',
      members: 5,
      priority: 'medium'
    },
    {
      id: 3,
      name: '数据分析平台',
      department: '数据部',
      progress: 90,
      status: '即将完成',
      dueDate: '2024-01-30',
      members: 6,
      priority: 'high'
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: '完成用户界面设计',
      project: '移动端应用开发',
      assignee: '张三',
      dueDate: '2024-01-20',
      priority: 'high',
      status: '进行中'
    },
    {
      id: 2,
      title: '数据库架构设计',
      project: '数据分析平台',
      assignee: '李四',
      dueDate: '2024-01-22',
      priority: 'high',
      status: '待开始'
    },
    {
      id: 3,
      title: 'API接口开发',
      project: '移动端应用开发',
      assignee: '王五',
      dueDate: '2024-01-25',
      priority: 'medium',
      status: '进行中'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-2">仪表盘</h1>
        <p className="text-text-secondary">项目概览与关键指标</p>
        <div className="flex items-center justify-center space-x-2 mt-4 text-text-muted">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">最后更新: {new Date().toLocaleString('zh-CN')}</span>
        </div>
      </div>

      {/* 统计卡片 - 垂直排列 */}
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="w-full">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* 项目进度图表 */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">项目进度概览</h2>
          <p className="text-text-secondary text-sm mt-1">实时项目状态和进度分析</p>
          <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-text-muted">
            <Activity className="w-4 h-4" />
            <span>实时数据</span>
          </div>
        </div>
        <div className="h-80">
          <ProgressChart />
        </div>
      </div>

      {/* 最近项目 */}
      <div className="card">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-text-primary">最近项目</h3>
          <p className="text-text-secondary text-sm mt-1">最新更新的项目</p>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* 快速操作 */}
      <div className="card">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-text-primary">快速操作</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button className="btn btn-primary w-full">
            <Target className="w-4 h-4" />
            新建项目
          </button>
          <button className="btn btn-secondary w-full">
            <CheckCircle className="w-4 h-4" />
            创建任务
          </button>
          <button className="btn btn-secondary w-full">
            <BarChart3 className="w-4 h-4" />
            生成报告
          </button>
          <button className="btn btn-secondary w-full">
            <Users className="w-4 h-4" />
            团队管理
          </button>
        </div>
      </div>

      {/* 紧急任务 */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">紧急任务</h2>
          <p className="text-text-secondary text-sm mt-1">需要立即处理的任务</p>
        </div>
        <div className="space-y-4">
          {urgentTasks.map((task, index) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{task.title}</h4>
                <p className="text-sm text-text-secondary">{task.project} • {task.assignee}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                }`}>
                  {task.priority === 'high' ? '高优先级' : '中优先级'}
                </span>
                <span className="text-xs text-text-muted">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 智能建议 */}
      <div className="card border-l-4 border-l-primary">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-text-primary">AI 智能建议</h3>
          <p className="text-text-secondary text-sm mt-1">基于当前项目数据分析，系统为您提供以下优化建议：</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-text-primary font-medium">项目进度优化</p>
              <p className="text-xs text-text-secondary">移动端应用开发进度滞后，建议增加人力资源</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-text-primary font-medium">团队效率提升</p>
              <p className="text-xs text-text-secondary">团队整体效率提升15%，继续保持当前工作节奏</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-text-primary font-medium">里程碑管理</p>
              <p className="text-xs text-text-secondary">建议为数据分析平台项目设置里程碑检查点</p>
            </div>
          </div>
        </div>
      </div>

      {/* 系统状态 */}
      <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <h3 className="font-medium text-text-primary">系统状态</h3>
          </div>
          <p className="text-sm text-text-secondary mb-4">所有服务运行正常</p>
          <div className="text-right">
            <p className="text-sm text-text-secondary">响应时间</p>
            <p className="text-lg font-semibold text-success">0.2s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 