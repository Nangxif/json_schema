# JSON-SCHEMA

## 目录

> packages
>
> ​	json-schema
>
> ​		src
>
> ​			template  共有组件
>
> ​			unit 所有组件，目前有Checkbox、DatePicker、Input、InputNumber、Radio、Select、TimePicker

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

## FAQ

### 怎么自己创建新的表单组件？

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

具体的开发结合

[github]: https://github.com/Nangxif/json_schema

源码进行理解和开发。

### 传入的json的格式是怎样的？

编写中……