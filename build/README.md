# JSON_SCHEMA

## 使用方法

```
import Jsonschema form '@nangxif/json-schema';

<Jsonschema
  :schema="dataJson"
  :tool="tool"
  @upData="upData"
></Jsonschema>

// :schema: 传入的json数据入口
/*
* :tool: 工具栏的配置
* {
*   leftandright: Boolean,
    canEdit: Boolean
* }
*
*/ 
// @upData: 生成的json数据出口
```