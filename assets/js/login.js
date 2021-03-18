$(function(){
  $("#link_reg").on("click",function(){
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click",function(){
    $(".login-box").show();
    $(".reg-box").hide();
  });

  layui.form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
    ,reVerify: function(value,item){
      let password = $('.reg-box [name=password]').val();
      if(password !== value){
        return "密码不一致"
      }
    }
  });

})