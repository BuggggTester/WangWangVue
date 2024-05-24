# README

### 项目说明
本部分是项目**汪汪旅途**的前端页面部分，为方便后续的开发，特此进行说明。

#### 1. 版本
Vue-3<br>
使用的是JavaScript脚本（应该没有用TypeScript)<br>
主要使用了Element-Plus组件库进行前端开发。参考链接：
<a href="https://element-plus.org/zh-CN/component/overview.html"> Elemnt-PLus官网</a>

#### 2.体系架构

由于项目仍未完成，且架构并不成熟，后续可能会对某些部分实现重构来实现代码复用，
所以此处的架构只作为大致参考，方便各位后续开发。

1. assets<br>
assets文件夹下包含了程序运行中所需要的静态图片文件，css文件夹下包含了运行中的css文件。
<br>在具体vue组件中需要引用css时，用类似这样的方法进行引用：
```
<style>
    import "@/assets/css/***.css"
</style>
```
<br> ~~但由于不符规范，后续或许需要将各文件css放这里。~~
2. layout <br>
layout文件夹下包括menu、header、footer、tabs（暂时没用上），各部分下的index包含了
对应的组件
3. router <br>
router下的index包含了所有的url，所以之后如果各位开发新的页面，一定仿照前面的路由的形式
添加到这个文件中
4. util <br>
util文件夹下包含了两个文件（暂时）：
* request.js
这个js文件是copy下来的，包装好了前后端数据传输的工具函数，包括get与post等。后续开发时按照这样的形式调用：

```javascript
import requestUtil from "@/util/request"
//调用示例：
const result = ref([])
const example = async () => {
    result = await requestUtil.get(url,param);
}
```
* time.js
这个文件中只放了一个函数，用来将中国标准时间转化为MySQL数据库中的时间戳Timestamp。
5. views
这里是开发的主题内容，包含了各个页面或者自定义组件的内容。
#### 3. 项目运行

保证自己本地的Node.js已经配置无误。<br>
在`vue`文件夹下运行：
```
npm run serve
```
前端端口为:`8080`,运行后在浏览器中访问`http://localhost:8080/` 。注意
，此时应保证后端SpringBoot也已启动，防止出现数据访问的错误。

------
项目中还有很多的bug以及问题，包括一些不规范的问题，争取之后大家一起解决