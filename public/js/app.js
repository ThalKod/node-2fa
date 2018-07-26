const checkbox = $(".onoffswitch-checkbox");
const tfa_box = $(".tfa-box"); 

checkbox.change(function(){
    if(this.checked){
        $.post("users/" + username + "/secret")
            .done(function(data){
                console.log(data);
            });
        // tfa_box.show();
    }else{
        tfa_box.hide();
    }
})