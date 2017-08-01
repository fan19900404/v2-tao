/**
 * Created by litian on 16/8/25.
 */
'use strict';
const data = [{
    "regionID": "2",
    "regionName": "北京",
    "child": [{
        "regionID": "52",
        "regionName": "北京市",
        "child": [{"regionID": "500", "regionName": "东城区"}, {
            "regionID": "501",
            "regionName": "西城区"
        }, {"regionID": "502", "regionName": "海淀区"}, {"regionID": "503", "regionName": "朝阳区"}, {
            "regionID": "504",
            "regionName": "崇文区"
        }, {"regionID": "505", "regionName": "宣武区"}, {"regionID": "506", "regionName": "丰台区"}, {
            "regionID": "507",
            "regionName": "石景山区"
        }, {"regionID": "508", "regionName": "房山区"}, {"regionID": "509", "regionName": "门头沟区"}, {
            "regionID": "510",
            "regionName": "通州区"
        }, {"regionID": "511", "regionName": "顺义区"}, {"regionID": "512", "regionName": "昌平区"}, {
            "regionID": "513",
            "regionName": "怀柔区"
        }, {"regionID": "514", "regionName": "平谷区"}, {"regionID": "515", "regionName": "大兴区"}, {
            "regionID": "516",
            "regionName": "密云县"
        }, {"regionID": "517", "regionName": "延庆县"}]
    }]
}, {
    "regionID": "3",
    "regionName": "安徽",
    "child": [{
        "regionID": "36",
        "regionName": "安庆",
        "child": [{"regionID": "398", "regionName": "迎江区"}, {
            "regionID": "399",
            "regionName": "大观区"
        }, {"regionID": "400", "regionName": "宜秀区"}, {"regionID": "401", "regionName": "桐城市"}, {
            "regionID": "402",
            "regionName": "怀宁县"
        }, {"regionID": "403", "regionName": "枞阳县"}, {"regionID": "404", "regionName": "潜山县"}, {
            "regionID": "405",
            "regionName": "太湖县"
        }, {"regionID": "406", "regionName": "宿松县"}, {"regionID": "407", "regionName": "望江县"}, {
            "regionID": "408",
            "regionName": "岳西县"
        }]
    }, {
        "regionID": "37",
        "regionName": "蚌埠",
        "child": [{"regionID": "409", "regionName": "中市区"}, {
            "regionID": "410",
            "regionName": "东市区"
        }, {"regionID": "411", "regionName": "西市区"}, {"regionID": "412", "regionName": "郊区"}, {
            "regionID": "413",
            "regionName": "怀远县"
        }, {"regionID": "414", "regionName": "五河县"}, {"regionID": "415", "regionName": "固镇县"}]
    }, {
        "regionID": "38",
        "regionName": "巢湖",
        "child": [{"regionID": "416", "regionName": "居巢区"}, {
            "regionID": "417",
            "regionName": "庐江县"
        }, {"regionID": "418", "regionName": "无为县"}, {"regionID": "419", "regionName": "含山县"}, {
            "regionID": "420",
            "regionName": "和县"
        }]
    }, {
        "regionID": "39",
        "regionName": "池州",
        "child": [{"regionID": "421", "regionName": "贵池区"}, {
            "regionID": "422",
            "regionName": "东至县"
        }, {"regionID": "423", "regionName": "石台县"}, {"regionID": "424", "regionName": "青阳县"}]
    }, {
        "regionID": "40",
        "regionName": "滁州",
        "child": [{"regionID": "425", "regionName": "琅琊区"}, {
            "regionID": "426",
            "regionName": "南谯区"
        }, {"regionID": "427", "regionName": "天长市"}, {"regionID": "428", "regionName": "明光市"}, {
            "regionID": "429",
            "regionName": "来安县"
        }, {"regionID": "430", "regionName": "全椒县"}, {"regionID": "431", "regionName": "定远县"}, {
            "regionID": "432",
            "regionName": "凤阳县"
        }]
    }, {
        "regionID": "41",
        "regionName": "阜阳",
        "child": [{"regionID": "433", "regionName": "蚌山区"}, {
            "regionID": "434",
            "regionName": "龙子湖区"
        }, {"regionID": "435", "regionName": "禹会区"}, {"regionID": "436", "regionName": "淮上区"}, {
            "regionID": "437",
            "regionName": "颍州区"
        }, {"regionID": "438", "regionName": "颍东区"}, {"regionID": "439", "regionName": "颍泉区"}, {
            "regionID": "440",
            "regionName": "界首市"
        }, {"regionID": "441", "regionName": "临泉县"}, {"regionID": "442", "regionName": "太和县"}, {
            "regionID": "443",
            "regionName": "阜南县"
        }, {"regionID": "444", "regionName": "颖上县"}]
    }, {
        "regionID": "42",
        "regionName": "淮北",
        "child": [{"regionID": "445", "regionName": "相山区"}, {
            "regionID": "446",
            "regionName": "杜集区"
        }, {"regionID": "447", "regionName": "烈山区"}, {"regionID": "448", "regionName": "濉溪县"}]
    }, {
        "regionID": "43",
        "regionName": "淮南",
        "child": [{"regionID": "449", "regionName": "田家庵区"}, {
            "regionID": "450",
            "regionName": "大通区"
        }, {"regionID": "451", "regionName": "谢家集区"}, {"regionID": "452", "regionName": "八公山区"}, {
            "regionID": "453",
            "regionName": "潘集区"
        }, {"regionID": "454", "regionName": "凤台县"}]
    }, {
        "regionID": "44",
        "regionName": "黄山",
        "child": [{"regionID": "455", "regionName": "屯溪区"}, {
            "regionID": "456",
            "regionName": "黄山区"
        }, {"regionID": "457", "regionName": "徽州区"}, {"regionID": "458", "regionName": "歙县"}, {
            "regionID": "459",
            "regionName": "休宁县"
        }, {"regionID": "460", "regionName": "黟县"}, {"regionID": "461", "regionName": "祁门县"}]
    }, {
        "regionID": "45",
        "regionName": "六安",
        "child": [{"regionID": "462", "regionName": "金安区"}, {
            "regionID": "463",
            "regionName": "裕安区"
        }, {"regionID": "464", "regionName": "寿县"}, {"regionID": "465", "regionName": "霍邱县"}, {
            "regionID": "466",
            "regionName": "舒城县"
        }, {"regionID": "467", "regionName": "金寨县"}, {"regionID": "468", "regionName": "霍山县"}]
    }, {
        "regionID": "46",
        "regionName": "马鞍山",
        "child": [{"regionID": "469", "regionName": "雨山区"}, {
            "regionID": "470",
            "regionName": "花山区"
        }, {"regionID": "471", "regionName": "金家庄区"}, {"regionID": "472", "regionName": "当涂县"}]
    }, {
        "regionID": "47",
        "regionName": "宿州",
        "child": [{"regionID": "473", "regionName": "埇桥区"}, {
            "regionID": "474",
            "regionName": "砀山县"
        }, {"regionID": "475", "regionName": "萧县"}, {"regionID": "476", "regionName": "灵璧县"}, {
            "regionID": "477",
            "regionName": "泗县"
        }]
    }, {
        "regionID": "48",
        "regionName": "铜陵",
        "child": [{"regionID": "478", "regionName": "铜官山区"}, {
            "regionID": "479",
            "regionName": "狮子山区"
        }, {"regionID": "480", "regionName": "郊区"}, {"regionID": "481", "regionName": "铜陵县"}]
    }, {
        "regionID": "49",
        "regionName": "芜湖",
        "child": [{"regionID": "482", "regionName": "镜湖区"}, {
            "regionID": "483",
            "regionName": "弋江区"
        }, {"regionID": "484", "regionName": "鸠江区"}, {"regionID": "485", "regionName": "三山区"}, {
            "regionID": "486",
            "regionName": "芜湖县"
        }, {"regionID": "487", "regionName": "繁昌县"}, {"regionID": "488", "regionName": "南陵县"}]
    }, {
        "regionID": "50",
        "regionName": "宣城",
        "child": [{"regionID": "489", "regionName": "宣州区"}, {
            "regionID": "490",
            "regionName": "宁国市"
        }, {"regionID": "491", "regionName": "郎溪县"}, {"regionID": "492", "regionName": "广德县"}, {
            "regionID": "493",
            "regionName": "泾县"
        }, {"regionID": "494", "regionName": "绩溪县"}, {"regionID": "495", "regionName": "旌德县"}]
    }, {
        "regionID": "51",
        "regionName": "亳州",
        "child": [{"regionID": "496", "regionName": "涡阳县"}, {
            "regionID": "497",
            "regionName": "蒙城县"
        }, {"regionID": "498", "regionName": "利辛县"}, {"regionID": "499", "regionName": "谯城区"}]
    }, {
        "regionID": "3401",
        "regionName": "合肥",
        "child": [{"regionID": "3402", "regionName": "庐阳区"}, {
            "regionID": "3403",
            "regionName": "瑶海区"
        }, {"regionID": "3404", "regionName": "蜀山区"}, {"regionID": "3405", "regionName": "包河区"}, {
            "regionID": "3406",
            "regionName": "长丰县"
        }, {"regionID": "3407", "regionName": "肥东县"}, {"regionID": "3408", "regionName": "肥西县"}]
    }]
}, {
    "regionID": "4",
    "regionName": "福建",
    "child": [{
        "regionID": "53",
        "regionName": "福州",
        "child": [{"regionID": "518", "regionName": "鼓楼区"}, {
            "regionID": "519",
            "regionName": "台江区"
        }, {"regionID": "520", "regionName": "仓山区"}, {"regionID": "521", "regionName": "马尾区"}, {
            "regionID": "522",
            "regionName": "晋安区"
        }, {"regionID": "523", "regionName": "福清市"}, {"regionID": "524", "regionName": "长乐市"}, {
            "regionID": "525",
            "regionName": "闽侯县"
        }, {"regionID": "526", "regionName": "连江县"}, {"regionID": "527", "regionName": "罗源县"}, {
            "regionID": "528",
            "regionName": "闽清县"
        }, {"regionID": "529", "regionName": "永泰县"}, {"regionID": "530", "regionName": "平潭县"}]
    }, {
        "regionID": "54",
        "regionName": "龙岩",
        "child": [{"regionID": "531", "regionName": "新罗区"}, {
            "regionID": "532",
            "regionName": "漳平市"
        }, {"regionID": "533", "regionName": "长汀县"}, {"regionID": "534", "regionName": "永定县"}, {
            "regionID": "535",
            "regionName": "上杭县"
        }, {"regionID": "536", "regionName": "武平县"}, {"regionID": "537", "regionName": "连城县"}]
    }, {
        "regionID": "55",
        "regionName": "南平",
        "child": [{"regionID": "538", "regionName": "延平区"}, {
            "regionID": "539",
            "regionName": "邵武市"
        }, {"regionID": "540", "regionName": "武夷山市"}, {"regionID": "541", "regionName": "建瓯市"}, {
            "regionID": "542",
            "regionName": "建阳市"
        }, {"regionID": "543", "regionName": "顺昌县"}, {"regionID": "544", "regionName": "浦城县"}, {
            "regionID": "545",
            "regionName": "光泽县"
        }, {"regionID": "546", "regionName": "松溪县"}, {"regionID": "547", "regionName": "政和县"}]
    }, {
        "regionID": "56",
        "regionName": "宁德",
        "child": [{"regionID": "548", "regionName": "蕉城区"}, {
            "regionID": "549",
            "regionName": "福安市"
        }, {"regionID": "550", "regionName": "福鼎市"}, {"regionID": "551", "regionName": "霞浦县"}, {
            "regionID": "552",
            "regionName": "古田县"
        }, {"regionID": "553", "regionName": "屏南县"}, {"regionID": "554", "regionName": "寿宁县"}, {
            "regionID": "555",
            "regionName": "周宁县"
        }, {"regionID": "556", "regionName": "柘荣县"}]
    }, {
        "regionID": "57",
        "regionName": "莆田",
        "child": [{"regionID": "557", "regionName": "城厢区"}, {
            "regionID": "558",
            "regionName": "涵江区"
        }, {"regionID": "559", "regionName": "荔城区"}, {"regionID": "560", "regionName": "秀屿区"}, {
            "regionID": "561",
            "regionName": "仙游县"
        }]
    }, {
        "regionID": "58",
        "regionName": "泉州",
        "child": [{"regionID": "562", "regionName": "鲤城区"}, {
            "regionID": "563",
            "regionName": "丰泽区"
        }, {"regionID": "564", "regionName": "洛江区"}, {"regionID": "565", "regionName": "清濛开发区"}, {
            "regionID": "566",
            "regionName": "泉港区"
        }, {"regionID": "567", "regionName": "石狮市"}, {"regionID": "568", "regionName": "晋江市"}, {
            "regionID": "569",
            "regionName": "南安市"
        }, {"regionID": "570", "regionName": "惠安县"}, {"regionID": "571", "regionName": "安溪县"}, {
            "regionID": "572",
            "regionName": "永春县"
        }, {"regionID": "573", "regionName": "德化县"}, {"regionID": "574", "regionName": "金门县"}]
    }, {
        "regionID": "59",
        "regionName": "三明",
        "child": [{"regionID": "575", "regionName": "梅列区"}, {
            "regionID": "576",
            "regionName": "三元区"
        }, {"regionID": "577", "regionName": "永安市"}, {"regionID": "578", "regionName": "明溪县"}, {
            "regionID": "579",
            "regionName": "清流县"
        }, {"regionID": "580", "regionName": "宁化县"}, {"regionID": "581", "regionName": "大田县"}, {
            "regionID": "582",
            "regionName": "尤溪县"
        }, {"regionID": "583", "regionName": "沙县"}, {"regionID": "584", "regionName": "将乐县"}, {
            "regionID": "585",
            "regionName": "泰宁县"
        }, {"regionID": "586", "regionName": "建宁县"}]
    }, {
        "regionID": "60",
        "regionName": "厦门",
        "child": [{"regionID": "587", "regionName": "思明区"}, {
            "regionID": "588",
            "regionName": "海沧区"
        }, {"regionID": "589", "regionName": "湖里区"}, {"regionID": "590", "regionName": "集美区"}, {
            "regionID": "591",
            "regionName": "同安区"
        }, {"regionID": "592", "regionName": "翔安区"}]
    }, {
        "regionID": "61",
        "regionName": "漳州",
        "child": [{"regionID": "593", "regionName": "芗城区"}, {
            "regionID": "594",
            "regionName": "龙文区"
        }, {"regionID": "595", "regionName": "龙海市"}, {"regionID": "596", "regionName": "云霄县"}, {
            "regionID": "597",
            "regionName": "漳浦县"
        }, {"regionID": "598", "regionName": "诏安县"}, {"regionID": "599", "regionName": "长泰县"}, {
            "regionID": "600",
            "regionName": "东山县"
        }, {"regionID": "601", "regionName": "南靖县"}, {"regionID": "602", "regionName": "平和县"}, {
            "regionID": "603",
            "regionName": "华安县"
        }]
    }]
}, {
    "regionID": "5",
    "regionName": "甘肃",
    "child": [{
        "regionID": "62",
        "regionName": "兰州",
        "child": [{"regionID": "604", "regionName": "皋兰县"}, {
            "regionID": "605",
            "regionName": "城关区"
        }, {"regionID": "606", "regionName": "七里河区"}, {"regionID": "607", "regionName": "西固区"}, {
            "regionID": "608",
            "regionName": "安宁区"
        }, {"regionID": "609", "regionName": "红古区"}, {"regionID": "610", "regionName": "永登县"}, {
            "regionID": "611",
            "regionName": "榆中县"
        }]
    }, {
        "regionID": "63",
        "regionName": "白银",
        "child": [{"regionID": "612", "regionName": "白银区"}, {
            "regionID": "613",
            "regionName": "平川区"
        }, {"regionID": "614", "regionName": "会宁县"}, {"regionID": "615", "regionName": "景泰县"}, {
            "regionID": "616",
            "regionName": "靖远县"
        }]
    }, {
        "regionID": "64",
        "regionName": "定西",
        "child": [{"regionID": "617", "regionName": "临洮县"}, {
            "regionID": "618",
            "regionName": "陇西县"
        }, {"regionID": "619", "regionName": "通渭县"}, {"regionID": "620", "regionName": "渭源县"}, {
            "regionID": "621",
            "regionName": "漳县"
        }, {"regionID": "622", "regionName": "岷县"}, {"regionID": "623", "regionName": "安定区"}, {
            "regionID": "624",
            "regionName": "安定区"
        }]
    }, {
        "regionID": "65",
        "regionName": "甘南",
        "child": [{"regionID": "625", "regionName": "合作市"}, {
            "regionID": "626",
            "regionName": "临潭县"
        }, {"regionID": "627", "regionName": "卓尼县"}, {"regionID": "628", "regionName": "舟曲县"}, {
            "regionID": "629",
            "regionName": "迭部县"
        }, {"regionID": "630", "regionName": "玛曲县"}, {"regionID": "631", "regionName": "碌曲县"}, {
            "regionID": "632",
            "regionName": "夏河县"
        }]
    }, {
        "regionID": "66",
        "regionName": "嘉峪关",
        "child": [{"regionID": "633", "regionName": "嘉峪关市"}]
    }, {
        "regionID": "67",
        "regionName": "金昌",
        "child": [{"regionID": "634", "regionName": "金川区"}, {"regionID": "635", "regionName": "永昌县"}]
    }, {
        "regionID": "68",
        "regionName": "酒泉",
        "child": [{"regionID": "636", "regionName": "肃州区"}, {
            "regionID": "637",
            "regionName": "玉门市"
        }, {"regionID": "638", "regionName": "敦煌市"}, {"regionID": "639", "regionName": "金塔县"}, {
            "regionID": "640",
            "regionName": "瓜州县"
        }, {"regionID": "641", "regionName": "肃北"}, {"regionID": "642", "regionName": "阿克塞"}]
    }, {
        "regionID": "69",
        "regionName": "临夏",
        "child": [{"regionID": "643", "regionName": "临夏市"}, {
            "regionID": "644",
            "regionName": "临夏县"
        }, {"regionID": "645", "regionName": "康乐县"}, {"regionID": "646", "regionName": "永靖县"}, {
            "regionID": "647",
            "regionName": "广河县"
        }, {"regionID": "648", "regionName": "和政县"}, {"regionID": "649", "regionName": "东乡族自治县"}, {
            "regionID": "650",
            "regionName": "积石山"
        }]
    }, {
        "regionID": "70",
        "regionName": "陇南",
        "child": [{"regionID": "651", "regionName": "成县"}, {
            "regionID": "652",
            "regionName": "徽县"
        }, {"regionID": "653", "regionName": "康县"}, {"regionID": "654", "regionName": "礼县"}, {
            "regionID": "655",
            "regionName": "两当县"
        }, {"regionID": "656", "regionName": "文县"}, {"regionID": "657", "regionName": "西和县"}, {
            "regionID": "658",
            "regionName": "宕昌县"
        }, {"regionID": "659", "regionName": "武都区"}]
    }, {
        "regionID": "71",
        "regionName": "平凉",
        "child": [{"regionID": "660", "regionName": "崇信县"}, {
            "regionID": "661",
            "regionName": "华亭县"
        }, {"regionID": "662", "regionName": "静宁县"}, {"regionID": "663", "regionName": "灵台县"}, {
            "regionID": "664",
            "regionName": "崆峒区"
        }, {"regionID": "665", "regionName": "庄浪县"}, {"regionID": "666", "regionName": "泾川县"}]
    }, {
        "regionID": "72",
        "regionName": "庆阳",
        "child": [{"regionID": "667", "regionName": "合水县"}, {
            "regionID": "668",
            "regionName": "华池县"
        }, {"regionID": "669", "regionName": "环县"}, {"regionID": "670", "regionName": "宁县"}, {
            "regionID": "671",
            "regionName": "庆城县"
        }, {"regionID": "672", "regionName": "西峰区"}, {"regionID": "673", "regionName": "镇原县"}, {
            "regionID": "674",
            "regionName": "正宁县"
        }]
    }, {
        "regionID": "73",
        "regionName": "天水",
        "child": [{"regionID": "675", "regionName": "甘谷县"}, {
            "regionID": "676",
            "regionName": "秦安县"
        }, {"regionID": "677", "regionName": "清水县"}, {"regionID": "678", "regionName": "秦州区"}, {
            "regionID": "679",
            "regionName": "麦积区"
        }, {"regionID": "680", "regionName": "武山县"}, {"regionID": "681", "regionName": "张家川"}]
    }, {
        "regionID": "74",
        "regionName": "武威",
        "child": [{"regionID": "682", "regionName": "古浪县"}, {
            "regionID": "683",
            "regionName": "民勤县"
        }, {"regionID": "684", "regionName": "天祝"}, {"regionID": "685", "regionName": "凉州区"}]
    }, {
        "regionID": "75",
        "regionName": "张掖",
        "child": [{"regionID": "686", "regionName": "高台县"}, {
            "regionID": "687",
            "regionName": "临泽县"
        }, {"regionID": "688", "regionName": "民乐县"}, {"regionID": "689", "regionName": "山丹县"}, {
            "regionID": "690",
            "regionName": "肃南"
        }, {"regionID": "691", "regionName": "甘州区"}]
    }]
}, {
    "regionID": "6",
    "regionName": "广东",
    "child": [{
        "regionID": "76",
        "regionName": "广州",
        "child": [{"regionID": "692", "regionName": "从化市"}, {
            "regionID": "693",
            "regionName": "天河区"
        }, {"regionID": "694", "regionName": "东山区"}, {"regionID": "695", "regionName": "白云区"}, {
            "regionID": "696",
            "regionName": "海珠区"
        }, {"regionID": "697", "regionName": "荔湾区"}, {"regionID": "698", "regionName": "越秀区"}, {
            "regionID": "699",
            "regionName": "黄埔区"
        }, {"regionID": "700", "regionName": "番禺区"}, {"regionID": "701", "regionName": "花都区"}, {
            "regionID": "702",
            "regionName": "增城区"
        }, {"regionID": "703", "regionName": "从化区"}, {"regionID": "704", "regionName": "市郊"}]
    }, {
        "regionID": "77",
        "regionName": "深圳",
        "child": [{"regionID": "705", "regionName": "福田区"}, {
            "regionID": "706",
            "regionName": "罗湖区"
        }, {"regionID": "707", "regionName": "南山区"}, {"regionID": "708", "regionName": "宝安区"}, {
            "regionID": "709",
            "regionName": "龙岗区"
        }, {"regionID": "710", "regionName": "盐田区"}]
    }, {
        "regionID": "78",
        "regionName": "潮州",
        "child": [{"regionID": "711", "regionName": "湘桥区"}, {
            "regionID": "712",
            "regionName": "潮安县"
        }, {"regionID": "713", "regionName": "饶平县"}]
    }, {
        "regionID": "79",
        "regionName": "东莞",
        "child": [{"regionID": "714", "regionName": "南城区"}, {
            "regionID": "715",
            "regionName": "东城区"
        }, {"regionID": "716", "regionName": "万江区"}, {"regionID": "717", "regionName": "莞城区"}, {
            "regionID": "718",
            "regionName": "石龙镇"
        }, {"regionID": "719", "regionName": "虎门镇"}, {"regionID": "720", "regionName": "麻涌镇"}, {
            "regionID": "721",
            "regionName": "道滘镇"
        }, {"regionID": "722", "regionName": "石碣镇"}, {"regionID": "723", "regionName": "沙田镇"}, {
            "regionID": "724",
            "regionName": "望牛墩镇"
        }, {"regionID": "725", "regionName": "洪梅镇"}, {"regionID": "726", "regionName": "茶山镇"}, {
            "regionID": "727",
            "regionName": "寮步镇"
        }, {"regionID": "728", "regionName": "大岭山镇"}, {"regionID": "729", "regionName": "大朗镇"}, {
            "regionID": "730",
            "regionName": "黄江镇"
        }, {"regionID": "731", "regionName": "樟木头"}, {"regionID": "732", "regionName": "凤岗镇"}, {
            "regionID": "733",
            "regionName": "塘厦镇"
        }, {"regionID": "734", "regionName": "谢岗镇"}, {"regionID": "735", "regionName": "厚街镇"}, {
            "regionID": "736",
            "regionName": "清溪镇"
        }, {"regionID": "737", "regionName": "常平镇"}, {"regionID": "738", "regionName": "桥头镇"}, {
            "regionID": "739",
            "regionName": "横沥镇"
        }, {"regionID": "740", "regionName": "东坑镇"}, {"regionID": "741", "regionName": "企石镇"}, {
            "regionID": "742",
            "regionName": "石排镇"
        }, {"regionID": "743", "regionName": "长安镇"}, {"regionID": "744", "regionName": "中堂镇"}, {
            "regionID": "745",
            "regionName": "高埗镇"
        }]
    }, {
        "regionID": "80",
        "regionName": "佛山",
        "child": [{"regionID": "746", "regionName": "禅城区"}, {
            "regionID": "747",
            "regionName": "南海区"
        }, {"regionID": "748", "regionName": "顺德区"}, {"regionID": "749", "regionName": "三水区"}, {
            "regionID": "750",
            "regionName": "高明区"
        }]
    }, {
        "regionID": "81",
        "regionName": "河源",
        "child": [{"regionID": "751", "regionName": "东源县"}, {
            "regionID": "752",
            "regionName": "和平县"
        }, {"regionID": "753", "regionName": "源城区"}, {"regionID": "754", "regionName": "连平县"}, {
            "regionID": "755",
            "regionName": "龙川县"
        }, {"regionID": "756", "regionName": "紫金县"}]
    }, {
        "regionID": "82",
        "regionName": "惠州",
        "child": [{"regionID": "757", "regionName": "惠阳区"}, {
            "regionID": "758",
            "regionName": "惠城区"
        }, {"regionID": "759", "regionName": "大亚湾"}, {"regionID": "760", "regionName": "博罗县"}, {
            "regionID": "761",
            "regionName": "惠东县"
        }, {"regionID": "762", "regionName": "龙门县"}]
    }, {
        "regionID": "83",
        "regionName": "江门",
        "child": [{"regionID": "763", "regionName": "江海区"}, {
            "regionID": "764",
            "regionName": "蓬江区"
        }, {"regionID": "765", "regionName": "新会区"}, {"regionID": "766", "regionName": "台山市"}, {
            "regionID": "767",
            "regionName": "开平市"
        }, {"regionID": "768", "regionName": "鹤山市"}, {"regionID": "769", "regionName": "恩平市"}]
    }, {
        "regionID": "84",
        "regionName": "揭阳",
        "child": [{"regionID": "770", "regionName": "榕城区"}, {
            "regionID": "771",
            "regionName": "普宁市"
        }, {"regionID": "772", "regionName": "揭东县"}, {"regionID": "773", "regionName": "揭西县"}, {
            "regionID": "774",
            "regionName": "惠来县"
        }]
    }, {
        "regionID": "85",
        "regionName": "茂名",
        "child": [{"regionID": "775", "regionName": "茂南区"}, {
            "regionID": "776",
            "regionName": "茂港区"
        }, {"regionID": "777", "regionName": "高州市"}, {"regionID": "778", "regionName": "化州市"}, {
            "regionID": "779",
            "regionName": "信宜市"
        }, {"regionID": "780", "regionName": "电白县"}]
    }, {
        "regionID": "86",
        "regionName": "梅州",
        "child": [{"regionID": "781", "regionName": "梅县"}, {
            "regionID": "782",
            "regionName": "梅江区"
        }, {"regionID": "783", "regionName": "兴宁市"}, {"regionID": "784", "regionName": "大埔县"}, {
            "regionID": "785",
            "regionName": "丰顺县"
        }, {"regionID": "786", "regionName": "五华县"}, {"regionID": "787", "regionName": "平远县"}, {
            "regionID": "788",
            "regionName": "蕉岭县"
        }]
    }, {
        "regionID": "87",
        "regionName": "清远",
        "child": [{"regionID": "789", "regionName": "清城区"}, {
            "regionID": "790",
            "regionName": "英德市"
        }, {"regionID": "791", "regionName": "连州市"}, {"regionID": "792", "regionName": "佛冈县"}, {
            "regionID": "793",
            "regionName": "阳山县"
        }, {"regionID": "794", "regionName": "清新县"}, {"regionID": "795", "regionName": "连山"}, {
            "regionID": "796",
            "regionName": "连南"
        }]
    }, {
        "regionID": "88",
        "regionName": "汕头",
        "child": [{"regionID": "797", "regionName": "南澳县"}, {
            "regionID": "798",
            "regionName": "潮阳区"
        }, {"regionID": "799", "regionName": "澄海区"}, {"regionID": "800", "regionName": "龙湖区"}, {
            "regionID": "801",
            "regionName": "金平区"
        }, {"regionID": "802", "regionName": "濠江区"}, {"regionID": "803", "regionName": "潮南区"}]
    }, {
        "regionID": "89",
        "regionName": "汕尾",
        "child": [{"regionID": "804", "regionName": "城区"}, {
            "regionID": "805",
            "regionName": "陆丰市"
        }, {"regionID": "806", "regionName": "海丰县"}, {"regionID": "807", "regionName": "陆河县"}]
    }, {
        "regionID": "90",
        "regionName": "韶关",
        "child": [{"regionID": "808", "regionName": "曲江县"}, {
            "regionID": "809",
            "regionName": "浈江区"
        }, {"regionID": "810", "regionName": "武江区"}, {"regionID": "811", "regionName": "曲江区"}, {
            "regionID": "812",
            "regionName": "乐昌市"
        }, {"regionID": "813", "regionName": "南雄市"}, {"regionID": "814", "regionName": "始兴县"}, {
            "regionID": "815",
            "regionName": "仁化县"
        }, {"regionID": "816", "regionName": "翁源县"}, {"regionID": "817", "regionName": "新丰县"}, {
            "regionID": "818",
            "regionName": "乳源"
        }]
    }, {
        "regionID": "91",
        "regionName": "阳江",
        "child": [{"regionID": "819", "regionName": "江城区"}, {
            "regionID": "820",
            "regionName": "阳春市"
        }, {"regionID": "821", "regionName": "阳西县"}, {"regionID": "822", "regionName": "阳东县"}]
    }, {
        "regionID": "92",
        "regionName": "云浮",
        "child": [{"regionID": "823", "regionName": "云城区"}, {
            "regionID": "824",
            "regionName": "罗定市"
        }, {"regionID": "825", "regionName": "新兴县"}, {"regionID": "826", "regionName": "郁南县"}, {
            "regionID": "827",
            "regionName": "云安县"
        }]
    }, {
        "regionID": "93",
        "regionName": "湛江",
        "child": [{"regionID": "828", "regionName": "赤坎区"}, {
            "regionID": "829",
            "regionName": "霞山区"
        }, {"regionID": "830", "regionName": "坡头区"}, {"regionID": "831", "regionName": "麻章区"}, {
            "regionID": "832",
            "regionName": "廉江市"
        }, {"regionID": "833", "regionName": "雷州市"}, {"regionID": "834", "regionName": "吴川市"}, {
            "regionID": "835",
            "regionName": "遂溪县"
        }, {"regionID": "836", "regionName": "徐闻县"}]
    }, {
        "regionID": "94",
        "regionName": "肇庆",
        "child": [{"regionID": "837", "regionName": "肇庆市"}, {
            "regionID": "838",
            "regionName": "高要市"
        }, {"regionID": "839", "regionName": "四会市"}, {"regionID": "840", "regionName": "广宁县"}, {
            "regionID": "841",
            "regionName": "怀集县"
        }, {"regionID": "842", "regionName": "封开县"}, {"regionID": "843", "regionName": "德庆县"}]
    }, {
        "regionID": "95",
        "regionName": "中山",
        "child": [{"regionID": "844", "regionName": "石岐街道"}, {
            "regionID": "845",
            "regionName": "东区街道"
        }, {"regionID": "846", "regionName": "西区街道"}, {"regionID": "847", "regionName": "环城街道"}, {
            "regionID": "848",
            "regionName": "中山港街道"
        }, {"regionID": "849", "regionName": "五桂山街道"}]
    }, {
        "regionID": "96",
        "regionName": "珠海",
        "child": [{"regionID": "850", "regionName": "香洲区"}, {
            "regionID": "851",
            "regionName": "斗门区"
        }, {"regionID": "852", "regionName": "金湾区"}]
    }]
}, {
    "regionID": "7",
    "regionName": "广西",
    "child": [{
        "regionID": "97",
        "regionName": "南宁",
        "child": [{"regionID": "853", "regionName": "邕宁区"}, {
            "regionID": "854",
            "regionName": "青秀区"
        }, {"regionID": "855", "regionName": "兴宁区"}, {"regionID": "856", "regionName": "良庆区"}, {
            "regionID": "857",
            "regionName": "西乡塘区"
        }, {"regionID": "858", "regionName": "江南区"}, {"regionID": "859", "regionName": "武鸣县"}, {
            "regionID": "860",
            "regionName": "隆安县"
        }, {"regionID": "861", "regionName": "马山县"}, {"regionID": "862", "regionName": "上林县"}, {
            "regionID": "863",
            "regionName": "宾阳县"
        }, {"regionID": "864", "regionName": "横县"}]
    }, {
        "regionID": "98",
        "regionName": "桂林",
        "child": [{"regionID": "865", "regionName": "秀峰区"}, {
            "regionID": "866",
            "regionName": "叠彩区"
        }, {"regionID": "867", "regionName": "象山区"}, {"regionID": "868", "regionName": "七星区"}, {
            "regionID": "869",
            "regionName": "雁山区"
        }, {"regionID": "870", "regionName": "阳朔县"}, {"regionID": "871", "regionName": "临桂县"}, {
            "regionID": "872",
            "regionName": "灵川县"
        }, {"regionID": "873", "regionName": "全州县"}, {"regionID": "874", "regionName": "平乐县"}, {
            "regionID": "875",
            "regionName": "兴安县"
        }, {"regionID": "876", "regionName": "灌阳县"}, {"regionID": "877", "regionName": "荔浦县"}, {
            "regionID": "878",
            "regionName": "资源县"
        }, {"regionID": "879", "regionName": "永福县"}, {"regionID": "880", "regionName": "龙胜"}, {
            "regionID": "881",
            "regionName": "恭城"
        }]
    }, {
        "regionID": "99",
        "regionName": "百色",
        "child": [{"regionID": "882", "regionName": "右江区"}, {
            "regionID": "883",
            "regionName": "凌云县"
        }, {"regionID": "884", "regionName": "平果县"}, {"regionID": "885", "regionName": "西林县"}, {
            "regionID": "886",
            "regionName": "乐业县"
        }, {"regionID": "887", "regionName": "德保县"}, {"regionID": "888", "regionName": "田林县"}, {
            "regionID": "889",
            "regionName": "田阳县"
        }, {"regionID": "890", "regionName": "靖西县"}, {"regionID": "891", "regionName": "田东县"}, {
            "regionID": "892",
            "regionName": "那坡县"
        }, {"regionID": "893", "regionName": "隆林"}]
    }, {
        "regionID": "100",
        "regionName": "北海",
        "child": [{"regionID": "894", "regionName": "海城区"}, {
            "regionID": "895",
            "regionName": "银海区"
        }, {"regionID": "896", "regionName": "铁山港区"}, {"regionID": "897", "regionName": "合浦县"}]
    }, {
        "regionID": "101",
        "regionName": "崇左",
        "child": [{"regionID": "898", "regionName": "江州区"}, {
            "regionID": "899",
            "regionName": "凭祥市"
        }, {"regionID": "900", "regionName": "宁明县"}, {"regionID": "901", "regionName": "扶绥县"}, {
            "regionID": "902",
            "regionName": "龙州县"
        }, {"regionID": "903", "regionName": "大新县"}, {"regionID": "904", "regionName": "天等县"}]
    }, {
        "regionID": "102",
        "regionName": "防城港",
        "child": [{"regionID": "905", "regionName": "港口区"}, {
            "regionID": "906",
            "regionName": "防城区"
        }, {"regionID": "907", "regionName": "东兴市"}, {"regionID": "908", "regionName": "上思县"}]
    }, {
        "regionID": "103",
        "regionName": "贵港",
        "child": [{"regionID": "909", "regionName": "港北区"}, {
            "regionID": "910",
            "regionName": "港南区"
        }, {"regionID": "911", "regionName": "覃塘区"}, {"regionID": "912", "regionName": "桂平市"}, {
            "regionID": "913",
            "regionName": "平南县"
        }]
    }, {
        "regionID": "104",
        "regionName": "河池",
        "child": [{"regionID": "914", "regionName": "金城江区"}, {
            "regionID": "915",
            "regionName": "宜州市"
        }, {"regionID": "916", "regionName": "天峨县"}, {"regionID": "917", "regionName": "凤山县"}, {
            "regionID": "918",
            "regionName": "南丹县"
        }, {"regionID": "919", "regionName": "东兰县"}, {"regionID": "920", "regionName": "都安"}, {
            "regionID": "921",
            "regionName": "罗城"
        }, {"regionID": "922", "regionName": "巴马"}, {"regionID": "923", "regionName": "环江"}, {
            "regionID": "924",
            "regionName": "大化"
        }]
    }, {
        "regionID": "105",
        "regionName": "贺州",
        "child": [{"regionID": "925", "regionName": "八步区"}, {
            "regionID": "926",
            "regionName": "钟山县"
        }, {"regionID": "927", "regionName": "昭平县"}, {"regionID": "928", "regionName": "富川"}]
    }, {
        "regionID": "106",
        "regionName": "来宾",
        "child": [{"regionID": "929", "regionName": "兴宾区"}, {
            "regionID": "930",
            "regionName": "合山市"
        }, {"regionID": "931", "regionName": "象州县"}, {"regionID": "932", "regionName": "武宣县"}, {
            "regionID": "933",
            "regionName": "忻城县"
        }, {"regionID": "934", "regionName": "金秀"}]
    }, {
        "regionID": "107",
        "regionName": "柳州",
        "child": [{"regionID": "935", "regionName": "城中区"}, {
            "regionID": "936",
            "regionName": "鱼峰区"
        }, {"regionID": "937", "regionName": "柳北区"}, {"regionID": "938", "regionName": "柳南区"}, {
            "regionID": "939",
            "regionName": "柳江县"
        }, {"regionID": "940", "regionName": "柳城县"}, {"regionID": "941", "regionName": "鹿寨县"}, {
            "regionID": "942",
            "regionName": "融安县"
        }, {"regionID": "943", "regionName": "融水"}, {"regionID": "944", "regionName": "三江"}]
    }, {
        "regionID": "108",
        "regionName": "钦州",
        "child": [{"regionID": "945", "regionName": "钦南区"}, {
            "regionID": "946",
            "regionName": "钦北区"
        }, {"regionID": "947", "regionName": "灵山县"}, {"regionID": "948", "regionName": "浦北县"}]
    }, {
        "regionID": "109",
        "regionName": "梧州",
        "child": [{"regionID": "949", "regionName": "万秀区"}, {
            "regionID": "950",
            "regionName": "蝶山区"
        }, {"regionID": "951", "regionName": "长洲区"}, {"regionID": "952", "regionName": "岑溪市"}, {
            "regionID": "953",
            "regionName": "苍梧县"
        }, {"regionID": "954", "regionName": "藤县"}, {"regionID": "955", "regionName": "蒙山县"}]
    }, {
        "regionID": "110",
        "regionName": "玉林",
        "child": [{"regionID": "956", "regionName": "玉州区"}, {
            "regionID": "957",
            "regionName": "北流市"
        }, {"regionID": "958", "regionName": "容县"}, {"regionID": "959", "regionName": "陆川县"}, {
            "regionID": "960",
            "regionName": "博白县"
        }, {"regionID": "961", "regionName": "兴业县"}]
    }]
}, {
    "regionID": "8",
    "regionName": "贵州",
    "child": [{
        "regionID": "111",
        "regionName": "贵阳",
        "child": [{"regionID": "962", "regionName": "南明区"}, {
            "regionID": "963",
            "regionName": "云岩区"
        }, {"regionID": "964", "regionName": "花溪区"}, {"regionID": "965", "regionName": "乌当区"}, {
            "regionID": "966",
            "regionName": "白云区"
        }, {"regionID": "967", "regionName": "小河区"}, {"regionID": "968", "regionName": "金阳新区"}, {
            "regionID": "969",
            "regionName": "新天园区"
        }, {"regionID": "970", "regionName": "清镇市"}, {"regionID": "971", "regionName": "开阳县"}, {
            "regionID": "972",
            "regionName": "修文县"
        }, {"regionID": "973", "regionName": "息烽县"}]
    }, {
        "regionID": "112",
        "regionName": "安顺",
        "child": [{"regionID": "974", "regionName": "西秀区"}, {
            "regionID": "975",
            "regionName": "关岭"
        }, {"regionID": "976", "regionName": "镇宁"}, {"regionID": "977", "regionName": "紫云"}, {
            "regionID": "978",
            "regionName": "平坝县"
        }, {"regionID": "979", "regionName": "普定县"}]
    }, {
        "regionID": "113",
        "regionName": "毕节",
        "child": [{"regionID": "980", "regionName": "毕节市"}, {
            "regionID": "981",
            "regionName": "大方县"
        }, {"regionID": "982", "regionName": "黔西县"}, {"regionID": "983", "regionName": "金沙县"}, {
            "regionID": "984",
            "regionName": "织金县"
        }, {"regionID": "985", "regionName": "纳雍县"}, {"regionID": "986", "regionName": "赫章县"}, {
            "regionID": "987",
            "regionName": "威宁"
        }]
    }, {
        "regionID": "114",
        "regionName": "六盘水",
        "child": [{"regionID": "988", "regionName": "钟山区"}, {
            "regionID": "989",
            "regionName": "六枝特区"
        }, {"regionID": "990", "regionName": "水城县"}, {"regionID": "991", "regionName": "盘县"}]
    }, {
        "regionID": "115",
        "regionName": "黔东南",
        "child": [{"regionID": "992", "regionName": "凯里市"}, {
            "regionID": "993",
            "regionName": "黄平县"
        }, {"regionID": "994", "regionName": "施秉县"}, {"regionID": "995", "regionName": "三穗县"}, {
            "regionID": "996",
            "regionName": "镇远县"
        }, {"regionID": "997", "regionName": "岑巩县"}, {"regionID": "998", "regionName": "天柱县"}, {
            "regionID": "999",
            "regionName": "锦屏县"
        }, {"regionID": "1000", "regionName": "剑河县"}, {"regionID": "1001", "regionName": "台江县"}, {
            "regionID": "1002",
            "regionName": "黎平县"
        }, {"regionID": "1003", "regionName": "榕江县"}, {"regionID": "1004", "regionName": "从江县"}, {
            "regionID": "1005",
            "regionName": "雷山县"
        }, {"regionID": "1006", "regionName": "麻江县"}, {"regionID": "1007", "regionName": "丹寨县"}]
    }, {
        "regionID": "116",
        "regionName": "黔南",
        "child": [{"regionID": "1008", "regionName": "都匀市"}, {
            "regionID": "1009",
            "regionName": "福泉市"
        }, {"regionID": "1010", "regionName": "荔波县"}, {"regionID": "1011", "regionName": "贵定县"}, {
            "regionID": "1012",
            "regionName": "瓮安县"
        }, {"regionID": "1013", "regionName": "独山县"}, {"regionID": "1014", "regionName": "平塘县"}, {
            "regionID": "1015",
            "regionName": "罗甸县"
        }, {"regionID": "1016", "regionName": "长顺县"}, {"regionID": "1017", "regionName": "龙里县"}, {
            "regionID": "1018",
            "regionName": "惠水县"
        }, {"regionID": "1019", "regionName": "三都"}]
    }, {
        "regionID": "117",
        "regionName": "黔西南",
        "child": [{"regionID": "1020", "regionName": "兴义市"}, {
            "regionID": "1021",
            "regionName": "兴仁县"
        }, {"regionID": "1022", "regionName": "普安县"}, {"regionID": "1023", "regionName": "晴隆县"}, {
            "regionID": "1024",
            "regionName": "贞丰县"
        }, {"regionID": "1025", "regionName": "望谟县"}, {"regionID": "1026", "regionName": "册亨县"}, {
            "regionID": "1027",
            "regionName": "安龙县"
        }]
    }, {
        "regionID": "118",
        "regionName": "铜仁",
        "child": [{"regionID": "1028", "regionName": "铜仁市"}, {
            "regionID": "1029",
            "regionName": "江口县"
        }, {"regionID": "1030", "regionName": "石阡县"}, {"regionID": "1031", "regionName": "思南县"}, {
            "regionID": "1032",
            "regionName": "德江县"
        }, {"regionID": "1033", "regionName": "玉屏"}, {"regionID": "1034", "regionName": "印江"}, {
            "regionID": "1035",
            "regionName": "沿河"
        }, {"regionID": "1036", "regionName": "松桃"}, {"regionID": "1037", "regionName": "万山特区"}]
    }, {
        "regionID": "119",
        "regionName": "遵义",
        "child": [{"regionID": "1038", "regionName": "红花岗区"}, {
            "regionID": "1039",
            "regionName": "务川县"
        }, {"regionID": "1040", "regionName": "道真县"}, {"regionID": "1041", "regionName": "汇川区"}, {
            "regionID": "1042",
            "regionName": "赤水市"
        }, {"regionID": "1043", "regionName": "仁怀市"}, {"regionID": "1044", "regionName": "遵义县"}, {
            "regionID": "1045",
            "regionName": "桐梓县"
        }, {"regionID": "1046", "regionName": "绥阳县"}, {"regionID": "1047", "regionName": "正安县"}, {
            "regionID": "1048",
            "regionName": "凤冈县"
        }, {"regionID": "1049", "regionName": "湄潭县"}, {"regionID": "1050", "regionName": "余庆县"}, {
            "regionID": "1051",
            "regionName": "习水县"
        }, {"regionID": "1052", "regionName": "道真"}, {"regionID": "1053", "regionName": "务川"}]
    }]
}, {
    "regionID": "9",
    "regionName": "海南",
    "child": [{
        "regionID": "120",
        "regionName": "海口",
        "child": [{"regionID": "1054", "regionName": "秀英区"}, {
            "regionID": "1055",
            "regionName": "龙华区"
        }, {"regionID": "1056", "regionName": "琼山区"}, {"regionID": "1057", "regionName": "美兰区"}]
    }, {"regionID": "121", "regionName": "三亚", "child": []}, {
        "regionID": "122",
        "regionName": "白沙",
        "child": []
    }, {"regionID": "123", "regionName": "保亭", "child": []}, {
        "regionID": "124",
        "regionName": "昌江",
        "child": []
    }, {"regionID": "125", "regionName": "澄迈县", "child": []}, {
        "regionID": "126",
        "regionName": "定安县",
        "child": []
    }, {"regionID": "127", "regionName": "东方", "child": []}, {
        "regionID": "128",
        "regionName": "乐东",
        "child": []
    }, {"regionID": "129", "regionName": "临高县", "child": []}, {
        "regionID": "130",
        "regionName": "陵水",
        "child": []
    }, {"regionID": "131", "regionName": "琼海", "child": []}, {
        "regionID": "132",
        "regionName": "琼中",
        "child": []
    }, {"regionID": "133", "regionName": "屯昌县", "child": []}, {
        "regionID": "134",
        "regionName": "万宁",
        "child": []
    }, {"regionID": "135", "regionName": "文昌", "child": []}, {
        "regionID": "136",
        "regionName": "五指山",
        "child": []
    }, {
        "regionID": "137",
        "regionName": "儋州",
        "child": [{"regionID": "1058", "regionName": "市区"}, {
            "regionID": "1059",
            "regionName": "洋浦开发区"
        }, {"regionID": "1060", "regionName": "那大镇"}, {"regionID": "1061", "regionName": "王五镇"}, {
            "regionID": "1062",
            "regionName": "雅星镇"
        }, {"regionID": "1063", "regionName": "大成镇"}, {"regionID": "1064", "regionName": "中和镇"}, {
            "regionID": "1065",
            "regionName": "峨蔓镇"
        }, {"regionID": "1066", "regionName": "南丰镇"}, {"regionID": "1067", "regionName": "白马井镇"}, {
            "regionID": "1068",
            "regionName": "兰洋镇"
        }, {"regionID": "1069", "regionName": "和庆镇"}, {"regionID": "1070", "regionName": "海头镇"}, {
            "regionID": "1071",
            "regionName": "排浦镇"
        }, {"regionID": "1072", "regionName": "东成镇"}, {"regionID": "1073", "regionName": "光村镇"}, {
            "regionID": "1074",
            "regionName": "木棠镇"
        }, {"regionID": "1075", "regionName": "新州镇"}, {"regionID": "1076", "regionName": "三都镇"}, {
            "regionID": "1077",
            "regionName": "其他"
        }]
    }]
}, {
    "regionID": "10",
    "regionName": "河北",
    "child": [{
        "regionID": "138",
        "regionName": "石家庄",
        "child": [{"regionID": "1078", "regionName": "长安区"}, {
            "regionID": "1079",
            "regionName": "桥东区"
        }, {"regionID": "1080", "regionName": "桥西区"}, {"regionID": "1081", "regionName": "新华区"}, {
            "regionID": "1082",
            "regionName": "裕华区"
        }, {"regionID": "1083", "regionName": "井陉矿区"}, {"regionID": "1084", "regionName": "高新区"}, {
            "regionID": "1085",
            "regionName": "辛集市"
        }, {"regionID": "1086", "regionName": "藁城市"}, {"regionID": "1087", "regionName": "晋州市"}, {
            "regionID": "1088",
            "regionName": "新乐市"
        }, {"regionID": "1089", "regionName": "鹿泉市"}, {"regionID": "1090", "regionName": "井陉县"}, {
            "regionID": "1091",
            "regionName": "正定县"
        }, {"regionID": "1092", "regionName": "栾城县"}, {"regionID": "1093", "regionName": "行唐县"}, {
            "regionID": "1094",
            "regionName": "灵寿县"
        }, {"regionID": "1095", "regionName": "高邑县"}, {"regionID": "1096", "regionName": "深泽县"}, {
            "regionID": "1097",
            "regionName": "赞皇县"
        }, {"regionID": "1098", "regionName": "无极县"}, {"regionID": "1099", "regionName": "平山县"}, {
            "regionID": "1100",
            "regionName": "元氏县"
        }, {"regionID": "1101", "regionName": "赵县"}]
    }, {
        "regionID": "139",
        "regionName": "保定",
        "child": [{"regionID": "1102", "regionName": "新市区"}, {
            "regionID": "1103",
            "regionName": "南市区"
        }, {"regionID": "1104", "regionName": "北市区"}, {"regionID": "1105", "regionName": "涿州市"}, {
            "regionID": "1106",
            "regionName": "定州市"
        }, {"regionID": "1107", "regionName": "安国市"}, {"regionID": "1108", "regionName": "高碑店市"}, {
            "regionID": "1109",
            "regionName": "满城县"
        }, {"regionID": "1110", "regionName": "清苑县"}, {"regionID": "1111", "regionName": "涞水县"}, {
            "regionID": "1112",
            "regionName": "阜平县"
        }, {"regionID": "1113", "regionName": "徐水县"}, {"regionID": "1114", "regionName": "定兴县"}, {
            "regionID": "1115",
            "regionName": "唐县"
        }, {"regionID": "1116", "regionName": "高阳县"}, {"regionID": "1117", "regionName": "容城县"}, {
            "regionID": "1118",
            "regionName": "涞源县"
        }, {"regionID": "1119", "regionName": "望都县"}, {"regionID": "1120", "regionName": "安新县"}, {
            "regionID": "1121",
            "regionName": "易县"
        }, {"regionID": "1122", "regionName": "曲阳县"}, {"regionID": "1123", "regionName": "蠡县"}, {
            "regionID": "1124",
            "regionName": "顺平县"
        }, {"regionID": "1125", "regionName": "博野县"}, {"regionID": "1126", "regionName": "雄县"}]
    }, {
        "regionID": "140",
        "regionName": "沧州",
        "child": [{"regionID": "1127", "regionName": "运河区"}, {
            "regionID": "1128",
            "regionName": "新华区"
        }, {"regionID": "1129", "regionName": "泊头市"}, {"regionID": "1130", "regionName": "任丘市"}, {
            "regionID": "1131",
            "regionName": "黄骅市"
        }, {"regionID": "1132", "regionName": "河间市"}, {"regionID": "1133", "regionName": "沧县"}, {
            "regionID": "1134",
            "regionName": "青县"
        }, {"regionID": "1135", "regionName": "东光县"}, {"regionID": "1136", "regionName": "海兴县"}, {
            "regionID": "1137",
            "regionName": "盐山县"
        }, {"regionID": "1138", "regionName": "肃宁县"}, {"regionID": "1139", "regionName": "南皮县"}, {
            "regionID": "1140",
            "regionName": "吴桥县"
        }, {"regionID": "1141", "regionName": "献县"}, {"regionID": "1142", "regionName": "孟村"}]
    }, {
        "regionID": "141",
        "regionName": "承德",
        "child": [{"regionID": "1143", "regionName": "双桥区"}, {
            "regionID": "1144",
            "regionName": "双滦区"
        }, {"regionID": "1145", "regionName": "鹰手营子矿区"}, {"regionID": "1146", "regionName": "承德县"}, {
            "regionID": "1147",
            "regionName": "兴隆县"
        }, {"regionID": "1148", "regionName": "平泉县"}, {"regionID": "1149", "regionName": "滦平县"}, {
            "regionID": "1150",
            "regionName": "隆化县"
        }, {"regionID": "1151", "regionName": "丰宁"}, {"regionID": "1152", "regionName": "宽城"}, {
            "regionID": "1153",
            "regionName": "围场"
        }]
    }, {
        "regionID": "142",
        "regionName": "邯郸",
        "child": [{"regionID": "1154", "regionName": "从台区"}, {
            "regionID": "1155",
            "regionName": "复兴区"
        }, {"regionID": "1156", "regionName": "邯山区"}, {"regionID": "1157", "regionName": "峰峰矿区"}, {
            "regionID": "1158",
            "regionName": "武安市"
        }, {"regionID": "1159", "regionName": "邯郸县"}, {"regionID": "1160", "regionName": "临漳县"}, {
            "regionID": "1161",
            "regionName": "成安县"
        }, {"regionID": "1162", "regionName": "大名县"}, {"regionID": "1163", "regionName": "涉县"}, {
            "regionID": "1164",
            "regionName": "磁县"
        }, {"regionID": "1165", "regionName": "肥乡县"}, {"regionID": "1166", "regionName": "永年县"}, {
            "regionID": "1167",
            "regionName": "邱县"
        }, {"regionID": "1168", "regionName": "鸡泽县"}, {"regionID": "1169", "regionName": "广平县"}, {
            "regionID": "1170",
            "regionName": "馆陶县"
        }, {"regionID": "1171", "regionName": "魏县"}, {"regionID": "1172", "regionName": "曲周县"}]
    }, {
        "regionID": "143",
        "regionName": "衡水",
        "child": [{"regionID": "1173", "regionName": "桃城区"}, {
            "regionID": "1174",
            "regionName": "冀州市"
        }, {"regionID": "1175", "regionName": "深州市"}, {"regionID": "1176", "regionName": "枣强县"}, {
            "regionID": "1177",
            "regionName": "武邑县"
        }, {"regionID": "1178", "regionName": "武强县"}, {"regionID": "1179", "regionName": "饶阳县"}, {
            "regionID": "1180",
            "regionName": "安平县"
        }, {"regionID": "1181", "regionName": "故城县"}, {"regionID": "1182", "regionName": "景县"}, {
            "regionID": "1183",
            "regionName": "阜城县"
        }]
    }, {
        "regionID": "144",
        "regionName": "廊坊",
        "child": [{"regionID": "1184", "regionName": "安次区"}, {
            "regionID": "1185",
            "regionName": "广阳区"
        }, {"regionID": "1186", "regionName": "霸州市"}, {"regionID": "1187", "regionName": "三河市"}, {
            "regionID": "1188",
            "regionName": "固安县"
        }, {"regionID": "1189", "regionName": "永清县"}, {"regionID": "1190", "regionName": "香河县"}, {
            "regionID": "1191",
            "regionName": "大城县"
        }, {"regionID": "1192", "regionName": "文安县"}, {"regionID": "1193", "regionName": "大厂"}]
    }, {
        "regionID": "145",
        "regionName": "秦皇岛",
        "child": [{"regionID": "1194", "regionName": "海港区"}, {
            "regionID": "1195",
            "regionName": "山海关区"
        }, {"regionID": "1196", "regionName": "北戴河区"}, {"regionID": "1197", "regionName": "昌黎县"}, {
            "regionID": "1198",
            "regionName": "抚宁县"
        }, {"regionID": "1199", "regionName": "卢龙县"}, {"regionID": "1200", "regionName": "青龙"}]
    }, {
        "regionID": "146",
        "regionName": "唐山",
        "child": [{"regionID": "1201", "regionName": "路北区"}, {
            "regionID": "1202",
            "regionName": "路南区"
        }, {"regionID": "1203", "regionName": "古冶区"}, {"regionID": "1204", "regionName": "开平区"}, {
            "regionID": "1205",
            "regionName": "丰南区"
        }, {"regionID": "1206", "regionName": "丰润区"}, {"regionID": "1207", "regionName": "遵化市"}, {
            "regionID": "1208",
            "regionName": "迁安市"
        }, {"regionID": "1209", "regionName": "滦县"}, {"regionID": "1210", "regionName": "滦南县"}, {
            "regionID": "1211",
            "regionName": "乐亭县"
        }, {"regionID": "1212", "regionName": "迁西县"}, {"regionID": "1213", "regionName": "玉田县"}, {
            "regionID": "1214",
            "regionName": "唐海县"
        }]
    }, {
        "regionID": "147",
        "regionName": "邢台",
        "child": [{"regionID": "1215", "regionName": "桥东区"}, {
            "regionID": "1216",
            "regionName": "桥西区"
        }, {"regionID": "1217", "regionName": "南宫市"}, {"regionID": "1218", "regionName": "沙河市"}, {
            "regionID": "1219",
            "regionName": "邢台县"
        }, {"regionID": "1220", "regionName": "临城县"}, {"regionID": "1221", "regionName": "内丘县"}, {
            "regionID": "1222",
            "regionName": "柏乡县"
        }, {"regionID": "1223", "regionName": "隆尧县"}, {"regionID": "1224", "regionName": "任县"}, {
            "regionID": "1225",
            "regionName": "南和县"
        }, {"regionID": "1226", "regionName": "宁晋县"}, {"regionID": "1227", "regionName": "巨鹿县"}, {
            "regionID": "1228",
            "regionName": "新河县"
        }, {"regionID": "1229", "regionName": "广宗县"}, {"regionID": "1230", "regionName": "平乡县"}, {
            "regionID": "1231",
            "regionName": "威县"
        }, {"regionID": "1232", "regionName": "清河县"}, {"regionID": "1233", "regionName": "临西县"}]
    }, {
        "regionID": "148",
        "regionName": "张家口",
        "child": [{"regionID": "1234", "regionName": "桥西区"}, {
            "regionID": "1235",
            "regionName": "桥东区"
        }, {"regionID": "1236", "regionName": "宣化区"}, {"regionID": "1237", "regionName": "下花园区"}, {
            "regionID": "1238",
            "regionName": "宣化县"
        }, {"regionID": "1239", "regionName": "张北县"}, {"regionID": "1240", "regionName": "康保县"}, {
            "regionID": "1241",
            "regionName": "沽源县"
        }, {"regionID": "1242", "regionName": "尚义县"}, {"regionID": "1243", "regionName": "蔚县"}, {
            "regionID": "1244",
            "regionName": "阳原县"
        }, {"regionID": "1245", "regionName": "怀安县"}, {"regionID": "1246", "regionName": "万全县"}, {
            "regionID": "1247",
            "regionName": "怀来县"
        }, {"regionID": "1248", "regionName": "涿鹿县"}, {"regionID": "1249", "regionName": "赤城县"}, {
            "regionID": "1250",
            "regionName": "崇礼县"
        }]
    }]
}, {
    "regionID": "11",
    "regionName": "河南",
    "child": [{
        "regionID": "149",
        "regionName": "郑州",
        "child": [{"regionID": "1251", "regionName": "金水区"}, {
            "regionID": "1252",
            "regionName": "邙山区"
        }, {"regionID": "1253", "regionName": "二七区"}, {"regionID": "1254", "regionName": "管城区"}, {
            "regionID": "1255",
            "regionName": "中原区"
        }, {"regionID": "1256", "regionName": "上街区"}, {"regionID": "1257", "regionName": "惠济区"}, {
            "regionID": "1258",
            "regionName": "郑东新区"
        }, {"regionID": "1259", "regionName": "经济技术开发区"}, {
            "regionID": "1260",
            "regionName": "高新开发区"
        }, {"regionID": "1261", "regionName": "出口加工区"}, {"regionID": "1262", "regionName": "巩义市"}, {
            "regionID": "1263",
            "regionName": "荥阳市"
        }, {"regionID": "1264", "regionName": "新密市"}, {"regionID": "1265", "regionName": "新郑市"}, {
            "regionID": "1266",
            "regionName": "登封市"
        }, {"regionID": "1267", "regionName": "中牟县"}]
    }, {
        "regionID": "150",
        "regionName": "洛阳",
        "child": [{"regionID": "1268", "regionName": "西工区"}, {
            "regionID": "1269",
            "regionName": "老城区"
        }, {"regionID": "1270", "regionName": "涧西区"}, {"regionID": "1271", "regionName": "瀍河回族区"}, {
            "regionID": "1272",
            "regionName": "洛龙区"
        }, {"regionID": "1273", "regionName": "吉利区"}, {"regionID": "1274", "regionName": "偃师市"}, {
            "regionID": "1275",
            "regionName": "孟津县"
        }, {"regionID": "1276", "regionName": "新安县"}, {"regionID": "1277", "regionName": "栾川县"}, {
            "regionID": "1278",
            "regionName": "嵩县"
        }, {"regionID": "1279", "regionName": "汝阳县"}, {"regionID": "1280", "regionName": "宜阳县"}, {
            "regionID": "1281",
            "regionName": "洛宁县"
        }, {"regionID": "1282", "regionName": "伊川县"}]
    }, {
        "regionID": "151",
        "regionName": "开封",
        "child": [{"regionID": "1283", "regionName": "鼓楼区"}, {
            "regionID": "1284",
            "regionName": "龙亭区"
        }, {"regionID": "1285", "regionName": "顺河回族区"}, {"regionID": "1286", "regionName": "金明区"}, {
            "regionID": "1287",
            "regionName": "禹王台区"
        }, {"regionID": "1288", "regionName": "杞县"}, {"regionID": "1289", "regionName": "通许县"}, {
            "regionID": "1290",
            "regionName": "尉氏县"
        }, {"regionID": "1291", "regionName": "开封县"}, {"regionID": "1292", "regionName": "兰考县"}]
    }, {
        "regionID": "152",
        "regionName": "安阳",
        "child": [{"regionID": "1293", "regionName": "北关区"}, {
            "regionID": "1294",
            "regionName": "文峰区"
        }, {"regionID": "1295", "regionName": "殷都区"}, {"regionID": "1296", "regionName": "龙安区"}, {
            "regionID": "1297",
            "regionName": "林州市"
        }, {"regionID": "1298", "regionName": "安阳县"}, {"regionID": "1299", "regionName": "汤阴县"}, {
            "regionID": "1300",
            "regionName": "滑县"
        }, {"regionID": "1301", "regionName": "内黄县"}]
    }, {
        "regionID": "153",
        "regionName": "鹤壁",
        "child": [{"regionID": "1302", "regionName": "淇滨区"}, {
            "regionID": "1303",
            "regionName": "山城区"
        }, {"regionID": "1304", "regionName": "鹤山区"}, {"regionID": "1305", "regionName": "浚县"}, {
            "regionID": "1306",
            "regionName": "淇县"
        }]
    }, {
        "regionID": "154",
        "regionName": "济源",
        "child": [{"regionID": "1307", "regionName": "济源市"}]
    }, {
        "regionID": "155",
        "regionName": "焦作",
        "child": [{"regionID": "1308", "regionName": "解放区"}, {
            "regionID": "1309",
            "regionName": "中站区"
        }, {"regionID": "1310", "regionName": "马村区"}, {"regionID": "1311", "regionName": "山阳区"}, {
            "regionID": "1312",
            "regionName": "沁阳市"
        }, {"regionID": "1313", "regionName": "孟州市"}, {"regionID": "1314", "regionName": "修武县"}, {
            "regionID": "1315",
            "regionName": "博爱县"
        }, {"regionID": "1316", "regionName": "武陟县"}, {"regionID": "1317", "regionName": "温县"}]
    }, {
        "regionID": "156",
        "regionName": "南阳",
        "child": [{"regionID": "1318", "regionName": "卧龙区"}, {
            "regionID": "1319",
            "regionName": "宛城区"
        }, {"regionID": "1320", "regionName": "邓州市"}, {"regionID": "1321", "regionName": "南召县"}, {
            "regionID": "1322",
            "regionName": "方城县"
        }, {"regionID": "1323", "regionName": "西峡县"}, {"regionID": "1324", "regionName": "镇平县"}, {
            "regionID": "1325",
            "regionName": "内乡县"
        }, {"regionID": "1326", "regionName": "淅川县"}, {"regionID": "1327", "regionName": "社旗县"}, {
            "regionID": "1328",
            "regionName": "唐河县"
        }, {"regionID": "1329", "regionName": "新野县"}, {"regionID": "1330", "regionName": "桐柏县"}]
    }, {
        "regionID": "157",
        "regionName": "平顶山",
        "child": [{"regionID": "1331", "regionName": "新华区"}, {
            "regionID": "1332",
            "regionName": "卫东区"
        }, {"regionID": "1333", "regionName": "湛河区"}, {"regionID": "1334", "regionName": "石龙区"}, {
            "regionID": "1335",
            "regionName": "舞钢市"
        }, {"regionID": "1336", "regionName": "汝州市"}, {"regionID": "1337", "regionName": "宝丰县"}, {
            "regionID": "1338",
            "regionName": "叶县"
        }, {"regionID": "1339", "regionName": "鲁山县"}, {"regionID": "1340", "regionName": "郏县"}]
    }, {
        "regionID": "158",
        "regionName": "三门峡",
        "child": [{"regionID": "1341", "regionName": "湖滨区"}, {
            "regionID": "1342",
            "regionName": "义马市"
        }, {"regionID": "1343", "regionName": "灵宝市"}, {"regionID": "1344", "regionName": "渑池县"}, {
            "regionID": "1345",
            "regionName": "陕县"
        }, {"regionID": "1346", "regionName": "卢氏县"}]
    }, {
        "regionID": "159",
        "regionName": "商丘",
        "child": [{"regionID": "1347", "regionName": "梁园区"}, {
            "regionID": "1348",
            "regionName": "睢阳区"
        }, {"regionID": "1349", "regionName": "永城市"}, {"regionID": "1350", "regionName": "民权县"}, {
            "regionID": "1351",
            "regionName": "睢县"
        }, {"regionID": "1352", "regionName": "宁陵县"}, {"regionID": "1353", "regionName": "虞城县"}, {
            "regionID": "1354",
            "regionName": "柘城县"
        }, {"regionID": "1355", "regionName": "夏邑县"}]
    }, {
        "regionID": "160",
        "regionName": "新乡",
        "child": [{"regionID": "1356", "regionName": "卫滨区"}, {
            "regionID": "1357",
            "regionName": "红旗区"
        }, {"regionID": "1358", "regionName": "凤泉区"}, {"regionID": "1359", "regionName": "牧野区"}, {
            "regionID": "1360",
            "regionName": "卫辉市"
        }, {"regionID": "1361", "regionName": "辉县市"}, {"regionID": "1362", "regionName": "新乡县"}, {
            "regionID": "1363",
            "regionName": "获嘉县"
        }, {"regionID": "1364", "regionName": "原阳县"}, {"regionID": "1365", "regionName": "延津县"}, {
            "regionID": "1366",
            "regionName": "封丘县"
        }, {"regionID": "1367", "regionName": "长垣县"}]
    }, {
        "regionID": "161",
        "regionName": "信阳",
        "child": [{"regionID": "1368", "regionName": "浉河区"}, {
            "regionID": "1369",
            "regionName": "平桥区"
        }, {"regionID": "1370", "regionName": "罗山县"}, {"regionID": "1371", "regionName": "光山县"}, {
            "regionID": "1372",
            "regionName": "新县"
        }, {"regionID": "1373", "regionName": "商城县"}, {"regionID": "1374", "regionName": "固始县"}, {
            "regionID": "1375",
            "regionName": "潢川县"
        }, {"regionID": "1376", "regionName": "淮滨县"}, {"regionID": "1377", "regionName": "息县"}]
    }, {
        "regionID": "162",
        "regionName": "许昌",
        "child": [{"regionID": "1378", "regionName": "魏都区"}, {
            "regionID": "1379",
            "regionName": "禹州市"
        }, {"regionID": "1380", "regionName": "长葛市"}, {"regionID": "1381", "regionName": "许昌县"}, {
            "regionID": "1382",
            "regionName": "鄢陵县"
        }, {"regionID": "1383", "regionName": "襄城县"}]
    }, {
        "regionID": "163",
        "regionName": "周口",
        "child": [{"regionID": "1384", "regionName": "川汇区"}, {
            "regionID": "1385",
            "regionName": "项城市"
        }, {"regionID": "1386", "regionName": "扶沟县"}, {"regionID": "1387", "regionName": "西华县"}, {
            "regionID": "1388",
            "regionName": "商水县"
        }, {"regionID": "1389", "regionName": "沈丘县"}, {"regionID": "1390", "regionName": "郸城县"}, {
            "regionID": "1391",
            "regionName": "淮阳县"
        }, {"regionID": "1392", "regionName": "太康县"}, {"regionID": "1393", "regionName": "鹿邑县"}]
    }, {
        "regionID": "164",
        "regionName": "驻马店",
        "child": [{"regionID": "1394", "regionName": "驿城区"}, {
            "regionID": "1395",
            "regionName": "西平县"
        }, {"regionID": "1396", "regionName": "上蔡县"}, {"regionID": "1397", "regionName": "平舆县"}, {
            "regionID": "1398",
            "regionName": "正阳县"
        }, {"regionID": "1399", "regionName": "确山县"}, {"regionID": "1400", "regionName": "泌阳县"}, {
            "regionID": "1401",
            "regionName": "汝南县"
        }, {"regionID": "1402", "regionName": "遂平县"}, {"regionID": "1403", "regionName": "新蔡县"}]
    }, {
        "regionID": "165",
        "regionName": "漯河",
        "child": [{"regionID": "1404", "regionName": "郾城区"}, {
            "regionID": "1405",
            "regionName": "源汇区"
        }, {"regionID": "1406", "regionName": "召陵区"}, {"regionID": "1407", "regionName": "舞阳县"}, {
            "regionID": "1408",
            "regionName": "临颍县"
        }]
    }, {
        "regionID": "166",
        "regionName": "濮阳",
        "child": [{"regionID": "1409", "regionName": "华龙区"}, {
            "regionID": "1410",
            "regionName": "清丰县"
        }, {"regionID": "1411", "regionName": "南乐县"}, {"regionID": "1412", "regionName": "范县"}, {
            "regionID": "1413",
            "regionName": "台前县"
        }, {"regionID": "1414", "regionName": "濮阳县"}]
    }]
}, {
    "regionID": "12",
    "regionName": "黑龙江",
    "child": [{
        "regionID": "167",
        "regionName": "哈尔滨",
        "child": [{"regionID": "1415", "regionName": "道里区"}, {
            "regionID": "1416",
            "regionName": "南岗区"
        }, {"regionID": "1417", "regionName": "动力区"}, {"regionID": "1418", "regionName": "平房区"}, {
            "regionID": "1419",
            "regionName": "香坊区"
        }, {"regionID": "1420", "regionName": "太平区"}, {"regionID": "1421", "regionName": "道外区"}, {
            "regionID": "1422",
            "regionName": "阿城区"
        }, {"regionID": "1423", "regionName": "呼兰区"}, {"regionID": "1424", "regionName": "松北区"}, {
            "regionID": "1425",
            "regionName": "尚志市"
        }, {"regionID": "1426", "regionName": "双城市"}, {"regionID": "1427", "regionName": "五常市"}, {
            "regionID": "1428",
            "regionName": "方正县"
        }, {"regionID": "1429", "regionName": "宾县"}, {"regionID": "1430", "regionName": "依兰县"}, {
            "regionID": "1431",
            "regionName": "巴彦县"
        }, {"regionID": "1432", "regionName": "通河县"}, {"regionID": "1433", "regionName": "木兰县"}, {
            "regionID": "1434",
            "regionName": "延寿县"
        }]
    }, {
        "regionID": "168",
        "regionName": "大庆",
        "child": [{"regionID": "1435", "regionName": "萨尔图区"}, {
            "regionID": "1436",
            "regionName": "红岗区"
        }, {"regionID": "1437", "regionName": "龙凤区"}, {"regionID": "1438", "regionName": "让胡路区"}, {
            "regionID": "1439",
            "regionName": "大同区"
        }, {"regionID": "1440", "regionName": "肇州县"}, {"regionID": "1441", "regionName": "肇源县"}, {
            "regionID": "1442",
            "regionName": "林甸县"
        }, {"regionID": "1443", "regionName": "杜尔伯特"}]
    }, {
        "regionID": "169",
        "regionName": "大兴安岭",
        "child": [{"regionID": "1444", "regionName": "呼玛县"}, {
            "regionID": "1445",
            "regionName": "漠河县"
        }, {"regionID": "1446", "regionName": "塔河县"}]
    }, {
        "regionID": "170",
        "regionName": "鹤岗",
        "child": [{"regionID": "1447", "regionName": "兴山区"}, {
            "regionID": "1448",
            "regionName": "工农区"
        }, {"regionID": "1449", "regionName": "南山区"}, {"regionID": "1450", "regionName": "兴安区"}, {
            "regionID": "1451",
            "regionName": "向阳区"
        }, {"regionID": "1452", "regionName": "东山区"}, {"regionID": "1453", "regionName": "萝北县"}, {
            "regionID": "1454",
            "regionName": "绥滨县"
        }]
    }, {
        "regionID": "171",
        "regionName": "黑河",
        "child": [{"regionID": "1455", "regionName": "爱辉区"}, {
            "regionID": "1456",
            "regionName": "五大连池市"
        }, {"regionID": "1457", "regionName": "北安市"}, {"regionID": "1458", "regionName": "嫩江县"}, {
            "regionID": "1459",
            "regionName": "逊克县"
        }, {"regionID": "1460", "regionName": "孙吴县"}]
    }, {
        "regionID": "172",
        "regionName": "鸡西",
        "child": [{"regionID": "1461", "regionName": "鸡冠区"}, {
            "regionID": "1462",
            "regionName": "恒山区"
        }, {"regionID": "1463", "regionName": "城子河区"}, {"regionID": "1464", "regionName": "滴道区"}, {
            "regionID": "1465",
            "regionName": "梨树区"
        }, {"regionID": "1466", "regionName": "虎林市"}, {"regionID": "1467", "regionName": "密山市"}, {
            "regionID": "1468",
            "regionName": "鸡东县"
        }]
    }, {
        "regionID": "173",
        "regionName": "佳木斯",
        "child": [{"regionID": "1469", "regionName": "前进区"}, {
            "regionID": "1470",
            "regionName": "郊区"
        }, {"regionID": "1471", "regionName": "向阳区"}, {"regionID": "1472", "regionName": "东风区"}, {
            "regionID": "1473",
            "regionName": "同江市"
        }, {"regionID": "1474", "regionName": "富锦市"}, {"regionID": "1475", "regionName": "桦南县"}, {
            "regionID": "1476",
            "regionName": "桦川县"
        }, {"regionID": "1477", "regionName": "汤原县"}, {"regionID": "1478", "regionName": "抚远县"}]
    }, {
        "regionID": "174",
        "regionName": "牡丹江",
        "child": [{"regionID": "1479", "regionName": "爱民区"}, {
            "regionID": "1480",
            "regionName": "东安区"
        }, {"regionID": "1481", "regionName": "阳明区"}, {"regionID": "1482", "regionName": "西安区"}, {
            "regionID": "1483",
            "regionName": "绥芬河市"
        }, {"regionID": "1484", "regionName": "海林市"}, {"regionID": "1485", "regionName": "宁安市"}, {
            "regionID": "1486",
            "regionName": "穆棱市"
        }, {"regionID": "1487", "regionName": "东宁县"}, {"regionID": "1488", "regionName": "林口县"}]
    }, {
        "regionID": "175",
        "regionName": "七台河",
        "child": [{"regionID": "1489", "regionName": "桃山区"}, {
            "regionID": "1490",
            "regionName": "新兴区"
        }, {"regionID": "1491", "regionName": "茄子河区"}, {"regionID": "1492", "regionName": "勃利县"}]
    }, {
        "regionID": "176",
        "regionName": "齐齐哈尔",
        "child": [{"regionID": "1493", "regionName": "龙沙区"}, {
            "regionID": "1494",
            "regionName": "昂昂溪区"
        }, {"regionID": "1495", "regionName": "铁峰区"}, {"regionID": "1496", "regionName": "建华区"}, {
            "regionID": "1497",
            "regionName": "富拉尔基区"
        }, {"regionID": "1498", "regionName": "碾子山区"}, {
            "regionID": "1499",
            "regionName": "梅里斯达斡尔区"
        }, {"regionID": "1500", "regionName": "讷河市"}, {"regionID": "1501", "regionName": "龙江县"}, {
            "regionID": "1502",
            "regionName": "依安县"
        }, {"regionID": "1503", "regionName": "泰来县"}, {"regionID": "1504", "regionName": "甘南县"}, {
            "regionID": "1505",
            "regionName": "富裕县"
        }, {"regionID": "1506", "regionName": "克山县"}, {"regionID": "1507", "regionName": "克东县"}, {
            "regionID": "1508",
            "regionName": "拜泉县"
        }]
    }, {
        "regionID": "177",
        "regionName": "双鸭山",
        "child": [{"regionID": "1509", "regionName": "尖山区"}, {
            "regionID": "1510",
            "regionName": "岭东区"
        }, {"regionID": "1511", "regionName": "四方台区"}, {"regionID": "1512", "regionName": "宝山区"}, {
            "regionID": "1513",
            "regionName": "集贤县"
        }, {"regionID": "1514", "regionName": "友谊县"}, {"regionID": "1515", "regionName": "宝清县"}, {
            "regionID": "1516",
            "regionName": "饶河县"
        }]
    }, {
        "regionID": "178",
        "regionName": "绥化",
        "child": [{"regionID": "1517", "regionName": "北林区"}, {
            "regionID": "1518",
            "regionName": "安达市"
        }, {"regionID": "1519", "regionName": "肇东市"}, {"regionID": "1520", "regionName": "海伦市"}, {
            "regionID": "1521",
            "regionName": "望奎县"
        }, {"regionID": "1522", "regionName": "兰西县"}, {"regionID": "1523", "regionName": "青冈县"}, {
            "regionID": "1524",
            "regionName": "庆安县"
        }, {"regionID": "1525", "regionName": "明水县"}, {"regionID": "1526", "regionName": "绥棱县"}]
    }, {
        "regionID": "179",
        "regionName": "伊春",
        "child": [{"regionID": "1527", "regionName": "伊春区"}, {
            "regionID": "1528",
            "regionName": "带岭区"
        }, {"regionID": "1529", "regionName": "南岔区"}, {"regionID": "1530", "regionName": "金山屯区"}, {
            "regionID": "1531",
            "regionName": "西林区"
        }, {"regionID": "1532", "regionName": "美溪区"}, {"regionID": "1533", "regionName": "乌马河区"}, {
            "regionID": "1534",
            "regionName": "翠峦区"
        }, {"regionID": "1535", "regionName": "友好区"}, {"regionID": "1536", "regionName": "上甘岭区"}, {
            "regionID": "1537",
            "regionName": "五营区"
        }, {"regionID": "1538", "regionName": "红星区"}, {"regionID": "1539", "regionName": "新青区"}, {
            "regionID": "1540",
            "regionName": "汤旺河区"
        }, {"regionID": "1541", "regionName": "乌伊岭区"}, {"regionID": "1542", "regionName": "铁力市"}, {
            "regionID": "1543",
            "regionName": "嘉荫县"
        }]
    }]
}, {
    "regionID": "13",
    "regionName": "湖北",
    "child": [{
        "regionID": "180",
        "regionName": "武汉",
        "child": [{"regionID": "1544", "regionName": "江岸区"}, {
            "regionID": "1545",
            "regionName": "武昌区"
        }, {"regionID": "1546", "regionName": "江汉区"}, {"regionID": "1547", "regionName": "硚口区"}, {
            "regionID": "1548",
            "regionName": "汉阳区"
        }, {"regionID": "1549", "regionName": "青山区"}, {"regionID": "1550", "regionName": "洪山区"}, {
            "regionID": "1551",
            "regionName": "东西湖区"
        }, {"regionID": "1552", "regionName": "汉南区"}, {"regionID": "1553", "regionName": "蔡甸区"}, {
            "regionID": "1554",
            "regionName": "江夏区"
        }, {"regionID": "1555", "regionName": "黄陂区"}, {"regionID": "1556", "regionName": "新洲区"}, {
            "regionID": "1557",
            "regionName": "经济开发区"
        }]
    }, {
        "regionID": "181",
        "regionName": "仙桃",
        "child": [{"regionID": "1558", "regionName": "仙桃市"}]
    }, {
        "regionID": "182",
        "regionName": "鄂州",
        "child": [{"regionID": "1559", "regionName": "鄂城区"}, {
            "regionID": "1560",
            "regionName": "华容区"
        }, {"regionID": "1561", "regionName": "梁子湖区"}]
    }, {
        "regionID": "183",
        "regionName": "黄冈",
        "child": [{"regionID": "1562", "regionName": "黄州区"}, {
            "regionID": "1563",
            "regionName": "麻城市"
        }, {"regionID": "1564", "regionName": "武穴市"}, {"regionID": "1565", "regionName": "团风县"}, {
            "regionID": "1566",
            "regionName": "红安县"
        }, {"regionID": "1567", "regionName": "罗田县"}, {"regionID": "1568", "regionName": "英山县"}, {
            "regionID": "1569",
            "regionName": "浠水县"
        }, {"regionID": "1570", "regionName": "蕲春县"}, {"regionID": "1571", "regionName": "黄梅县"}]
    }, {
        "regionID": "184",
        "regionName": "黄石",
        "child": [{"regionID": "1572", "regionName": "黄石港区"}, {
            "regionID": "1573",
            "regionName": "西塞山区"
        }, {"regionID": "1574", "regionName": "下陆区"}, {"regionID": "1575", "regionName": "铁山区"}, {
            "regionID": "1576",
            "regionName": "大冶市"
        }, {"regionID": "1577", "regionName": "阳新县"}]
    }, {
        "regionID": "185",
        "regionName": "荆门",
        "child": [{"regionID": "1578", "regionName": "东宝区"}, {
            "regionID": "1579",
            "regionName": "掇刀区"
        }, {"regionID": "1580", "regionName": "钟祥市"}, {"regionID": "1581", "regionName": "京山县"}, {
            "regionID": "1582",
            "regionName": "沙洋县"
        }]
    }, {
        "regionID": "186",
        "regionName": "荆州",
        "child": [{"regionID": "1583", "regionName": "沙市区"}, {
            "regionID": "1584",
            "regionName": "荆州区"
        }, {"regionID": "1585", "regionName": "石首市"}, {"regionID": "1586", "regionName": "洪湖市"}, {
            "regionID": "1587",
            "regionName": "松滋市"
        }, {"regionID": "1588", "regionName": "公安县"}, {"regionID": "1589", "regionName": "监利县"}, {
            "regionID": "1590",
            "regionName": "江陵县"
        }]
    }, {
        "regionID": "187",
        "regionName": "潜江",
        "child": [{"regionID": "1591", "regionName": "潜江市"}]
    }, {
        "regionID": "188",
        "regionName": "神农架林区",
        "child": [{"regionID": "1592", "regionName": "神农架林区"}]
    }, {
        "regionID": "189",
        "regionName": "十堰",
        "child": [{"regionID": "1593", "regionName": "张湾区"}, {
            "regionID": "1594",
            "regionName": "茅箭区"
        }, {"regionID": "1595", "regionName": "丹江口市"}, {"regionID": "1596", "regionName": "郧县"}, {
            "regionID": "1597",
            "regionName": "郧西县"
        }, {"regionID": "1598", "regionName": "竹山县"}, {"regionID": "1599", "regionName": "竹溪县"}, {
            "regionID": "1600",
            "regionName": "房县"
        }]
    }, {
        "regionID": "190",
        "regionName": "随州",
        "child": [{"regionID": "1601", "regionName": "曾都区"}, {"regionID": "1602", "regionName": "广水市"}]
    }, {
        "regionID": "191",
        "regionName": "天门",
        "child": [{"regionID": "1603", "regionName": "天门市"}]
    }, {
        "regionID": "192",
        "regionName": "咸宁",
        "child": [{"regionID": "1604", "regionName": "咸安区"}, {
            "regionID": "1605",
            "regionName": "赤壁市"
        }, {"regionID": "1606", "regionName": "嘉鱼县"}, {"regionID": "1607", "regionName": "通城县"}, {
            "regionID": "1608",
            "regionName": "崇阳县"
        }, {"regionID": "1609", "regionName": "通山县"}]
    }, {
        "regionID": "193",
        "regionName": "襄樊",
        "child": [{"regionID": "1610", "regionName": "襄城区"}, {
            "regionID": "1611",
            "regionName": "樊城区"
        }, {"regionID": "1612", "regionName": "襄阳区"}, {"regionID": "1613", "regionName": "老河口市"}, {
            "regionID": "1614",
            "regionName": "枣阳市"
        }, {"regionID": "1615", "regionName": "宜城市"}, {"regionID": "1616", "regionName": "南漳县"}, {
            "regionID": "1617",
            "regionName": "谷城县"
        }, {"regionID": "1618", "regionName": "保康县"}]
    }, {
        "regionID": "194",
        "regionName": "孝感",
        "child": [{"regionID": "1619", "regionName": "孝南区"}, {
            "regionID": "1620",
            "regionName": "应城市"
        }, {"regionID": "1621", "regionName": "安陆市"}, {"regionID": "1622", "regionName": "汉川市"}, {
            "regionID": "1623",
            "regionName": "孝昌县"
        }, {"regionID": "1624", "regionName": "大悟县"}, {"regionID": "1625", "regionName": "云梦县"}]
    }, {
        "regionID": "195",
        "regionName": "宜昌",
        "child": [{"regionID": "1626", "regionName": "长阳"}, {
            "regionID": "1627",
            "regionName": "五峰"
        }, {"regionID": "1628", "regionName": "西陵区"}, {"regionID": "1629", "regionName": "伍家岗区"}, {
            "regionID": "1630",
            "regionName": "点军区"
        }, {"regionID": "1631", "regionName": "猇亭区"}, {"regionID": "1632", "regionName": "夷陵区"}, {
            "regionID": "1633",
            "regionName": "宜都市"
        }, {"regionID": "1634", "regionName": "当阳市"}, {"regionID": "1635", "regionName": "枝江市"}, {
            "regionID": "1636",
            "regionName": "远安县"
        }, {"regionID": "1637", "regionName": "兴山县"}, {"regionID": "1638", "regionName": "秭归县"}]
    }, {
        "regionID": "196",
        "regionName": "恩施",
        "child": [{"regionID": "1639", "regionName": "恩施市"}, {
            "regionID": "1640",
            "regionName": "利川市"
        }, {"regionID": "1641", "regionName": "建始县"}, {"regionID": "1642", "regionName": "巴东县"}, {
            "regionID": "1643",
            "regionName": "宣恩县"
        }, {"regionID": "1644", "regionName": "咸丰县"}, {"regionID": "1645", "regionName": "来凤县"}, {
            "regionID": "1646",
            "regionName": "鹤峰县"
        }]
    }]
}, {
    "regionID": "14",
    "regionName": "湖南",
    "child": [{
        "regionID": "197",
        "regionName": "长沙",
        "child": [{"regionID": "1647", "regionName": "岳麓区"}, {
            "regionID": "1648",
            "regionName": "芙蓉区"
        }, {"regionID": "1649", "regionName": "天心区"}, {"regionID": "1650", "regionName": "开福区"}, {
            "regionID": "1651",
            "regionName": "雨花区"
        }, {"regionID": "1652", "regionName": "开发区"}, {"regionID": "1653", "regionName": "浏阳市"}, {
            "regionID": "1654",
            "regionName": "长沙县"
        }, {"regionID": "1655", "regionName": "望城县"}, {"regionID": "1656", "regionName": "宁乡县"}]
    }, {
        "regionID": "198",
        "regionName": "张家界",
        "child": [{"regionID": "1657", "regionName": "永定区"}, {
            "regionID": "1658",
            "regionName": "武陵源区"
        }, {"regionID": "1659", "regionName": "慈利县"}, {"regionID": "1660", "regionName": "桑植县"}]
    }, {
        "regionID": "199",
        "regionName": "常德",
        "child": [{"regionID": "1661", "regionName": "武陵区"}, {
            "regionID": "1662",
            "regionName": "鼎城区"
        }, {"regionID": "1663", "regionName": "津市市"}, {"regionID": "1664", "regionName": "安乡县"}, {
            "regionID": "1665",
            "regionName": "汉寿县"
        }, {"regionID": "1666", "regionName": "澧县"}, {"regionID": "1667", "regionName": "临澧县"}, {
            "regionID": "1668",
            "regionName": "桃源县"
        }, {"regionID": "1669", "regionName": "石门县"}]
    }, {
        "regionID": "200",
        "regionName": "郴州",
        "child": [{"regionID": "1670", "regionName": "北湖区"}, {
            "regionID": "1671",
            "regionName": "苏仙区"
        }, {"regionID": "1672", "regionName": "资兴市"}, {"regionID": "1673", "regionName": "桂阳县"}, {
            "regionID": "1674",
            "regionName": "宜章县"
        }, {"regionID": "1675", "regionName": "永兴县"}, {"regionID": "1676", "regionName": "嘉禾县"}, {
            "regionID": "1677",
            "regionName": "临武县"
        }, {"regionID": "1678", "regionName": "汝城县"}, {"regionID": "1679", "regionName": "桂东县"}, {
            "regionID": "1680",
            "regionName": "安仁县"
        }]
    }, {
        "regionID": "201",
        "regionName": "衡阳",
        "child": [{"regionID": "1681", "regionName": "雁峰区"}, {
            "regionID": "1682",
            "regionName": "珠晖区"
        }, {"regionID": "1683", "regionName": "石鼓区"}, {"regionID": "1684", "regionName": "蒸湘区"}, {
            "regionID": "1685",
            "regionName": "南岳区"
        }, {"regionID": "1686", "regionName": "耒阳市"}, {"regionID": "1687", "regionName": "常宁市"}, {
            "regionID": "1688",
            "regionName": "衡阳县"
        }, {"regionID": "1689", "regionName": "衡南县"}, {"regionID": "1690", "regionName": "衡山县"}, {
            "regionID": "1691",
            "regionName": "衡东县"
        }, {"regionID": "1692", "regionName": "祁东县"}]
    }, {
        "regionID": "202",
        "regionName": "怀化",
        "child": [{"regionID": "1693", "regionName": "鹤城区"}, {
            "regionID": "1694",
            "regionName": "靖州"
        }, {"regionID": "1695", "regionName": "麻阳"}, {"regionID": "1696", "regionName": "通道"}, {
            "regionID": "1697",
            "regionName": "新晃"
        }, {"regionID": "1698", "regionName": "芷江"}, {"regionID": "1699", "regionName": "沅陵县"}, {
            "regionID": "1700",
            "regionName": "辰溪县"
        }, {"regionID": "1701", "regionName": "溆浦县"}, {"regionID": "1702", "regionName": "中方县"}, {
            "regionID": "1703",
            "regionName": "会同县"
        }, {"regionID": "1704", "regionName": "洪江市"}]
    }, {
        "regionID": "203",
        "regionName": "娄底",
        "child": [{"regionID": "1705", "regionName": "娄星区"}, {
            "regionID": "1706",
            "regionName": "冷水江市"
        }, {"regionID": "1707", "regionName": "涟源市"}, {"regionID": "1708", "regionName": "双峰县"}, {
            "regionID": "1709",
            "regionName": "新化县"
        }]
    }, {
        "regionID": "204",
        "regionName": "邵阳",
        "child": [{"regionID": "1710", "regionName": "城步"}, {
            "regionID": "1711",
            "regionName": "双清区"
        }, {"regionID": "1712", "regionName": "大祥区"}, {"regionID": "1713", "regionName": "北塔区"}, {
            "regionID": "1714",
            "regionName": "武冈市"
        }, {"regionID": "1715", "regionName": "邵东县"}, {"regionID": "1716", "regionName": "新邵县"}, {
            "regionID": "1717",
            "regionName": "邵阳县"
        }, {"regionID": "1718", "regionName": "隆回县"}, {"regionID": "1719", "regionName": "洞口县"}, {
            "regionID": "1720",
            "regionName": "绥宁县"
        }, {"regionID": "1721", "regionName": "新宁县"}]
    }, {
        "regionID": "205",
        "regionName": "湘潭",
        "child": [{"regionID": "1722", "regionName": "岳塘区"}, {
            "regionID": "1723",
            "regionName": "雨湖区"
        }, {"regionID": "1724", "regionName": "湘乡市"}, {"regionID": "1725", "regionName": "韶山市"}, {
            "regionID": "1726",
            "regionName": "湘潭县"
        }]
    }, {
        "regionID": "206",
        "regionName": "湘西",
        "child": [{"regionID": "1727", "regionName": "吉首市"}, {
            "regionID": "1728",
            "regionName": "泸溪县"
        }, {"regionID": "1729", "regionName": "凤凰县"}, {"regionID": "1730", "regionName": "花垣县"}, {
            "regionID": "1731",
            "regionName": "保靖县"
        }, {"regionID": "1732", "regionName": "古丈县"}, {"regionID": "1733", "regionName": "永顺县"}, {
            "regionID": "1734",
            "regionName": "龙山县"
        }]
    }, {
        "regionID": "207",
        "regionName": "益阳",
        "child": [{"regionID": "1735", "regionName": "赫山区"}, {
            "regionID": "1736",
            "regionName": "资阳区"
        }, {"regionID": "1737", "regionName": "沅江市"}, {"regionID": "1738", "regionName": "南县"}, {
            "regionID": "1739",
            "regionName": "桃江县"
        }, {"regionID": "1740", "regionName": "安化县"}]
    }, {
        "regionID": "208",
        "regionName": "永州",
        "child": [{"regionID": "1741", "regionName": "江华"}, {
            "regionID": "1742",
            "regionName": "冷水滩区"
        }, {"regionID": "1743", "regionName": "零陵区"}, {"regionID": "1744", "regionName": "祁阳县"}, {
            "regionID": "1745",
            "regionName": "东安县"
        }, {"regionID": "1746", "regionName": "双牌县"}, {"regionID": "1747", "regionName": "道县"}, {
            "regionID": "1748",
            "regionName": "江永县"
        }, {"regionID": "1749", "regionName": "宁远县"}, {"regionID": "1750", "regionName": "蓝山县"}, {
            "regionID": "1751",
            "regionName": "新田县"
        }]
    }, {
        "regionID": "209",
        "regionName": "岳阳",
        "child": [{"regionID": "1752", "regionName": "岳阳楼区"}, {
            "regionID": "1753",
            "regionName": "君山区"
        }, {"regionID": "1754", "regionName": "云溪区"}, {"regionID": "1755", "regionName": "汨罗市"}, {
            "regionID": "1756",
            "regionName": "临湘市"
        }, {"regionID": "1757", "regionName": "岳阳县"}, {"regionID": "1758", "regionName": "华容县"}, {
            "regionID": "1759",
            "regionName": "湘阴县"
        }, {"regionID": "1760", "regionName": "平江县"}]
    }, {
        "regionID": "210",
        "regionName": "株洲",
        "child": [{"regionID": "1761", "regionName": "天元区"}, {
            "regionID": "1762",
            "regionName": "荷塘区"
        }, {"regionID": "1763", "regionName": "芦淞区"}, {"regionID": "1764", "regionName": "石峰区"}, {
            "regionID": "1765",
            "regionName": "醴陵市"
        }, {"regionID": "1766", "regionName": "株洲县"}, {"regionID": "1767", "regionName": "攸县"}, {
            "regionID": "1768",
            "regionName": "茶陵县"
        }, {"regionID": "1769", "regionName": "炎陵县"}]
    }]
}, {
    "regionID": "15",
    "regionName": "吉林",
    "child": [{
        "regionID": "211",
        "regionName": "长春",
        "child": [{"regionID": "1770", "regionName": "朝阳区"}, {
            "regionID": "1771",
            "regionName": "宽城区"
        }, {"regionID": "1772", "regionName": "二道区"}, {"regionID": "1773", "regionName": "南关区"}, {
            "regionID": "1774",
            "regionName": "绿园区"
        }, {"regionID": "1775", "regionName": "双阳区"}, {"regionID": "1776", "regionName": "净月潭开发区"}, {
            "regionID": "1777",
            "regionName": "高新技术开发区"
        }, {"regionID": "1778", "regionName": "经济技术开发区"}, {
            "regionID": "1779",
            "regionName": "汽车产业开发区"
        }, {"regionID": "1780", "regionName": "德惠市"}, {"regionID": "1781", "regionName": "九台市"}, {
            "regionID": "1782",
            "regionName": "榆树市"
        }, {"regionID": "1783", "regionName": "农安县"}]
    }, {
        "regionID": "212",
        "regionName": "吉林",
        "child": [{"regionID": "1784", "regionName": "船营区"}, {
            "regionID": "1785",
            "regionName": "昌邑区"
        }, {"regionID": "1786", "regionName": "龙潭区"}, {"regionID": "1787", "regionName": "丰满区"}, {
            "regionID": "1788",
            "regionName": "蛟河市"
        }, {"regionID": "1789", "regionName": "桦甸市"}, {"regionID": "1790", "regionName": "舒兰市"}, {
            "regionID": "1791",
            "regionName": "磐石市"
        }, {"regionID": "1792", "regionName": "永吉县"}]
    }, {
        "regionID": "213",
        "regionName": "白城",
        "child": [{"regionID": "1793", "regionName": "洮北区"}, {
            "regionID": "1794",
            "regionName": "洮南市"
        }, {"regionID": "1795", "regionName": "大安市"}, {"regionID": "1796", "regionName": "镇赉县"}, {
            "regionID": "1797",
            "regionName": "通榆县"
        }]
    }, {
        "regionID": "214",
        "regionName": "白山",
        "child": [{"regionID": "1798", "regionName": "江源区"}, {
            "regionID": "1799",
            "regionName": "八道江区"
        }, {"regionID": "1800", "regionName": "长白"}, {"regionID": "1801", "regionName": "临江市"}, {
            "regionID": "1802",
            "regionName": "抚松县"
        }, {"regionID": "1803", "regionName": "靖宇县"}]
    }, {
        "regionID": "215",
        "regionName": "辽源",
        "child": [{"regionID": "1804", "regionName": "龙山区"}, {
            "regionID": "1805",
            "regionName": "西安区"
        }, {"regionID": "1806", "regionName": "东丰县"}, {"regionID": "1807", "regionName": "东辽县"}]
    }, {
        "regionID": "216",
        "regionName": "四平",
        "child": [{"regionID": "1808", "regionName": "铁西区"}, {
            "regionID": "1809",
            "regionName": "铁东区"
        }, {"regionID": "1810", "regionName": "伊通"}, {"regionID": "1811", "regionName": "公主岭市"}, {
            "regionID": "1812",
            "regionName": "双辽市"
        }, {"regionID": "1813", "regionName": "梨树县"}]
    }, {
        "regionID": "217",
        "regionName": "松原",
        "child": [{"regionID": "1814", "regionName": "前郭尔罗斯"}, {
            "regionID": "1815",
            "regionName": "宁江区"
        }, {"regionID": "1816", "regionName": "长岭县"}, {"regionID": "1817", "regionName": "乾安县"}, {
            "regionID": "1818",
            "regionName": "扶余县"
        }]
    }, {
        "regionID": "218",
        "regionName": "通化",
        "child": [{"regionID": "1819", "regionName": "东昌区"}, {
            "regionID": "1820",
            "regionName": "二道江区"
        }, {"regionID": "1821", "regionName": "梅河口市"}, {"regionID": "1822", "regionName": "集安市"}, {
            "regionID": "1823",
            "regionName": "通化县"
        }, {"regionID": "1824", "regionName": "辉南县"}, {"regionID": "1825", "regionName": "柳河县"}]
    }, {
        "regionID": "219",
        "regionName": "延边",
        "child": [{"regionID": "1826", "regionName": "延吉市"}, {
            "regionID": "1827",
            "regionName": "图们市"
        }, {"regionID": "1828", "regionName": "敦化市"}, {"regionID": "1829", "regionName": "珲春市"}, {
            "regionID": "1830",
            "regionName": "龙井市"
        }, {"regionID": "1831", "regionName": "和龙市"}, {"regionID": "1832", "regionName": "安图县"}, {
            "regionID": "1833",
            "regionName": "汪清县"
        }]
    }]
}, {
    "regionID": "16",
    "regionName": "江苏",
    "child": [{
        "regionID": "220",
        "regionName": "南京",
        "child": [{"regionID": "1834", "regionName": "玄武区"}, {
            "regionID": "1835",
            "regionName": "鼓楼区"
        }, {"regionID": "1836", "regionName": "白下区"}, {"regionID": "1837", "regionName": "建邺区"}, {
            "regionID": "1838",
            "regionName": "秦淮区"
        }, {"regionID": "1839", "regionName": "雨花台区"}, {"regionID": "1840", "regionName": "下关区"}, {
            "regionID": "1841",
            "regionName": "栖霞区"
        }, {"regionID": "1842", "regionName": "浦口区"}, {"regionID": "1843", "regionName": "江宁区"}, {
            "regionID": "1844",
            "regionName": "六合区"
        }, {"regionID": "1845", "regionName": "溧水县"}, {"regionID": "1846", "regionName": "高淳县"}]
    }, {
        "regionID": "221",
        "regionName": "苏州",
        "child": [{"regionID": "1847", "regionName": "沧浪区"}, {
            "regionID": "1848",
            "regionName": "金阊区"
        }, {"regionID": "1849", "regionName": "平江区"}, {"regionID": "1850", "regionName": "虎丘区"}, {
            "regionID": "1851",
            "regionName": "吴中区"
        }, {"regionID": "1852", "regionName": "相城区"}, {"regionID": "1853", "regionName": "园区"}, {
            "regionID": "1854",
            "regionName": "新区"
        }, {"regionID": "1855", "regionName": "常熟市"}, {"regionID": "1856", "regionName": "张家港市"}, {
            "regionID": "1857",
            "regionName": "玉山镇"
        }, {"regionID": "1858", "regionName": "巴城镇"}, {"regionID": "1859", "regionName": "周市镇"}, {
            "regionID": "1860",
            "regionName": "陆家镇"
        }, {"regionID": "1861", "regionName": "花桥镇"}, {"regionID": "1862", "regionName": "淀山湖镇"}, {
            "regionID": "1863",
            "regionName": "张浦镇"
        }, {"regionID": "1864", "regionName": "周庄镇"}, {"regionID": "1865", "regionName": "千灯镇"}, {
            "regionID": "1866",
            "regionName": "锦溪镇"
        }, {"regionID": "1867", "regionName": "开发区"}, {"regionID": "1868", "regionName": "吴江市"}, {
            "regionID": "1869",
            "regionName": "太仓市"
        }]
    }, {
        "regionID": "222",
        "regionName": "无锡",
        "child": [{"regionID": "1870", "regionName": "崇安区"}, {
            "regionID": "1871",
            "regionName": "北塘区"
        }, {"regionID": "1872", "regionName": "南长区"}, {"regionID": "1873", "regionName": "锡山区"}, {
            "regionID": "1874",
            "regionName": "惠山区"
        }, {"regionID": "1875", "regionName": "滨湖区"}, {"regionID": "1876", "regionName": "新区"}, {
            "regionID": "1877",
            "regionName": "江阴市"
        }, {"regionID": "1878", "regionName": "宜兴市"}]
    }, {
        "regionID": "223",
        "regionName": "常州",
        "child": [{"regionID": "1879", "regionName": "天宁区"}, {
            "regionID": "1880",
            "regionName": "钟楼区"
        }, {"regionID": "1881", "regionName": "戚墅堰区"}, {"regionID": "1882", "regionName": "郊区"}, {
            "regionID": "1883",
            "regionName": "新北区"
        }, {"regionID": "1884", "regionName": "武进区"}, {"regionID": "1885", "regionName": "溧阳市"}, {
            "regionID": "1886",
            "regionName": "金坛市"
        }]
    }, {
        "regionID": "224",
        "regionName": "淮安",
        "child": [{"regionID": "1887", "regionName": "清河区"}, {
            "regionID": "1888",
            "regionName": "清浦区"
        }, {"regionID": "1889", "regionName": "楚州区"}, {"regionID": "1890", "regionName": "淮阴区"}, {
            "regionID": "1891",
            "regionName": "涟水县"
        }, {"regionID": "1892", "regionName": "洪泽县"}, {"regionID": "1893", "regionName": "盱眙县"}, {
            "regionID": "1894",
            "regionName": "金湖县"
        }]
    }, {
        "regionID": "225",
        "regionName": "连云港",
        "child": [{"regionID": "1895", "regionName": "新浦区"}, {
            "regionID": "1896",
            "regionName": "连云区"
        }, {"regionID": "1897", "regionName": "海州区"}, {"regionID": "1898", "regionName": "赣榆县"}, {
            "regionID": "1899",
            "regionName": "东海县"
        }, {"regionID": "1900", "regionName": "灌云县"}, {"regionID": "1901", "regionName": "灌南县"}]
    }, {
        "regionID": "226",
        "regionName": "南通",
        "child": [{"regionID": "1902", "regionName": "崇川区"}, {
            "regionID": "1903",
            "regionName": "港闸区"
        }, {"regionID": "1904", "regionName": "经济开发区"}, {"regionID": "1905", "regionName": "启东市"}, {
            "regionID": "1906",
            "regionName": "如皋市"
        }, {"regionID": "1907", "regionName": "通州市"}, {"regionID": "1908", "regionName": "海门市"}, {
            "regionID": "1909",
            "regionName": "海安县"
        }, {"regionID": "1910", "regionName": "如东县"}]
    }, {
        "regionID": "227",
        "regionName": "宿迁",
        "child": [{"regionID": "1911", "regionName": "宿城区"}, {
            "regionID": "1912",
            "regionName": "宿豫区"
        }, {"regionID": "1913", "regionName": "宿豫县"}, {"regionID": "1914", "regionName": "沭阳县"}, {
            "regionID": "1915",
            "regionName": "泗阳县"
        }, {"regionID": "1916", "regionName": "泗洪县"}]
    }, {
        "regionID": "228",
        "regionName": "泰州",
        "child": [{"regionID": "1917", "regionName": "海陵区"}, {
            "regionID": "1918",
            "regionName": "高港区"
        }, {"regionID": "1919", "regionName": "兴化市"}, {"regionID": "1920", "regionName": "靖江市"}, {
            "regionID": "1921",
            "regionName": "泰兴市"
        }, {"regionID": "1922", "regionName": "姜堰市"}]
    }, {
        "regionID": "229",
        "regionName": "徐州",
        "child": [{"regionID": "1923", "regionName": "云龙区"}, {
            "regionID": "1924",
            "regionName": "鼓楼区"
        }, {"regionID": "1925", "regionName": "九里区"}, {"regionID": "1926", "regionName": "贾汪区"}, {
            "regionID": "1927",
            "regionName": "泉山区"
        }, {"regionID": "1928", "regionName": "新沂市"}, {"regionID": "1929", "regionName": "邳州市"}, {
            "regionID": "1930",
            "regionName": "丰县"
        }, {"regionID": "1931", "regionName": "沛县"}, {"regionID": "1932", "regionName": "铜山县"}, {
            "regionID": "1933",
            "regionName": "睢宁县"
        }]
    }, {
        "regionID": "230",
        "regionName": "盐城",
        "child": [{"regionID": "1934", "regionName": "城区"}, {
            "regionID": "1935",
            "regionName": "亭湖区"
        }, {"regionID": "1936", "regionName": "盐都区"}, {"regionID": "1937", "regionName": "盐都县"}, {
            "regionID": "1938",
            "regionName": "东台市"
        }, {"regionID": "1939", "regionName": "大丰市"}, {"regionID": "1940", "regionName": "响水县"}, {
            "regionID": "1941",
            "regionName": "滨海县"
        }, {"regionID": "1942", "regionName": "阜宁县"}, {"regionID": "1943", "regionName": "射阳县"}, {
            "regionID": "1944",
            "regionName": "建湖县"
        }]
    }, {
        "regionID": "231",
        "regionName": "扬州",
        "child": [{"regionID": "1945", "regionName": "广陵区"}, {
            "regionID": "1946",
            "regionName": "维扬区"
        }, {"regionID": "1947", "regionName": "邗江区"}, {"regionID": "1948", "regionName": "仪征市"}, {
            "regionID": "1949",
            "regionName": "高邮市"
        }, {"regionID": "1950", "regionName": "江都市"}, {"regionID": "1951", "regionName": "宝应县"}]
    }, {
        "regionID": "232",
        "regionName": "镇江",
        "child": [{"regionID": "1952", "regionName": "京口区"}, {
            "regionID": "1953",
            "regionName": "润州区"
        }, {"regionID": "1954", "regionName": "丹徒区"}, {"regionID": "1955", "regionName": "丹阳市"}, {
            "regionID": "1956",
            "regionName": "扬中市"
        }, {"regionID": "1957", "regionName": "句容市"}]
    }]
}, {
    "regionID": "17",
    "regionName": "江西",
    "child": [{
        "regionID": "233",
        "regionName": "南昌",
        "child": [{"regionID": "1958", "regionName": "东湖区"}, {
            "regionID": "1959",
            "regionName": "西湖区"
        }, {"regionID": "1960", "regionName": "青云谱区"}, {"regionID": "1961", "regionName": "湾里区"}, {
            "regionID": "1962",
            "regionName": "青山湖区"
        }, {"regionID": "1963", "regionName": "红谷滩新区"}, {"regionID": "1964", "regionName": "昌北区"}, {
            "regionID": "1965",
            "regionName": "高新区"
        }, {"regionID": "1966", "regionName": "南昌县"}, {"regionID": "1967", "regionName": "新建县"}, {
            "regionID": "1968",
            "regionName": "安义县"
        }, {"regionID": "1969", "regionName": "进贤县"}]
    }, {
        "regionID": "234",
        "regionName": "抚州",
        "child": [{"regionID": "1970", "regionName": "临川区"}, {
            "regionID": "1971",
            "regionName": "南城县"
        }, {"regionID": "1972", "regionName": "黎川县"}, {"regionID": "1973", "regionName": "南丰县"}, {
            "regionID": "1974",
            "regionName": "崇仁县"
        }, {"regionID": "1975", "regionName": "乐安县"}, {"regionID": "1976", "regionName": "宜黄县"}, {
            "regionID": "1977",
            "regionName": "金溪县"
        }, {"regionID": "1978", "regionName": "资溪县"}, {"regionID": "1979", "regionName": "东乡县"}, {
            "regionID": "1980",
            "regionName": "广昌县"
        }]
    }, {
        "regionID": "235",
        "regionName": "赣州",
        "child": [{"regionID": "1981", "regionName": "章贡区"}, {
            "regionID": "1982",
            "regionName": "于都县"
        }, {"regionID": "1983", "regionName": "瑞金市"}, {"regionID": "1984", "regionName": "南康市"}, {
            "regionID": "1985",
            "regionName": "赣县"
        }, {"regionID": "1986", "regionName": "信丰县"}, {"regionID": "1987", "regionName": "大余县"}, {
            "regionID": "1988",
            "regionName": "上犹县"
        }, {"regionID": "1989", "regionName": "崇义县"}, {"regionID": "1990", "regionName": "安远县"}, {
            "regionID": "1991",
            "regionName": "龙南县"
        }, {"regionID": "1992", "regionName": "定南县"}, {"regionID": "1993", "regionName": "全南县"}, {
            "regionID": "1994",
            "regionName": "宁都县"
        }, {"regionID": "1995", "regionName": "兴国县"}, {"regionID": "1996", "regionName": "会昌县"}, {
            "regionID": "1997",
            "regionName": "寻乌县"
        }, {"regionID": "1998", "regionName": "石城县"}]
    }, {
        "regionID": "236",
        "regionName": "吉安",
        "child": [{"regionID": "1999", "regionName": "安福县"}, {
            "regionID": "2000",
            "regionName": "吉州区"
        }, {"regionID": "2001", "regionName": "青原区"}, {"regionID": "2002", "regionName": "井冈山市"}, {
            "regionID": "2003",
            "regionName": "吉安县"
        }, {"regionID": "2004", "regionName": "吉水县"}, {"regionID": "2005", "regionName": "峡江县"}, {
            "regionID": "2006",
            "regionName": "新干县"
        }, {"regionID": "2007", "regionName": "永丰县"}, {"regionID": "2008", "regionName": "泰和县"}, {
            "regionID": "2009",
            "regionName": "遂川县"
        }, {"regionID": "2010", "regionName": "万安县"}, {"regionID": "2011", "regionName": "永新县"}]
    }, {
        "regionID": "237",
        "regionName": "景德镇",
        "child": [{"regionID": "2012", "regionName": "珠山区"}, {
            "regionID": "2013",
            "regionName": "昌江区"
        }, {"regionID": "2014", "regionName": "乐平市"}, {"regionID": "2015", "regionName": "浮梁县"}]
    }, {
        "regionID": "238",
        "regionName": "九江",
        "child": [{"regionID": "2016", "regionName": "浔阳区"}, {
            "regionID": "2017",
            "regionName": "庐山区"
        }, {"regionID": "2018", "regionName": "瑞昌市"}, {"regionID": "2019", "regionName": "九江县"}, {
            "regionID": "2020",
            "regionName": "武宁县"
        }, {"regionID": "2021", "regionName": "修水县"}, {"regionID": "2022", "regionName": "永修县"}, {
            "regionID": "2023",
            "regionName": "德安县"
        }, {"regionID": "2024", "regionName": "星子县"}, {"regionID": "2025", "regionName": "都昌县"}, {
            "regionID": "2026",
            "regionName": "湖口县"
        }, {"regionID": "2027", "regionName": "彭泽县"}]
    }, {
        "regionID": "239",
        "regionName": "萍乡",
        "child": [{"regionID": "2028", "regionName": "安源区"}, {
            "regionID": "2029",
            "regionName": "湘东区"
        }, {"regionID": "2030", "regionName": "莲花县"}, {"regionID": "2031", "regionName": "芦溪县"}, {
            "regionID": "2032",
            "regionName": "上栗县"
        }]
    }, {
        "regionID": "240",
        "regionName": "上饶",
        "child": [{"regionID": "2033", "regionName": "信州区"}, {
            "regionID": "2034",
            "regionName": "德兴市"
        }, {"regionID": "2035", "regionName": "上饶县"}, {"regionID": "2036", "regionName": "广丰县"}, {
            "regionID": "2037",
            "regionName": "玉山县"
        }, {"regionID": "2038", "regionName": "铅山县"}, {"regionID": "2039", "regionName": "横峰县"}, {
            "regionID": "2040",
            "regionName": "弋阳县"
        }, {"regionID": "2041", "regionName": "余干县"}, {"regionID": "2042", "regionName": "波阳县"}, {
            "regionID": "2043",
            "regionName": "万年县"
        }, {"regionID": "2044", "regionName": "婺源县"}]
    }, {
        "regionID": "241",
        "regionName": "新余",
        "child": [{"regionID": "2045", "regionName": "渝水区"}, {"regionID": "2046", "regionName": "分宜县"}]
    }, {
        "regionID": "242",
        "regionName": "宜春",
        "child": [{"regionID": "2047", "regionName": "袁州区"}, {
            "regionID": "2048",
            "regionName": "丰城市"
        }, {"regionID": "2049", "regionName": "樟树市"}, {"regionID": "2050", "regionName": "高安市"}, {
            "regionID": "2051",
            "regionName": "奉新县"
        }, {"regionID": "2052", "regionName": "万载县"}, {"regionID": "2053", "regionName": "上高县"}, {
            "regionID": "2054",
            "regionName": "宜丰县"
        }, {"regionID": "2055", "regionName": "靖安县"}, {"regionID": "2056", "regionName": "铜鼓县"}]
    }, {
        "regionID": "243",
        "regionName": "鹰潭",
        "child": [{"regionID": "2057", "regionName": "月湖区"}, {
            "regionID": "2058",
            "regionName": "贵溪市"
        }, {"regionID": "2059", "regionName": "余江县"}]
    }]
}, {
    "regionID": "18",
    "regionName": "辽宁",
    "child": [{
        "regionID": "244",
        "regionName": "沈阳",
        "child": [{"regionID": "2060", "regionName": "沈河区"}, {
            "regionID": "2061",
            "regionName": "皇姑区"
        }, {"regionID": "2062", "regionName": "和平区"}, {"regionID": "2063", "regionName": "大东区"}, {
            "regionID": "2064",
            "regionName": "铁西区"
        }, {"regionID": "2065", "regionName": "苏家屯区"}, {"regionID": "2066", "regionName": "东陵区"}, {
            "regionID": "2067",
            "regionName": "沈北新区"
        }, {"regionID": "2068", "regionName": "于洪区"}, {"regionID": "2069", "regionName": "浑南新区"}, {
            "regionID": "2070",
            "regionName": "新民市"
        }, {"regionID": "2071", "regionName": "辽中县"}, {"regionID": "2072", "regionName": "康平县"}, {
            "regionID": "2073",
            "regionName": "法库县"
        }]
    }, {
        "regionID": "245",
        "regionName": "大连",
        "child": [{"regionID": "2074", "regionName": "西岗区"}, {
            "regionID": "2075",
            "regionName": "中山区"
        }, {"regionID": "2076", "regionName": "沙河口区"}, {"regionID": "2077", "regionName": "甘井子区"}, {
            "regionID": "2078",
            "regionName": "旅顺口区"
        }, {"regionID": "2079", "regionName": "金州区"}, {"regionID": "2080", "regionName": "开发区"}, {
            "regionID": "2081",
            "regionName": "瓦房店市"
        }, {"regionID": "2082", "regionName": "普兰店市"}, {"regionID": "2083", "regionName": "庄河市"}, {
            "regionID": "2084",
            "regionName": "长海县"
        }]
    }, {
        "regionID": "246",
        "regionName": "鞍山",
        "child": [{"regionID": "2085", "regionName": "铁东区"}, {
            "regionID": "2086",
            "regionName": "铁西区"
        }, {"regionID": "2087", "regionName": "立山区"}, {"regionID": "2088", "regionName": "千山区"}, {
            "regionID": "2089",
            "regionName": "岫岩"
        }, {"regionID": "2090", "regionName": "海城市"}, {"regionID": "2091", "regionName": "台安县"}]
    }, {
        "regionID": "247",
        "regionName": "本溪",
        "child": [{"regionID": "2092", "regionName": "本溪"}, {
            "regionID": "2093",
            "regionName": "平山区"
        }, {"regionID": "2094", "regionName": "明山区"}, {"regionID": "2095", "regionName": "溪湖区"}, {
            "regionID": "2096",
            "regionName": "南芬区"
        }, {"regionID": "2097", "regionName": "桓仁"}]
    }, {
        "regionID": "248",
        "regionName": "朝阳",
        "child": [{"regionID": "2098", "regionName": "双塔区"}, {
            "regionID": "2099",
            "regionName": "龙城区"
        }, {"regionID": "2100", "regionName": "喀喇沁左翼蒙古族自治县"}, {
            "regionID": "2101",
            "regionName": "北票市"
        }, {"regionID": "2102", "regionName": "凌源市"}, {"regionID": "2103", "regionName": "朝阳县"}, {
            "regionID": "2104",
            "regionName": "建平县"
        }]
    }, {
        "regionID": "249",
        "regionName": "丹东",
        "child": [{"regionID": "2105", "regionName": "振兴区"}, {
            "regionID": "2106",
            "regionName": "元宝区"
        }, {"regionID": "2107", "regionName": "振安区"}, {"regionID": "2108", "regionName": "宽甸"}, {
            "regionID": "2109",
            "regionName": "东港市"
        }, {"regionID": "2110", "regionName": "凤城市"}]
    }, {
        "regionID": "250",
        "regionName": "抚顺",
        "child": [{"regionID": "2111", "regionName": "顺城区"}, {
            "regionID": "2112",
            "regionName": "新抚区"
        }, {"regionID": "2113", "regionName": "东洲区"}, {"regionID": "2114", "regionName": "望花区"}, {
            "regionID": "2115",
            "regionName": "清原"
        }, {"regionID": "2116", "regionName": "新宾"}, {"regionID": "2117", "regionName": "抚顺县"}]
    }, {
        "regionID": "251",
        "regionName": "阜新",
        "child": [{"regionID": "2118", "regionName": "阜新"}, {
            "regionID": "2119",
            "regionName": "海州区"
        }, {"regionID": "2120", "regionName": "新邱区"}, {"regionID": "2121", "regionName": "太平区"}, {
            "regionID": "2122",
            "regionName": "清河门区"
        }, {"regionID": "2123", "regionName": "细河区"}, {"regionID": "2124", "regionName": "彰武县"}]
    }, {
        "regionID": "252",
        "regionName": "葫芦岛",
        "child": [{"regionID": "2125", "regionName": "龙港区"}, {
            "regionID": "2126",
            "regionName": "南票区"
        }, {"regionID": "2127", "regionName": "连山区"}, {"regionID": "2128", "regionName": "兴城市"}, {
            "regionID": "2129",
            "regionName": "绥中县"
        }, {"regionID": "2130", "regionName": "建昌县"}]
    }, {
        "regionID": "253",
        "regionName": "锦州",
        "child": [{"regionID": "2131", "regionName": "太和区"}, {
            "regionID": "2132",
            "regionName": "古塔区"
        }, {"regionID": "2133", "regionName": "凌河区"}, {"regionID": "2134", "regionName": "凌海市"}, {
            "regionID": "2135",
            "regionName": "北镇市"
        }, {"regionID": "2136", "regionName": "黑山县"}, {"regionID": "2137", "regionName": "义县"}]
    }, {
        "regionID": "254",
        "regionName": "辽阳",
        "child": [{"regionID": "2138", "regionName": "白塔区"}, {
            "regionID": "2139",
            "regionName": "文圣区"
        }, {"regionID": "2140", "regionName": "宏伟区"}, {"regionID": "2141", "regionName": "太子河区"}, {
            "regionID": "2142",
            "regionName": "弓长岭区"
        }, {"regionID": "2143", "regionName": "灯塔市"}, {"regionID": "2144", "regionName": "辽阳县"}]
    }, {
        "regionID": "255",
        "regionName": "盘锦",
        "child": [{"regionID": "2145", "regionName": "双台子区"}, {
            "regionID": "2146",
            "regionName": "兴隆台区"
        }, {"regionID": "2147", "regionName": "大洼县"}, {"regionID": "2148", "regionName": "盘山县"}]
    }, {
        "regionID": "256",
        "regionName": "铁岭",
        "child": [{"regionID": "2149", "regionName": "银州区"}, {
            "regionID": "2150",
            "regionName": "清河区"
        }, {"regionID": "2151", "regionName": "调兵山市"}, {"regionID": "2152", "regionName": "开原市"}, {
            "regionID": "2153",
            "regionName": "铁岭县"
        }, {"regionID": "2154", "regionName": "西丰县"}, {"regionID": "2155", "regionName": "昌图县"}]
    }, {
        "regionID": "257",
        "regionName": "营口",
        "child": [{"regionID": "2156", "regionName": "站前区"}, {
            "regionID": "2157",
            "regionName": "西市区"
        }, {"regionID": "2158", "regionName": "鲅鱼圈区"}, {"regionID": "2159", "regionName": "老边区"}, {
            "regionID": "2160",
            "regionName": "盖州市"
        }, {"regionID": "2161", "regionName": "大石桥市"}]
    }]
}, {
    "regionID": "19",
    "regionName": "内蒙古",
    "child": [{
        "regionID": "258",
        "regionName": "呼和浩特",
        "child": [{"regionID": "2162", "regionName": "回民区"}, {
            "regionID": "2163",
            "regionName": "玉泉区"
        }, {"regionID": "2164", "regionName": "新城区"}, {"regionID": "2165", "regionName": "赛罕区"}, {
            "regionID": "2166",
            "regionName": "清水河县"
        }, {"regionID": "2167", "regionName": "土默特左旗"}, {"regionID": "2168", "regionName": "托克托县"}, {
            "regionID": "2169",
            "regionName": "和林格尔县"
        }, {"regionID": "2170", "regionName": "武川县"}]
    }, {
        "regionID": "259",
        "regionName": "阿拉善盟",
        "child": [{"regionID": "2171", "regionName": "阿拉善左旗"}, {
            "regionID": "2172",
            "regionName": "阿拉善右旗"
        }, {"regionID": "2173", "regionName": "额济纳旗"}]
    }, {
        "regionID": "260",
        "regionName": "巴彦淖尔盟",
        "child": [{"regionID": "2174", "regionName": "临河区"}, {
            "regionID": "2175",
            "regionName": "五原县"
        }, {"regionID": "2176", "regionName": "磴口县"}, {"regionID": "2177", "regionName": "乌拉特前旗"}, {
            "regionID": "2178",
            "regionName": "乌拉特中旗"
        }, {"regionID": "2179", "regionName": "乌拉特后旗"}, {"regionID": "2180", "regionName": "杭锦后旗"}]
    }, {
        "regionID": "261",
        "regionName": "包头",
        "child": [{"regionID": "2181", "regionName": "昆都仑区"}, {
            "regionID": "2182",
            "regionName": "青山区"
        }, {"regionID": "2183", "regionName": "东河区"}, {"regionID": "2184", "regionName": "九原区"}, {
            "regionID": "2185",
            "regionName": "石拐区"
        }, {"regionID": "2186", "regionName": "白云矿区"}, {"regionID": "2187", "regionName": "土默特右旗"}, {
            "regionID": "2188",
            "regionName": "固阳县"
        }, {"regionID": "2189", "regionName": "达尔罕茂明安联合旗"}]
    }, {
        "regionID": "262",
        "regionName": "赤峰",
        "child": [{"regionID": "2190", "regionName": "红山区"}, {
            "regionID": "2191",
            "regionName": "元宝山区"
        }, {"regionID": "2192", "regionName": "松山区"}, {"regionID": "2193", "regionName": "阿鲁科尔沁旗"}, {
            "regionID": "2194",
            "regionName": "巴林左旗"
        }, {"regionID": "2195", "regionName": "巴林右旗"}, {"regionID": "2196", "regionName": "林西县"}, {
            "regionID": "2197",
            "regionName": "克什克腾旗"
        }, {"regionID": "2198", "regionName": "翁牛特旗"}, {"regionID": "2199", "regionName": "喀喇沁旗"}, {
            "regionID": "2200",
            "regionName": "宁城县"
        }, {"regionID": "2201", "regionName": "敖汉旗"}]
    }, {
        "regionID": "263",
        "regionName": "鄂尔多斯",
        "child": [{"regionID": "2202", "regionName": "东胜区"}, {
            "regionID": "2203",
            "regionName": "达拉特旗"
        }, {"regionID": "2204", "regionName": "准格尔旗"}, {"regionID": "2205", "regionName": "鄂托克前旗"}, {
            "regionID": "2206",
            "regionName": "鄂托克旗"
        }, {"regionID": "2207", "regionName": "杭锦旗"}, {"regionID": "2208", "regionName": "乌审旗"}, {
            "regionID": "2209",
            "regionName": "伊金霍洛旗"
        }]
    }, {
        "regionID": "264",
        "regionName": "呼伦贝尔",
        "child": [{"regionID": "2210", "regionName": "海拉尔区"}, {
            "regionID": "2211",
            "regionName": "莫力达瓦"
        }, {"regionID": "2212", "regionName": "满洲里市"}, {"regionID": "2213", "regionName": "牙克石市"}, {
            "regionID": "2214",
            "regionName": "扎兰屯市"
        }, {"regionID": "2215", "regionName": "额尔古纳市"}, {"regionID": "2216", "regionName": "根河市"}, {
            "regionID": "2217",
            "regionName": "阿荣旗"
        }, {"regionID": "2218", "regionName": "鄂伦春自治旗"}, {
            "regionID": "2219",
            "regionName": "鄂温克族自治旗"
        }, {"regionID": "2220", "regionName": "陈巴尔虎旗"}, {
            "regionID": "2221",
            "regionName": "新巴尔虎左旗"
        }, {"regionID": "2222", "regionName": "新巴尔虎右旗"}]
    }, {
        "regionID": "265",
        "regionName": "通辽",
        "child": [{"regionID": "2223", "regionName": "科尔沁区"}, {
            "regionID": "2224",
            "regionName": "霍林郭勒市"
        }, {"regionID": "2225", "regionName": "科尔沁左翼中旗"}, {
            "regionID": "2226",
            "regionName": "科尔沁左翼后旗"
        }, {"regionID": "2227", "regionName": "开鲁县"}, {"regionID": "2228", "regionName": "库伦旗"}, {
            "regionID": "2229",
            "regionName": "奈曼旗"
        }, {"regionID": "2230", "regionName": "扎鲁特旗"}]
    }, {
        "regionID": "266",
        "regionName": "乌海",
        "child": [{"regionID": "2231", "regionName": "海勃湾区"}, {
            "regionID": "2232",
            "regionName": "乌达区"
        }, {"regionID": "2233", "regionName": "海南区"}]
    }, {
        "regionID": "267",
        "regionName": "乌兰察布市",
        "child": [{"regionID": "2234", "regionName": "化德县"}, {
            "regionID": "2235",
            "regionName": "集宁区"
        }, {"regionID": "2236", "regionName": "丰镇市"}, {"regionID": "2237", "regionName": "卓资县"}, {
            "regionID": "2238",
            "regionName": "商都县"
        }, {"regionID": "2239", "regionName": "兴和县"}, {"regionID": "2240", "regionName": "凉城县"}, {
            "regionID": "2241",
            "regionName": "察哈尔右翼前旗"
        }, {"regionID": "2242", "regionName": "察哈尔右翼中旗"}, {
            "regionID": "2243",
            "regionName": "察哈尔右翼后旗"
        }, {"regionID": "2244", "regionName": "四子王旗"}]
    }, {
        "regionID": "268",
        "regionName": "锡林郭勒盟",
        "child": [{"regionID": "2245", "regionName": "二连浩特市"}, {
            "regionID": "2246",
            "regionName": "锡林浩特市"
        }, {"regionID": "2247", "regionName": "阿巴嘎旗"}, {"regionID": "2248", "regionName": "苏尼特左旗"}, {
            "regionID": "2249",
            "regionName": "苏尼特右旗"
        }, {"regionID": "2250", "regionName": "东乌珠穆沁旗"}, {
            "regionID": "2251",
            "regionName": "西乌珠穆沁旗"
        }, {"regionID": "2252", "regionName": "太仆寺旗"}, {"regionID": "2253", "regionName": "镶黄旗"}, {
            "regionID": "2254",
            "regionName": "正镶白旗"
        }, {"regionID": "2255", "regionName": "正蓝旗"}, {"regionID": "2256", "regionName": "多伦县"}]
    }, {
        "regionID": "269",
        "regionName": "兴安盟",
        "child": [{"regionID": "2257", "regionName": "乌兰浩特市"}, {
            "regionID": "2258",
            "regionName": "阿尔山市"
        }, {"regionID": "2259", "regionName": "科尔沁右翼前旗"}, {
            "regionID": "2260",
            "regionName": "科尔沁右翼中旗"
        }, {"regionID": "2261", "regionName": "扎赉特旗"}, {"regionID": "2262", "regionName": "突泉县"}]
    }]
}, {
    "regionID": "20",
    "regionName": "宁夏",
    "child": [{
        "regionID": "270",
        "regionName": "银川",
        "child": [{"regionID": "2263", "regionName": "西夏区"}, {
            "regionID": "2264",
            "regionName": "金凤区"
        }, {"regionID": "2265", "regionName": "兴庆区"}, {"regionID": "2266", "regionName": "灵武市"}, {
            "regionID": "2267",
            "regionName": "永宁县"
        }, {"regionID": "2268", "regionName": "贺兰县"}]
    }, {
        "regionID": "271",
        "regionName": "固原",
        "child": [{"regionID": "2269", "regionName": "原州区"}, {
            "regionID": "2270",
            "regionName": "海原县"
        }, {"regionID": "2271", "regionName": "西吉县"}, {"regionID": "2272", "regionName": "隆德县"}, {
            "regionID": "2273",
            "regionName": "泾源县"
        }, {"regionID": "2274", "regionName": "彭阳县"}]
    }, {
        "regionID": "272",
        "regionName": "石嘴山",
        "child": [{"regionID": "2275", "regionName": "惠农县"}, {
            "regionID": "2276",
            "regionName": "大武口区"
        }, {"regionID": "2277", "regionName": "惠农区"}, {"regionID": "2278", "regionName": "陶乐县"}, {
            "regionID": "2279",
            "regionName": "平罗县"
        }]
    }, {
        "regionID": "273",
        "regionName": "吴忠",
        "child": [{"regionID": "2280", "regionName": "利通区"}, {
            "regionID": "2281",
            "regionName": "中卫县"
        }, {"regionID": "2282", "regionName": "青铜峡市"}, {"regionID": "2283", "regionName": "中宁县"}, {
            "regionID": "2284",
            "regionName": "盐池县"
        }, {"regionID": "2285", "regionName": "同心县"}]
    }, {
        "regionID": "274",
        "regionName": "中卫",
        "child": [{"regionID": "2286", "regionName": "沙坡头区"}, {
            "regionID": "2287",
            "regionName": "海原县"
        }, {"regionID": "2288", "regionName": "中宁县"}]
    }]
}, {
    "regionID": "21",
    "regionName": "青海",
    "child": [{
        "regionID": "275",
        "regionName": "西宁",
        "child": [{"regionID": "2289", "regionName": "城中区"}, {
            "regionID": "2290",
            "regionName": "城东区"
        }, {"regionID": "2291", "regionName": "城西区"}, {"regionID": "2292", "regionName": "城北区"}, {
            "regionID": "2293",
            "regionName": "湟中县"
        }, {"regionID": "2294", "regionName": "湟源县"}, {"regionID": "2295", "regionName": "大通"}]
    }, {
        "regionID": "276",
        "regionName": "果洛",
        "child": [{"regionID": "2296", "regionName": "玛沁县"}, {
            "regionID": "2297",
            "regionName": "班玛县"
        }, {"regionID": "2298", "regionName": "甘德县"}, {"regionID": "2299", "regionName": "达日县"}, {
            "regionID": "2300",
            "regionName": "久治县"
        }, {"regionID": "2301", "regionName": "玛多县"}]
    }, {
        "regionID": "277",
        "regionName": "海北",
        "child": [{"regionID": "2302", "regionName": "海晏县"}, {
            "regionID": "2303",
            "regionName": "祁连县"
        }, {"regionID": "2304", "regionName": "刚察县"}, {"regionID": "2305", "regionName": "门源"}]
    }, {
        "regionID": "278",
        "regionName": "海东",
        "child": [{"regionID": "2306", "regionName": "平安县"}, {
            "regionID": "2307",
            "regionName": "乐都县"
        }, {"regionID": "2308", "regionName": "民和"}, {"regionID": "2309", "regionName": "互助"}, {
            "regionID": "2310",
            "regionName": "化隆"
        }, {"regionID": "2311", "regionName": "循化"}]
    }, {
        "regionID": "279",
        "regionName": "海南市",
        "child": [{"regionID": "2312", "regionName": "共和县"}, {
            "regionID": "2313",
            "regionName": "同德县"
        }, {"regionID": "2314", "regionName": "贵德县"}, {"regionID": "2315", "regionName": "兴海县"}, {
            "regionID": "2316",
            "regionName": "贵南县"
        }]
    }, {
        "regionID": "280",
        "regionName": "海西",
        "child": [{"regionID": "2317", "regionName": "德令哈市"}, {
            "regionID": "2318",
            "regionName": "格尔木市"
        }, {"regionID": "2319", "regionName": "乌兰县"}, {"regionID": "2320", "regionName": "都兰县"}, {
            "regionID": "2321",
            "regionName": "天峻县"
        }]
    }, {
        "regionID": "281",
        "regionName": "黄南",
        "child": [{"regionID": "2322", "regionName": "同仁县"}, {
            "regionID": "2323",
            "regionName": "尖扎县"
        }, {"regionID": "2324", "regionName": "泽库县"}, {"regionID": "2325", "regionName": "河南蒙古族自治县"}]
    }, {
        "regionID": "282",
        "regionName": "玉树",
        "child": [{"regionID": "2326", "regionName": "玉树县"}, {
            "regionID": "2327",
            "regionName": "杂多县"
        }, {"regionID": "2328", "regionName": "称多县"}, {"regionID": "2329", "regionName": "治多县"}, {
            "regionID": "2330",
            "regionName": "囊谦县"
        }, {"regionID": "2331", "regionName": "曲麻莱县"}]
    }]
}, {
    "regionID": "22",
    "regionName": "山东",
    "child": [{
        "regionID": "283",
        "regionName": "济南",
        "child": [{"regionID": "2332", "regionName": "市中区"}, {
            "regionID": "2333",
            "regionName": "历下区"
        }, {"regionID": "2334", "regionName": "天桥区"}, {"regionID": "2335", "regionName": "槐荫区"}, {
            "regionID": "2336",
            "regionName": "历城区"
        }, {"regionID": "2337", "regionName": "长清区"}, {"regionID": "2338", "regionName": "章丘市"}, {
            "regionID": "2339",
            "regionName": "平阴县"
        }, {"regionID": "2340", "regionName": "济阳县"}, {"regionID": "2341", "regionName": "商河县"}]
    }, {
        "regionID": "284",
        "regionName": "青岛",
        "child": [{"regionID": "2342", "regionName": "市南区"}, {
            "regionID": "2343",
            "regionName": "市北区"
        }, {"regionID": "2344", "regionName": "城阳区"}, {"regionID": "2345", "regionName": "四方区"}, {
            "regionID": "2346",
            "regionName": "李沧区"
        }, {"regionID": "2347", "regionName": "黄岛区"}, {"regionID": "2348", "regionName": "崂山区"}, {
            "regionID": "2349",
            "regionName": "胶州市"
        }, {"regionID": "2350", "regionName": "即墨市"}, {"regionID": "2351", "regionName": "平度市"}, {
            "regionID": "2352",
            "regionName": "胶南市"
        }, {"regionID": "2353", "regionName": "莱西市"}]
    }, {
        "regionID": "285",
        "regionName": "滨州",
        "child": [{"regionID": "2354", "regionName": "滨城区"}, {
            "regionID": "2355",
            "regionName": "惠民县"
        }, {"regionID": "2356", "regionName": "阳信县"}, {"regionID": "2357", "regionName": "无棣县"}, {
            "regionID": "2358",
            "regionName": "沾化县"
        }, {"regionID": "2359", "regionName": "博兴县"}, {"regionID": "2360", "regionName": "邹平县"}]
    }, {
        "regionID": "286",
        "regionName": "德州",
        "child": [{"regionID": "2361", "regionName": "德城区"}, {
            "regionID": "2362",
            "regionName": "陵县"
        }, {"regionID": "2363", "regionName": "乐陵市"}, {"regionID": "2364", "regionName": "禹城市"}, {
            "regionID": "2365",
            "regionName": "宁津县"
        }, {"regionID": "2366", "regionName": "庆云县"}, {"regionID": "2367", "regionName": "临邑县"}, {
            "regionID": "2368",
            "regionName": "齐河县"
        }, {"regionID": "2369", "regionName": "平原县"}, {"regionID": "2370", "regionName": "夏津县"}, {
            "regionID": "2371",
            "regionName": "武城县"
        }]
    }, {
        "regionID": "287",
        "regionName": "东营",
        "child": [{"regionID": "2372", "regionName": "东营区"}, {
            "regionID": "2373",
            "regionName": "河口区"
        }, {"regionID": "2374", "regionName": "垦利县"}, {"regionID": "2375", "regionName": "利津县"}, {
            "regionID": "2376",
            "regionName": "广饶县"
        }]
    }, {
        "regionID": "288",
        "regionName": "菏泽",
        "child": [{"regionID": "2377", "regionName": "牡丹区"}, {
            "regionID": "2378",
            "regionName": "曹县"
        }, {"regionID": "2379", "regionName": "单县"}, {"regionID": "2380", "regionName": "成武县"}, {
            "regionID": "2381",
            "regionName": "巨野县"
        }, {"regionID": "2382", "regionName": "郓城县"}, {"regionID": "2383", "regionName": "鄄城县"}, {
            "regionID": "2384",
            "regionName": "定陶县"
        }, {"regionID": "2385", "regionName": "东明县"}]
    }, {
        "regionID": "289",
        "regionName": "济宁",
        "child": [{"regionID": "2386", "regionName": "市中区"}, {
            "regionID": "2387",
            "regionName": "任城区"
        }, {"regionID": "2388", "regionName": "曲阜市"}, {"regionID": "2389", "regionName": "兖州市"}, {
            "regionID": "2390",
            "regionName": "邹城市"
        }, {"regionID": "2391", "regionName": "微山县"}, {"regionID": "2392", "regionName": "鱼台县"}, {
            "regionID": "2393",
            "regionName": "金乡县"
        }, {"regionID": "2394", "regionName": "嘉祥县"}, {"regionID": "2395", "regionName": "汶上县"}, {
            "regionID": "2396",
            "regionName": "泗水县"
        }, {"regionID": "2397", "regionName": "梁山县"}]
    }, {
        "regionID": "290",
        "regionName": "莱芜",
        "child": [{"regionID": "2398", "regionName": "莱城区"}, {"regionID": "2399", "regionName": "钢城区"}]
    }, {
        "regionID": "291",
        "regionName": "聊城",
        "child": [{"regionID": "2400", "regionName": "东昌府区"}, {
            "regionID": "2401",
            "regionName": "临清市"
        }, {"regionID": "2402", "regionName": "阳谷县"}, {"regionID": "2403", "regionName": "莘县"}, {
            "regionID": "2404",
            "regionName": "茌平县"
        }, {"regionID": "2405", "regionName": "东阿县"}, {"regionID": "2406", "regionName": "冠县"}, {
            "regionID": "2407",
            "regionName": "高唐县"
        }]
    }, {
        "regionID": "292",
        "regionName": "临沂",
        "child": [{"regionID": "2408", "regionName": "兰山区"}, {
            "regionID": "2409",
            "regionName": "罗庄区"
        }, {"regionID": "2410", "regionName": "河东区"}, {"regionID": "2411", "regionName": "沂南县"}, {
            "regionID": "2412",
            "regionName": "郯城县"
        }, {"regionID": "2413", "regionName": "沂水县"}, {"regionID": "2414", "regionName": "苍山县"}, {
            "regionID": "2415",
            "regionName": "费县"
        }, {"regionID": "2416", "regionName": "平邑县"}, {"regionID": "2417", "regionName": "莒南县"}, {
            "regionID": "2418",
            "regionName": "蒙阴县"
        }, {"regionID": "2419", "regionName": "临沭县"}]
    }, {
        "regionID": "293",
        "regionName": "日照",
        "child": [{"regionID": "2420", "regionName": "东港区"}, {
            "regionID": "2421",
            "regionName": "岚山区"
        }, {"regionID": "2422", "regionName": "五莲县"}, {"regionID": "2423", "regionName": "莒县"}]
    }, {
        "regionID": "294",
        "regionName": "泰安",
        "child": [{"regionID": "2424", "regionName": "泰山区"}, {
            "regionID": "2425",
            "regionName": "岱岳区"
        }, {"regionID": "2426", "regionName": "新泰市"}, {"regionID": "2427", "regionName": "肥城市"}, {
            "regionID": "2428",
            "regionName": "宁阳县"
        }, {"regionID": "2429", "regionName": "东平县"}]
    }, {
        "regionID": "295",
        "regionName": "威海",
        "child": [{"regionID": "2430", "regionName": "荣成市"}, {
            "regionID": "2431",
            "regionName": "乳山市"
        }, {"regionID": "2432", "regionName": "环翠区"}, {"regionID": "2433", "regionName": "文登市"}]
    }, {
        "regionID": "296",
        "regionName": "潍坊",
        "child": [{"regionID": "2434", "regionName": "潍城区"}, {
            "regionID": "2435",
            "regionName": "寒亭区"
        }, {"regionID": "2436", "regionName": "坊子区"}, {"regionID": "2437", "regionName": "奎文区"}, {
            "regionID": "2438",
            "regionName": "青州市"
        }, {"regionID": "2439", "regionName": "诸城市"}, {"regionID": "2440", "regionName": "寿光市"}, {
            "regionID": "2441",
            "regionName": "安丘市"
        }, {"regionID": "2442", "regionName": "高密市"}, {"regionID": "2443", "regionName": "昌邑市"}, {
            "regionID": "2444",
            "regionName": "临朐县"
        }, {"regionID": "2445", "regionName": "昌乐县"}]
    }, {
        "regionID": "297",
        "regionName": "烟台",
        "child": [{"regionID": "2446", "regionName": "芝罘区"}, {
            "regionID": "2447",
            "regionName": "福山区"
        }, {"regionID": "2448", "regionName": "牟平区"}, {"regionID": "2449", "regionName": "莱山区"}, {
            "regionID": "2450",
            "regionName": "开发区"
        }, {"regionID": "2451", "regionName": "龙口市"}, {"regionID": "2452", "regionName": "莱阳市"}, {
            "regionID": "2453",
            "regionName": "莱州市"
        }, {"regionID": "2454", "regionName": "蓬莱市"}, {"regionID": "2455", "regionName": "招远市"}, {
            "regionID": "2456",
            "regionName": "栖霞市"
        }, {"regionID": "2457", "regionName": "海阳市"}, {"regionID": "2458", "regionName": "长岛县"}]
    }, {
        "regionID": "298",
        "regionName": "枣庄",
        "child": [{"regionID": "2459", "regionName": "市中区"}, {
            "regionID": "2460",
            "regionName": "山亭区"
        }, {"regionID": "2461", "regionName": "峄城区"}, {"regionID": "2462", "regionName": "台儿庄区"}, {
            "regionID": "2463",
            "regionName": "薛城区"
        }, {"regionID": "2464", "regionName": "滕州市"}]
    }, {
        "regionID": "299",
        "regionName": "淄博",
        "child": [{"regionID": "2465", "regionName": "张店区"}, {
            "regionID": "2466",
            "regionName": "临淄区"
        }, {"regionID": "2467", "regionName": "淄川区"}, {"regionID": "2468", "regionName": "博山区"}, {
            "regionID": "2469",
            "regionName": "周村区"
        }, {"regionID": "2470", "regionName": "桓台县"}, {"regionID": "2471", "regionName": "高青县"}, {
            "regionID": "2472",
            "regionName": "沂源县"
        }]
    }]
}, {
    "regionID": "23",
    "regionName": "山西",
    "child": [{
        "regionID": "300",
        "regionName": "太原",
        "child": [{"regionID": "2473", "regionName": "杏花岭区"}, {
            "regionID": "2474",
            "regionName": "小店区"
        }, {"regionID": "2475", "regionName": "迎泽区"}, {"regionID": "2476", "regionName": "尖草坪区"}, {
            "regionID": "2477",
            "regionName": "万柏林区"
        }, {"regionID": "2478", "regionName": "晋源区"}, {"regionID": "2479", "regionName": "高新开发区"}, {
            "regionID": "2480",
            "regionName": "民营经济开发区"
        }, {"regionID": "2481", "regionName": "经济技术开发区"}, {
            "regionID": "2482",
            "regionName": "清徐县"
        }, {"regionID": "2483", "regionName": "阳曲县"}, {"regionID": "2484", "regionName": "娄烦县"}, {
            "regionID": "2485",
            "regionName": "古交市"
        }]
    }, {
        "regionID": "301",
        "regionName": "长治",
        "child": [{"regionID": "2486", "regionName": "城区"}, {
            "regionID": "2487",
            "regionName": "郊区"
        }, {"regionID": "2488", "regionName": "沁县"}, {"regionID": "2489", "regionName": "潞城市"}, {
            "regionID": "2490",
            "regionName": "长治县"
        }, {"regionID": "2491", "regionName": "襄垣县"}, {"regionID": "2492", "regionName": "屯留县"}, {
            "regionID": "2493",
            "regionName": "平顺县"
        }, {"regionID": "2494", "regionName": "黎城县"}, {"regionID": "2495", "regionName": "壶关县"}, {
            "regionID": "2496",
            "regionName": "长子县"
        }, {"regionID": "2497", "regionName": "武乡县"}, {"regionID": "2498", "regionName": "沁源县"}]
    }, {
        "regionID": "302",
        "regionName": "大同",
        "child": [{"regionID": "2499", "regionName": "城区"}, {
            "regionID": "2500",
            "regionName": "矿区"
        }, {"regionID": "2501", "regionName": "南郊区"}, {"regionID": "2502", "regionName": "新荣区"}, {
            "regionID": "2503",
            "regionName": "阳高县"
        }, {"regionID": "2504", "regionName": "天镇县"}, {"regionID": "2505", "regionName": "广灵县"}, {
            "regionID": "2506",
            "regionName": "灵丘县"
        }, {"regionID": "2507", "regionName": "浑源县"}, {"regionID": "2508", "regionName": "左云县"}, {
            "regionID": "2509",
            "regionName": "大同县"
        }]
    }, {
        "regionID": "303",
        "regionName": "晋城",
        "child": [{"regionID": "2510", "regionName": "城区"}, {
            "regionID": "2511",
            "regionName": "高平市"
        }, {"regionID": "2512", "regionName": "沁水县"}, {"regionID": "2513", "regionName": "阳城县"}, {
            "regionID": "2514",
            "regionName": "陵川县"
        }, {"regionID": "2515", "regionName": "泽州县"}]
    }, {
        "regionID": "304",
        "regionName": "晋中",
        "child": [{"regionID": "2516", "regionName": "榆次区"}, {
            "regionID": "2517",
            "regionName": "介休市"
        }, {"regionID": "2518", "regionName": "榆社县"}, {"regionID": "2519", "regionName": "左权县"}, {
            "regionID": "2520",
            "regionName": "和顺县"
        }, {"regionID": "2521", "regionName": "昔阳县"}, {"regionID": "2522", "regionName": "寿阳县"}, {
            "regionID": "2523",
            "regionName": "太谷县"
        }, {"regionID": "2524", "regionName": "祁县"}, {"regionID": "2525", "regionName": "平遥县"}, {
            "regionID": "2526",
            "regionName": "灵石县"
        }]
    }, {
        "regionID": "305",
        "regionName": "临汾",
        "child": [{"regionID": "2527", "regionName": "尧都区"}, {
            "regionID": "2528",
            "regionName": "侯马市"
        }, {"regionID": "2529", "regionName": "霍州市"}, {"regionID": "2530", "regionName": "曲沃县"}, {
            "regionID": "2531",
            "regionName": "翼城县"
        }, {"regionID": "2532", "regionName": "襄汾县"}, {"regionID": "2533", "regionName": "洪洞县"}, {
            "regionID": "2534",
            "regionName": "吉县"
        }, {"regionID": "2535", "regionName": "安泽县"}, {"regionID": "2536", "regionName": "浮山县"}, {
            "regionID": "2537",
            "regionName": "古县"
        }, {"regionID": "2538", "regionName": "乡宁县"}, {"regionID": "2539", "regionName": "大宁县"}, {
            "regionID": "2540",
            "regionName": "隰县"
        }, {"regionID": "2541", "regionName": "永和县"}, {"regionID": "2542", "regionName": "蒲县"}, {
            "regionID": "2543",
            "regionName": "汾西县"
        }]
    }, {
        "regionID": "306",
        "regionName": "吕梁",
        "child": [{"regionID": "2544", "regionName": "离石市"}, {
            "regionID": "2545",
            "regionName": "离石区"
        }, {"regionID": "2546", "regionName": "孝义市"}, {"regionID": "2547", "regionName": "汾阳市"}, {
            "regionID": "2548",
            "regionName": "文水县"
        }, {"regionID": "2549", "regionName": "交城县"}, {"regionID": "2550", "regionName": "兴县"}, {
            "regionID": "2551",
            "regionName": "临县"
        }, {"regionID": "2552", "regionName": "柳林县"}, {"regionID": "2553", "regionName": "石楼县"}, {
            "regionID": "2554",
            "regionName": "岚县"
        }, {"regionID": "2555", "regionName": "方山县"}, {"regionID": "2556", "regionName": "中阳县"}, {
            "regionID": "2557",
            "regionName": "交口县"
        }]
    }, {
        "regionID": "307",
        "regionName": "朔州",
        "child": [{"regionID": "2558", "regionName": "朔城区"}, {
            "regionID": "2559",
            "regionName": "平鲁区"
        }, {"regionID": "2560", "regionName": "山阴县"}, {"regionID": "2561", "regionName": "应县"}, {
            "regionID": "2562",
            "regionName": "右玉县"
        }, {"regionID": "2563", "regionName": "怀仁县"}]
    }, {
        "regionID": "308",
        "regionName": "忻州",
        "child": [{"regionID": "2564", "regionName": "忻府区"}, {
            "regionID": "2565",
            "regionName": "原平市"
        }, {"regionID": "2566", "regionName": "定襄县"}, {"regionID": "2567", "regionName": "五台县"}, {
            "regionID": "2568",
            "regionName": "代县"
        }, {"regionID": "2569", "regionName": "繁峙县"}, {"regionID": "2570", "regionName": "宁武县"}, {
            "regionID": "2571",
            "regionName": "静乐县"
        }, {"regionID": "2572", "regionName": "神池县"}, {"regionID": "2573", "regionName": "五寨县"}, {
            "regionID": "2574",
            "regionName": "岢岚县"
        }, {"regionID": "2575", "regionName": "河曲县"}, {"regionID": "2576", "regionName": "保德县"}, {
            "regionID": "2577",
            "regionName": "偏关县"
        }]
    }, {
        "regionID": "309",
        "regionName": "阳泉",
        "child": [{"regionID": "2578", "regionName": "城区"}, {
            "regionID": "2579",
            "regionName": "矿区"
        }, {"regionID": "2580", "regionName": "郊区"}, {"regionID": "2581", "regionName": "平定县"}, {
            "regionID": "2582",
            "regionName": "盂县"
        }]
    }, {
        "regionID": "310",
        "regionName": "运城",
        "child": [{"regionID": "2583", "regionName": "盐湖区"}, {
            "regionID": "2584",
            "regionName": "永济市"
        }, {"regionID": "2585", "regionName": "河津市"}, {"regionID": "2586", "regionName": "临猗县"}, {
            "regionID": "2587",
            "regionName": "万荣县"
        }, {"regionID": "2588", "regionName": "闻喜县"}, {"regionID": "2589", "regionName": "稷山县"}, {
            "regionID": "2590",
            "regionName": "新绛县"
        }, {"regionID": "2591", "regionName": "绛县"}, {"regionID": "2592", "regionName": "垣曲县"}, {
            "regionID": "2593",
            "regionName": "夏县"
        }, {"regionID": "2594", "regionName": "平陆县"}, {"regionID": "2595", "regionName": "芮城县"}]
    }]
}, {
    "regionID": "24",
    "regionName": "陕西",
    "child": [{
        "regionID": "311",
        "regionName": "西安",
        "child": [{"regionID": "2596", "regionName": "莲湖区"}, {
            "regionID": "2597",
            "regionName": "新城区"
        }, {"regionID": "2598", "regionName": "碑林区"}, {"regionID": "2599", "regionName": "雁塔区"}, {
            "regionID": "2600",
            "regionName": "灞桥区"
        }, {"regionID": "2601", "regionName": "未央区"}, {"regionID": "2602", "regionName": "阎良区"}, {
            "regionID": "2603",
            "regionName": "临潼区"
        }, {"regionID": "2604", "regionName": "长安区"}, {"regionID": "2605", "regionName": "蓝田县"}, {
            "regionID": "2606",
            "regionName": "周至县"
        }, {"regionID": "2607", "regionName": "户县"}, {"regionID": "2608", "regionName": "高陵县"}]
    }, {
        "regionID": "312",
        "regionName": "安康",
        "child": [{"regionID": "2609", "regionName": "汉滨区"}, {
            "regionID": "2610",
            "regionName": "汉阴县"
        }, {"regionID": "2611", "regionName": "石泉县"}, {"regionID": "2612", "regionName": "宁陕县"}, {
            "regionID": "2613",
            "regionName": "紫阳县"
        }, {"regionID": "2614", "regionName": "岚皋县"}, {"regionID": "2615", "regionName": "平利县"}, {
            "regionID": "2616",
            "regionName": "镇坪县"
        }, {"regionID": "2617", "regionName": "旬阳县"}, {"regionID": "2618", "regionName": "白河县"}]
    }, {
        "regionID": "313",
        "regionName": "宝鸡",
        "child": [{"regionID": "2619", "regionName": "陈仓区"}, {
            "regionID": "2620",
            "regionName": "渭滨区"
        }, {"regionID": "2621", "regionName": "金台区"}, {"regionID": "2622", "regionName": "凤翔县"}, {
            "regionID": "2623",
            "regionName": "岐山县"
        }, {"regionID": "2624", "regionName": "扶风县"}, {"regionID": "2625", "regionName": "眉县"}, {
            "regionID": "2626",
            "regionName": "陇县"
        }, {"regionID": "2627", "regionName": "千阳县"}, {"regionID": "2628", "regionName": "麟游县"}, {
            "regionID": "2629",
            "regionName": "凤县"
        }, {"regionID": "2630", "regionName": "太白县"}]
    }, {
        "regionID": "314",
        "regionName": "汉中",
        "child": [{"regionID": "2631", "regionName": "汉台区"}, {
            "regionID": "2632",
            "regionName": "南郑县"
        }, {"regionID": "2633", "regionName": "城固县"}, {"regionID": "2634", "regionName": "洋县"}, {
            "regionID": "2635",
            "regionName": "西乡县"
        }, {"regionID": "2636", "regionName": "勉县"}, {"regionID": "2637", "regionName": "宁强县"}, {
            "regionID": "2638",
            "regionName": "略阳县"
        }, {"regionID": "2639", "regionName": "镇巴县"}, {"regionID": "2640", "regionName": "留坝县"}, {
            "regionID": "2641",
            "regionName": "佛坪县"
        }]
    }, {
        "regionID": "315",
        "regionName": "商洛",
        "child": [{"regionID": "2642", "regionName": "商州区"}, {
            "regionID": "2643",
            "regionName": "洛南县"
        }, {"regionID": "2644", "regionName": "丹凤县"}, {"regionID": "2645", "regionName": "商南县"}, {
            "regionID": "2646",
            "regionName": "山阳县"
        }, {"regionID": "2647", "regionName": "镇安县"}, {"regionID": "2648", "regionName": "柞水县"}]
    }, {
        "regionID": "316",
        "regionName": "铜川",
        "child": [{"regionID": "2649", "regionName": "耀州区"}, {
            "regionID": "2650",
            "regionName": "王益区"
        }, {"regionID": "2651", "regionName": "印台区"}, {"regionID": "2652", "regionName": "宜君县"}]
    }, {
        "regionID": "317",
        "regionName": "渭南",
        "child": [{"regionID": "2653", "regionName": "临渭区"}, {
            "regionID": "2654",
            "regionName": "韩城市"
        }, {"regionID": "2655", "regionName": "华阴市"}, {"regionID": "2656", "regionName": "华县"}, {
            "regionID": "2657",
            "regionName": "潼关县"
        }, {"regionID": "2658", "regionName": "大荔县"}, {"regionID": "2659", "regionName": "合阳县"}, {
            "regionID": "2660",
            "regionName": "澄城县"
        }, {"regionID": "2661", "regionName": "蒲城县"}, {"regionID": "2662", "regionName": "白水县"}, {
            "regionID": "2663",
            "regionName": "富平县"
        }]
    }, {
        "regionID": "318",
        "regionName": "咸阳",
        "child": [{"regionID": "2664", "regionName": "秦都区"}, {
            "regionID": "2665",
            "regionName": "渭城区"
        }, {"regionID": "2666", "regionName": "杨陵区"}, {"regionID": "2667", "regionName": "兴平市"}, {
            "regionID": "2668",
            "regionName": "三原县"
        }, {"regionID": "2669", "regionName": "泾阳县"}, {"regionID": "2670", "regionName": "乾县"}, {
            "regionID": "2671",
            "regionName": "礼泉县"
        }, {"regionID": "2672", "regionName": "永寿县"}, {"regionID": "2673", "regionName": "彬县"}, {
            "regionID": "2674",
            "regionName": "长武县"
        }, {"regionID": "2675", "regionName": "旬邑县"}, {"regionID": "2676", "regionName": "淳化县"}, {
            "regionID": "2677",
            "regionName": "武功县"
        }]
    }, {
        "regionID": "319",
        "regionName": "延安",
        "child": [{"regionID": "2678", "regionName": "吴起县"}, {
            "regionID": "2679",
            "regionName": "宝塔区"
        }, {"regionID": "2680", "regionName": "延长县"}, {"regionID": "2681", "regionName": "延川县"}, {
            "regionID": "2682",
            "regionName": "子长县"
        }, {"regionID": "2683", "regionName": "安塞县"}, {"regionID": "2684", "regionName": "志丹县"}, {
            "regionID": "2685",
            "regionName": "甘泉县"
        }, {"regionID": "2686", "regionName": "富县"}, {"regionID": "2687", "regionName": "洛川县"}, {
            "regionID": "2688",
            "regionName": "宜川县"
        }, {"regionID": "2689", "regionName": "黄龙县"}, {"regionID": "2690", "regionName": "黄陵县"}]
    }, {
        "regionID": "320",
        "regionName": "榆林",
        "child": [{"regionID": "2691", "regionName": "榆阳区"}, {
            "regionID": "2692",
            "regionName": "神木县"
        }, {"regionID": "2693", "regionName": "府谷县"}, {"regionID": "2694", "regionName": "横山县"}, {
            "regionID": "2695",
            "regionName": "靖边县"
        }, {"regionID": "2696", "regionName": "定边县"}, {"regionID": "2697", "regionName": "绥德县"}, {
            "regionID": "2698",
            "regionName": "米脂县"
        }, {"regionID": "2699", "regionName": "佳县"}, {"regionID": "2700", "regionName": "吴堡县"}, {
            "regionID": "2701",
            "regionName": "清涧县"
        }, {"regionID": "2702", "regionName": "子洲县"}]
    }]
}, {
    "regionID": "25",
    "regionName": "上海",
    "child": [{
        "regionID": "321",
        "regionName": "上海市",
        "child": [{"regionID": "2703", "regionName": "长宁区"}, {
            "regionID": "2704",
            "regionName": "闸北区"
        }, {"regionID": "2705", "regionName": "闵行区"}, {"regionID": "2706", "regionName": "徐汇区"}, {
            "regionID": "2707",
            "regionName": "浦东新区"
        }, {"regionID": "2708", "regionName": "杨浦区"}, {"regionID": "2709", "regionName": "普陀区"}, {
            "regionID": "2710",
            "regionName": "静安区"
        }, {"regionID": "2711", "regionName": "卢湾区"}, {"regionID": "2712", "regionName": "虹口区"}, {
            "regionID": "2713",
            "regionName": "黄浦区"
        }, {"regionID": "2714", "regionName": "南汇区"}, {"regionID": "2715", "regionName": "松江区"}, {
            "regionID": "2716",
            "regionName": "嘉定区"
        }, {"regionID": "2717", "regionName": "宝山区"}, {"regionID": "2718", "regionName": "青浦区"}, {
            "regionID": "2719",
            "regionName": "金山区"
        }, {"regionID": "2720", "regionName": "奉贤区"}, {"regionID": "2721", "regionName": "崇明县"}]
    }]
}, {
    "regionID": "26",
    "regionName": "四川",
    "child": [{
        "regionID": "322",
        "regionName": "成都",
        "child": [{"regionID": "2722", "regionName": "青羊区"}, {
            "regionID": "2723",
            "regionName": "锦江区"
        }, {"regionID": "2724", "regionName": "金牛区"}, {"regionID": "2725", "regionName": "武侯区"}, {
            "regionID": "2726",
            "regionName": "成华区"
        }, {"regionID": "2727", "regionName": "龙泉驿区"}, {"regionID": "2728", "regionName": "青白江区"}, {
            "regionID": "2729",
            "regionName": "新都区"
        }, {"regionID": "2730", "regionName": "温江区"}, {"regionID": "2731", "regionName": "高新区"}, {
            "regionID": "2732",
            "regionName": "高新西区"
        }, {"regionID": "2733", "regionName": "都江堰市"}, {"regionID": "2734", "regionName": "彭州市"}, {
            "regionID": "2735",
            "regionName": "邛崃市"
        }, {"regionID": "2736", "regionName": "崇州市"}, {"regionID": "2737", "regionName": "金堂县"}, {
            "regionID": "2738",
            "regionName": "双流县"
        }, {"regionID": "2739", "regionName": "郫县"}, {"regionID": "2740", "regionName": "大邑县"}, {
            "regionID": "2741",
            "regionName": "蒲江县"
        }, {"regionID": "2742", "regionName": "新津县"}, {"regionID": "2743", "regionName": "都江堰市"}, {
            "regionID": "2744",
            "regionName": "彭州市"
        }, {"regionID": "2745", "regionName": "邛崃市"}, {"regionID": "2746", "regionName": "崇州市"}, {
            "regionID": "2747",
            "regionName": "金堂县"
        }, {"regionID": "2748", "regionName": "双流县"}, {"regionID": "2749", "regionName": "郫县"}, {
            "regionID": "2750",
            "regionName": "大邑县"
        }, {"regionID": "2751", "regionName": "蒲江县"}, {"regionID": "2752", "regionName": "新津县"}]
    }, {
        "regionID": "323",
        "regionName": "绵阳",
        "child": [{"regionID": "2753", "regionName": "涪城区"}, {
            "regionID": "2754",
            "regionName": "游仙区"
        }, {"regionID": "2755", "regionName": "江油市"}, {"regionID": "2756", "regionName": "盐亭县"}, {
            "regionID": "2757",
            "regionName": "三台县"
        }, {"regionID": "2758", "regionName": "平武县"}, {"regionID": "2759", "regionName": "安县"}, {
            "regionID": "2760",
            "regionName": "梓潼县"
        }, {"regionID": "2761", "regionName": "北川县"}]
    }, {
        "regionID": "324",
        "regionName": "阿坝",
        "child": [{"regionID": "2762", "regionName": "马尔康县"}, {
            "regionID": "2763",
            "regionName": "汶川县"
        }, {"regionID": "2764", "regionName": "理县"}, {"regionID": "2765", "regionName": "茂县"}, {
            "regionID": "2766",
            "regionName": "松潘县"
        }, {"regionID": "2767", "regionName": "九寨沟县"}, {"regionID": "2768", "regionName": "金川县"}, {
            "regionID": "2769",
            "regionName": "小金县"
        }, {"regionID": "2770", "regionName": "黑水县"}, {"regionID": "2771", "regionName": "壤塘县"}, {
            "regionID": "2772",
            "regionName": "阿坝县"
        }, {"regionID": "2773", "regionName": "若尔盖县"}, {"regionID": "2774", "regionName": "红原县"}]
    }, {
        "regionID": "325",
        "regionName": "巴中",
        "child": [{"regionID": "2775", "regionName": "巴州区"}, {
            "regionID": "2776",
            "regionName": "通江县"
        }, {"regionID": "2777", "regionName": "南江县"}, {"regionID": "2778", "regionName": "平昌县"}]
    }, {
        "regionID": "326",
        "regionName": "达州",
        "child": [{"regionID": "2779", "regionName": "通川区"}, {
            "regionID": "2780",
            "regionName": "万源市"
        }, {"regionID": "2781", "regionName": "达县"}, {"regionID": "2782", "regionName": "宣汉县"}, {
            "regionID": "2783",
            "regionName": "开江县"
        }, {"regionID": "2784", "regionName": "大竹县"}, {"regionID": "2785", "regionName": "渠县"}]
    }, {
        "regionID": "327",
        "regionName": "德阳",
        "child": [{"regionID": "2786", "regionName": "旌阳区"}, {
            "regionID": "2787",
            "regionName": "广汉市"
        }, {"regionID": "2788", "regionName": "什邡市"}, {"regionID": "2789", "regionName": "绵竹市"}, {
            "regionID": "2790",
            "regionName": "罗江县"
        }, {"regionID": "2791", "regionName": "中江县"}]
    }, {
        "regionID": "328",
        "regionName": "甘孜",
        "child": [{"regionID": "2792", "regionName": "康定县"}, {
            "regionID": "2793",
            "regionName": "丹巴县"
        }, {"regionID": "2794", "regionName": "泸定县"}, {"regionID": "2795", "regionName": "炉霍县"}, {
            "regionID": "2796",
            "regionName": "九龙县"
        }, {"regionID": "2797", "regionName": "甘孜县"}, {"regionID": "2798", "regionName": "雅江县"}, {
            "regionID": "2799",
            "regionName": "新龙县"
        }, {"regionID": "2800", "regionName": "道孚县"}, {"regionID": "2801", "regionName": "白玉县"}, {
            "regionID": "2802",
            "regionName": "理塘县"
        }, {"regionID": "2803", "regionName": "德格县"}, {"regionID": "2804", "regionName": "乡城县"}, {
            "regionID": "2805",
            "regionName": "石渠县"
        }, {"regionID": "2806", "regionName": "稻城县"}, {"regionID": "2807", "regionName": "色达县"}, {
            "regionID": "2808",
            "regionName": "巴塘县"
        }, {"regionID": "2809", "regionName": "得荣县"}]
    }, {
        "regionID": "329",
        "regionName": "广安",
        "child": [{"regionID": "2810", "regionName": "广安区"}, {
            "regionID": "2811",
            "regionName": "华蓥市"
        }, {"regionID": "2812", "regionName": "岳池县"}, {"regionID": "2813", "regionName": "武胜县"}, {
            "regionID": "2814",
            "regionName": "邻水县"
        }]
    }, {
        "regionID": "330",
        "regionName": "广元",
        "child": [{"regionID": "2815", "regionName": "利州区"}, {
            "regionID": "2816",
            "regionName": "元坝区"
        }, {"regionID": "2817", "regionName": "朝天区"}, {"regionID": "2818", "regionName": "旺苍县"}, {
            "regionID": "2819",
            "regionName": "青川县"
        }, {"regionID": "2820", "regionName": "剑阁县"}, {"regionID": "2821", "regionName": "苍溪县"}]
    }, {
        "regionID": "331",
        "regionName": "乐山",
        "child": [{"regionID": "2822", "regionName": "峨眉山市"}, {
            "regionID": "2823",
            "regionName": "乐山市"
        }, {"regionID": "2824", "regionName": "犍为县"}, {"regionID": "2825", "regionName": "井研县"}, {
            "regionID": "2826",
            "regionName": "夹江县"
        }, {"regionID": "2827", "regionName": "沐川县"}, {"regionID": "2828", "regionName": "峨边"}, {
            "regionID": "2829",
            "regionName": "马边"
        }]
    }, {
        "regionID": "332",
        "regionName": "凉山",
        "child": [{"regionID": "2830", "regionName": "西昌市"}, {
            "regionID": "2831",
            "regionName": "盐源县"
        }, {"regionID": "2832", "regionName": "德昌县"}, {"regionID": "2833", "regionName": "会理县"}, {
            "regionID": "2834",
            "regionName": "会东县"
        }, {"regionID": "2835", "regionName": "宁南县"}, {"regionID": "2836", "regionName": "普格县"}, {
            "regionID": "2837",
            "regionName": "布拖县"
        }, {"regionID": "2838", "regionName": "金阳县"}, {"regionID": "2839", "regionName": "昭觉县"}, {
            "regionID": "2840",
            "regionName": "喜德县"
        }, {"regionID": "2841", "regionName": "冕宁县"}, {"regionID": "2842", "regionName": "越西县"}, {
            "regionID": "2843",
            "regionName": "甘洛县"
        }, {"regionID": "2844", "regionName": "美姑县"}, {"regionID": "2845", "regionName": "雷波县"}, {
            "regionID": "2846",
            "regionName": "木里"
        }]
    }, {
        "regionID": "333",
        "regionName": "眉山",
        "child": [{"regionID": "2847", "regionName": "东坡区"}, {
            "regionID": "2848",
            "regionName": "仁寿县"
        }, {"regionID": "2849", "regionName": "彭山县"}, {"regionID": "2850", "regionName": "洪雅县"}, {
            "regionID": "2851",
            "regionName": "丹棱县"
        }, {"regionID": "2852", "regionName": "青神县"}]
    }, {
        "regionID": "334",
        "regionName": "南充",
        "child": [{"regionID": "2853", "regionName": "阆中市"}, {
            "regionID": "2854",
            "regionName": "南部县"
        }, {"regionID": "2855", "regionName": "营山县"}, {"regionID": "2856", "regionName": "蓬安县"}, {
            "regionID": "2857",
            "regionName": "仪陇县"
        }, {"regionID": "2858", "regionName": "顺庆区"}, {"regionID": "2859", "regionName": "高坪区"}, {
            "regionID": "2860",
            "regionName": "嘉陵区"
        }, {"regionID": "2861", "regionName": "西充县"}]
    }, {
        "regionID": "335",
        "regionName": "内江",
        "child": [{"regionID": "2862", "regionName": "市中区"}, {
            "regionID": "2863",
            "regionName": "东兴区"
        }, {"regionID": "2864", "regionName": "威远县"}, {"regionID": "2865", "regionName": "资中县"}, {
            "regionID": "2866",
            "regionName": "隆昌县"
        }]
    }, {
        "regionID": "336",
        "regionName": "攀枝花",
        "child": [{"regionID": "2867", "regionName": "东  区"}, {
            "regionID": "2868",
            "regionName": "西  区"
        }, {"regionID": "2869", "regionName": "仁和区"}, {"regionID": "2870", "regionName": "米易县"}, {
            "regionID": "2871",
            "regionName": "盐边县"
        }]
    }, {
        "regionID": "337",
        "regionName": "遂宁",
        "child": [{"regionID": "2872", "regionName": "船山区"}, {
            "regionID": "2873",
            "regionName": "安居区"
        }, {"regionID": "2874", "regionName": "蓬溪县"}, {"regionID": "2875", "regionName": "射洪县"}, {
            "regionID": "2876",
            "regionName": "大英县"
        }]
    }, {
        "regionID": "338",
        "regionName": "雅安",
        "child": [{"regionID": "2877", "regionName": "雨城区"}, {
            "regionID": "2878",
            "regionName": "名山县"
        }, {"regionID": "2879", "regionName": "荥经县"}, {"regionID": "2880", "regionName": "汉源县"}, {
            "regionID": "2881",
            "regionName": "石棉县"
        }, {"regionID": "2882", "regionName": "天全县"}, {"regionID": "2883", "regionName": "芦山县"}, {
            "regionID": "2884",
            "regionName": "宝兴县"
        }]
    }, {
        "regionID": "339",
        "regionName": "宜宾",
        "child": [{"regionID": "2885", "regionName": "翠屏区"}, {
            "regionID": "2886",
            "regionName": "宜宾县"
        }, {"regionID": "2887", "regionName": "南溪县"}, {"regionID": "2888", "regionName": "江安县"}, {
            "regionID": "2889",
            "regionName": "长宁县"
        }, {"regionID": "2890", "regionName": "高县"}, {"regionID": "2891", "regionName": "珙县"}, {
            "regionID": "2892",
            "regionName": "筠连县"
        }, {"regionID": "2893", "regionName": "兴文县"}, {"regionID": "2894", "regionName": "屏山县"}]
    }, {
        "regionID": "340",
        "regionName": "资阳",
        "child": [{"regionID": "2895", "regionName": "雁江区"}, {
            "regionID": "2896",
            "regionName": "简阳市"
        }, {"regionID": "2897", "regionName": "安岳县"}, {"regionID": "2898", "regionName": "乐至县"}]
    }, {
        "regionID": "341",
        "regionName": "自贡",
        "child": [{"regionID": "2899", "regionName": "大安区"}, {
            "regionID": "2900",
            "regionName": "自流井区"
        }, {"regionID": "2901", "regionName": "贡井区"}, {"regionID": "2902", "regionName": "沿滩区"}, {
            "regionID": "2903",
            "regionName": "荣县"
        }, {"regionID": "2904", "regionName": "富顺县"}]
    }, {
        "regionID": "342",
        "regionName": "泸州",
        "child": [{"regionID": "2905", "regionName": "江阳区"}, {
            "regionID": "2906",
            "regionName": "纳溪区"
        }, {"regionID": "2907", "regionName": "龙马潭区"}, {"regionID": "2908", "regionName": "泸县"}, {
            "regionID": "2909",
            "regionName": "合江县"
        }, {"regionID": "2910", "regionName": "叙永县"}, {"regionID": "2911", "regionName": "古蔺县"}]
    }]
}, {
    "regionID": "27",
    "regionName": "天津",
    "child": [{
        "regionID": "343",
        "regionName": "天津市",
        "child": [{"regionID": "2912", "regionName": "和平区"}, {
            "regionID": "2913",
            "regionName": "河西区"
        }, {"regionID": "2914", "regionName": "南开区"}, {"regionID": "2915", "regionName": "河北区"}, {
            "regionID": "2916",
            "regionName": "河东区"
        }, {"regionID": "2917", "regionName": "红桥区"}, {"regionID": "2918", "regionName": "东丽区"}, {
            "regionID": "2919",
            "regionName": "津南区"
        }, {"regionID": "2920", "regionName": "西青区"}, {"regionID": "2921", "regionName": "北辰区"}, {
            "regionID": "2922",
            "regionName": "塘沽区"
        }, {"regionID": "2923", "regionName": "汉沽区"}, {"regionID": "2924", "regionName": "大港区"}, {
            "regionID": "2925",
            "regionName": "武清区"
        }, {"regionID": "2926", "regionName": "宝坻区"}, {"regionID": "2927", "regionName": "经济开发区"}, {
            "regionID": "2928",
            "regionName": "宁河县"
        }, {"regionID": "2929", "regionName": "静海县"}, {"regionID": "2930", "regionName": "蓟县"}]
    }]
}, {
    "regionID": "28",
    "regionName": "西藏",
    "child": [{
        "regionID": "344",
        "regionName": "拉萨",
        "child": [{"regionID": "2931", "regionName": "城关区"}, {
            "regionID": "2932",
            "regionName": "林周县"
        }, {"regionID": "2933", "regionName": "当雄县"}, {"regionID": "2934", "regionName": "尼木县"}, {
            "regionID": "2935",
            "regionName": "曲水县"
        }, {"regionID": "2936", "regionName": "堆龙德庆县"}, {"regionID": "2937", "regionName": "达孜县"}, {
            "regionID": "2938",
            "regionName": "墨竹工卡县"
        }]
    }, {
        "regionID": "345",
        "regionName": "阿里",
        "child": [{"regionID": "2939", "regionName": "噶尔县"}, {
            "regionID": "2940",
            "regionName": "普兰县"
        }, {"regionID": "2941", "regionName": "札达县"}, {"regionID": "2942", "regionName": "日土县"}, {
            "regionID": "2943",
            "regionName": "革吉县"
        }, {"regionID": "2944", "regionName": "改则县"}, {"regionID": "2945", "regionName": "措勤县"}]
    }, {
        "regionID": "346",
        "regionName": "昌都",
        "child": [{"regionID": "2946", "regionName": "昌都县"}, {
            "regionID": "2947",
            "regionName": "江达县"
        }, {"regionID": "2948", "regionName": "贡觉县"}, {"regionID": "2949", "regionName": "类乌齐县"}, {
            "regionID": "2950",
            "regionName": "丁青县"
        }, {"regionID": "2951", "regionName": "察雅县"}, {"regionID": "2952", "regionName": "八宿县"}, {
            "regionID": "2953",
            "regionName": "左贡县"
        }, {"regionID": "2954", "regionName": "芒康县"}, {"regionID": "2955", "regionName": "洛隆县"}, {
            "regionID": "2956",
            "regionName": "边坝县"
        }]
    }, {
        "regionID": "347",
        "regionName": "林芝",
        "child": [{"regionID": "2957", "regionName": "林芝县"}, {
            "regionID": "2958",
            "regionName": "工布江达县"
        }, {"regionID": "2959", "regionName": "米林县"}, {"regionID": "2960", "regionName": "墨脱县"}, {
            "regionID": "2961",
            "regionName": "波密县"
        }, {"regionID": "2962", "regionName": "察隅县"}, {"regionID": "2963", "regionName": "朗县"}]
    }, {
        "regionID": "348",
        "regionName": "那曲",
        "child": [{"regionID": "2964", "regionName": "那曲县"}, {
            "regionID": "2965",
            "regionName": "嘉黎县"
        }, {"regionID": "2966", "regionName": "比如县"}, {"regionID": "2967", "regionName": "聂荣县"}, {
            "regionID": "2968",
            "regionName": "安多县"
        }, {"regionID": "2969", "regionName": "申扎县"}, {"regionID": "2970", "regionName": "索县"}, {
            "regionID": "2971",
            "regionName": "班戈县"
        }, {"regionID": "2972", "regionName": "巴青县"}, {"regionID": "2973", "regionName": "尼玛县"}]
    }, {
        "regionID": "349",
        "regionName": "日喀则",
        "child": [{"regionID": "2974", "regionName": "日喀则市"}, {
            "regionID": "2975",
            "regionName": "南木林县"
        }, {"regionID": "2976", "regionName": "江孜县"}, {"regionID": "2977", "regionName": "定日县"}, {
            "regionID": "2978",
            "regionName": "萨迦县"
        }, {"regionID": "2979", "regionName": "拉孜县"}, {"regionID": "2980", "regionName": "昂仁县"}, {
            "regionID": "2981",
            "regionName": "谢通门县"
        }, {"regionID": "2982", "regionName": "白朗县"}, {"regionID": "2983", "regionName": "仁布县"}, {
            "regionID": "2984",
            "regionName": "康马县"
        }, {"regionID": "2985", "regionName": "定结县"}, {"regionID": "2986", "regionName": "仲巴县"}, {
            "regionID": "2987",
            "regionName": "亚东县"
        }, {"regionID": "2988", "regionName": "吉隆县"}, {"regionID": "2989", "regionName": "聂拉木县"}, {
            "regionID": "2990",
            "regionName": "萨嘎县"
        }, {"regionID": "2991", "regionName": "岗巴县"}]
    }, {
        "regionID": "350",
        "regionName": "山南",
        "child": [{"regionID": "2992", "regionName": "乃东县"}, {
            "regionID": "2993",
            "regionName": "扎囊县"
        }, {"regionID": "2994", "regionName": "贡嘎县"}, {"regionID": "2995", "regionName": "桑日县"}, {
            "regionID": "2996",
            "regionName": "琼结县"
        }, {"regionID": "2997", "regionName": "曲松县"}, {"regionID": "2998", "regionName": "措美县"}, {
            "regionID": "2999",
            "regionName": "洛扎县"
        }, {"regionID": "3000", "regionName": "加查县"}, {"regionID": "3001", "regionName": "隆子县"}, {
            "regionID": "3002",
            "regionName": "错那县"
        }, {"regionID": "3003", "regionName": "浪卡子县"}]
    }]
}, {
    "regionID": "29",
    "regionName": "新疆",
    "child": [{
        "regionID": "351",
        "regionName": "乌鲁木齐",
        "child": [{"regionID": "3004", "regionName": "天山区"}, {
            "regionID": "3005",
            "regionName": "沙依巴克区"
        }, {"regionID": "3006", "regionName": "新市区"}, {"regionID": "3007", "regionName": "水磨沟区"}, {
            "regionID": "3008",
            "regionName": "头屯河区"
        }, {"regionID": "3009", "regionName": "达坂城区"}, {"regionID": "3010", "regionName": "米东区"}, {
            "regionID": "3011",
            "regionName": "乌鲁木齐县"
        }]
    }, {
        "regionID": "352",
        "regionName": "阿克苏",
        "child": [{"regionID": "3012", "regionName": "阿克苏市"}, {
            "regionID": "3013",
            "regionName": "温宿县"
        }, {"regionID": "3014", "regionName": "库车县"}, {"regionID": "3015", "regionName": "沙雅县"}, {
            "regionID": "3016",
            "regionName": "新和县"
        }, {"regionID": "3017", "regionName": "拜城县"}, {"regionID": "3018", "regionName": "乌什县"}, {
            "regionID": "3019",
            "regionName": "阿瓦提县"
        }, {"regionID": "3020", "regionName": "柯坪县"}]
    }, {
        "regionID": "353",
        "regionName": "阿拉尔",
        "child": [{"regionID": "3021", "regionName": "阿拉尔市"}]
    }, {
        "regionID": "354",
        "regionName": "巴音郭楞",
        "child": [{"regionID": "3022", "regionName": "库尔勒市"}, {
            "regionID": "3023",
            "regionName": "轮台县"
        }, {"regionID": "3024", "regionName": "尉犁县"}, {"regionID": "3025", "regionName": "若羌县"}, {
            "regionID": "3026",
            "regionName": "且末县"
        }, {"regionID": "3027", "regionName": "焉耆"}, {"regionID": "3028", "regionName": "和静县"}, {
            "regionID": "3029",
            "regionName": "和硕县"
        }, {"regionID": "3030", "regionName": "博湖县"}]
    }, {
        "regionID": "355",
        "regionName": "博尔塔拉",
        "child": [{"regionID": "3031", "regionName": "博乐市"}, {
            "regionID": "3032",
            "regionName": "精河县"
        }, {"regionID": "3033", "regionName": "温泉县"}]
    }, {
        "regionID": "356",
        "regionName": "昌吉",
        "child": [{"regionID": "3034", "regionName": "呼图壁县"}, {
            "regionID": "3035",
            "regionName": "米泉市"
        }, {"regionID": "3036", "regionName": "昌吉市"}, {"regionID": "3037", "regionName": "阜康市"}, {
            "regionID": "3038",
            "regionName": "玛纳斯县"
        }, {"regionID": "3039", "regionName": "奇台县"}, {"regionID": "3040", "regionName": "吉木萨尔县"}, {
            "regionID": "3041",
            "regionName": "木垒"
        }]
    }, {
        "regionID": "357",
        "regionName": "哈密",
        "child": [{"regionID": "3042", "regionName": "哈密市"}, {
            "regionID": "3043",
            "regionName": "伊吾县"
        }, {"regionID": "3044", "regionName": "巴里坤"}]
    }, {
        "regionID": "358",
        "regionName": "和田",
        "child": [{"regionID": "3045", "regionName": "和田市"}, {
            "regionID": "3046",
            "regionName": "和田县"
        }, {"regionID": "3047", "regionName": "墨玉县"}, {"regionID": "3048", "regionName": "皮山县"}, {
            "regionID": "3049",
            "regionName": "洛浦县"
        }, {"regionID": "3050", "regionName": "策勒县"}, {"regionID": "3051", "regionName": "于田县"}, {
            "regionID": "3052",
            "regionName": "民丰县"
        }]
    }, {
        "regionID": "359",
        "regionName": "喀什",
        "child": [{"regionID": "3053", "regionName": "喀什市"}, {
            "regionID": "3054",
            "regionName": "疏附县"
        }, {"regionID": "3055", "regionName": "疏勒县"}, {"regionID": "3056", "regionName": "英吉沙县"}, {
            "regionID": "3057",
            "regionName": "泽普县"
        }, {"regionID": "3058", "regionName": "莎车县"}, {"regionID": "3059", "regionName": "叶城县"}, {
            "regionID": "3060",
            "regionName": "麦盖提县"
        }, {"regionID": "3061", "regionName": "岳普湖县"}, {"regionID": "3062", "regionName": "伽师县"}, {
            "regionID": "3063",
            "regionName": "巴楚县"
        }, {"regionID": "3064", "regionName": "塔什库尔干"}]
    }, {
        "regionID": "360",
        "regionName": "克拉玛依",
        "child": [{"regionID": "3065", "regionName": "克拉玛依市"}]
    }, {
        "regionID": "361",
        "regionName": "克孜勒苏",
        "child": [{"regionID": "3066", "regionName": "阿图什市"}, {
            "regionID": "3067",
            "regionName": "阿克陶县"
        }, {"regionID": "3068", "regionName": "阿合奇县"}, {"regionID": "3069", "regionName": "乌恰县"}]
    }, {
        "regionID": "362",
        "regionName": "石河子",
        "child": [{"regionID": "3070", "regionName": "石河子市"}]
    }, {
        "regionID": "363",
        "regionName": "图木舒克",
        "child": [{"regionID": "3071", "regionName": "图木舒克市"}]
    }, {
        "regionID": "364",
        "regionName": "吐鲁番",
        "child": [{"regionID": "3072", "regionName": "吐鲁番市"}, {
            "regionID": "3073",
            "regionName": "鄯善县"
        }, {"regionID": "3074", "regionName": "托克逊县"}]
    }, {
        "regionID": "365",
        "regionName": "五家渠",
        "child": [{"regionID": "3075", "regionName": "五家渠市"}]
    }, {
        "regionID": "366",
        "regionName": "伊犁",
        "child": [{"regionID": "3076", "regionName": "阿勒泰市"}, {
            "regionID": "3077",
            "regionName": "布克赛尔"
        }, {"regionID": "3078", "regionName": "伊宁市"}, {"regionID": "3079", "regionName": "布尔津县"}, {
            "regionID": "3080",
            "regionName": "奎屯市"
        }, {"regionID": "3081", "regionName": "乌苏市"}, {"regionID": "3082", "regionName": "额敏县"}, {
            "regionID": "3083",
            "regionName": "富蕴县"
        }, {"regionID": "3084", "regionName": "伊宁县"}, {"regionID": "3085", "regionName": "福海县"}, {
            "regionID": "3086",
            "regionName": "霍城县"
        }, {"regionID": "3087", "regionName": "沙湾县"}, {"regionID": "3088", "regionName": "巩留县"}, {
            "regionID": "3089",
            "regionName": "哈巴河县"
        }, {"regionID": "3090", "regionName": "托里县"}, {"regionID": "3091", "regionName": "青河县"}, {
            "regionID": "3092",
            "regionName": "新源县"
        }, {"regionID": "3093", "regionName": "裕民县"}, {"regionID": "3094", "regionName": "和布克赛尔"}, {
            "regionID": "3095",
            "regionName": "吉木乃县"
        }, {"regionID": "3096", "regionName": "昭苏县"}, {"regionID": "3097", "regionName": "特克斯县"}, {
            "regionID": "3098",
            "regionName": "尼勒克县"
        }, {"regionID": "3099", "regionName": "察布查尔"}]
    }]
}, {
    "regionID": "30",
    "regionName": "云南",
    "child": [{
        "regionID": "367",
        "regionName": "昆明",
        "child": [{"regionID": "3100", "regionName": "盘龙区"}, {
            "regionID": "3101",
            "regionName": "五华区"
        }, {"regionID": "3102", "regionName": "官渡区"}, {"regionID": "3103", "regionName": "西山区"}, {
            "regionID": "3104",
            "regionName": "东川区"
        }, {"regionID": "3105", "regionName": "安宁市"}, {"regionID": "3106", "regionName": "呈贡县"}, {
            "regionID": "3107",
            "regionName": "晋宁县"
        }, {"regionID": "3108", "regionName": "富民县"}, {"regionID": "3109", "regionName": "宜良县"}, {
            "regionID": "3110",
            "regionName": "嵩明县"
        }, {"regionID": "3111", "regionName": "石林县"}, {"regionID": "3112", "regionName": "禄劝"}, {
            "regionID": "3113",
            "regionName": "寻甸"
        }]
    }, {
        "regionID": "368",
        "regionName": "怒江",
        "child": [{"regionID": "3114", "regionName": "兰坪"}, {
            "regionID": "3115",
            "regionName": "泸水县"
        }, {"regionID": "3116", "regionName": "福贡县"}, {"regionID": "3117", "regionName": "贡山"}]
    }, {
        "regionID": "369",
        "regionName": "普洱",
        "child": [{"regionID": "3118", "regionName": "宁洱"}, {
            "regionID": "3119",
            "regionName": "思茅区"
        }, {"regionID": "3120", "regionName": "墨江"}, {"regionID": "3121", "regionName": "景东"}, {
            "regionID": "3122",
            "regionName": "景谷"
        }, {"regionID": "3123", "regionName": "镇沅"}, {"regionID": "3124", "regionName": "江城"}, {
            "regionID": "3125",
            "regionName": "孟连"
        }, {"regionID": "3126", "regionName": "澜沧"}, {"regionID": "3127", "regionName": "西盟"}]
    }, {
        "regionID": "370",
        "regionName": "丽江",
        "child": [{"regionID": "3128", "regionName": "古城区"}, {
            "regionID": "3129",
            "regionName": "宁蒗"
        }, {"regionID": "3130", "regionName": "玉龙"}, {"regionID": "3131", "regionName": "永胜县"}, {
            "regionID": "3132",
            "regionName": "华坪县"
        }]
    }, {
        "regionID": "371",
        "regionName": "保山",
        "child": [{"regionID": "3133", "regionName": "隆阳区"}, {
            "regionID": "3134",
            "regionName": "施甸县"
        }, {"regionID": "3135", "regionName": "腾冲县"}, {"regionID": "3136", "regionName": "龙陵县"}, {
            "regionID": "3137",
            "regionName": "昌宁县"
        }]
    }, {
        "regionID": "372",
        "regionName": "楚雄",
        "child": [{"regionID": "3138", "regionName": "楚雄市"}, {
            "regionID": "3139",
            "regionName": "双柏县"
        }, {"regionID": "3140", "regionName": "牟定县"}, {"regionID": "3141", "regionName": "南华县"}, {
            "regionID": "3142",
            "regionName": "姚安县"
        }, {"regionID": "3143", "regionName": "大姚县"}, {"regionID": "3144", "regionName": "永仁县"}, {
            "regionID": "3145",
            "regionName": "元谋县"
        }, {"regionID": "3146", "regionName": "武定县"}, {"regionID": "3147", "regionName": "禄丰县"}]
    }, {
        "regionID": "373",
        "regionName": "大理",
        "child": [{"regionID": "3148", "regionName": "大理市"}, {
            "regionID": "3149",
            "regionName": "祥云县"
        }, {"regionID": "3150", "regionName": "宾川县"}, {"regionID": "3151", "regionName": "弥渡县"}, {
            "regionID": "3152",
            "regionName": "永平县"
        }, {"regionID": "3153", "regionName": "云龙县"}, {"regionID": "3154", "regionName": "洱源县"}, {
            "regionID": "3155",
            "regionName": "剑川县"
        }, {"regionID": "3156", "regionName": "鹤庆县"}, {"regionID": "3157", "regionName": "漾濞"}, {
            "regionID": "3158",
            "regionName": "南涧"
        }, {"regionID": "3159", "regionName": "巍山"}]
    }, {
        "regionID": "374",
        "regionName": "德宏",
        "child": [{"regionID": "3160", "regionName": "潞西市"}, {
            "regionID": "3161",
            "regionName": "瑞丽市"
        }, {"regionID": "3162", "regionName": "梁河县"}, {"regionID": "3163", "regionName": "盈江县"}, {
            "regionID": "3164",
            "regionName": "陇川县"
        }]
    }, {
        "regionID": "375",
        "regionName": "迪庆",
        "child": [{"regionID": "3165", "regionName": "香格里拉县"}, {
            "regionID": "3166",
            "regionName": "德钦县"
        }, {"regionID": "3167", "regionName": "维西"}]
    }, {
        "regionID": "376",
        "regionName": "红河",
        "child": [{"regionID": "3168", "regionName": "泸西县"}, {
            "regionID": "3169",
            "regionName": "蒙自县"
        }, {"regionID": "3170", "regionName": "个旧市"}, {"regionID": "3171", "regionName": "开远市"}, {
            "regionID": "3172",
            "regionName": "绿春县"
        }, {"regionID": "3173", "regionName": "建水县"}, {"regionID": "3174", "regionName": "石屏县"}, {
            "regionID": "3175",
            "regionName": "弥勒县"
        }, {"regionID": "3176", "regionName": "元阳县"}, {"regionID": "3177", "regionName": "红河县"}, {
            "regionID": "3178",
            "regionName": "金平"
        }, {"regionID": "3179", "regionName": "河口"}, {"regionID": "3180", "regionName": "屏边"}]
    }, {
        "regionID": "377",
        "regionName": "临沧",
        "child": [{"regionID": "3181", "regionName": "临翔区"}, {
            "regionID": "3182",
            "regionName": "凤庆县"
        }, {"regionID": "3183", "regionName": "云县"}, {"regionID": "3184", "regionName": "永德县"}, {
            "regionID": "3185",
            "regionName": "镇康县"
        }, {"regionID": "3186", "regionName": "双江"}, {"regionID": "3187", "regionName": "耿马"}, {
            "regionID": "3188",
            "regionName": "沧源"
        }]
    }, {
        "regionID": "378",
        "regionName": "曲靖",
        "child": [{"regionID": "3189", "regionName": "麒麟区"}, {
            "regionID": "3190",
            "regionName": "宣威市"
        }, {"regionID": "3191", "regionName": "马龙县"}, {"regionID": "3192", "regionName": "陆良县"}, {
            "regionID": "3193",
            "regionName": "师宗县"
        }, {"regionID": "3194", "regionName": "罗平县"}, {"regionID": "3195", "regionName": "富源县"}, {
            "regionID": "3196",
            "regionName": "会泽县"
        }, {"regionID": "3197", "regionName": "沾益县"}]
    }, {
        "regionID": "379",
        "regionName": "文山",
        "child": [{"regionID": "3198", "regionName": "文山县"}, {
            "regionID": "3199",
            "regionName": "砚山县"
        }, {"regionID": "3200", "regionName": "西畴县"}, {"regionID": "3201", "regionName": "麻栗坡县"}, {
            "regionID": "3202",
            "regionName": "马关县"
        }, {"regionID": "3203", "regionName": "丘北县"}, {"regionID": "3204", "regionName": "广南县"}, {
            "regionID": "3205",
            "regionName": "富宁县"
        }]
    }, {
        "regionID": "380",
        "regionName": "西双版纳",
        "child": [{"regionID": "3206", "regionName": "景洪市"}, {
            "regionID": "3207",
            "regionName": "勐海县"
        }, {"regionID": "3208", "regionName": "勐腊县"}]
    }, {
        "regionID": "381",
        "regionName": "玉溪",
        "child": [{"regionID": "3209", "regionName": "红塔区"}, {
            "regionID": "3210",
            "regionName": "江川县"
        }, {"regionID": "3211", "regionName": "澄江县"}, {"regionID": "3212", "regionName": "通海县"}, {
            "regionID": "3213",
            "regionName": "华宁县"
        }, {"regionID": "3214", "regionName": "易门县"}, {"regionID": "3215", "regionName": "峨山"}, {
            "regionID": "3216",
            "regionName": "新平"
        }, {"regionID": "3217", "regionName": "元江"}]
    }, {
        "regionID": "382",
        "regionName": "昭通",
        "child": [{"regionID": "3218", "regionName": "昭阳区"}, {
            "regionID": "3219",
            "regionName": "鲁甸县"
        }, {"regionID": "3220", "regionName": "巧家县"}, {"regionID": "3221", "regionName": "盐津县"}, {
            "regionID": "3222",
            "regionName": "大关县"
        }, {"regionID": "3223", "regionName": "永善县"}, {"regionID": "3224", "regionName": "绥江县"}, {
            "regionID": "3225",
            "regionName": "镇雄县"
        }, {"regionID": "3226", "regionName": "彝良县"}, {"regionID": "3227", "regionName": "威信县"}, {
            "regionID": "3228",
            "regionName": "水富县"
        }]
    }]
}, {
    "regionID": "31",
    "regionName": "浙江",
    "child": [{
        "regionID": "383",
        "regionName": "杭州",
        "child": [{"regionID": "3229", "regionName": "西湖区"}, {
            "regionID": "3230",
            "regionName": "上城区"
        }, {"regionID": "3231", "regionName": "下城区"}, {"regionID": "3232", "regionName": "拱墅区"}, {
            "regionID": "3233",
            "regionName": "滨江区"
        }, {"regionID": "3234", "regionName": "江干区"}, {"regionID": "3235", "regionName": "萧山区"}, {
            "regionID": "3236",
            "regionName": "余杭区"
        }, {"regionID": "3237", "regionName": "市郊"}, {"regionID": "3238", "regionName": "建德市"}, {
            "regionID": "3239",
            "regionName": "富阳市"
        }, {"regionID": "3240", "regionName": "临安市"}, {"regionID": "3241", "regionName": "桐庐县"}, {
            "regionID": "3242",
            "regionName": "淳安县"
        }]
    }, {
        "regionID": "384",
        "regionName": "湖州",
        "child": [{"regionID": "3243", "regionName": "吴兴区"}, {
            "regionID": "3244",
            "regionName": "南浔区"
        }, {"regionID": "3245", "regionName": "德清县"}, {"regionID": "3246", "regionName": "长兴县"}, {
            "regionID": "3247",
            "regionName": "安吉县"
        }]
    }, {
        "regionID": "385",
        "regionName": "嘉兴",
        "child": [{"regionID": "3248", "regionName": "南湖区"}, {
            "regionID": "3249",
            "regionName": "秀洲区"
        }, {"regionID": "3250", "regionName": "海宁市"}, {"regionID": "3251", "regionName": "嘉善县"}, {
            "regionID": "3252",
            "regionName": "平湖市"
        }, {"regionID": "3253", "regionName": "桐乡市"}, {"regionID": "3254", "regionName": "海盐县"}]
    }, {
        "regionID": "386",
        "regionName": "金华",
        "child": [{"regionID": "3255", "regionName": "婺城区"}, {
            "regionID": "3256",
            "regionName": "金东区"
        }, {"regionID": "3257", "regionName": "兰溪市"}, {"regionID": "3258", "regionName": "市区"}, {
            "regionID": "3259",
            "regionName": "佛堂镇"
        }, {"regionID": "3260", "regionName": "上溪镇"}, {"regionID": "3261", "regionName": "义亭镇"}, {
            "regionID": "3262",
            "regionName": "大陈镇"
        }, {"regionID": "3263", "regionName": "苏溪镇"}, {"regionID": "3264", "regionName": "赤岸镇"}, {
            "regionID": "3265",
            "regionName": "东阳市"
        }, {"regionID": "3266", "regionName": "永康市"}, {"regionID": "3267", "regionName": "武义县"}, {
            "regionID": "3268",
            "regionName": "浦江县"
        }, {"regionID": "3269", "regionName": "磐安县"}]
    }, {
        "regionID": "387",
        "regionName": "丽水",
        "child": [{"regionID": "3270", "regionName": "莲都区"}, {
            "regionID": "3271",
            "regionName": "龙泉市"
        }, {"regionID": "3272", "regionName": "青田县"}, {"regionID": "3273", "regionName": "缙云县"}, {
            "regionID": "3274",
            "regionName": "遂昌县"
        }, {"regionID": "3275", "regionName": "松阳县"}, {"regionID": "3276", "regionName": "云和县"}, {
            "regionID": "3277",
            "regionName": "庆元县"
        }, {"regionID": "3278", "regionName": "景宁"}]
    }, {
        "regionID": "388",
        "regionName": "宁波",
        "child": [{"regionID": "3279", "regionName": "海曙区"}, {
            "regionID": "3280",
            "regionName": "江东区"
        }, {"regionID": "3281", "regionName": "江北区"}, {"regionID": "3282", "regionName": "镇海区"}, {
            "regionID": "3283",
            "regionName": "北仑区"
        }, {"regionID": "3284", "regionName": "鄞州区"}, {"regionID": "3285", "regionName": "余姚市"}, {
            "regionID": "3286",
            "regionName": "慈溪市"
        }, {"regionID": "3287", "regionName": "奉化市"}, {"regionID": "3288", "regionName": "象山县"}, {
            "regionID": "3289",
            "regionName": "宁海县"
        }]
    }, {
        "regionID": "389",
        "regionName": "绍兴",
        "child": [{"regionID": "3290", "regionName": "越城区"}, {
            "regionID": "3291",
            "regionName": "上虞市"
        }, {"regionID": "3292", "regionName": "嵊州市"}, {"regionID": "3293", "regionName": "绍兴县"}, {
            "regionID": "3294",
            "regionName": "新昌县"
        }, {"regionID": "3295", "regionName": "诸暨市"}]
    }, {
        "regionID": "390",
        "regionName": "台州",
        "child": [{"regionID": "3296", "regionName": "椒江区"}, {
            "regionID": "3297",
            "regionName": "黄岩区"
        }, {"regionID": "3298", "regionName": "路桥区"}, {"regionID": "3299", "regionName": "温岭市"}, {
            "regionID": "3300",
            "regionName": "临海市"
        }, {"regionID": "3301", "regionName": "玉环县"}, {"regionID": "3302", "regionName": "三门县"}, {
            "regionID": "3303",
            "regionName": "天台县"
        }, {"regionID": "3304", "regionName": "仙居县"}]
    }, {
        "regionID": "391",
        "regionName": "温州",
        "child": [{"regionID": "3305", "regionName": "鹿城区"}, {
            "regionID": "3306",
            "regionName": "龙湾区"
        }, {"regionID": "3307", "regionName": "瓯海区"}, {"regionID": "3308", "regionName": "瑞安市"}, {
            "regionID": "3309",
            "regionName": "乐清市"
        }, {"regionID": "3310", "regionName": "洞头县"}, {"regionID": "3311", "regionName": "永嘉县"}, {
            "regionID": "3312",
            "regionName": "平阳县"
        }, {"regionID": "3313", "regionName": "苍南县"}, {"regionID": "3314", "regionName": "文成县"}, {
            "regionID": "3315",
            "regionName": "泰顺县"
        }]
    }, {
        "regionID": "392",
        "regionName": "舟山",
        "child": [{"regionID": "3316", "regionName": "定海区"}, {
            "regionID": "3317",
            "regionName": "普陀区"
        }, {"regionID": "3318", "regionName": "岱山县"}, {"regionID": "3319", "regionName": "嵊泗县"}]
    }, {
        "regionID": "393",
        "regionName": "衢州",
        "child": [{"regionID": "3320", "regionName": "衢州市"}, {
            "regionID": "3321",
            "regionName": "江山市"
        }, {"regionID": "3322", "regionName": "常山县"}, {"regionID": "3323", "regionName": "开化县"}, {
            "regionID": "3324",
            "regionName": "龙游县"
        }]
    }]
}, {
    "regionID": "32",
    "regionName": "重庆",
    "child": [{
        "regionID": "394",
        "regionName": "重庆市",
        "child": [{"regionID": "3325", "regionName": "合川区"}, {
            "regionID": "3326",
            "regionName": "江津区"
        }, {"regionID": "3327", "regionName": "南川区"}, {"regionID": "3328", "regionName": "永川区"}, {
            "regionID": "3329",
            "regionName": "南岸区"
        }, {"regionID": "3330", "regionName": "渝北区"}, {"regionID": "3331", "regionName": "万盛区"}, {
            "regionID": "3332",
            "regionName": "大渡口区"
        }, {"regionID": "3333", "regionName": "万州区"}, {"regionID": "3334", "regionName": "北碚区"}, {
            "regionID": "3335",
            "regionName": "沙坪坝区"
        }, {"regionID": "3336", "regionName": "巴南区"}, {"regionID": "3337", "regionName": "涪陵区"}, {
            "regionID": "3338",
            "regionName": "江北区"
        }, {"regionID": "3339", "regionName": "九龙坡区"}, {"regionID": "3340", "regionName": "渝中区"}, {
            "regionID": "3341",
            "regionName": "黔江开发区"
        }, {"regionID": "3342", "regionName": "长寿区"}, {"regionID": "3343", "regionName": "双桥区"}, {
            "regionID": "3344",
            "regionName": "綦江县"
        }, {"regionID": "3345", "regionName": "潼南县"}, {"regionID": "3346", "regionName": "铜梁县"}, {
            "regionID": "3347",
            "regionName": "大足县"
        }, {"regionID": "3348", "regionName": "荣昌县"}, {"regionID": "3349", "regionName": "璧山县"}, {
            "regionID": "3350",
            "regionName": "垫江县"
        }, {"regionID": "3351", "regionName": "武隆县"}, {"regionID": "3352", "regionName": "丰都县"}, {
            "regionID": "3353",
            "regionName": "城口县"
        }, {"regionID": "3354", "regionName": "梁平县"}, {"regionID": "3355", "regionName": "开县"}, {
            "regionID": "3356",
            "regionName": "巫溪县"
        }, {"regionID": "3357", "regionName": "巫山县"}, {"regionID": "3358", "regionName": "奉节县"}, {
            "regionID": "3359",
            "regionName": "云阳县"
        }, {"regionID": "3360", "regionName": "忠县"}, {"regionID": "3361", "regionName": "石柱"}, {
            "regionID": "3362",
            "regionName": "彭水"
        }, {"regionID": "3363", "regionName": "酉阳"}, {"regionID": "3364", "regionName": "秀山"}]
    }]
}, {
    "regionID": "33",
    "regionName": "香港",
    "child": [{
        "regionID": "395",
        "regionName": "香港",
        "child": [{"regionID": "3365", "regionName": "沙田区"}, {
            "regionID": "3366",
            "regionName": "东区"
        }, {"regionID": "3367", "regionName": "观塘区"}, {"regionID": "3368", "regionName": "黄大仙区"}, {
            "regionID": "3369",
            "regionName": "九龙城区"
        }, {"regionID": "3370", "regionName": "屯门区"}, {"regionID": "3371", "regionName": "葵青区"}, {
            "regionID": "3372",
            "regionName": "元朗区"
        }, {"regionID": "3373", "regionName": "深水埗区"}, {"regionID": "3374", "regionName": "西贡区"}, {
            "regionID": "3375",
            "regionName": "大埔区"
        }, {"regionID": "3376", "regionName": "湾仔区"}, {"regionID": "3377", "regionName": "油尖旺区"}, {
            "regionID": "3378",
            "regionName": "北区"
        }, {"regionID": "3379", "regionName": "南区"}, {"regionID": "3380", "regionName": "荃湾区"}, {
            "regionID": "3381",
            "regionName": "中西区"
        }, {"regionID": "3382", "regionName": "离岛区"}]
    }]
}, {
    "regionID": "34",
    "regionName": "澳门",
    "child": [{"regionID": "396", "regionName": "澳门", "child": [{"regionID": "3383", "regionName": "澳门"}]}]
}, {
    "regionID": "35",
    "regionName": "台湾",
    "child": [{
        "regionID": "397",
        "regionName": "台湾",
        "child": [{"regionID": "3384", "regionName": "台北"}, {
            "regionID": "3385",
            "regionName": "高雄"
        }, {"regionID": "3386", "regionName": "基隆"}, {"regionID": "3387", "regionName": "台中"}, {
            "regionID": "3388",
            "regionName": "台南"
        }, {"regionID": "3389", "regionName": "新竹"}, {"regionID": "3390", "regionName": "嘉义"}, {
            "regionID": "3391",
            "regionName": "宜兰县"
        }, {"regionID": "3392", "regionName": "桃园县"}, {"regionID": "3393", "regionName": "苗栗县"}, {
            "regionID": "3394",
            "regionName": "彰化县"
        }, {"regionID": "3395", "regionName": "南投县"}, {"regionID": "3396", "regionName": "云林县"}, {
            "regionID": "3397",
            "regionName": "屏东县"
        }, {"regionID": "3398", "regionName": "台东县"}, {"regionID": "3399", "regionName": "花莲县"}, {
            "regionID": "3400",
            "regionName": "澎湖县"
        }]
    }]
}];

export default data;