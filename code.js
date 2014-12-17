var r = [0,0,0,0,0,0,0,0,0,0,0,0,10,345,0,0];//array for registers
var cond;
var imm;
var opcode;
var rn;
var rd;
var op2;
var stack=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];




function initilz(){
    for (x = 0; x < r.length; x++){
        r[x]=0;
    }
    r[13]=stack.length;
    r[14]=345;
    printRegVal();
}

initilz();

function setRegVal(reg,value){ // set register value
    r[reg]=value;
}

function getRegVal(reg){ // get register value
    return r[reg];
}

function printRegVal(){ // print in textarea
    
    $("#r00").val(r[0]);
    $("#r01").val(r[1]);
    $("#r02").val(r[2]);
    $("#r03").val(r[3]);
    $("#r04").val(r[4]);
    $("#r05").val(r[5]);
    $("#r06").val(r[6]);
    $("#r07").val(r[7]);
    $("#r08").val(r[8]);
    $("#r09").val(r[9]);
    $("#r10").val(r[10]);
    $("#r11").val(r[11]);
    $("#r12").val(r[12]);
    $("#r13").val(r[13]);
    $("#r14").val(r[14]);
    $("#r15").val(r[15]);
    
    
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