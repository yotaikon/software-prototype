import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Zap, Save } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    taskReminders: true,
    systemAlerts: true
  });

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('zh-CN');

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'appearance', label: '外观设置', icon: Palette },
    { id: 'system', label: '系统设置', icon: SettingsIcon },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">系统设置</h1>
        <p className="text-text-secondary mt-1">管理您的个人偏好和系统配置</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">个人资料</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    管
                  </div>
                  <div>
                    <button className="btn btn-secondary">更换头像</button>
                    <p className="text-sm text-text-muted mt-1">支持 JPG、PNG 格式，最大 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">姓名</label>
                    <input type="text" className="input" defaultValue="管理员" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">邮箱</label>
                    <input type="email" className="input" defaultValue="admin@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">部门</label>
                    <input type="text" className="input" defaultValue="技术部" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">职位</label>
                    <input type="text" className="input" defaultValue="项目经理" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">个人简介</label>
                  <textarea 
                    className="input h-24 resize-none" 
                    defaultValue="负责公司项目管理系统的整体规划与实施，具备丰富的项目管理经验。"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary">
                    <Save className="w-4 h-4" />
                    保存更改
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">通知设置</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">通知方式</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>邮件通知</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>推送通知</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>短信通知</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">通知内容</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.projectUpdates}
                        onChange={() => handleNotificationChange('projectUpdates')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>项目更新通知</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.taskReminders}
                        onChange={() => handleNotificationChange('taskReminders')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>任务提醒</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={notifications.systemAlerts}
                        onChange={() => handleNotificationChange('systemAlerts')}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border rounded focus:ring-primary"
                      />
                      <span>系统警报</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary">保存设置</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">安全设置</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">密码设置</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">当前密码</label>
                      <input type="password" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">新密码</label>
                      <input type="password" className="input" />
                    </div>
                  </div>
                  <button className="btn btn-secondary mt-4">更改密码</button>
                </div>

                <div>
                  <h3 className="font-medium mb-4">双重认证</h3>
                  <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                    <div>
                      <p className="font-medium">Google Authenticator</p>
                      <p className="text-sm text-text-muted">使用手机应用进行双重认证</p>
                    </div>
                    <button className="btn btn-primary">启用</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">登录历史</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">Windows 10 - Chrome</p>
                        <p className="text-sm text-text-muted">2024-01-15 14:30:25</p>
                      </div>
                      <span className="text-success text-sm">当前会话</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">iPhone - Safari</p>
                        <p className="text-sm text-text-muted">2024-01-14 09:15:10</p>
                      </div>
                      <button className="text-danger text-sm hover:underline">终止</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">外观设置</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">主题模式</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="light"
                        checked={theme === 'light'}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">浅色模式</p>
                        <p className="text-sm text-text-muted">适合白天使用</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">深色模式</p>
                        <p className="text-sm text-text-muted">适合夜间使用</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <input 
                        type="radio" 
                        name="theme" 
                        value="auto"
                        checked={theme === 'auto'}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4 text-primary bg-bg-secondary border-border focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">自动模式</p>
                        <p className="text-sm text-text-muted">跟随系统设置</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">语言设置</h3>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input w-auto"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary">应用设置</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">系统设置</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">AI 智能助手</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">智能预警</p>
                        <p className="text-sm text-text-muted">自动识别项目风险并发送预警</p>
                      </div>
                      <button className="btn btn-primary">启用</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">智能分配</p>
                        <p className="text-sm text-text-muted">基于历史数据智能推荐任务分配</p>
                      </div>
                      <button className="btn btn-secondary">配置</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">数据管理</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">数据备份</p>
                        <p className="text-sm text-text-muted">上次备份: 2024-01-15 02:00:00</p>
                      </div>
                      <button className="btn btn-secondary">立即备份</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
                      <div>
                        <p className="font-medium">数据导出</p>
                        <p className="text-sm text-text-muted">导出项目数据为 Excel 格式</p>
                      </div>
                      <button className="btn btn-secondary">导出</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">系统信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-bg-tertiary rounded-lg">
                      <p className="text-sm text-text-muted">版本</p>
                      <p className="font-medium">v1.0.0</p>
                    </div>
                    <div className="p-4 bg-bg-tertiary rounded-lg">
                      <p className="text-sm text-text-muted">构建时间</p>
                      <p className="font-medium">2024-01-15</p>
                    </div>
                    <div className="p-4 bg-bg-tertiary rounded-lg">
                      <p className="text-sm text-text-muted">数据库</p>
                      <p className="font-medium">MySQL 8.0</p>
                    </div>
                    <div className="p-4 bg-bg-tertiary rounded-lg">
                      <p className="text-sm text-text-muted">运行时间</p>
                      <p className="font-medium">15天 8小时</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 