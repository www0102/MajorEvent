// 避免用户未登录直接在地址栏中请求/index.html
$.ajax({
    method: "GET",
    url: "/my/userinfo",
    complete:function (res) {
        // console.log("无论成功与失败，都会执行complete回调");
        // console.log(res); 数据在res.responseJSON中
        if(res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！"){
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})


window.onload = function(){
    getUserInfo();
    // 鼠标移动到顶部的个人中心时触发的动画
    var headerInfo = document.querySelector(".headerNav-info");
    var headerMore = document.querySelector("#header-more");
    var navChild = document.querySelector(".headerNav-child");
    var timer;
    headerInfo.addEventListener("mouseover",function(){
        clearTimeout(timer);
        headerMore.className = "text-more text-mored";
        navChild.style.display = "block";
    })
    headerInfo.addEventListener("mouseout",function(){
        clearTimeout(timer);
        timer = setTimeout(function () {
            navChild.style.display = "none";
            headerMore.className = "text-more";
        }, 300);
    })


    // 鼠标点击侧边栏时展示和隐藏二级菜单
    var articleManage = document.querySelector("#article-manage");
    var userInfoManage = document.querySelector("#userinfo-manage");
    var articleManageFlag = false;
    var userInfoManageFlag = false;
    var sideMore = document.getElementsByClassName("side-text-more");
    articleManage.addEventListener("click", function () {
        // alert("文章管理被点击了");
        if(articleManageFlag){
            this.nextElementSibling.style.display = "none";
            sideMore[0].className = "side-text-more";
        }else{
            this.nextElementSibling.style.display = "block";
            sideMore[0].className = "side-text-more side-text-mored";
            if(userInfoManageFlag) userInfoManage.click();
        }
        articleManageFlag = !articleManageFlag;
    });
    userInfoManage.addEventListener("click", function () {
        // alert("个人中心被点击了");
        if(userInfoManageFlag){
            this.nextElementSibling.style.display = "none";
            sideMore[1].className = "side-text-more";
        }else{
            this.nextElementSibling.style.display = "block";
            sideMore[1].className = "side-text-more side-text-mored";
            if(articleManageFlag) articleManage.click();
        }
        userInfoManageFlag = !userInfoManageFlag;
    });
    


    // 当前被选中的菜单加上current的类
    var sideNav = document.querySelector(".side-nav");
    var allLinks = sideNav.getElementsByTagName("a");
    for(let i = 0; i < allLinks.length; i++){
        if(allLinks[i] == articleManage || allLinks[i] == userInfoManage){
            continue;
        }
        // console.log(allLinks[i]);
        allLinks[i].addEventListener("click", function () {
            for(let j = 0; j < allLinks.length;j++){
                allLinks[j].className = "";
            }
            allLinks[i].className = "current";
        })
    }

    // 退出功能
    var exitBtn = document.querySelector("#header-exit");
    exitBtn.addEventListener("click", function () {
        if (confirm("确认退出吗")){
            // console.log("点击了确认");
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    })

}

// 该函数用户获取用户信息
function  getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success:function (res) {
            if(res.status != 0){
                return alert("获取用户信息失败");
            }
            // 渲染用户头像
            renderAvatar(res.data);
        }
    })
}


// 渲染用户头像函数和欢迎
function renderAvatar(data) {
    // console.log(data);
    var userAvatarUrl = data.user_pic;
    var username = data.nickname || data.username;
    var welcomeSpan = document.querySelector("#welcomeSpan");
    welcomeSpan.innerHTML = "&nbsp;欢迎&nbsp; " + username;

    var textAvatar = document.getElementsByClassName("text-avatar");
    var imgAvatar = document.getElementsByClassName("img-avatar")[0];
    var imgAvatar2 = document.getElementsByClassName("img-avatar2")[0];
    // 有图片就渲染图片头像，没有就渲染文本头像
    if (userAvatarUrl != null){
        textAvatar[0].style.display = "none";
        textAvatar[1].style.display = "none";
        imgAvatar.src = userAvatarUrl;
        imgAvatar2.src = userAvatarUrl;
        imgAvatar.style.display = "block";
        imgAvatar2.style.display = "block";
    }else{
        textAvatar[0].innerHTML = username[0].toUpperCase();
        textAvatar[1].innerHTML = username[0].toUpperCase();
        imgAvatar.style.display = "none";
        imgAvatar2.style.display = "none";
        textAvatar[0].style.display = "inline-block";
        textAvatar[1].style.display = "inline-block";
    }
}