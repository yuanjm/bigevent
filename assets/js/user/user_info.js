$(function() {
    var form = layui.form;

    form.verify({
        nickname: function(value) {
            if(value.length>6){
                return "昵称长度必须在1~6个字符之间！"
            }
        }
    });
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if(res.status !== 0){
                    layui.layer.msg("获取基本信息出错！");
                }
                form.val("formUserInfo",res.data);
            }
        })
    };
    
    $("#btnReset").on("click",function(e){
        e.preventDefault();
        initUserInfo();
    })

    $("form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    layui.layer.msg("修改失败！");
                }
                layui.layer.msg("修改成功！");
                window.parent.getUserInfo();
            }
        })
    })

})

//btnReset