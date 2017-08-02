# header

顶部组件

## Props

|name	|type	|default	|version	|description|
|:--- |:--- |:---     |:---     |:---       |
|fixed |Boolean	|true|	   |是否需要定位fixed|
|title |String| |               |标题名称|

## Slots

|name	|description|version|
|:--- |:---       |:---   |
|default	|标题	  |       |
|left	|左侧部分插槽，在返回文字后，不会影响到原有的图标	||
|right|右侧部分插槽|	|

## Events
|name	|params	|description|
|:--- |:---   |:---       |
|on-click-more	| 	|点击右侧更多时触发|
|on-click-back	| 	|当left-options.preventGoBack为true,点击左边返回时触发
|on-click-title	| 	|点击标题时触发
