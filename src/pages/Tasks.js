import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Target,
  AlertTriangle,
  BarChart3,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Play,
  Pause,
  XCircle,
  Download
} from 'lucide-react';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'gantt'

  const tasks = [
    {
      id: 1,
      title: '用户界面设计',
      description: '设计移动端应用的用户界面',
      status: 'in-progress',
      priority: 'high',
      project: '移动端应用开发',
      assignee: '张三',
      startDate: '2024-01-15',
      dueDate: '2024-01-25',
      estimatedHours: 40,
      actualHours: 25,
      progress: 60,
      type: 'design',
      dependencies: [],
      tags: ['UI设计', '移动端']
    },
    {
      id: 2,
      title: '后端API开发',
      description: '开发用户认证和数据管理API',
      status: 'review',
      priority: 'high',
      project: '移动端应用开发',
      assignee: '李四',
      startDate: '2024-01-20',
      dueDate: '2024-02-05',
      estimatedHours: 60,
      actualHours: 55,
      progress: 90,
      type: 'development',
      dependencies: [1],
      tags: ['后端', 'API']
    },
    {
      id: 3,
      title: '数据库设计',
      description: '设计用户数据存储结构',
      status: 'completed',
      priority: 'medium',
      project: '移动端应用开发',
      assignee: '王五',
      startDate: '2024-01-10',
      dueDate: '2024-01-18',
      estimatedHours: 24,
      actualHours: 20,
      progress: 100,
      type: 'planning',
      dependencies: [],
      tags: ['数据库', '设计']
    },
    {
      id: 4,
      title: '前端组件开发',
      description: '开发可复用的React组件',
      status: 'todo',
      priority: 'medium',
      project: '移动端应用开发',
      assignee: '赵六',
      startDate: '2024-01-25',
      dueDate: '2024-02-10',
      estimatedHours: 48,
      actualHours: 0,
      progress: 0,
      type: 'development',
      dependencies: [1, 2],
      tags: ['前端', 'React']
    },
    {
      id: 5,
      title: '测试用例编写',
      description: '编写单元测试和集成测试',
      status: 'todo',
      priority: 'low',
      project: '移动端应用开发',
      assignee: '钱七',
      startDate: '2024-02-01',
      dueDate: '2024-02-15',
      estimatedHours: 32,
      actualHours: 0,
      progress: 0,
      type: 'testing',
      dependencies: [2, 4],
      tags: ['测试', '质量保证']
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesProject = projectFilter === 'all' || task.project === projectFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'text-text-muted';
      case 'in-progress': return 'text-primary';
      case 'review': return 'text-warning';
      case 'completed': return 'text-success';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'review': return <AlertTriangle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'todo': return '待开始';
      case 'in-progress': return '进行中';
      case 'review': return '审核中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  // 甘特图数据
  const ganttData = filteredTasks.map(task => ({
    ...task,
    start: new Date(task.startDate),
    end: new Date(task.dueDate),
    duration: Math.ceil((new Date(task.dueDate) - new Date(task.startDate)) / (1000 * 60 * 60 * 24))
  }));

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">任务管理</h1>
          <p className="text-text-secondary mt-2">管理项目任务，跟踪进度和分配</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出</span>
          </button>
          <button 
            className="btn btn-primary flex items-center space-x-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span>新建任务</span>
          </button>
        </div>
      </div>

      {/* 筛选和搜索 - 优化布局 */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* 搜索框 */}
          <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="搜索任务名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-muted flex-1"
            />
          </div>

          {/* 筛选器和视图切换 */}
          <div className="flex items-center space-x-4">
            {/* 视图切换 */}
            <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-bg-card text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setViewMode('list')}
              >
                列表视图
              </button>
              <button
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'gantt' 
                    ? 'bg-bg-card text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setViewMode('gantt')}
              >
                甘特图
              </button>
            </div>

            {/* 筛选器 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-text-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value="all">所有状态</option>
                  <option value="todo">待开始</option>
                  <option value="in-progress">进行中</option>
                  <option value="review">审核中</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-text-muted" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value="all">所有优先级</option>
                  <option value="high">高优先级</option>
                  <option value="medium">中优先级</option>
                  <option value="low">低优先级</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-text-muted" />
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value="all">所有项目</option>
                  <option value="移动端应用开发">移动端应用开发</option>
                  <option value="企业官网重构">企业官网重构</option>
                  <option value="数据分析平台">数据分析平台</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 任务统计 - 优化布局 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary">{tasks.length}</div>
          <div className="text-sm text-text-secondary mt-1">总任务数</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary">
            {tasks.filter(t => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-text-secondary mt-1">进行中</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-warning">
            {tasks.filter(t => t.status === 'review').length}
          </div>
          <div className="text-sm text-text-secondary mt-1">审核中</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-success">
            {tasks.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-sm text-text-secondary mt-1">已完成</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-danger">
            {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}
          </div>
          <div className="text-sm text-text-secondary mt-1">紧急任务</div>
        </div>
      </div>

      {/* 任务列表 */}
      {viewMode === 'list' ? (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">任务列表</h2>
              <p className="text-text-secondary text-sm mt-1">共 {filteredTasks.length} 个任务</p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="border border-border rounded-lg p-4 hover:bg-bg-tertiary transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-1 rounded ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                      </div>
                      <h3 className="font-medium text-text-primary">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                        {task.type === 'design' && '设计'}
                        {task.type === 'development' && '开发'}
                        {task.type === 'planning' && '规划'}
                        {task.type === 'testing' && '测试'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-text-muted" />
                        <span className="text-text-secondary">负责人:</span>
                        <span className="text-text-primary">{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-text-muted" />
                        <span className="text-text-secondary">项目:</span>
                        <span className="text-text-primary">{task.project}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        <span className="text-text-secondary">截止:</span>
                        <span className="text-text-primary">{task.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span className="text-text-secondary">工时:</span>
                        <span className="text-text-primary">{task.actualHours}/{task.estimatedHours}h</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' && '高优先级'}
                            {task.priority === 'medium' && '中优先级'}
                            {task.priority === 'low' && '低优先级'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-bg-tertiary rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{task.progress}%</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-bg-tertiary text-xs rounded-full text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-1 hover:bg-bg-card rounded" title="查看详情">
                      <Eye className="w-4 h-4 text-text-muted" />
                    </button>
                    <button className="p-1 hover:bg-bg-card rounded" title="编辑">
                      <Edit className="w-4 h-4 text-text-muted" />
                    </button>
                    <button className="p-1 hover:bg-bg-card rounded" title="更多操作">
                      <MoreVertical className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">甘特图视图</h2>
              <p className="text-text-secondary text-sm mt-1">任务时间线视图</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* 时间轴 */}
              <div className="flex border-b border-border mb-4">
                <div className="w-48 font-medium text-text-secondary py-2">任务</div>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    return (
                      <div key={i} className="text-center text-xs text-text-muted py-2">
                        {date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 任务条 */}
              {ganttData.map((task, index) => (
                <div key={task.id} className="flex items-center border-b border-border py-3">
                  <div className="w-48">
                    <div className="font-medium text-sm text-text-primary">{task.title}</div>
                    <div className="text-xs text-text-secondary mt-1">{task.assignee}</div>
                  </div>
                  <div className="flex-1 relative h-8">
                    <div className="absolute inset-0 grid grid-cols-7 gap-1">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="border-r border-border"></div>
                      ))}
                    </div>
                    <div 
                      className={`absolute top-1 h-6 rounded-lg flex items-center justify-center text-xs font-medium text-white ${
                        task.status === 'completed' ? 'bg-success' :
                        task.status === 'in-progress' ? 'bg-primary' :
                        task.status === 'review' ? 'bg-warning' :
                        'bg-text-muted'
                      }`}
                      style={{
                        left: `${(index * 20) % 70}%`,
                        width: `${Math.min(100, task.duration * 14)}%`
                      }}
                    >
                      {task.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 创建任务模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">创建新任务</h2>
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
                  <label className="block text-sm font-medium mb-2">任务标题</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="输入任务标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">所属项目</label>
                  <select className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary">
                    <option>移动端应用开发</option>
                    <option>企业官网重构</option>
                    <option>数据分析平台</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">任务描述</label>
                <textarea 
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary"
                  rows="3"
                  placeholder="描述任务目标和要求"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">负责人</label>
                  <select className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary">
                    <option>张三</option>
                    <option>李四</option>
                    <option>王五</option>
                    <option>赵六</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">任务类型</label>
                  <select className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg focus:outline-none focus:border-primary">
                    <option value="design">设计</option>
                    <option value="development">开发</option>
                    <option value="planning">规划</option>
                    <option value="testing">测试</option>
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
                  创建任务
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 