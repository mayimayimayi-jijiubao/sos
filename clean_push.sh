#!/bin/bash
# 一键清理 Git 历史中 node_modules 和缓存文件，并强制推送

echo "🔹 Step 1: 确认当前分支在 main"
git branch

echo "🔹 Step 2: 更新 .gitignore"
echo "node_modules/" >> .gitignore
echo ".cache/" >> .gitignore
echo "build/" >> .gitignore
echo ".DS_Store" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore" 2>/dev/null || echo ".gitignore 无需提交"

echo "🔹 Step 3: 安装 git-filter-repo（如未安装）"
if ! command -v git-filter-repo &> /dev/null
then
    echo "安装 git-filter-repo..."
    brew install git-filter-repo
fi

echo "🔹 Step 4: 清理 node_modules 和 .cache 历史"
git filter-repo --path node_modules --path .cache --invert-paths

echo "🔹 Step 5: 提交清理后的代码"
git add .
git commit -m "chore: clean history"

echo "🔹 Step 6: 强制推送到 GitHub"
git push origin main --force

echo "✅ 清理完成，远程仓库干净，node_modules 与缓存已从历史中移除"
echo "下一步可在 Vercel 重新部署"
