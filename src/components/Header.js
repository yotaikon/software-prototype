import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  User, 
  Settings,
  LogOut
} from 'lucide-react';
import AlertNotification from './AlertNotification';

const Header = ({ onMenuClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-bg-secondary border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* 左侧 */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 hover:bg-bg-tertiary rounded-lg"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* 搜索框 */}
          <div className="hidden md:flex items-center space-x-2 bg-bg-tertiary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="搜索项目、任务或成员..."
              className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-muted w-64"
            />
          </div>
        </div>

        {/* 右侧 */}
        <div className="flex items-center space-x-4">
          {/* 智能预警通知 */}
          <AlertNotification />

          {/* 用户菜单 */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-bg-tertiary rounded-lg"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">管理员</span>
            </button>

            {/* 用户下拉菜单 */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-border">
                  <div className="text-sm font-medium">管理员</div>
                  <div className="text-xs text-text-muted">admin@company.com</div>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-bg-tertiary rounded">
                    <Settings className="w-4 h-4" />
                    <span>个人设置</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-bg-tertiary rounded text-danger">
                    <LogOut className="w-4 h-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 移动端搜索框 */}
      <div className="md:hidden mt-3">
        <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="搜索..."
            className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-muted flex-1"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 