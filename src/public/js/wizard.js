var main_form=document.querySelectorAll(".main");
let formnumber=0;

$(document).ready(function(){
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    
    $(".next").click(function(){
        if(!validateform()){
            return false;
        }
        formnumber++;
        updateform();
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        //show the next fieldset
        next_fs.show(); 
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
    
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
    });
    
    $(".previous").click(function(){
        
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        formnumber--;
        updateform();   

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        
        //show the previous fieldset
        previous_fs.show();
    
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
    
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
    });
    
    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });
    
    $(".submit").click(function(){
        return false;
    })
        
    });



    function updateform(){
        main_form.forEach(function(main_number){ 
           main_number.classList.remove('active'); 
        });
        main_form[formnumber].classList.add('active');
      
       
    } 


    function validateform(){
        validate=true;
        var validate_form=document.querySelectorAll(".main.active input");
        validate_form.forEach(function(val){
            val.classList.remove('warning');
            if(val.hasAttribute('require')){
                if(val.value.length==0){
                    validate=false;
                    val.classList.add('warning');
                }
            }
        });
        return validate;
    }
    

    //cargar formulario
    var btnUpload = $("#upload_file"),
		btnOuter = $(".button_outer");
	btnUpload.on("change", function(e){
		var ext = btnUpload.val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['gif','png','jpg','jpeg','pdf']) == -1) {
			$(".error_msg").text("Archivo no aceptado...");
		} else {
			$(".error_msg").text("");
			btnOuter.addClass("file_uploading");
			setTimeout(function(){
				btnOuter.addClass("file_uploaded");
			},3000);
			var uploadedFile = URL.createObjectURL(e.target.files[0]);
			setTimeout(function(){
                if(ext,['.pdf']){
                    $("#uploaded_view").append('<img src="/img/pdf-icon.png" />').addClass("show");
                }
                else{

                
				$("#uploaded_view").append('<img src="'+uploadedFile+'" />').addClass("show");
                }
			},3500);
		}
	});
	$(".file_remove").on("click", function(e){
		$("#uploaded_view").removeClass("show");
		$("#uploaded_view").find("img").remove();
		btnOuter.removeClass("file_uploading");
		btnOuter.removeClass("file_uploaded");
	});