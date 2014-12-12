var r = [0,0,0,0,0,0,0,0,0,0,0,0,10,345,0,0];//array for registers
var cond;
var imm;
var opcode;
var rn;
var rd;
var op2;
var stack=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

for (x = 0; x < stack.length; x++){
        stack[x]=Math.floor((Math.random() * 100) + 1);
}




function setRegVal(reg,value){ // set register value
    r[reg]=value;
}

function getRegVal(reg){ // get register value
    return r[reg];
}

function printRegVal(){ // print in textarea
    $("textarea#registers").val(
        'Register 0 :   ' + r[0] + '\n' +
        'Register 1 :   ' + r[1] + '\n' + 
        'Register 2 :   ' + r[2] + '\n' + 
        'Register 3 :   ' + r[3] + '\n' + 
        'Register 4 :   ' + r[4] + '\n' + 
        'Register 5 :   ' + r[5] + '\n' + 
        'Register 6 :   ' + r[6] + '\n' + 
        'Register 7 :   ' + r[7] + '\n' + 
        'Register 8 :   ' + r[8] + '\n' + 
        'Register 9 :   ' + r[9]  + '\n' + 
        'Register 10 :  ' + r[10] + '\n' + 
        'Register 11 :  ' + r[11]+ '\n' + 
        'Register 12 :  ' + r[12] + '\n\n' +
        'Register 13 (sp) :  ' + r[13] + '\n' + 
        'Register 14 (lr) :  ' + r[14]+ '\n' +
        'Register 15 (pc) :  ' + r[15]
    );
}

function isaSelect(inst){
    
    var format=parseInt(inst.substring(4,6),2); //view what is the format of isa
    
    if(format==0){
        cond=parseInt(inst.substring(0,4),2);
        imm=parseInt(inst.substring(6,7),2);
        opcode=parseInt(inst.substring(7,11),2);
        rn=parseInt(inst.substring(12,16),2);
        rd=parseInt(inst.substring(16,20),2);
        op2=parseInt(inst.substring(20,32),2);
    }else if(format==1){
        cond=parseInt(inst.substring(0,4),2);
        imm=parseInt(inst.substring(6,7),2);
        opcode=parseInt(inst.substring(11,12),2);
        rn=parseInt(inst.substring(12,16),2);
        rd=parseInt(inst.substring(16,20),2);
        op2=parseInt(inst.substring(20,32),2);
    }
    
    return format;
}

function getAceLine(){

}