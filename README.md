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

舒浩峻：新增了消息系统的数据库，具体MySQL语句及测试用例如下：
```sql
create table messages (
                          message_id int not null auto_increment primary key,
                          send varchar(255) default 'unknown' not null,
                          receive int not null,
                          title varchar(255) not null,
                          body text,
                          ifread bool not null default false,
                          send_date date NOT NULL DEFAULT '1990-01-01',
                          send_time time NOT NULL DEFAULT '00:00:00',
                          constraint user_key foreign key (receive) references users(user_id)
)

    INSERT INTO messages (message_id, send, receive, title, body, ifread) VALUES
(1, '管理员', 1, '管理员通知', '欢迎加入我们的平台。', 0),
(2, '系统', 2, '系统更新', '系统将在今晚进行更新。', 0),
(3, '汪汪小助手', 3, '宠物提醒', '记得给你的宠物喂食。', 0),
(4, '管理员', 4, '账户验证', '请验证您的账户信息。', 0),
(5, '系统', 5, '安全警告', '检测到可疑活动，请检查账户安全。', 0),
(6, '汪汪小助手', 6, '活动提醒', '您关注的活动即将开始。', 0),
(7, '管理员', 7, '节日快乐', '祝您节日快乐！', 0),
(8, '系统', 8, '账户安全', '请定期更改您的密码以保证账户安全。', 0),
(9, '汪汪小助手', 9, '健康提示', '请记得定期给您的宠物做健康检查。', 0),
(10, '管理员', 10, '新功能上线', '我们新增了一些功能，希望您喜欢。', 0),
-- ... 继续添加至90 ...
(91, '系统', 12, '账户反馈', '感谢您的宝贵反馈。', 0),
(92, '汪汪小助手', 13, '宠物健康', '请确保您的宠物按时接种疫苗。', 0),
(93, '管理员', 14, '账户问题', '如果您有任何问题，请随时联系我们。', 0),
(94, '系统', 15, '系统维护', '我们将在下周进行系统维护。', 0),
(95, '汪汪小助手', 16, '宠物活动', '我们即将举办宠物活动，敬请期待。', 0),
(96, '管理员', 1, '新政策', '我们有新的政策更新，请留意。', 0),
(97, '系统', 2, '系统升级', '系统升级将在明天进行。', 0),
(98, '汪汪小助手', 3, '宠物护理', '请记得给您的宠物定期洗澡。', 0),
(99, '管理员', 4, '用户反馈', '您的反馈对我们非常重要。', 0),
(100, '系统', 5, '系统优化', '我们对系统进行了优化，以提供更好的体验。', 0);

UPDATE messages
SET send_date = DATE_SUB(CURDATE(), INTERVAL FLOOR(1 + RAND() * 365) DAY)
WHERE message_id BETWEEN 1 AND 100;
```

