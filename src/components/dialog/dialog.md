# XDialog

基本弹出层

```js
import { XDialog } from 'vux'
```

## Props
|name	|type	|default |description|
|:--- |---  |---     |---        |
|value |Boolean |false |弹窗是否可见，使用v-model绑定|
|mask-transition |String |tm-mask |遮罩层动画|
|dialog-transition |String |tm-dialog |弹窗动画|
|hide-on-blur |Boolean |false |是否在点击遮罩时自动关闭弹窗|
|scroll |Boolean |true |是否在弹窗上滚动时 body 内容也滚动|
|dialog-style |Object |  |设置内部弹窗样式，覆盖原有的宽度、背景颜色等样式|

## Slots

|name	|description	|
|:--- |:---         |
|default |弹窗的主体内容|

## Events

|name	|params	|description|
|:--- |:---   |:---       |
|on-show|	  |弹窗可见时触发|
|on-hide|	 	|弹窖关闭时触发|
