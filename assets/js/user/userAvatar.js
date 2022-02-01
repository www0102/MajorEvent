
window.onload = function () {
    var fileInput = document.querySelector("#avatarImgFile");
    var selectImgBtn = document.querySelector("#selectImgBtn");
    var postAvatar = document.querySelector("#postAvatar");
    var imgBox = document.querySelector("#avatar-img");

    // 打开文件选择框
    selectImgBtn.addEventListener("click", function(e){
        e.preventDefault();
        fileInput.click();
    })

    // 获取用户选择的图片
    var base64Avatar;
    fileInput.addEventListener("change", function(e){
        // console.log(e.target.files); 获取选择的文件
        var fileList = e.target.files;
        if(fileList.length == 0){
            console.log(fileList);
            return alert("请选择文件");
        }
        // 为图片创建一个url地址
        var newImgUrl = URL.createObjectURL(fileList[0]);
        // console.log(newImgUrl);
        imgBox.src = newImgUrl;

        var reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onloadend = function(){
            base64Avatar = reader.result;
            // console.log(base64Avatar);
        }
    })

    // 上传头像
    postAvatar.addEventListener("click", function(e){
        console.log(base64Avatar);
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/update/avatar",
            data:{
                avatar:base64Avatar
            },
            success:function(res){
                if(res.status != 0){
                    return alert("更换头像失败");
                }
                alert(res.message);
                window.parent.getUserInfo();
            }
        })
    })
}