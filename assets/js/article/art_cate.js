$(function() {
    initArtCateList();

    //display dialog
    $("#btnAddCate").on("click", function(e) {
        layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialogHtml").html()
        });
    });

    $("body").on("submit", "#fromAdd", function(e) {
            e.preventDefault();
            console.log("123");
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
})