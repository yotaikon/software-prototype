import React from 'react';
import { Calendar, Users, Flag } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case '进行中':
        return 'status-info';
      case '即将完成':
        return 'status-success';
      case '已完成':
        return 'status-success';
      case '暂停':
        return 'status-warning';
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
    <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
            {project.name}
          </h4>
          <p className="text-sm text-text-secondary mt-1">{project.department}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={getStatusColor(project.status)}>
            {project.status}
          </span>
          <span className={getPriorityColor(project.priority)} title={`优先级: ${project.priority}`}>
            {getPriorityIcon(project.priority)}
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-text-secondary">进度</span>
          <span className="text-text-primary font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-bg-tertiary rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* 项目信息 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-text-muted">
            <Calendar className="w-4 h-4" />
            <span>截止: {project.dueDate}</span>
          </div>
          <div className="flex items-center space-x-1 text-text-muted">
            <Users className="w-4 h-4" />
            <span>{project.members}人</span>
          </div>
        </div>
        <button className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
          查看详情
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 