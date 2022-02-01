window.onload = function(){
    var oldPwdInput = document.querySelector("#oldPwd");
    var newPwdInput = document.querySelector("#newPwd");
    var confirmNewPwdInput = document.querySelector("#confirmNewPwd");

    var submitBtn = document.querySelector("#submitBtn");
    var resetBtn = document.querySelector("#resetBtn");

    // 点击了重置按钮
    resetBtn.addEventListener("click", function(e){
        e.preventDefault();
        oldPwdInput.value = "";
        newPwdInput.value = "";
        confirmNewPwdInput.value = "";
    });

    // 点击了提交按钮
    submitBtn.addEventListener("click", function(e){
        e.preventDefault();
        // 表单验证, 验证密码是否为6-12为的数字字母组成
        let result = checkAllPwd(oldPwdInput.value, newPwdInput.value,confirmNewPwdInput.value);
        if(!result) return;
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data:{
                oldPwd: oldPwdInput.value,
                newPwd: newPwdInput.value
            },
            success: function(res){
                if (res.status != 0){
                    return alert("修改密码失败");
                }
                alert("修改密码成功");
            }
        })
    })
}

// 表单验证
function checkPwd(pwd){
    var regexp = /^[0-9a-zA-Z]{6,12}$/i;
    return regexp.test(pwd);
}
function checkAllPwd(oldPwd, newPwd, confirmPwd) {
    if(!(checkPwd(oldPwd) && checkPwd(newPwd) && checkPwd(confirmPwd))){
        alert("输入的密码不满足要求,密码必须有6-12为数字字母组成");
        return false;
    }
    if(!(newPwd == confirmPwd)){
        alert("两次输入的密码不同");
        return false;
    }
    return true;
}
