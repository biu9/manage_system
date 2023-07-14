## 晓暮堂后台管理系统
与微信小程序配套

### feature

1. 查看所有问卷
2. 切换展示的问卷类型
3. 编辑 & 删除 & 导出问卷
4. 搜索问卷(目前只能通过名字搜索)

### 目前的使用指南

1. 高级筛选功能不可用
2. 问卷详情中的知情书上传模块不可访问
3. 如果遇到了问题请刷新重进&联系我反馈问题orz

### 技术栈

- tailwind
- CRA框架
- redux
- react-router
- material ui

### 文件架构

![20220822024929](https://typora-1309407228.cos.ap-shanghai.myqcloud.com/20220822024929.png)

- components: 储存在不同页面间使用过的组件或在同一页面中使用多次的组件
- hooks: 自定义的hook函数
- pages: 网站的页面文件
- store: 存放redux的slice文件的地方
- utils: 一些常用的纯函数放的地方

### 项目架构

整体采用redux储存大部分数据，避免了数据的多层级传送,首先介绍redux的各个slice中储存的数据
- `formContentSlice`: 主要用于储存一个form中的所有数据,对外暴露四个action,
  - `setFormInfo` : 用于set初始数据
  - `setSingleFormInfo` ： set form中除了answersheet以外的数据
  - `setAnswerSheet` : set answersheet中的类型为选择的数据,
  - `setAnswerSheetFill` : set answersheet中的类型为填空的数据
- `FormOverviewSlice` : 用于储存所有表单的概览信息以及当前查看/编辑的表单的部分信息
  - `setFormType` : 用于set当前表单的类型(虽然也可以通过formContentSlice中的form的内容判断当前是哪种表单,但是另开一个字段储存可以减少代码量)
  - `setCompleted` : set当前表单是否完成,理由同上
  - `setOverViewForm` : set所有概览表单信息(无answersheet)
  - `setInitData` : 功能好像和上面是一样的,可能写重了
  - `setCurrentMoudleIndex` : set当前问卷的当前模块,在detail page中用于切换显示的问卷模块
- `formSelectSlice` : 储存选择的表单的类型(完成or未完成 , 老人or护理员)
  - `setSelectInfo` : 用于set选择表单的类型
- `remindSlice` : 确定各类提示框什么时候出现 & 储存要删除or导出的表单的id
  - `setDeleteRemindStatus` : 看名字就很清楚了
  - `setExportRemindStatus` : 同上
  - `pushSelectedFormId` : 储存选中的表单的id,用于导出或删除
  - `popSelectedFormId` : 删除某个特定id在该slice中的储存


