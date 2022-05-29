const { spawn } = require("child_process");
const path = require("path");
const player = require('play-sound')();

const AlexaStates = {
    UNKNOWN: 'UNKNOWN',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    IDLE: 'IDLE',
    LISTENING: 'LISTENING',
    THINKING: 'THINKING',
    SPEAKING: 'SPEAKING'
}
const connecting_phrase = "Connecting...";
const connected_phrase = "Successfully registered";
const idle_phrase = "Alexa is currently idle!";
const listening_phrase = "Listening...";
const thinking_phrase = "Thinking...";
const speaking_phrase = "Speaking...";

var currentState = AlexaStates.UNKNOWN;

const alexa_app_worker = spawn("/usr/bin/bash", [path.join(__dirname, "scripts", "launchsampleapp.sh")]);
const wakeworker = spawn('/usr/bin/python', ["-u", path.join(__dirname, 'wakeworker.py')]);

wakeworker.on("close", (code) => {
    throw new Error(`wake worker process exited with code ${code}`);
})

alexa_app_worker.stdout.on('data', HandleStateChange);

wakeworker.stdout.on('data', HandleWakeWordActivation);
wakeworker.stderr.on('data', (data) => {
    throw new Error(`Wake worker error: ${data}`);
})

// TODO: Have to think about stopping an ongoing interaction
function HandleWakeWordActivation() {
    if (currentState !== AlexaStates.LISTENING && currentState !== AlexaStates.CONNECTING) {
        alexa_app_worker.stdin.write("t\n");
    }
}

function HandleStateChange(data) {
    const string_data = data.toString();
    if (string_data.includes(connecting_phrase)) {
        currentState = AlexaStates.CONNECTING;
    } else if (string_data.includes(connected_phrase)) {
        player.play(path.join(__dirname, "assets", "hello.mp3"));
        currentState = AlexaStates.CONNECTED;
    } else if (string_data.includes(idle_phrase)) {
        currentState = AlexaStates.IDLE;
    } else if (string_data.includes(listening_phrase)) {
        currentState = AlexaStates.LISTENING;
    } else if (string_data.includes(thinking_phrase)) {
        currentState = AlexaStates.THINKING;
    } else if (string_data.includes(speaking_phrase)) {
        currentState = AlexaStates.SPEAKING;
    }
}
