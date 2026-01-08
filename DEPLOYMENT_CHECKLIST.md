# Little-Artist Vercel 部署检查清单

## ✅ 已完成的修复

- [x] 修复 `vite.config.ts` - 添加 `base: './'` 配置
- [x] 创建 `vercel.json` - 添加路由重写规则
- [x] 提交并推送到 GitHub

## 🔧 Vercel 部署配置步骤

### 步骤 1：在 Vercel 中配置项目设置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入项目设置（如果项目已存在）或导入新项目
3. 检查以下设置：

**Settings → General**
- ✅ Framework Preset: **Vite**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`
- ✅ Root Directory: `./` (默认)

### 步骤 2：配置环境变量（重要！）

1. 进入 **Settings → Environment Variables**
2. 添加以下环境变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `GEMINI_API_KEY` | 你的 Gemini API Key | Production, Preview, Development |

**注意**：
- 变量名必须是 `GEMINI_API_KEY`（与代码中的使用一致）
- 确保在 Production、Preview、Development 三个环境都添加
- API Key 可以从 [Google AI Studio](https://makersuite.google.com/app/apikey) 获取

### 步骤 3：触发重新部署

如果项目已经部署，Vercel 会自动检测到新的推送并重新部署。

如果需要手动触发：
1. 进入 **Deployments** 标签
2. 点击 **Redeploy** → **Use Existing Build Cache** 或 **Redeploy**

## 🔍 验证部署

### 检查清单

- [ ] 部署状态显示为 **Ready**（绿色）
- [ ] 访问网站 URL，页面正常显示（不再是白屏）
- [ ] 浏览器控制台（F12）没有错误
- [ ] 图片生成功能正常工作
- [ ] 导航功能正常（Gallery、Videos、Parents Guide）

### 调试步骤

如果仍然出现白屏：

1. **检查浏览器控制台**
   - 打开开发者工具（F12）
   - 查看 Console 标签是否有错误
   - 查看 Network 标签，检查资源是否加载成功

2. **检查 Vercel 构建日志**
   - 进入 Vercel Dashboard → Deployments
   - 点击最新的部署记录
   - 查看 Build Logs，确认构建成功

3. **检查环境变量**
   - 确认 `GEMINI_API_KEY` 已正确配置
   - 确认变量名拼写正确（区分大小写）

4. **清除浏览器缓存**
   - 按 `Ctrl+Shift+R` (Windows/Linux) 或 `Cmd+Shift+R` (Mac)
   - 或使用无痕模式访问

## 📝 常见问题排查

### 问题 1：仍然是白屏

**可能原因**：
- 环境变量未配置
- 构建失败
- 浏览器缓存

**解决方案**：
1. 检查环境变量配置
2. 查看构建日志
3. 清除浏览器缓存

### 问题 2：资源加载失败（404）

**可能原因**：
- `base: './'` 配置未生效

**解决方案**：
1. 确认 `vite.config.ts` 中有 `base: './'`
2. 重新构建并部署

### 问题 3：路由刷新后 404

**可能原因**：
- `vercel.json` 中的 rewrites 规则未生效

**解决方案**：
1. 确认 `vercel.json` 文件存在
2. 确认 rewrites 配置正确
3. 重新部署

### 问题 4：API Key 错误

**可能原因**：
- 环境变量未配置或配置错误

**解决方案**：
1. 检查 Vercel 环境变量设置
2. 确认变量名是 `GEMINI_API_KEY`
3. 确认 API Key 有效

## 🎯 部署后验证清单

部署完成后，请验证以下功能：

- [ ] **首页加载** - 页面正常显示，无白屏
- [ ] **Gallery 功能** - 可以输入主题并生成图片
- [ ] **图片生成** - 图片能够正常生成和显示
- [ ] **导航切换** - Gallery、Videos、Parents Guide 切换正常
- [ ] **响应式设计** - 移动端和桌面端显示正常
- [ ] **无控制台错误** - 浏览器控制台无 JavaScript 错误

## 📚 相关文档

- [Vercel 部署文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Google Gemini API 文档](https://ai.google.dev/docs)

## 🆘 需要帮助？

如果按照以上步骤操作后仍有问题，请提供：
1. Vercel 构建日志截图
2. 浏览器控制台错误信息
3. 网络请求失败的详细信息

---

**最后更新**: 2025-01-XX
**项目**: Little-Artist
**仓库**: https://github.com/xwerchen1217/Little-Artist

