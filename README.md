# cwModal
[个人博客-模态框](https://www.chauncywu.com/?p=124)

## v3.0
### 更新
- 【修复】动画时长一开始为0，在初始化时才设置动画时长
- 【修复】模态框内含有输入框时在iOS下的光标错位问题以及微信下页面不回弹问题
- 【修复】修复移动端滚动穿透问题
- 【修复】将fixed布局改为统一的absolute布局，因此免去了使用modal-fix定位时，需根据modal的宽度手动设置margin-left值，也使得iOS支持更加良好

## v2.0
### 更新
- 【新增】使模态框的进入以及退出动画的修改更加方便
- 【修复】内容滚动调整，当模态框在一屏显示时，内容区域允许滚动；当模态框高度超过一屏时，只允许模态框层滚动，内容不能滚动，后续再根据实际需求调整
- 【修复】修复了由于开启关闭延迟造成的一系列问题
- 【修复】在需要关闭的dom上添加data='close'即可关闭当前模态框

### BUG
- 由于模态框设置了动画，所以刚开始加载页面时会看到模态框
- 模态框内含有输入框时在iOS下的光标错位问题以及微信下页面不回弹问题
- 滚动穿透问题

### 需求
- 在使用modal-fix定位时，需根据modal的宽度手动设置margin-left值，而不能设置transform: translateX(-50%), 因为后者在添加动画时经常使用

## v1.0
### 更新
- 【新增】开启指定模态框
- 【新增】关闭全部模态框
- 【新增】根据模态框高度自适应水平垂直居中
- 【新增】PC版兼容至IE9及以上版本
- 【新增】支持开启模态框自动播放指定视频，关闭模态框暂停视频，需手动删除注释，并指定video-data，即video标签的id名

### BUG
- 连续的开启和关闭由于存在延迟，造成使用不便，甚至模态框关闭不完全
- 模态框固定高度，内容区域可滚动，但滚动无效
- 滚动穿透问题

### 需求
- 动画样式单一，难以调整
- 关闭按钮与样式耦合度过高
- 移动端存在滚动穿透
