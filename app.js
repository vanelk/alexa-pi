const { spawn } = require("child_process");
var player = require('play-sound')(opts = {})
const wakeworker = spawn('python', [ "-u", './wakeworker.py']);
const alexa_app_worker = spawn("bash", ["./launchalexa.sh"]);
const idle_phrase = "Alexa is currently idle!";
var is_idle = false,
is_first_time = true;
alexa_app_worker.stdout.on('data', (data)=>{
    if (data.toString().includes(idle_phrase)){
        if(is_first_time){
            player.play("./assets/hello.mp3", function(err){
                if (err) throw err
            });
            is_first_time = false;
        }
        is_idle = true;
    }
})
wakeworker.stdout.on('data', (data) => {
    if (is_idle){
        is_idle = false;
        player.play("./assets/alexayes.mp3", function(err){
            if (err) throw err
            alexa_app_worker.stdin.write("t\n")
        });
    }
});

wakeworker.stderr.on('error', (data) => {
    console.error(`stderr: ${data}`);
});

wakeworker.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});