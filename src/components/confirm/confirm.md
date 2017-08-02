# Confirm

确认弹出框  

同时该组件支持以js形式调用：

> 以js形式调用时，和template中使用不同，属性名请使用小驼峰式，比如confirmText而不是confirm-text。
```js
import  confirm from 'confirm.js'

confirm.show({
  // 组件除show外的属性
  onCancel () {
  },
  onConfirm () {}
})
// 隐藏
confirm.hide()
```

## Props

|name	|type	|default	|description|
|:--- |:--- |:---     |:---       |
|show	|Boolean	|false	|是否显示，使用v-model绑定
|title|String	|		|弹窗标题
|content|String	|		|弹窗内容，作为slot默认内容，可以是html片段，如果使用slot该字段会失效|
|confirm-text|String|	|确认(confirm)		确认按钮文字|
|cancel-text|	String|	|取消(cancel)		取消按钮文字|
|confirmTextColor| String| |确认按钮的字体颜色|
|cancelTextColor| String| |取消按钮的字体颜色|

## Slots

|name	|description|
|:--- |:---       |
|default|	弹窗主体内容|

## Events

|name|	params|	description|
|:---|:---|:---|
|on-cancel| |	点击取消按钮时触发|
|on-confirm|	|点击确定按钮时触发, 参数为prompt中输入的值|
