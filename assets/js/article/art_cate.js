$(function() {
    initArtCateList();
    let indexAdd;
    //display dialog
    $("#btnAddCate").on("click", function(e) {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialogHtml").html()
        });
    });

    //为添加分类表单设置提交事件
    $("body").on("submit", "#fromAdd", function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(res) {
                    layui.layer.close(indexAdd);
                    if (res.status !== 0) {
                        layui.layer.msg("新增分类失败！");
                        return;
                    }
                    layui.layer.msg("新增分类成功！");
                    initArtCateList();
                }
            })

        })
        //初始化文章列表
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                let htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    let indexEdit;
    $("tbody").on("click", ".btn-edit", function(e) {
        // console.log(1);
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        $.ajax({
            url: "/my/article/cates/" + $(this).attr("data-id"),
            type: "GET",
            success: function(res) {
                // console.log(res);
                $("[name=name]").val(res.data.name);
                $("[name=alias]").val(res.data.alias);
                $("[name=Id]").val(res.data.Id);
            }

        });
    })

    //为编辑表单添加提交事件
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                layui.layer.close(indexEdit);
                if (res.status !== 0) {
                    layui.layer.msg("更新失败！");
                    return;
                }
                layui.layer.msg("更新成功！");
                initArtCateList();
            }
        });
    })
    $("tbody").on("click", ".btn-delete", function(e) {
        let id = $(this).attr("data-id");

        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            console.log("/my/article/deletecate/" + id);
            //do something
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        layui.layer.msg("删除分类失败！" + res.message);
                        return;
                    }
                    layui.layer.msg("删除分类成功！");
                }
            })
            layer.close(index);
        });
    });
})