# Tabbar

底部菜单  
  
> 支持简单模式，即不指定icon，label将垂直居中显示。

## Tabbar

### Props

|name	|type	|default	|version	|description|
|:--- |:--- |:---     |:---     |:---       |
|icon-class	|String	|	|	       |图标的class名|

### Slots

|name	|description	|version|
|:--- |:---         |:---   |
|default	|tabbar主体内容，只允许tabbar-item||	

## TabbarItem

### Props

|name	|type	|default	|version	|description|
|:--- |:--- |:---     |:---     |:---       |
|selected|Boolean|false|	      |是否选中当前项，你也可以使用v-model来指定选中的tabbar-item的index|
|show-dot|Boolean|false|        |是否显示红点|
|link|String|         |         |链接，可以为普通url或者用vue-link的路径写法|
|icon-class|String|	  |		      |图标类名，如果tabbar也同时定义了icon-class, 会使用tabbar-item的|

### Slots

|name	|description	|
|:--- |:---         |
|icon	|图标区域      |
|icon-active|如果存在，当前 tabbar-item 点击时会显示，用于切换图标|
|label|图标下方文字	|

### Events

|name	        |params	|description|
|:---         |:---   |:---       |
|on-item-click|	 	    |点击菜单项时触发|
