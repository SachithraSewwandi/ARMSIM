//package sew1;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.regex.*;


public class Main {
    
    public static void main(String[] args ){

        String filename="addtext.txt";
        String write = "file.txt";
        int countlength =0;
        ArrayList<String> addr = new ArrayList<String>();
        ArrayList<String> goaddr = new ArrayList<String>();
        ArrayList<String> ins = new ArrayList<String>();
        ArrayList<String> branch = new ArrayList<String>();

        try{
            FileReader fileRd = new FileReader(filename);
            BufferedReader bufferRd = new BufferedReader(fileRd);
            String line = null;
            FileWriter fileWr = new FileWriter(write);
            BufferedWriter bufferwr = new BufferedWriter(fileWr);

            while((line = bufferRd.readLine()) != null){

                if(Reg.stringChecker(".*<main>:.*",line)){

                    while((line = bufferRd.readLine()) != null) {

                        if (Reg.stringChecker(".*<atexit>:.*", line)) {
                            countlength=addr.size();
                            //bufferwr.write(countlength+"\n");
                            //bufferwr.flush();


                            int x=0;
                            int y=0;
                            boolean have = false;
                            for(x=0;x<countlength;x++){
                                for(y=0;y<countlength;y++){
                                    if(goaddr.get(x).equals(addr.get(y))){
                                        have = true;
                                        int xy=y-x;
                                        String sxy=xy+"**";
                                        branch.add(sxy);
                                    }


                                }

                                if(!have){
                                        branch.add("0**");
                                }else{
                                    have=false;
                                }
                                bufferwr.write(branch.get(x)+ins.get(x));
                               bufferwr.flush();
                            }



                            return;
                        } else {
                           
                           
                            String[] arrayins=line.split("\\t");
                            
                            
                            if(arrayins.length>1){
                                    String arrayadd = (arrayins[0].split("    ")[1]).split(":")[0];
                                    String arrins = arrayins[1];
                                    String goadsd=arrayins[3].substring(0,4);
                                    
                                    addr.add(arrayadd);
                                    ins.add(arrins);
                                    goaddr.add(goadsd);
                            }else if(arrayins.length==1 && arrayins[0].contains(":")){
                                    addr.add("a");
                                    ins.add("0 ");
                                    goaddr.add("b");
                                    
                                
                            }

                        }
                    }
                }

            }
            bufferwr.close();
        }catch(Exception e ){
            System.out.println(e);
        }


    }
}

