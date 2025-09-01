import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Target,
  AlertTriangle,
  BarChart3,
  Download
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const projects = [
    {
      id: 1,
      name: '移动端应用开发',
      description: '开发企业移动端应用，支持iOS和Android平台',
      department: '技术部',
      progress: 75,
      status: 'active',
      dueDate: '2024-02-15',
      members: 8,
      priority: 'high',
      owner: '张三',
      tags: ['移动端', 'React Native'],
      riskLevel: 'medium'
    },
    {
      id: 2,
      name: '企业官网重构',
      description: '重新设计并开发企业官方网站',
      department: '设计部',
      progress: 45,
      status: 'active',
      dueDate: '2024-03-01',
      members: 5,
      priority: 'medium',
      owner: '李四',
      tags: ['网站', 'UI设计'],
      riskLevel: 'low'
    },
    {
      id: 3,
      name: '数据分析平台',
      description: '构建企业级数据分析平台',
      department: '数据部',
      progress: 90,
      status: 'active',
      dueDate: '2024-01-30',
      members: 6,
      priority: 'high',
      owner: '王五',
      tags: ['数据分析', '大数据'],
      riskLevel: 'high'
    },
    {
      id: 4,
      name: '客户管理系统',
      description: '开发客户关系管理系统',
      department: '技术部',
      progress: 30,
      status: 'paused',
      dueDate: '2024-04-15',
      members: 4,
      priority: 'medium',
      owner: '赵六',
      tags: ['CRM', '管理系统'],
      riskLevel: 'medium'
    },
    {
      id: 5,
      name: '产品设计优化',
      description: '优化现有产品设计流程',
      department: '设计部',
      progress: 100,
      status: 'completed',
      dueDate: '2024-01-15',
      members: 3,
      priority: 'low',
      owner: '钱七',
      tags: ['设计', '流程优化'],
      riskLevel: 'low'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'paused': return 'text-warning';
      case 'completed': return 'text-primary';
      case 'cancelled': return 'text-danger';
      default: return 'text-text-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-2">项目管理</h1>
        <p className="text-text-secondary">管理所有项目，跟踪进度和状态</p>
        <div className="flex items-center justify-center space-x-3 mt-6">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出</span>
          </button>
          <button 
            className="btn btn-primary flex items-center space-x-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span>新建项目</span>
          </button>
        </div>
      </div>

      {/* 筛选和搜索 - 垂直布局 */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">筛选和搜索</h2>
        </div>
        
        <div className="space-y-4">
          {/* 搜索框 */}
          <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="搜索项目名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-muted flex-1"
            />
          </div>

          {/* 视图切换 */}
          <div className="flex items-center justify-center space-x-2 bg-bg-tertiary rounded-lg p-1">
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'table' 
                  ? 'bg-bg-card text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setViewMode('table')}
            >
              表格视图
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'card' 
                  ? 'bg-bg-card text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setViewMode('card')}
            >
              卡片视图
            </button>
          </div>

          {/* 筛选器 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary flex-1"
              >
                <option value="all">所有状态</option>
                <option value="active">进行中</option>
                <option value="paused">已暂停</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-text-muted" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary flex-1"
              >
                <option value="all">所有优先级</option>
                <option value="high">高优先级</option>
                <option value="medium">中优先级</option>
                <option value="low">低优先级</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 项目统计 - 垂直布局 */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">项目统计</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-text-secondary mt-1">总项目数</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-success">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-text-secondary mt-1">进行中</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-warning">
              {projects.filter(p => p.status === 'paused').length}
            </div>
            <div className="text-sm text-text-secondary mt-1">已暂停</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-danger">
              {projects.filter(p => p.riskLevel === 'high').length}
            </div>
            <div className="text-sm text-text-secondary mt-1">高风险</div>
          </div>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">项目列表</h2>
          <p className="text-text-secondary text-sm mt-1">共 {filteredProjects.length} 个项目</p>
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">项目名称</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">部门</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">进度</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">状态</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">优先级</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">截止日期</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">风险等级</th>
                  <th className="text-left py-3 px-4 font-medium text-text-secondary">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border hover:bg-bg-tertiary transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-text-primary">{project.name}</div>
                        <div className="text-sm text-text-secondary mt-1">{project.description}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-bg-tertiary text-xs rounded-full text-text-muted">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-text-primary">{project.department}</div>
                      <div className="text-xs text-text-secondary mt-1">负责人: {project.owner}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-bg-tertiary rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status === 'active' && '进行中'}
                        {project.status === 'paused' && '已暂停'}
                        {project.status === 'completed' && '已完成'}
                        {project.status === 'cancelled' && '已取消'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority === 'high' && '高'}
                        {project.priority === 'medium' && '中'}
                        {project.priority === 'low' && '低'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="w-3 h-3 text-text-muted" />
                        <span>{project.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className={`w-3 h-3 ${getRiskLevelColor(project.riskLevel)}`} />
                        <span className={`text-xs font-medium ${getRiskLevelColor(project.riskLevel)}`}>
                          {project.riskLevel === 'high' && '高风险'}
                          {project.riskLevel === 'medium' && '中风险'}
                          {project.riskLevel === 'low' && '低风险'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-bg-tertiary rounded" title="查看详情">
                          <Eye className="w-4 h-4 text-text-muted" />
                        </button>
                        <button className="p-1 hover:bg-bg-tertiary rounded" title="编辑">
                          <Edit className="w-4 h-4 text-text-muted" />
                        </button>
                        <button className="p-1 hover:bg-bg-tertiary rounded" title="更多操作">
                          <MoreVertical className="w-4 h-4 text-text-muted" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* 创建项目模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">创建新项目</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-bg-tertiary rounded-lg"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">项目名称</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="输入项目名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">所属部门</label>
                  <select className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary">
                    <option>技术部</option>
                    <option>设计部</option>
                    <option>数据部</option>
                    <option>市场部</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">项目描述</label>
                <textarea 
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                  rows="3"
                  placeholder="描述项目目标和范围"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">开始日期</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">结束日期</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">优先级</label>
                  <select className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary">
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  创建项目
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects; 