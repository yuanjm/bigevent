$(function() {
    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0){
                layui.layer.msg("获取用户信息失败！");
            }

            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    
}