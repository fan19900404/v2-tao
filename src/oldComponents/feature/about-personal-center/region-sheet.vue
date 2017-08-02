/**
* Created by litian on 16/8/24.
*/
<style scoped>
    button {
        border: none;
    }

    .sheet-select {

    }

    .sheet-select header {
        background: #f8f8f8;
        border-bottom: 1px solid #dfdfdf;
        display: -webkit-box;
        display: flex;

        -webkit-box-align: center; /*垂直对齐*/
        -webkit-box-pack: start; /*左右对齐*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
    }

    .sheet-select header > button {
        background: transparent;
        flex: 1;
        text-align: center;
        padding: 1rem 0;
    }

    .sheet-select header > button:active {
        background: #dfdfdf;
    }

    .sheet-select header > button.red {
        color: #ff4a4a;
    }
</style>

<template>
    <div class="sheet-select">
        <Sheet :show="show">
            <div slot="content">
                <header>
                    <button @click="cancel">取消</button>
                    <button class="red" @click="submit">确定</button>
                </header>
                <Picker :slots="slots" @change="onValuesChange" :visible-item-count="5">
                </Picker>
            </div>
        </Sheet>
    </div>
</template>

<script>
    require('mint-picker/lib/style.css');
    import Sheet from './sheet.vue';
    import Picker from 'mint-picker';
    import regionData from '../config/citylist';
    import regionNewData from '../config/citylist_new';
    export default{
        components: {
            Picker,
            Sheet
        },
        props: {
            show: Boolean,
            province:String,
            city:String,
            district:String,
            region:Object
        },
        data(){
            //var region = this.initRegion();
            //console.log(this.province);
            this.initRegion();
            const provinceData = this.getProvincesArray();
            const province =  provinceData[0];//省
            const cityData = this.getCityArray(province) || [];
            const city = cityData[0];//市
            const districtData = this.getDistrictArray(province,city) || [];
            const district = districtData[0];//区县
            return {
                cache:{province,city,district},
                slots: [
                    {
                        flex: 1,
                        values: provinceData,
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        flex: 1,
                        values: cityData,
                        className: 'slot2',
                        textAlign: 'center'
                    }, {
                        flex: 1,
                        values: districtData,
                        className: 'slot3',
                        textAlign: 'center'
                    }
                ]
            }
        },
        methods: {
            onValuesChange(picker, values) {
                debugger;
                var self = this;
                var updateDistrict = function (province,city) {
                    let district = self.getDistrictArray(province,city);
                    console.log(district);
                    picker.setSlotValues(2,district);
                    self.cache.district = district[0];
                };
                if(values[0] !== this.cache.province){
                    this.cache.province = values[0]; //缓存选中的省
                    //更新城市列表
                    let cityList = this.getCityArray(values[0]);
                    picker.setSlotValues(1,cityList);
                    this.cache.city = cityList[0];//缓存选中的市,默认选中第一个
                    //更新区列表
                    updateDistrict(values[0],cityList[0]);
                }else if(values[1] !== this.cache.city){
                    //更新区县列表
                    this.cache.city = values[1];//缓存选中的区县,默认选中第一个
                    updateDistrict(values[0],values[1]);
                }else if(values[2] !== this.cache.district){
                    //修改缓存中的区县值
                    self.cache.district = values[2];
                }
            },
            cancel(){
                return this.show = false;
            },
            submit(){
                debugger;
                this.show = false;
                //查找区域代码 已'ID'为后缀名
                console.log('缓存:',this.cache);
                for(let k in this.cache){
                    this.cache[k+'ID'] = this.regionCodeMap.get(this.cache[k]);
                }
                Object.assign(this.region,this.cache);
                console.log(this.region);
            },
            getProvincesArray(){
                //省列表
                debugger;
                return [...this.regionMap.keys()];
            },
            getCityArray(province){
                //城市列表
                var provinceData = this.regionMap.get(province);//省的详细数据
                console.log('省:',provinceData);
                return provinceData.city.map((c)=>{
                    return c.regionName
                })
            },
            getDistrictArray(province,city){
                //区县列表
                var provinceData = this.regionMap.get(province);//省的详细数据
                var cityData = provinceData.city.find((c)=>{
                    return c.regionName == city;
                });
                console.log('城市:',cityData);
                return cityData.district.map((d)=>{
                    return d.regionName
                })
            },
            initRegion(){
                var s = new Date().getTime();
                console.log("初始：",regionNewData);
                //新的数据结构
                var regionMap = new Map();
                var regionCodeMap = new Map();
                regionNewData.forEach((province)=>{
                    //console.log(data);
                    regionMap.set(province.regionName,province);
                    province.city.forEach((city)=>{
                        city.district.forEach((district)=>{
                            regionCodeMap.set(district.regionName,district.regionID);
                        });
                        regionCodeMap.set(city.regionName,city.regionID);
                    });
                    //城市代码
                    regionCodeMap.set(province.regionName,province.regionID);
                });

                //this.regionMap = regionMap;
                //this.regionCodeMap = regionCodeMap;
                Object.assign(this,{regionMap,regionCodeMap});
                console.log("regionMap:",regionMap);
                console.log('regionCodeMap:',regionCodeMap);
                console.log([...regionMap.keys()]);
                console.log('数据初始化:',new Date().getTime()-s);
                //return region;
            }
        }
    }
</script>
