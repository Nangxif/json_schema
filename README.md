# JSON_SCHEMA

## 目录

>packages 
>>json-schema 
>>>src 
>>>>template  共有组件  
>>>>unit 所有组件，目前有Checkbox、DatePicker、Input、InputNumber、Radio、Select、TimePicker

## 使用方法

```
import Jsonschema form 'Jsonschema';

<Jsonschema
  :schema="dataJson"
  @upData="upData"
></Jsonschema>

// :schema: 传入的json数据入口
// @upData: 生成的json数据出口
```

## FAQ 
### 怎么自己创建新的表单组件？

以Radio为例：
首先template里面需要引用commonTemplate共用组件，然后在里面填充自己的组件

```
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
commonTemplate需要传递从上级组件传递下来的数据propData，同时还要有一个默认的初始JSON值defaultVal，这个值的格式一定是{ value: xxx }，@upData="upData"接收填写完之后的值。
template里面v-slot的attr、change和form分别是commonTemplate处理之后的自定义属性、数据上传函数和控件表单数据[PS:除了checkbox之外，其他组件的v-model都用form[propDataCopy.key]]

script里面，一定要接收数据，然后再把和这个数据丢给commonTemplate
```
props: {
  propData: {
    type: Object,
    default() {
      return {};
    }
  }
}
```
methods里面要定义数据上传方法，接收commonTemplate传递来的数据，在分发给上层
```
methods: {
  upData(val) {
    this.$emit("upData", val);
  }
}
```

记得在created里面拷贝一份数据
```
created() {
  // 先拷贝一份
  this.propDataCopy = {
    ...this.propData
  };
}
```
