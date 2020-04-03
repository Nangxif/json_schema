# JSON-SCHEMA

## 使用方法

```javascript
// 安装
npm i @nangxif/json-schema -S

import Jsonschema form '@nangxif/json-schema';

<Jsonschema
  :schema="dataJson"
  :tool="tool"
  @upData="upData"
></Jsonschema>
```

## 相关参数

| 参数    | 作用                                                         | 值                                                           | 必填  | 备注                                |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----- | ----------------------------------- |
| :schema | 传入的json数据入口                                           | 符合规则的json                                               | true  |                                     |
| :tool   | 工具栏的配置，目前工具栏的工具有<br />1.控制label与输入框的相对位置[上下，左右]，键值为leftandright，默认值为true，表示左右；<br />2.控制可编辑与不可编辑，键值为canEdit，默认值为true，表示可编辑。 | {<br />leftandright:Boolean,<br />canEdit:Boolean<br />}     | false | leftandright和canEdit可设置可不设置 |
| @upData | 生成的json数据出口                                           | 一个接收函数<br />upData(val){<br />//val为最后生成的值<br />} | true  |                                     |


## 传入的json的格式是怎样的？

编写中……


详细开发方式请访问[github](https://github.com/Nangxif/json_schema)