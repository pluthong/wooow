/*JUST EN EXAMPLE OF JS, you can either remove this file or Modify
======================================================================*/
var BASE_URL;
if (!window.location.origin)
     window.location.origin = window.location.protocol+"//"+window.location.host;
     
BASE_URL = window.location.origin;


function delete_user(id){

    $.ajax({
    
        url:"/users/delete-user",type:"post",dataType:"json",
        data: {user_id:id},
        beforeSend:function(){
        
        },
        success:function(result){
        
            if(result.status){
            
                $('#myModal').modal('hide')
                window.location.reload(true);
            }
        },
        error:function(xhr,status,err){
            
            console.log(err);
        }
    
    });        

}

/*Document ready*/
$(function(){
        
    $("#sort-by").change(function(){
    
        var t_val = $(this).val();
        window.location.href = BASE_URL+'/users?f='+t_val+'&q='+CURR_SEARCH+'&page='+CURR_PAGE;
    });
    
    
    $("#go-search").on("click keyup",function(){
              
        var t_val = $("#search-field").val();
        window.location.href =BASE_URL+'/users?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
       
    });
    
   
    $("#search-field" ).on("keydown", function(event) {
       
        if(event.which == 13){ 
             var t_val = $("#search-field").val();
             event.preventDefault(); //it doesnt work without this line
             window.location.href =BASE_URL+'/users?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
        }
    });
    
    $("#save-user").click(function(){
            
        $.ajax({
        
            url:"/users/save-user",type:"post",dataType:"json",
            data: $("#user-form").serialize(),
            beforeSend:function(){
            
            },
            success:function(result){
            
                if(result.status){
                
                    $('#myModal').modal('hide')
                    window.location.reload(true);
                }
            },
            error:function(xhr,status,err){
                
                console.log(err);
            }
        
        });        
    });
    
    //edit user 
    $(".edit-user").click(function(){
     
        var data = $(this).attr('data-user').split(',');
    
        $(".pass-info").text("(Leave blank if password is not changed)");
       
        if(data[2]=='0'){
            
            $("#status-inactive").prop('checked', true);
        }else{
            $("#status-active").prop('checked', true);
        }
        $("#user_id").val(data[0]);
        $('#username').val(data[1]);
        $("#modal-user").modal('show');
        $('#modal-user').on('hide.bs.modal', function (e) {
            
             $(".pass-info").text("");
             $("#user_id,#username").val("");
        });
        
    });
    
   
});//end of document raeady
