#!/bin/bash
# 一键清理、提交本地最新代码并推送到 GitHub（适合空远程仓库）

echo "🔹 Step 1: 确认本地分支"
git branch
echo "如果不是 main，请切换到 main 分支：git checkout main"

echo "🔹 Step 2: 取消任何未完成的 rebase"
git rebase --abort 2>/dev/null || echo "没有进行中的 rebase，继续..."

echo "🔹 Step 3: 更新 .gitignore 忽略临时文件"
echo ".DS_Store" >> .gitignore
echo "node_modules/" >> .gitignore
echo "node_modules/.cache/" >> .gitignore
echo "build/" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore" 2>/dev/null || echo ".gitignore 无需提交"

echo "🔹 Step 4: 提交本地最新文件"
git add .
git commit -m "Deploy latest version" 2>/dev/null || echo "没有新的更改需要提交"

echo "🔹 Step 5: 设置远程仓库（SSH）"
git remote set-url origin git@github.com:mayimayimayi-jijiubao/sos.git
git remote -v

echo "🔹 Step 6: 推送到 GitHub"
git push -u origin main

echo "✅ 推送完成！"
echo "接下来可以登录 Vercel，创建项目并选择此 GitHub 仓库进行部署。"
echo "Vercel 构建命令: npm run build, 输出目录: build"
