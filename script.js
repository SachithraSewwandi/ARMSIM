//globle variables here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var hexadd;
var addchang=[];
var hex=[];
var i=0; // counter
var lineNum=0;
var prog=0;
var startLine=0;
var empytLine=0;
var data=[];
var cmp1;
var cmp2;
var compair;
var lines;
var boolerror;
 var lstline=-1;
// j query functions here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$( document ).ready(
    function(){

// this is the function for submit the values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    $('#submit').click( function(){
        
        var gutters = document.getElementsByClassName("ace_gutter-cell");
        var gutLineNo = parseInt(gutters[0].innerHTML)-1;
        
        
        $("y").append("<img src='images/compiling.png' />");
        //alert("compiling");
       // document.innerHTML+="<div class='compiling'></div>"
        lines = document.getElementsByClassName("ace_line");
        
        for (xq = 1; xq < lines.length; xq++){
            lines[xq].style.backgroundColor = "#002240";
        }
        
        //alert("sdfsdfsfsfs");
        initilz();
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
                        
                        var error = x.split(" ")[0];
                        if(error=="error"){
                            //alert("error");
                           $('#responseText').val(x);
                            var yy = x.split(":");
                            for (g = 4; g < yy.length; g+=3){
                                var erline = parseInt(yy[g],10);
                                var linetxt = editor.session.getLine(erline-1);
                                if(erline>0){
                                    lines[erline-1].style.backgroundColor = "#8c0000";
                                    lines[erline-1].innerHTML+=" #GCCError:"+yy[g+2].split("\n")[0];
                                }
                                boolerror=1;
                            }
                            
                        }else{
                            $('#responseText').val(x.split(" \n\n")[0]);
                            var y = x.split(" \n\n")[1];
                            hexadd = y.split(" ");
                            for (x = 0; x < hexadd.length; x++){
                                hex[x]=hexadd[x].split("**")[1];
                                //addchang[x]=hexadd[x].split("**")[0];
                                addchang[x]=parseInt(hexadd[x].split("**")[0], 10);
                            }
                            
                            boolerror=0;
                        }
                       $("y").empty();
                    }
                );
            }
    });
// reinitiliz regs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        $('#rein').click(function(){
            initilz();
        });
// reset all >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        $('#reset').click(function(){
             for (xq = 1; xq < lines.length; xq++){
                lines[xq].style.backgroundColor = "#002240";
            }
            initilz();
            i=0; // counter
            lineNum=0;
            prog=0;
            startLine=0;
            empytLine=0;
            var stack=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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

        

// change register values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        $('#change').click(function(){
                      
               r[0]= parseInt( $("#r00").val() , 10);
               r[1]= parseInt( $("#r01").val() , 10);
               r[2]= parseInt( $("#r02").val() , 10);
               r[3]= parseInt( $("#r03").val() , 10);
               r[4]= parseInt( $("#r04").val() , 10);
               r[5]= parseInt( $("#r05").val() , 10);
               r[6]= parseInt( $("#r06").val() , 10);
               r[7]= parseInt( $("#r07").val() , 10);
               r[8]= parseInt( $("#r08").val() , 10);
               r[9]= parseInt( $("#r09").val() , 10);
               r[10]= parseInt( $("#r10").val() , 10);
               r[11]= parseInt( $("#r11").val() , 10);
               r[12]= parseInt( $("#r12").val() , 10);
               r[13]= parseInt( $("#r13").val() , 10);
               r[14]= parseInt( $("#r14").val() , 10);
               r[15]= parseInt( $("#r15").val() , 10);
           
        });
//run steps >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#run').click(function(){
        
        function changeline(){
            var x=0;
                    if(addchang[ii]>0){
                        while( x < addchang[ii]-1){
                            lineNum+=1;
                            var ddd = editor.session.getLine(lineNum);
                            if(ddd=="\t" || ddd=="\n" || ddd==""){
                                //alert("free line");
                            }else{
                                x++;
                            }
                        }
                    }else{
                        while( x > addchang[ii]-1){
                            lineNum-=1;
                            var ddd = editor.session.getLine(lineNum);
                            if(ddd=="\t" || ddd=="\n" || ddd==""){
                                //alert("free line");
                            }else{
                                x--;
                            }
                        }
                    }
        }
        
        
        
        var gutters = document.getElementsByClassName("ace_gutter-cell");
        var gutLineNo = parseInt(gutters[0].innerHTML)-1;
        //alert(gutLineNo);
        /*  //alert(gutLineNo);
        var acecntnt = document.getElementsByClassName("ace_text-input");
        var scrol = document.getElementsByClassName("ace_scrollbar-inner");
        var high = scrol[0].style.height;
        var tp = acecntnt[0].style.top;
        alert(acecntnt[0].style.top);
        alert(high);
       // acecntnt[0].style.marginTop="0px"; //ace_scrollbar-inner
        */
        
        if (i==hex.length) {
            i=(0);
            lines[lineNum-(1+gutLineNo)].style.backgroundColor = "#002240";
            lineNum=0;
            prog=0;
            initilz();
        }
        if(lstline>0){
            lines[lstline].style.backgroundColor = "#002240";
            lstline=-1;
        }
        var ddd = editor.session.getLine(lineNum);
        //alert("come strt");
        lines[lineNum-gutLineNo].style.backgroundColor = "#0371a4";
        //alert("come end");
        if(lineNum>0){
            lines[lineNum-(1+gutLineNo)].style.backgroundColor = "#002240";
        }
        
        if(ddd=="\t" || ddd=="\n" || ddd==""){
            empytLine=1;
            //alert("free line ----- outer");
        }else{
            empytLine=0;
        }
        var dd = ddd.split("b")[0];
        if(dd=="\tsu"){ // find the start of the .text
            prog=1;
            startLine=lineNum;
        }
        
        if(prog==1 && empytLine==0){
            
         
            
            var binary = (String)(parseInt(hex[i], 16).toString(2)); // get hex value and save as binary string
            cond=parseInt(hex[i].substring(0,1),16);
            var f = isaSelect(binary);
            
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
                        case 10://cmp
                            cmp1=r[rn];
                            cmp2=op2;
                            break;
                        default:
                    }
                }else if(imm==0){ // use operand 2 as register
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
                            cmp1=r[rn];
                            cmp2=r[op2];
                            break;
                        default:
                    }
                }
            }else if(f==1){
                var stakpoint = r[rn]+op2;
                if(opcode==0){
                    stack[stakpoint]=r[rd];
                    r[rd]=0;
                }else if(opcode==1){
                    r[rd]=stack[stakpoint];
                }
            }else{
                var opcodebr = parseInt((binary.substring(6,8)),2);
                if(opcodebr==2){
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                    
                }
            }
        }else{
            cond=parseInt(hex[i].substring(0,1),16);
            //alert(cond);
            compair =cmp1-cmp2;
            switch(cond){


                case 0: //eq
                    if((cmp1-cmp2)==0){
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    
                    break;

                case 1://ne
                    if((cmp1-cmp2)!=0){
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    
                    break;
                    
                case 8://hi
                     var value1=Math.abs(cmp1);
                    var value2=Math.abs(cmp2)
                    var diff=value1-value2;
                    if(diff>0) {
                        var ii=i;
                        lstline = lineNum;
                        i+=(addchang[ii]-1);
                        changeline();
                    }
                    break;

                case 9://ls
                    var value1=Math.abs(cmp1);
                    var value2=Math.abs(cmp2);
                    var diff=value1-value2;
                    if(diff<=0) {
                        var ii=i;
                        lstline = lineNum;
                        i+=(addchang[ii]-1);
                        changeline();
                    }
                    break;

                case 10: //ge
                    if(compair>=0) {
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    break;

                case 11: //lt
                    if(compair<0)  {
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    break;

                case 12: //gt
                    if(compair>0)  {
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    break;

                case 13: //le
                    if(compair<=0)  {
                    var ii=i;
                    lstline = lineNum;
                    i+=(addchang[ii]-1);
                    changeline();
                }
                    break;
            }
            
        }
            
            
            printRegVal();
            i++;
        }
        
        lineNum++;
    });


}
);
