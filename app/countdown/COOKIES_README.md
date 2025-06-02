# Countdown Timer - Color Preferences with Cookies

## 功能说明

用户的颜色偏好现在会自动保存到浏览器的 cookies 中，实现个性化体验。

## 实现的功能

### 1. 自动保存颜色偏好
- 当用户选择新颜色时，系统会自动将颜色值保存到 cookies
- Cookie 有效期：365天
- Cookie 名称：`countdown-primary-color`

### 2. 自动加载保存的颜色
- 用户下次访问时，系统会自动加载之前保存的颜色
- 如果没有保存的颜色，使用默认颜色 `#8b5cf6`（紫色）

### 3. 重置功能
- 点击颜色选择器旁边的重置按钮
- 会将颜色重置为默认值，并清除保存的 cookie

### 4. 加载状态指示
- 在 cookies 加载完成前显示骨架屏动画
- 确保用户看到的颜色是正确的保存值

### 5. 偏好指示器
- 在颜色设置区域显示"Preference saved"指示
- 让用户知道他们的颜色偏好已被保存

## 开发工具

### Cookie 调试工具
在开发环境中，页面右下角会显示一个 🍪 按钮：
- 点击可查看当前所有 cookies
- 提供清除特定 countdown cookies 的功能
- 提供清除所有 cookies 的功能
- 仅在开发环境显示

## 技术实现

### 依赖
- `js-cookie`: 用于简化 cookie 操作

### 文件结构
```
countdown/
├── context/
│   └── ColorContext.js          # 颜色状态管理和 cookie 操作
├── components/
│   ├── ColorResetButton.js      # 重置颜色按钮组件
│   ├── ColorPreferenceIndicator.js  # 偏好保存指示器
│   ├── CookieDebugTool.js       # 开发调试工具
│   └── customCard.js            # 主要的自定义卡片组件
└── layout.js                    # 布局文件（包含调试工具）
```

### Cookie 配置
- **名称**: `countdown-primary-color`
- **值**: 十六进制颜色值（如 `#8b5cf6`）
- **过期时间**: 365天
- **作用域**: 当前域名

## 用户体验

1. **首次访问**: 使用默认紫色主题
2. **自定义颜色**: 选择颜色后自动保存
3. **再次访问**: 自动恢复之前的颜色选择
4. **重置**: 一键恢复默认颜色并清除偏好

## 隐私说明

- 颜色偏好仅保存在用户本地浏览器中
- 不会发送到服务器或第三方
- 用户可以随时清除这些数据
