<?php

            $code = $_POST['code'];
    
            $input = $_POST['input'];

            $inputf = fopen("input.txt", "w");
            fwrite($inputf, $input);
            fclose($inputf);
     
      
    

            $myfile = fopen("file.s", "w");
            fwrite($myfile, $code);
            fclose($myfile);

    $descriptorspec = array(
       0 => array("pipe", "r"),  // stdin
       1 => array("pipe", "w"),  // stdout
       2 => array("pipe", "w"),  // stderr
    );



    $process = proc_open("arm-elf-gcc -Wall -o compiled file.s", $descriptorspec, $pipes, dirname(__FILE__), null);

    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[2]);

        $process = proc_open("arm-elf-run compiled<input.txt", $descriptorspec, $pipes, dirname(__FILE__), null);
    
    $stdout = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    if(!(file_exists("compiled"))){
        echo "error of your code :\n\n$stderr\n\n";
    }else{
        echo "final output of your code :\n\n$stdout \n\n";
    }


    if (file_exists("compiled")) {unlink("compiled");}
    if (file_exists("file.s")) {unlink("file.s");}
    if (file_exists("input.txt")) {unlink("input.txt");}
   

?>