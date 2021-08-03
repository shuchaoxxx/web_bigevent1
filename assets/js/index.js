$(function() {
    //调用获取getUserInfo函数获取用户的基本信息
    getUserInfo();

    var layer = layui.layer;



    $('#btnLogout').on('click', function() {
        // console.log('ok');
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
                //2.重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index)
        })
    })
})











//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },

        //不论成功还是失败，最终都会调用complete回调函数
        // complate: function(res) {
        //     // console.log('执行了complete回调');
        //     // console.log('res');
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空 token
        //         localStorage.removeItem('token')
        //             //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}



//渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        //3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }

}