'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')
import request = require('request'); //第3方http请求的插件
import queryString = require('querystring'); //转换get参数的插件
import {config} from '../../env'

let Vue = new vueServer.renderer();
let timeDiff = require('../../client/filter/date.filter')

export function index(req: express.Request, res: express.Response) {

    let cookbook_id:number = req.params.id;

    let vm:vueServer,
        b:Object,
        options:Object,
        classOptions:Object;
    classOptions = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/classify?'+queryString.stringify({
            id : 0,
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        }
    };
    options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/list?'+queryString.stringify({
            id : cookbook_id,
            page : 1,
            rows : 20
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        }
    };
    request(classOptions,function(err,resp,body){

        if (!err && resp.statusCode == 200) {
            var bb = JSON.parse(body);

        }

        request(options,function(err,resp,body){
            //这个接口 没有返回这个ID的title
            if (!err && resp.statusCode == 200) {
                b = JSON.parse(body);
                timeDiff(Vue);
                vm = new Vue({
                    replace : false,
                    template : fs.readFileSync(config.PATH_COOKBOOK+'/states/cookbook-list/template.html','utf-8'),
                    data : {
                        cookbookClasses : bb.tngou,
                        title : '菜谱列表',
                        cookbookItems: b.tngou,
                        id  : cookbook_id,
                        page : 1,
                        maxItems : b.total,
                        updateTime : '',
                        valOptions : [],
                    }
                });
            }
            vm.$on('vueServer.htmlReady', function(html:string) {
                res.render('layout',{
                    server_html:html,
                    server_data:`
                    window.cm_cookbookItems = {
                        cookbookClasses : ${JSON.stringify(bb.tngou)},
                        title : '菜谱列表',
                        cookbookItems: ${JSON.stringify(b.tngou)},
                        id  : ${cookbook_id},
                        page : 2,
                        maxItems : ${b.total},
                        updateTime : new Date().getTime(),
                        valOptions : []
                    }`
                })
            });

        });

    })




};