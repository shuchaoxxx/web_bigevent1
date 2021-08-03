//注意：每次调用$.get（）、$.post（）、$.ajax()的时候，都会调用这个函数,
//在这个函数中，可以拿到我们给AJAX提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //统一为有权限的的接口，设置header请求头
    if (options.url.indexof('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('执行了complete回调');
        // console.log('res');
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空 token
            localStorage.removeItem('token')
                //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }




})