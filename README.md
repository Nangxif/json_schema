# JSON-SCHEMA

## 目录

> packages
>
>> ​	json-schema
>
>>> ​		src
>
>>>> ​			template  共有组件
>
>>>> ​			unit 所有组件，目前有Checkbox、DatePicker、Input、InputNumber、Radio、Select、TimePicker

## 使用方法

```javascript
// 安装
npm i @nangxif/json-schema -S

import Jsonschema form '@nangxif/json-schema';
import "@nangxif/json-schema/dist/css/common.css";

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

## FAQ

### 怎么自己创建新的表单组件？

创建的组件名称的首字母必须大写，对应json里面的component_attrs字段。

以 Radio 为例：
首先，自己创建的组件需要在 template 里面的 commonTemplate 共用组件的基础上进行开发，共用组件通过封装统一处理了rule校验规则，输出的数据等。

```javascript
<commonTemplate
  :propData="propData"
  :defaultVal="{ value: finalRadio }"
  @upData="upData">
  <template v-slot="{ attr, change, form }">
    <el-radio
      v-model="form[propDataCopy.key]"
      :label="item.key"
      v-for="(item, index) in radioArr"
      :key="index"
      @change="change(form[propDataCopy.key])"
      v-bind="attr"
      >{{ item.value }}
    </el-radio>
  </template>
</commonTemplate>
```

1.commonTemplate 需要接收从上级组件传递下来的数据 propData，同时还要有一个默认的初始 JSON 值 defaultVal，这个值的格式一定是{ value: xxx }，@upData="upData"接收填写完之后的值；

2.template 里面 v-slot 的 attr、change 和 form 分别是 commonTemplate 处理之后的自定义属性、数据上传函数和控件表单数据[PS:除了 checkbox 之外，其他组件的 v-model 都用 form[propDataCopy.key]]；

3.如上面所示，当radio的值改变的时候，触发了change事件，该事件调用了commonTemplate共用组件抛出来的方法change，这个方法接收的值就是修改后的radio的值。

script 里面，一定要接收数据，然后再把和这个数据丢给 commonTemplate

```javascript
props: {
  propData: {
    type: Object,
    default() {
      return {};
    }
  }
}
```

自定义组件的methods 里面要定义数据上传方法，接收 commonTemplate 传递来的数据，再分发给上层

```javascript
methods: {
  upData(val) {
    this.$emit("upData", val);
  }
}
```

记得在 created 里面拷贝一份数据

```javascript
created() {
  // 先拷贝一份
  this.propDataCopy = {
    ...this.propData
  };
}
```

具体结合[github](https://github.com/Nangxif/json_schema)源码进行理解和开发。

### 传入的json的格式是怎样的？

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

(1)数组类型一类特有属性

一类指的是该数组里面包含还有其他的组件，items属性里面表示的就是里面包含的组件。

| 属性名称        | 类型    | 备注                                        |
| --------------- | ------- | ------------------------------------------- |
| minItems        | number  | 最小item数                                  |
| maxItems        | number  | 最大item数                                  |
| uniqueItems     | number  | 确保数组中的每个项目都是唯一的[默认：false] |
| items           | object  | 数组每项的内容                              |
| additionalItems | boolean | 是否可以额外增加item                        |

(2)数组类型二类特有属性

二类指的是该数组就是对应一个组件了，一般这个组件是radio、select或者checkbox，可能后续还会有其他产生的值为数组的组件，与一类的区别是，这类数组类型有enum和enumNames属性

| 属性名称  | 类型   | 备注                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| enum      | array  | 组件选项的value值                                            |
| enumNames | array  | 组件选项的key值，元素数量与enum一致                          |
| extra     | object | 同下，但是一般对应的component_type是radio组件、select组件或checkbox组件 |

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