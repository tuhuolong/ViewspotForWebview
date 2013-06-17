var config = {
//    'dataUrl' : 'http://tjyx-testing-map57.vm.baidu.com:8080'//qa环境
     'dataUrl' : 'http://client.map.baidu.com'
//    'dataUrl' : 'http://tc-map-data-webming03.tc.baidu.com:8018/detail?qt=ninf&uid=6e0d820b4e2acca33913fdd3&from=webview';
//    'dataUrl' : 'http://tc-map-data-webming03.tc.baidu.com:8018'
 //    'dataUrl' : 'http://10.81.13.68:8135'
}

var dataConfig = {         //参数配置
        //行业特定配置，上线一个新行业需要给出详情页的行业字段配置，如果未配置，则不与展示
        //酒店类型所需数据
        defaul_t : {
            base_key : ["price"],
            base_info : {
                "price" : {
                    name : "参考价"
                }
            },
            rich_key : ["description","shop_hours","alias"],
            rich_info:{
                "description" : {
                    name : "商户描述"
                },
                "shop_hours" : {
                    name : "营业时间"
                },
                "alias" : {
                    name : "别名"
                }
            },
            VS : ['fineFood', 'snack', 'innHotel', 'starHotel', 'busStation', 'bank']
        },  
        hotel : {
            base_key : ["price","facility_rating", "service_rating", "hygiene_rating"],
            base_info : {
                "price" : {
                    name : "参考价"
                },
                "facility_rating" : {
                    name : "设施"
                },
                "service_rating" : {
                    name : "服务"
                },
                "hygiene_rating" : {
                    name : "卫生"
                }
            },
            rich_key : ["category", "level","brand"],
            rich_info : {
                "category" : {
                    name : "酒店类型"
                },
                "level" : {
                    name : "酒店星级"
                },
                "brand" : {
                    name : "连锁品牌"
                }                
            },
            more_key : ["inner_facility", "hotel_service", "environment_exterior","hotel_facility","payment_type"],
            more_info : {
                "inner_facility" : {
                    name : "房间设施"
                },
                "hotel_service" : {
                    name : "酒店服务"
                },
                "environment_exterior" : {
                    name : "周边环境"
                },
                "hotel_facility" : {
                    name : "酒店设施"
                },                
                "payment_type" : {
                    name : "付款方式"
                }
            },
            VS : ['innHotel', 'fineFood', 'snack', 'busStation', 'starHotel', 'bank'],
            hunter : {
                'index' : '7077'
            }
        },

        //餐饮类型所需数据
        cater : {
            base_key : ["price","taste_rating", "service_rating", "environment_rating"],
            base_info : {
                "price" : {
                    name : "参考价"
                },
                "environment_rating" : {
                    name : "环境"
                },
                "service_rating" : {
                    name : "服务"
                },
                "taste_rating" : {
                    name : "口味"
                }
            },
            rich_key : ["recommendation","description"],
            rich_info : {                
                "recommendation" : {
                    name : "推荐菜",
                    className : "shop_title_letter_spacing_3"
                },
                "description" : {
                    name : "商户描述"
                }
            },
            more_key : ["atmosphere","featured_service","shop_hours"],
            more_info : {
                "atmosphere" : {
                    name : "餐厅氛围"
                },
                "featured_service" : {
                    name : "特色服务"
                },
                "shop_hours" : {
                    name : "营业时间"
                }
            },
            VS : ['fineFood', 'snack', 'innHotel','busStation', 'starHotel', 'bank'],
            hunter : {
                'index' : '7076',
                'comment' : '7078'
            }
        },
        life : {
            base_key : ["price"],
            base_info : {
                "price" : {
                    name : "人均"
                }
            },
            rich_key : ["description","shop_hours","alias"],
            rich_info:{
                "description" : {
                    name : "商户描述"
                },
                "shop_hours" : {
                    name : "营业时间"
                },
                "alias" : {
                    name : "别名",
                    className : "shop_title_letter_spacing_2"
                }
            },
           VS : ['snack', 'innHotel', 'fineFood', 'busStation', 'bank', 'shop']
        },
        house : {
            base_key : ["price"],
            base_info : {
                "price" : {
                    name : "均价"
                }
            },
            rich_key : ["opening_time","checkin_time","property_price","traffic"],
            rich_info:{
                "opening_time" : {
                    name : "开盘时间"
                },
                "checkin_time" : {
                    name : "入住时间"
                },
                "property_price" : {
                    name : "物业价格"
                },
                "traffic" : {
                    name : "交通公交"
                }
            },
            more_key : ["sales_address","sales_state","property_type","fit_out","developer","medical","leisure","education"],
            more_info : {
                "sales_address" : {
                    name : "售楼地址"
                },
                "sales_state" : {
                    name : "销售状态"
                },                
                "property_type" : {
                    name : "物业类别"
                },
                "fit_out" : {
                    name : "装修情况"
                },                
                "developer" : {
                    name : "开发商"
                },
                "medical" : {
                    name : "医疗"
                },
                "leisure" : {
                    name : "休闲娱乐"
                },                
                "education" : {
                    name : "教育"
                }
            },
       VS : ['fineFood', 'busStation', 'innHotel', 'snack', 'bank', 'market']

        },
        hospital : {
            base_key : ["price","technology_rating","service_rating"],
            base_info : {
                "price" : {
                    name : "参考价"
                },
                "technology_rating" : {
                    name : "技术"
                },
                "service_rating" : {
                    name : "服务"
                }
            },
            rich_key : ["internal_medicine_departments","surgical_departments"],
            rich_info:{
                "internal_medicine_departments" : {
                    name : "内科"
                },
                "surgical_departments" : {
                    name : "外科"
                }
            },
            more_key : ["gynecology_pediatrics_departments","traditional_chinese_medicine","other_departments","recommended_experts"],
            more_info : {
                "gynecology_pediatrics_departments" : {
                    name : "妇儿科"
                },
                "traditional_chinese_medicine" : {
                    name : "中医科"
                },
                "other_departments" : {
                    name : "其他科室"
                },
                "recommended_experts" : {
                    name : "推荐专家"
                }
            },
            VS : ['innHotel', 'busStation', 'fineFood', 'hospital', 'snack', 'bank']
        },
       
        education : {
           VS : ['innHotel', 'fineFood', 'snack', 'bank', 'busStation', 'starHotel']
        },

        scope:{
            base_key : ["scope_grade","scope_type"],
            base_info : {
                "scope_grade" : {
                    name : "景区级别"
                },
                "scope_type" : {
                    name : "景区类型"
                }
            }
        }
    }
 

//现有的banner类型
var bannerType = {
    cater : '1',
    hospital : '1',
    hotel : '1',
    house : '1',
    life : '1'
}

var vicinityShop = {
    fineFood :   {name:'fineFood', key: '美食'},
    snack :      {name:'snack', key: '小吃快餐'},
    innHotel :   {name:'innHotel', key: '快捷酒店'},
    starHotel :  {name:'starHotel', key: '星级酒店'},
    busStation : {name:'busStation', key: '公交站'},
    bank :       {name:'bank', key: '银行'},
    shop :       {name:'shop', key: '商场'},
    ktv  :       {name:'ktv', key: 'ktv'},
    tuan :       {name:'tuan', key: '团购'},
    hospital :   {name:'hospital', key: '医院'},
    viewSpot :   {name:'viewSpot', key: '景点'},
    market   :   {name:'market', key: '超市'}
}