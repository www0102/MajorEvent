
// 在每次调用 $.get() 或 $.post() 或 $.ajax() 时，
// 都会调用 ajaxPrefilter 这个函数，这个函数中可以拿到
// ajax 提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = "http://www.liulongbin.top:3007" + options.url;
    console.log(options.url);
    if (options.url.indexOf("/my/") != -1){
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    options.complete = function (res) {
        // console.log("无论成功与失败，都会执行complete回调");
        // console.log(res); 数据在res.responseJSON中
        if(res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！"){
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})