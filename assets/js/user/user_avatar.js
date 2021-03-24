$(function(){
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on("click",function(){
        $("#file").click();
    })

    $("#file").on("change",function(e){
        // console.log(1);
        let file = this.files[0];
        let imgURL = URL.createObjectURL(file);
        // console.log(this.files);

        $image
        .cropper('destroy')
        .attr('src',imgURL)
        .cropper(options);

    })

    //btnUpload
    $("#btnUpload").on("click",function(e){
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status!==0)
                {
                    layui.layer.msg("更新头像失败！")
                    return;
                }
                layui.layer.msg("更新头像成功！");
                window.parent.getUserInfo();
            }
        })
    })
})

