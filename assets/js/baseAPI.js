
// 在每次调用 $.get() 或 $.post() 或 $.ajax() 时，
// 都会调用 ajaxPrefilter 这个函数，这个函数中可以拿到
// ajax 提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = "http://www.liulongbin.top:3007" + options.url;
    console.log(options.url);
})