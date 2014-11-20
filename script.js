$( document ).ready(

function()
{


// this is the function for submit the values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    $('#submit').click( function(){
    
		var code = editor.getSession().getValue();
     
        var input = $("#input").val();
		
		
        if(code){
                $.post("ajax.php" , 
                    {
                        code    : code,
                        input   : input,                                              
                    } ,
                    function(data)
                    {
                        $('#responseText').val(data);
                    }
                );
            }
            
        
        
    });
    
    
    
    
    $('#load').click(function(){
        var fileToLoad = document.getElementById("fileToLoad").files[0];

        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) 
        {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            editor.setValue(textFromFileLoaded);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    });

}
);