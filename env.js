var env = {
    NODE_ENV : 'development',
    SELF_HOST : '127.0.0.1:3000',
    APIStore : {
        api_key   : 'a369f43a6392605426433831e10765ec',
        news_host : 'http://apis.baidu.com',
    },
    PATH_COOKBOOK : __dirname+'/client/com.chezhil.cookbook',
    PATH_BUILD    : __dirname+'/__build__',

    API_BASE_HOST : 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
    API_WX_HOST   : 'http://'

}

module.exports.config = env;