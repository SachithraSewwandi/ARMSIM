//package sew1;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.regex.*;

//read the compiled file and take the hexa decimal numbers in main to a file 
/**
 * Created by Yasas on 04-12-2014.
 */
public class Main {
	
    public static void main(String[] args ){

        String filename="addtext.txt";
        String write = "file.txt";

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
                            return;
                        } else {
                        	String[] array=line.split("\\t");
                        	if(array.length>1){
                        	
                        		 bufferwr.write(array[1]);
                                // bufferwr.write("\n");
                                 bufferwr.flush();
                        	}else if(array.length==1 && array[0].contains(":"))bufferwr.write("0 ");
                           

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

