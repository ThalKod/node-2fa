const checkbox = $(".onoffswitch-checkbox");
const tfa_box = $(".tfa-box"); 

checkbox.change(function(){
    if(this.checked){
        tfa_box.show();
    }else{
        tfa_box.hide();
    }
})