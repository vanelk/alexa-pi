const { spawn } = require("child_process");
const path = require("path");
const player = require('play-sound')();

const alexa_app_worker = spawn("/usr/bin/bash", [path.join(__dirname, "scripts", "launchsampleapp.sh")]);
const wakeworker = spawn('/usr/bin/python', [ "-u", path.join(__dirname, 'wakeworker.py'), "--daemonq"]);
const idle_phrase = "Alexa is currently idle!";
wakeworker.on("close", (code)=>{
    throw new Error(`wake worker process exited with code ${code}`);
})
var is_idle = false,
is_first_time = true;
alexa_app_worker.stdout.on('data', (data)=>{
    if (data.toString().includes(idle_phrase)){
        if(is_first_time){
            player.play(path.join(__dirname,"assets", "hello.mp3"));
            is_first_time = false;
        }
        is_idle = true;
    }
})
wakeworker.stdout.on('data', (data) => {
    if (is_idle){
        is_idle = false;
        player.play(path.join(__dirname,"assets", "alexayes.mp3"), ()=>{
            alexa_app_worker.stdin.write("t\n")
        });
    }
});
wakeworker.stderr.on('data', (data)=>{
    throw new Error(`Wake worker error: ${data}`);
})