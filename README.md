# Alexa pi
Amazon alexa on raspberry pi.
## Requirements
To install alexa on your raspberry pi you'll need: 
- A raspberry pi (remommend a pi3 or 4) with raspbian or raspberry pi os.
- Amazon Device SDK
- Nodejs
- python3
- pip3

## Installation
### Step 0: Creating project directory
Once you have installed your os, run:
```
cd $HOME
mkdir alexa
cd alexa
```
### Step 1: Installing Device SDK
Follow instructions to install sdk from [amazon's website](https://developer.amazon.com/en-US/docs/alexa/avs-device-sdk/raspberry-pi.html) or use these [instructions](https://developer.amazon.com/en-US/docs/alexa/avs-device-sdk/raspberry-pi-script.html) to build with script.

#### Notes
- You'll need to [register a product](https://developer.amazon.com/en-US/docs/alexa/alexa-voice-service/register-a-product-with-avs.html).
- If you get stuck at this step, use the amazon's troubleshooting [guide](https://developer.amazon.com/en-US/docs/alexa/avs-device-sdk/troubleshooting.html#raspberry).
- Make sure the sample app runs from installation guide properly before proceeding.

#### Further Notes.
- In order to interact with alexa-pi by saying *Alexa* you need a wake word engine.
- Unfortunately, AVK does not come with a wake word engine so the next part of the installation is to provide you with that.

### Step 2: Install NodeJS

```bash
cd $HOME/sdk_folder/third-party
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step3: Install Dependencies and final configurations

#### a. Clone repo and enter into it

```bash
git clone https://github.com/vanelk/alexa-pi.git
cd  alexa-pi.git
```


#### b. Install Python and Nodejs dependencies

```bash
pip install -r requirements.txt
npm install
```

## Running
In folder where you cloned this project, run:
```bash
npm start
```
Wait for the *Hello* sound to confirm activation.
Try saying *Alexa* followed by your query. For example:
- *Alexa, what is the time.*
- *Alexa, tell me a joke.*
- *Alexa, tell who is Johnny Depp.*