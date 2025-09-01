import React from 'react';
import { Calendar, User, Flag, MoreVertical } from 'lucide-react';

const TaskList = ({ tasks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case '已完成':
        return 'status-success';
      case '进行中':
        return 'status-info';
      case '待开始':
        return 'status-warning';
      case '暂停':
        return 'status-danger';
      default:
        return 'status-info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300 group">
          <div className="flex items-center space-x-4 flex-1">
            {/* 优先级图标 */}
            <div className="flex-shrink-0">
              <span className={getPriorityColor(task.priority)} title={`优先级: ${task.priority}`}>
                {getPriorityIcon(task.priority)}
              </span>
            </div>

            {/* 任务信息 */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors truncate">
                {task.title}
              </h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                <span className="truncate">项目: {task.project}</span>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{task.assignee}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{task.dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 状态和操作 */}
          <div className="flex items-center space-x-3">
            <span className={getStatusColor(task.status)}>
              {task.status}
            </span>
            <button className="p-1 hover:bg-bg-tertiary rounded transition-colors">
              <MoreVertical className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 