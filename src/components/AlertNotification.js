import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, X, CheckCircle, Clock, Target, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertNotification = () => {
  const [alerts, setAlerts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 模拟预警数据
  const mockAlerts = [
    {
      id: 1,
      type: 'task_overdue',
      title: '任务延期预警',
      message: '任务"完成用户界面设计"将在2天后到期，当前进度75%',
      priority: 'high',
      target: 'task',
      targetId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
      isRead: false,
      details: {
        taskName: '完成用户界面设计',
        projectName: '移动端应用开发',
        assignee: '张三',
        dueDate: '2024-01-22',
        currentProgress: 75,
        expectedProgress: 90,
        description: '设计并实现移动端应用的用户界面，包括登录页面、主页面、设置页面等核心功能界面。',
        recommendations: [
          '增加工作时间投入',
          '寻求设计团队协助',
          '优先完成核心功能界面'
        ]
      }
    },
    {
      id: 2,
      type: 'project_delay',
      title: '项目延期预警',
      message: '项目"移动端应用开发"进度滞后，当前进度45%，预期进度60%',
      priority: 'medium',
      target: 'project',
      targetId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
      isRead: false,
      details: {
        projectName: '移动端应用开发',
        department: '技术部',
        manager: '李四',
        startDate: '2024-01-01',
        endDate: '2024-03-15',
        currentProgress: 45,
        expectedProgress: 60,
        description: '开发企业移动端应用，支持iOS和Android平台，包含用户管理、数据展示、消息推送等功能。',
        riskFactors: [
          '人力资源不足',
          '技术难点较多',
          '需求变更频繁'
        ],
        recommendations: [
          '增加开发人员',
          '优化开发流程',
          '加强需求管理'
        ]
      }
    },
    {
      id: 3,
      type: 'workload_overload',
      title: '工作量超载预警',
      message: '用户"王五"当前有8个进行中任务，可能存在工作量超载',
      priority: 'medium',
      target: 'user',
      targetId: 3,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
      isRead: true,
      details: {
        userName: '王五',
        department: '技术部',
        position: '高级开发工程师',
        currentTasks: 8,
        maxRecommendedTasks: 5,
        taskList: [
          'API接口开发',
          '数据库设计',
          '前端页面开发',
          '单元测试编写',
          '文档编写',
          '代码审查',
          '性能优化',
          'Bug修复'
        ],
        workloadScore: 85,
        recommendations: [
          '重新分配部分任务',
          '延长任务截止时间',
          '提供技术支持协助'
        ]
      }
    },
    {
      id: 4,
      type: 'milestone_risk',
      title: '里程碑风险预警',
      message: '里程碑"第一阶段完成"可能无法按时达成，建议调整计划',
      priority: 'high',
      target: 'milestone',
      targetId: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6小时前
      isRead: false,
      details: {
        milestoneName: '第一阶段完成',
        projectName: '移动端应用开发',
        dueDate: '2024-02-01',
        currentDate: new Date(),
        completionRate: 65,
        requiredRate: 80,
        deliverables: [
          '用户界面设计完成',
          '核心功能开发完成',
          '基础测试通过'
        ],
        completedItems: [
          '用户界面设计完成'
        ],
        pendingItems: [
          '核心功能开发完成',
          '基础测试通过'
        ],
        riskLevel: 'high',
        recommendations: [
          '增加开发资源',
          '调整里程碑时间',
          '优先完成核心功能'
        ]
      }
    }
  ];

  useEffect(() => {
    // 初始化预警数据
    setAlerts(mockAlerts);
    setUnreadCount(mockAlerts.filter(alert => !alert.isRead).length);
  }, []);

  // 定期检查新预警（模拟）
  useEffect(() => {
    const interval = setInterval(() => {
      // 模拟新预警生成
      const shouldGenerateAlert = Math.random() < 0.1; // 10%概率生成新预警
      if (shouldGenerateAlert) {
        const newAlert = {
          id: Date.now(),
          type: 'task_overdue',
          title: '任务延期预警',
          message: '任务"API接口开发"将在1天后到期，请及时处理',
          priority: 'high',
          target: 'task',
          targetId: 3,
          createdAt: new Date(),
          isRead: false,
          details: {
            taskName: 'API接口开发',
            projectName: '移动端应用开发',
            assignee: '王五',
            dueDate: '2024-01-21',
            currentProgress: 60,
            expectedProgress: 90,
            description: '开发移动端应用所需的API接口，包括用户认证、数据获取、文件上传等功能接口。',
            recommendations: [
              '加班完成开发',
              '寻求团队协助',
              '简化接口功能'
            ]
          }
        };
        setAlerts(prev => [newAlert, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    }, 30000); // 每30秒检查一次

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteAlert = (alertId) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert && !alert.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowDetailModal(true);
    if (!alert.isRead) {
      markAsRead(alert.id);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'task_overdue':
        return <Clock className="w-4 h-4" />;
      case 'project_delay':
        return <Target className="w-4 h-4" />;
      case 'workload_overload':
        return <AlertTriangle className="w-4 h-4" />;
      case 'milestone_risk':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-danger border-l-danger';
      case 'medium':
        return 'text-warning border-l-warning';
      case 'low':
        return 'text-info border-l-info';
      default:
        return 'text-text-muted border-l-text-muted';
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger/10 text-danger';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-info/10 text-info';
      default:
        return 'bg-text-muted/10 text-text-muted';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return `${days}天前`;
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  return (
    <div className="relative">
      {/* 预警按钮 */}
      <button 
        className="relative p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span 
            className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </button>
      
      {/* 预警面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-96 bg-bg-card border border-border rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* 面板头部 */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-text-primary">智能预警</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                    {unreadCount} 条未读
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    全部已读
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-bg-tertiary rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* 预警列表 */}
            <div className="max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="text-text-secondary">暂无预警信息</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      className={`p-4 hover:bg-bg-tertiary transition-colors border-l-4 cursor-pointer ${
                        alert.isRead ? 'opacity-60' : ''
                      } ${getPriorityColor(alert.priority)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 ${getPriorityColor(alert.priority)}`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-text-primary text-sm">
                              {alert.title}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {!alert.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                              <span className="text-xs text-text-muted">
                                {getTimeAgo(alert.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mb-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBgColor(alert.priority)}`}>
                              {alert.priority === 'high' ? '高优先级' : alert.priority === 'medium' ? '中优先级' : '低优先级'}
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAlert(alert.id);
                              }}
                              className="text-xs text-danger hover:underline"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-muted" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 面板底部 */}
            <div className="p-3 border-t border-border bg-bg-tertiary">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>AI 智能监控系统</span>
                <span>实时更新</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 消息详情弹窗 */}
      <AnimatePresence>
        {showDetailModal && selectedAlert && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div 
              className="bg-bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 弹窗头部 */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getPriorityBgColor(selectedAlert.priority)}`}>
                    {getAlertIcon(selectedAlert.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{selectedAlert.title}</h2>
                    <p className="text-sm text-text-secondary">{getTimeAgo(selectedAlert.createdAt)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-bg-tertiary rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-6 space-y-6">
                {/* 基本信息 */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-3">预警详情</h3>
                  <p className="text-text-secondary leading-relaxed">{selectedAlert.message}</p>
                </div>

                {/* 详细信息 */}
                {selectedAlert.details && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-text-secondary">优先级:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBgColor(selectedAlert.priority)}`}>
                            {selectedAlert.priority === 'high' ? '高优先级' : selectedAlert.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-text-secondary">类型:</span>
                          <span className="text-sm text-text-primary">
                            {selectedAlert.type === 'task_overdue' && '任务延期'}
                            {selectedAlert.type === 'project_delay' && '项目延期'}
                            {selectedAlert.type === 'workload_overload' && '工作量超载'}
                            {selectedAlert.type === 'milestone_risk' && '里程碑风险'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {selectedAlert.type === 'task_overdue' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">任务名称:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.taskName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">负责人:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">进度:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.currentProgress}% / {selectedAlert.details.expectedProgress}%</span>
                            </div>
                          </>
                        )}
                        
                        {selectedAlert.type === 'project_delay' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">项目名称:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.projectName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">项目经理:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.manager}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">进度:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.currentProgress}% / {selectedAlert.details.expectedProgress}%</span>
                            </div>
                          </>
                        )}

                        {selectedAlert.type === 'workload_overload' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">用户姓名:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.userName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">当前任务:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.currentTasks}个</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">工作量评分:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.workloadScore}/100</span>
                            </div>
                          </>
                        )}

                        {selectedAlert.type === 'milestone_risk' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">里程碑名称:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.milestoneName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-secondary">完成率:</span>
                              <span className="text-sm text-text-primary">{selectedAlert.details.completionRate}% / {selectedAlert.details.requiredRate}%</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 详细描述 */}
                    {selectedAlert.details.description && (
                      <div>
                        <h4 className="text-md font-medium text-text-primary mb-2">详细描述</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{selectedAlert.details.description}</p>
                      </div>
                    )}

                    {/* AI 建议 */}
                    {selectedAlert.details.recommendations && (
                      <div>
                        <h4 className="text-md font-medium text-text-primary mb-2">AI 智能建议</h4>
                        <div className="space-y-2">
                          {selectedAlert.details.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-text-secondary">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 风险因素 */}
                    {selectedAlert.details.riskFactors && (
                      <div>
                        <h4 className="text-md font-medium text-text-primary mb-2">风险因素</h4>
                        <div className="space-y-2">
                          {selectedAlert.details.riskFactors.map((factor, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-text-secondary">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 任务列表 */}
                    {selectedAlert.details.taskList && (
                      <div>
                        <h4 className="text-md font-medium text-text-primary mb-2">当前任务列表</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedAlert.details.taskList.map((task, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-bg-tertiary rounded">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span className="text-sm text-text-secondary">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 交付物状态 */}
                    {selectedAlert.details.deliverables && (
                      <div>
                        <h4 className="text-md font-medium text-text-primary mb-2">交付物状态</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-success mb-2">已完成</h5>
                            <div className="space-y-1">
                              {selectedAlert.details.completedItems?.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                  <span className="text-text-secondary">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-warning mb-2">待完成</h5>
                            <div className="space-y-1">
                              {selectedAlert.details.pendingItems?.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <Clock className="w-4 h-4 text-warning" />
                                  <span className="text-text-secondary">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <span>AI 智能分析</span>
                    <span>•</span>
                    <span>实时监控</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="btn btn-secondary">
                      <ExternalLink className="w-4 h-4" />
                      查看详情
                    </button>
                    <button className="btn btn-primary">
                      处理预警
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertNotification;
