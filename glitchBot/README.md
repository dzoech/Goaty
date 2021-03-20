# Bare-Minimum Bot for MS Teams

_Updated: August 2020_

This is a bare-minimun example of Microsoft Teams Bot using Bot Framework.

In the reality, you probably create a full-fledged web app with Teams SDK and NLP using services like LUIS, but this is just to show you what the minimun files you need to learn how to create a bot that runs on Teams.

![App in Teams](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-app.png?v=1601921312201)

## Overview

Bots are conversational app that a user can send and/or receive messages to/from the bot.

### 📄 index.js

The scripts that listens to the incoming requests. Using Bot Framework ([https://www.npmjs.com/package/botbuilder](https://www.npmjs.com/package/botbuilder))

### 📄 bot.js

Sends a message back to the user who sent one to the bot.

### 📄 provacy.html & tou.html

You are required to provide the URLs of "Privacy statement" and "Terms of use". The URLs don't need to be packaged with your app, but must have them somewhere you own.

### 📁 Manifest package to be installed in Teams client

> ⚠️ You don't actually need to create these files now, unless you want to build it manually without _App Studio_

The _temas-app_ dir in this repo is nothing more than an example of what a zip file (to be installed in Teams app) contains.

```
📁 teams-app
    └── 📄 manifest.json
    └── 🖼 color.png (192x192)
    └── 🖼 outline.png (32x32)
```

See the instruction below to see how you can create your own app package using **App Studio**

---

## Quick instruction with Glitch to edit and host your practice app

To create your own, first REMIX this repo (it is like fork):

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/msteams-bot-minimum)

Clicking the button will generate your own repo where you can mess with.
Look at the URL bar, and notice that now you have your own Glitch URL with random words, which should look like `fluffy-iron-dinner`.

Your hosting URL will be: **https://[your-project-name].glitch.me** like https://fluffy-iron-dinner.glitch.me.
You will need the hosting URL when you are setting up an app with App Studio later.

---

## App Configuration

Here's the step-by-step how to set up the ap and install on Teams-

### Prerequisites

- Microsoft 365 developer tenant ([Sign up if you don't have one already!](https://developer.microsoft.com/en-us/microsoft-365/dev-program))
- App Studio - look for the app in Teams desktop client and install

### Creating App Manifest with App Studio

#### App Details

Open **App Studio** app in Teams client.

Then, click **Create a new app** and fill out all the required fileds including the Bot names, descriptions, etc.

Generate an App ID.

![App Studio](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-appstudio-01-details.png?v=1601921412345)

At **App URLs** section, inlcude your privacy and TOU webpages. In this example, I am just using the placeholder URL, `https://example.com`.



#### Bots config

From the left menu, select Capabilities > **Bots**.

Then click **Set up** to configure a new bot.

Fill out the bot name, and let's just select the Personal scope for now.

![App Studio](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-appstudio-02-new-bot.png?v=1601921312969)

Then, click **Generate new password**. At the prompt, copy the password, which you will need to paste it in your **.env** file at the next step!

![App Studio](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-appstudio-03-bot.png?v=1601921312999)

##### App Credentials

Copy the ID under your bot name (something looks like `123xx567-123x-...`) and paste it as an environment variable in your _.env_ file, which is supposed to be a hidden file (Rename the `.env-sample` to `.env`).

Under **App Passwords**, generate new password, and copy it. Then paste it in your _.env_ file.

These credentials are used to initialize your bot adapter. (See index.js).

At **Messagind Endpoint**, enter `https://[your project].glitch.me/api/messages`.

#### Finish creating the app manifest package

Go to Finish > **Test and distribute**.

![App Studio](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-appstudio-04-install.png?v=1601921987396)

If you get any errors, go fix it, otherwise, click **Install** your client.

You can also download the zip file that contains `manifest.json`, and two icon images to install later or distribute.

## Test your bot

In your Teams client, let's try out the personal bot. You can access the bot you just installed from the side bar at your left.

Now you have the 1:1 chat interface with the bot. Let's type sending a message.

![App in Teams](https://cdn.glitch.com/3bdb2945-0f0e-4f7f-9ef3-70724a2ae676%2Fbot-app.png?v=1601921312201)

The bot should reply you what you typed in backwards!

---

## Deployment

Glitch is a great tool that works as an web IDE, and Node.js app host for your developerment (Also, a great for me to show you how-to instructions without all other dependencies),
however, this is not where you should host production apps.

To deploy your app, see [Deploy your bot to Azure](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-basic-deploy).

---

## Learn more to build full-fledged apps (TBD)

- Use the built tools (link)
- Use LUIS for smarter bots
