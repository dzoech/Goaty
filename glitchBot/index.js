const express = require("express");
 // Create HTTP server
const app = express();
const server = app.listen(process.env.PORT || 3978, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

// Import required bot services
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require("botbuilder");

// This bot's main dialog
const { ReverseBot } = require("./bot");

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  // Send a message to the user
  await context.sendActivity("The bot encountered an error or bug.");
  await context.sendActivity(
    "To continue to run this bot, please fix the bot source code."
  );
};

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the main dialog.
const myBot = new ReverseBot();

// Messaging endpoint - Listen for incoming requests.
app.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async context => {
    // Route to main dialog.
    await myBot.run(context);
  });
});

// Listen for Upgrade requests for Streaming.
app.on("upgrade", (req, socket, head) => {
  // Create an adapter scoped to this WebSocket connection to allow storing session data.
  const streamingAdapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
  });
  // Set onTurnError for the BotFrameworkAdapter created for each connection.
  streamingAdapter.onTurnError = onTurnErrorHandler;

  streamingAdapter.useWebSocket(req, socket, head, async context => {
    // After connecting via WebSocket, run this logic for every request sent over
    // the WebSocket connection.
    await myBot.run(context);
  });
});
