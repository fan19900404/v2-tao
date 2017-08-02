# Alert

确认弹出框  

同时该组件支持以js形式调用：

> 以js形式调用时，和template中使用不同，属性名请使用小驼峰式，比如confirmText而不是confirm-text。
```js
import  alert from 'confirm.js'

alert.show({
  // 组件除show外的属性
  onOk () {
  },
})
// 隐藏
alert.hide()
```

## Props

|name	|type	|default	|description|
|:--- |:--- |:---     |:---       |
|show	|Boolean	|false	|是否显示，使用v-model绑定
|title|String	|		|弹窗标题
|content|String	|		|弹窗内容，作为slot默认内容，可以是html片段，如果使用slot该字段会失效|
|alert-text|String|	|确认(confirm)		确认按钮文字|
|alertTextColor| String| |确认按钮的字体颜色|

## Slots

|name	|description|
|:--- |:---       |
|default|	弹窗主体内容|

## Events

|name|	params|	description|
|:---|:---|:---|
|on-ok| |	点击确定按钮时触发|
