$(function() {
    initCate();
    initEditor();
    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    $image.cropper(options);

    $('#cover-select').on('click', function(e) {
        $('#coverFile').click();
        // console.log(1);
    })

    $('#coverFile').on('change', function(e) {
        // console.log(1);
        // console.log(this);
        var files = e.target.files;
        // console.log(files);
        var newImgURL = URL.createObjectURL(files[0]);
        $image.cropper('destroy').attr('src', newImgURL).cropper(options);
    })

    let art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
        // console.log(1);
    })

    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        // console.log(this, e.target);
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        // fd.forEach(function(v, k) {
        //     console.log(k, v);
        // })
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            fd.append('cover_img', blob);
        });

        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                layui.layer.msg(res.message);
                if (res.status === 0) {
                    location.href('/article/art_list.html');
                }
            }
        })
    })

    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.message);
                    return;
                }
                htmlStr = template('tpl-cate', res.data);
                $("[name=cate_id]").html(htmlStr);
                layui.form.render();
            }
        })
    }


})