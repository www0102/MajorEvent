window.onload = function(){
    initUserInfo();
    var resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener("click", function(){
        initUserInfo();
    });

    var submitBtn = document.querySelector("#submitBtn");
    var nickNameInput = document.querySelector("#nickName");
    var userEmailInput = document.querySelector("#userEmail");
    var userID = document.querySelector("#userID");
    submitBtn.addEventListener("click", function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data:{
                nickname: nickNameInput.value,
                email: userEmailInput.value,
                id: userID.value
            },
            success: function(res){
                if (res.status != 0){
                    return alert("修改信息失败");
                }
                // 更换头像和欢迎文本, 需要在iframe子容器中操作父容器
                window.parent.getUserInfo();
                alert("修改信息成功");
            }
        })
    })
}

function initUserInfo() {
    var userNameInput = document.querySelector("#userName");
    var nickNameInput = document.querySelector("#nickName");
    var userEmailInput = document.querySelector("#userEmail");
    var userID = document.querySelector("#userID");
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            if(res.status != 0){
                return alert(res.message);
            }else{
                // console.log(res.responseJSON.data);
                var data = res.data;
                userNameInput.value = data.username;
                nickNameInput.value = data.nickname;
                userEmailInput.value = data.email;
                userID.value = data.id;
            }
        }
    })
}