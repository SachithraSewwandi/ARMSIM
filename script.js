//globle variables here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var hex;
var i=0; // counter
var lineNum=0;
var prog=0;
var startLine=0;
var empytLine=0;
var data=[];
var compair;
// j query functions here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$( document ).ready(
    function(){

// this is the function for submit the values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    $('#submit').click( function(){
               
        for (x = 0; x < r.length; x++){
            r[x]=0;
        }
        r[13]=stack.length;
        r[14]=345;
        printRegVal();
       // $("#r").val("");
        
    	var code = editor.getSession().getValue();
        i=0;
        var input = $("#input").val();
		
        if(code){
                $.post("ajax.php" , 
                    {
                        code    : code,
                        input   : input,                                              
                    } ,
                    function(data){
                        var x = data;
                        $('#responseText').val(x.split(" \n\n")[0]);
                        var y = x.split(" \n\n")[1];
                        hex = y.split(" ");
                        alert("compiled your code");
                    }
                );
            }
    });
// reinitiliz regs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        $('#rein').click(function(){
            for (x = 0; x < r.length; x++){
            r[x]=0;
            }
            r[13]=stack.length;
            r[14]=345;
            printRegVal();
            //$("#r").val("");
        });
    
 //load>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   
    $('#load').click(function(){
        var fileToLoad = document.getElementById("fileToLoad").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            var textFromFileLoaded = fileLoadedEvent.target.result;
            editor.setValue(textFromFileLoaded);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    });

//run steps >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#run').click(function(){
        
        if (i==hex.length) {
           i=(0);
           lineNum=0;
            prog=0;
            for (x = 0; x < r.length; x++){
            r[x]=0;
            }
            r[13]=stack.length;
            r[14]=345;
            printRegVal();
        }
        
        var ddd = editor.session.getLine(lineNum);
        if(ddd=="\t" || ddd=="\n" || ddd==""){
            empytLine=1;
        }else{
            empytLine=0;
        }
        var dd = ddd.split("b")[0];
        //alert(dd);
        if(dd=="\tsu"){ // find the start of the .text
            prog=1;
            startLine=lineNum;
        }
        
        if(prog==1 && empytLine==0){
            
         
            
            
            
            
            var binary = (String)(parseInt(hex[i], 16).toString(2)); // get hex value and save as binary string
            cond=parseInt(hex[i].substring(0,1),16);
           // alert(cond);
           // alert(binary.length);
            var f = isaSelect(binary);
            //alert(f);
        if(cond==14){    
            if(f==0){
                if(imm==1){ // use operand 2 as immediate value
                    switch(opcode){
                        case 13:
                            r[rd]=op2;
                            break;
                        case 4:
                            r[rd]=r[rn]+op2;
                            break;
                         case 2:
                            r[rd]=r[rn]-op2;
                            break;
                        case 10:
                            compair=r[rn]-op2;
                            //alert(compair);
                            break;
                        default:
                    }
                }else if(imm==0){ // use operand 2 as register
                    //alert(f);
                    switch(opcode){
                        case 13:
                            r[rd]=r[op2];
                            break;
                        case 4:
                            r[rd]=r[rn]+r[op2];
                            break;
                        case 2:
                            r[rd]=r[rn]-r[op2];
                            break;
                        case 10:
                            compair=r[rn]-r[op2];
                            //alert(compair);
                            break;
                        default:
                    }
                }
            }else if(f==1){
                //alert(f);
                var stakpoint = r[rn]+op2;
                if(opcode==0){
                   // alert(stack[stakpoint]);
                    stack[stakpoint]=r[rd];
                    r[rd]=0;
                   // alert(stack[stakpoint]);
                }else if(opcode==1){
                    r[rd]=stack[stakpoint];
                }
            }
        }else{
            cond=parseInt(hex[i].substring(0,1),16);
            //alert(cond);
            var add =parseInt(hex[i].substring(2,8),16);
            alert(add);
          /*  var dd = ddd.split(" ")[1];
            var ddw = ddd.split(" ")[0];
            alert(ddw);
            var d2= dd.split("\t")[1];
            var d= ddd.split(" ")[0];
            var d1= d.split("\t")[1];
            alert("---"+d1+"---"+d2+"---");
            
            */
            
            
        }
            
            
            printRegVal();
            i++;
        }
        
        
        $("#r").val(ddd);
        $("#res").val(binary);
        
        
        
        
        lineNum++;
    });


}
);
