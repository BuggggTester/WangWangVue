# 使用 Node.js 14.17.0 版本，基于 Alpine Linux 构建阶段
FROM node:14.17.0-alpine as build-stage

# 设置工作目录为 /app
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）到工作目录
COPY package.json package-lock.json* ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建项目
RUN npm run build

# 使用 nginx 1.21.0 版本，基于 Alpine Linux 作为运行时环境
FROM nginx:1.21.0-alpine

# 从构建阶段复制构建好的文件到 nginx 的默认站点目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx，不以守护进程模式运行
CMD ["nginx", "-g", "daemon off;"]