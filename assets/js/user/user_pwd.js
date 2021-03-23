$(function(){
    layui.form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        notsame: function(value){
            if(value===$("[name=oldPwd]").val()){
                return "新密码与旧密码不能相同！"
            }
                
            },
        same: function(value){
                if(value!==$("[name=newPwd]").val()){
                    return "确认密码与新密码不一致！"
                }
            }
    })
    $("form").on("submit",function(e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res){
                $("form")[0].reset();
                if(res.status!==0){
                    layui.layer.msg("重置密码失败！")
                }
                layui.layer.msg("重置密码成功！")
            }
        })
    })
})