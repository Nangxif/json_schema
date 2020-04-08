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

#### 1.元素的类型

对象类型，数组类型，数字类型，字符串类型。

①对象类型，数组类型，数字类型，字符串类型共有属性

| 属性名称    | 类型   | 备注     |
| ----------- | ------ | -------- |
| type        | string | 类型     |
| title       | string | 展示名称 |
| description | string | 描述     |
| default     | string | 默认值   |

②对象类型特有属性

| 属性名称             | 类型   | 备注                       |
| -------------------- | ------ | -------------------------- |
| properties           | object | 属性                       |
| additionalProperties | array  | 定义对象里面的属性或者对象 |

③数组类型特有属性

| 属性名称        | 类型    | 备注                                        |
| --------------- | ------- | ------------------------------------------- |
| minItems        | number  | 最小item数                                  |
| maxItems        | number  | 最大item数                                  |
| uniqueItems     | number  | 确保数组中的每个项目都是唯一的[默认：false] |
| items           | object  | 数组每项的内容                              |
| additionalItems | boolean | 是否可以额外增加item                        |

④数字类型和字符串类型特有属性

| 属性名称 | 类型   | 对象的属性                                                   |
| -------- | ------ | ------------------------------------------------------------ |
| extra    | object | component_type:"组件的类型"[string]<br />component_attrs:"组件的属性"[string]<br />validation:"组件的表单校验"[array] |

#### 2.组件的类型

组件类型component_type基本继承elementUI的表单组件，包括：

Checkbox、DatePicker、Input、InputNumber、Radio、Select、TimePicker

| 组件        | 组件最终生成的值的类型 |
| ----------- | ---------------------- |
| Checkbox    | array                  |
| DatePicker  | string                 |
| Input       | string                 |
| InputNumber | number                 |
| Radio       | string                 |
| Select      | array                  |
| TimePicker  | string                 |

#### 3.表单验证validation

| 键      | 值                                                           | 用途                   | 是否必填 |
| ------- | ------------------------------------------------------------ | ---------------------- | -------- |
| type    | required、minLength、maxLength、minimum、maximum、pattern、customValidate | 验证方式               | true     |
| message | eg:“必填”                                                    | 表单验证错误显示的提示 | true     |
| param   | /                                                            | type对应的验证方式     | false    |

下面有几个例子

```javascript
{
  "type":"required",
  "message":"必填"
}
```

```javascript
{
  "type":"minLength",
  "message":"长度不能小于10",
  "param":"10"
}
```

```javascript
{
  "type":"maxLength",
  "message":"长度不能超过10",
  "param":"10"
}
```

```javascript
{
  "type": "minimum",
  "message": "值不能小于10",
  "param":"10"
}
```

```javascript
{
  "type": "maximum",
  "message": "值不能大于50",
  "param":"50"
}
```

```javascript
{
   "type": "pattern",
   "message": "正则不匹配",
   "param": "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
}
```

```javascript
{
    "type": "customValidate",
    "message": "我是自定义错误提示",
    "param": {
      "type": "js",
      "source": "function validateRule(value) {\nreturn false\n }",
      "compiled": "function main(){\n    \"use strict\";\n\nvar __compiledFunc__ = function validateRule(value) {\n  return false;\n};\n    return __compiledFunc__.apply(this, arguments);\n  }",
      "error": {}
    }
}
```

这部分的内容还不完整，继续撰写中……

具体开发方式请访问[github](https://github.com/Nangxif/json_schema)