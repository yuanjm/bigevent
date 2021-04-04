$(function() {
    let q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示几条数据
        cate_id: "",
        state: ""
    };
    initCate();
    initTable();


    function initTable() {

        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.message);
                    return;
                }
                htmlStr = template('tpl-table', res.data);
                $("tbody").html(htmlStr);
                //渲染页码区域
                renderPage(res.total);
            }
        })
    }
    //渲染页码区域
    function renderPage(total) {
        // console.log(1);
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', ],
            limits: [2, 3, 4, 5, 6, 7],
            jump: function(obj, first) {
                if (!first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    initTable();
                }
            }
        });
    }

    function initCate() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg("获取分类失败！");
                    return;
                }
                // console.log(res);
                var htmlStr = template('tpl-cate', res.data);
                // console.log(res.data);
                $("[name=cate_id]").html(htmlStr);
                layui.form.render();
            }
        });
    }
    //定义template的过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date);

            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();

            var hh = dt.getHours();
            var mm = dt.getMinutes();
            var ss = dt.getSeconds();

            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
        }
        //为筛选表单绑定事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $("[name=cate_id]").val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    });


})