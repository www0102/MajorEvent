window.onload = function(){
    // 注册与登录相互切换
    var regLink = document.querySelector("#reg-link");
    var loginLink = document.querySelector("#login-link");
    regLink.addEventListener("click", function(){
        regLink.parentNode.style.display = "none"
        loginLink.parentNode.style.display = "block";
    })
    loginLink.addEventListener("click", function(){
        loginLink.parentNode.style.display = "none"
        regLink.parentNode.style.display = "block";
    })


    // 登录
    var login_username = document.querySelector("#login-username-input");
    var login_userpassword = document.querySelector("#login-userpassword-input");
    var login_btn = document.querySelector("#login-button");

    var loginMessageBox = document.querySelector(".loginErrorMessageBox");
    var loginMessage = document.querySelector(".loginMessage");
    login_btn.addEventListener("click", function (e) {
        // 表单验证
        e.preventDefault();
        if (login_username.value.trim().length == 0){
            return showMessage("用户名不能为空");
        }
        if (login_userpassword.value.trim().length == 0){
            return showMessage("密码不能为空");
        }
        // 登录请求
        $.post("/api/login", {
            username: login_username.value,
            password: login_userpassword.value
        },function (res) {
            if (res.status == 1){
                showMessage(res.message);
            }else{
                showMessage(res.message);
                location.href = "/index.html";
                // console.log(res);
                localStorage.setItem("token", res.token);
            }
        })
    })


    // 注册
    var reg_username = document.querySelector("#reg-username-input");
    var reg_userpassword = document.querySelector("#reg-userpassword-input");
    var reg_confirmpassword = document.querySelector("#confirmPassword-input");
    var reg_btn = document.querySelector("#reg-button");

    var passwordRegexp = /^[0-9a-zA-Z]{6,12}$/i;
    reg_btn.addEventListener("click", function (e) {
        // 表单验证
        e.preventDefault();
        if (reg_username.value.trim().length == 0){
            return showMessage("用户名不能为空");
        }
        if (!passwordRegexp.test(reg_userpassword.value)){
            return showMessage("密码必须为6-12位的数字字母组成");
        }
        if (reg_userpassword.value != reg_confirmpassword.value){
            return showMessage("两次密码输入不相同");
        }

        // 注册请求
        $.post("/api/reguser", {
            username: reg_username.value,
            password: reg_userpassword.value
        },function (res) {
            if (res.status == 0){
                showMessage(res.message);
            }else{
                showMessage(res.message);
            }
        })
    })

    // 展示登录注册时的信息
    function showMessage(message) {
        loginMessageBox.style.display = "block";
        loginMessage.innerText = message;
        clearTimeout(timer);
        var timer = setTimeout(function () {
            loginMessageBox.style.display = "none";
            loginMessage.innerText = "";
        }, 1000);
    }
}


// 注册接口 http://www.liulongbin.top:3007/api/reguser
// 登录接口 http://www.liulongbin.top:3007/api/login
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwNzQsInVzZXJuYW1lIjoid3d3MDEwMiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjQzNTUyNDQ5LCJleHAiOjE2NDM1ODg0NDl9.BB9mmj59kVroYCXNbGqWYMsDll2gwVqPrq0mMUrT14w"