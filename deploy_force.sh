#!/bin/bash
# 一键清理 + 提交 + 强制推送 GitHub（适合远程已有历史但需覆盖）

echo "🔹 Step 1: 确认本地分支"
git branch
echo "请确认在 main 分支"

echo "🔹 Step 2: 取消未完成的 rebase（如果有）"
git rebase --abort 2>/dev/null || echo "没有进行中的 rebase"

echo "🔹 Step 3: 更新 .gitignore 忽略临时文件"
echo ".DS_Store" >> .gitignore
echo "node_modules/" >> .gitignore
echo "node_modules/.cache/" >> .gitignore
echo "build/" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore" 2>/dev/null || echo ".gitignore 无需提交"

echo "🔹 Step 4: 提交本地所有文件"
git add .
git commit -m "Deploy latest version" 2>/dev/null || echo "没有新的更改需要提交"

echo "🔹 Step 5: 设置远程仓库（SSH）"
git remote set-url origin git@github.com:mayimayimayi-jijiubao/sos.git
git remote -v

echo "🔹 Step 6: 强制推送到 GitHub"
git push origin main --force

echo "✅ 强制推送完成！"
echo "接下来登录 Vercel，创建项目或重新部署即可"
echo "Vercel 构建命令: npm run build, 输出目录: build"
