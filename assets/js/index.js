$(function() {
    //获取用户信息
    getUserInfo();

    // 为退出按钮绑定事件
    $("#btnLogout").on("click",function(){
        // console.log("ok");
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            location.href = "/login.html";
            localStorage.removeItem("token");
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0){
                layui.layer.msg("获取用户信息失败！");
                return;
            }
            // console.log(res);
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    // 设置欢迎用户文本
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;"+name);

    // 渲染头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}