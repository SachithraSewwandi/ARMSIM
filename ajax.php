<?php




    session_name('Private');
    session_start();
    $private_id = session_id();
    session_write_close(); 




            $code = $_POST['code'];
            $input = $_POST['input'];

            $inputf = fopen("in.txt", "w");
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



    // compiling the input code here and take the std error to var >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $process = proc_open("arm-elf-gcc -Wall -o compiled file.s", $descriptorspec, $pipes, dirname(__FILE__), null);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[2]);

    //Run the compiled file and get the finl out put to variables >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if(file_exists("compiled")){
        $process = proc_open("arm-elf-run compiled<in.txt", $descriptorspec, $pipes, dirname(__FILE__), null);
    }
    $stdout = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    //do objt doumping and get the instructions to var>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if(file_exists("compiled")){
        $process = proc_open("arm-elf-objdump -d -j .text compiled", $descriptorspec, $pipes, dirname(__FILE__), null);
        exec("arm-elf-objdump -d -j .text compiled>addtext.txt");
        exec("java Main");
    }
    $stdins = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    $instructions = file_get_contents("./file.txt");



    // print the final output in the page >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if(!(file_exists("compiled"))){
        echo "error of your code :\n\n$stderr\n\n";
    }else{
        echo "final output of your code :\n\n$stdout \n\n$instructions";
    }



    if (file_exists("compiled")) {unlink("compiled");}
    if (file_exists("file.s")) {unlink("file.s");}
    if (file_exists("in.txt")) {unlink("in.txt");}
    //if (file_exists("file.txt")) {unlink("file.txt");}
    //if (file_exists("addtext.txt")) {unlink("addtext.txt");}
   

?>