const {
  TeamsActivityHandler,
  MessageFactory,
  TeamsInfo,
  TurnContext
} = require("botbuilder");
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

class SimpleAuthProvider {
  //accessToken = "";

  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  };
}

class ReverseBot extends TeamsActivityHandler {
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const msg = context.activity.text;
      console.error(msg);
      if (msg === "listuser") {
        const members = await this.getPagedMembers(context);
        console.log(members);
      }
      if (msg.includes("meeting")) {
        console.log("got meeting");
        await this.createMeetingAndInvite(context);
      } else {
        console.log("got no meeting");
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }

  async getPagedMembers(context) {
    let continuationToken;
    const members = [];

    do {
      const page = await TeamsInfo.getPagedMembers(
        context,
        100,
        continuationToken
      );

      continuationToken = page.continuationToken;

      members.push(...page.members);
    } while (continuationToken !== undefined);

    return members;
  }

  async createMeetingAndInvite(context) {
    try {
      let clientOptions = {
        authProvider: new SimpleAuthProvider(process.env.ACCESSTOKEN)
      };
      console.log("1");
      const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);
     console.log("2");
      const members = await this.getPagedMembers(context);
    console.log("3");
      console.log("got members", members.length);
       const event = {
          subject: "Footy Talk",
          start: { dateTime: new Date().toISOString(), timeZone: "UTC" },
          end: { dateTime: new Date(new Date().getTime() + 15 * 60 * 1000).toISOString(), timeZone: "UTC" },
          allowNewTimeProposals: false,
          isOnlineMeeting: true,
          onlineMeetingProvider: "teamsForBusiness"
        };
    
        const result = await client.api("/me/events").post(event);
        const link = result.onlineMeeting.joinUrl;
        console.log("result.onlineMeeting.joinUrl", result.onlineMeeting.joinUrl);
        this.sendMessages(members, link, context);
    } catch (error) {
      console.log("inside error");
      console.log("inside error", error.message);
      console.log(JSON.stringify(error));
    }
  }
  
  async sendMessages(members, link, context) {
          console.log("members");
    await Promise.all(
          members.map(async member => {
            const news = "Arsenal recovered from the shock of conceding a stunning Erik Lamela goal to claim a deserved 2-1 victory over Tottenham Hotspur in the Premier League's north London derby on Sunday.\
Martin Odegaard's deflected equaliser on the stroke of halftime and Alexandre Lacazette's 64th-minute penalty secured Arsenal's first win in six attempts against their bitter rivals.\
It was a mixed afternoon for Lamela who produced an audacious 'Rabona' shot to put Tottenham in front against the run of play after 33 minutes at The Emirates - one of the most remarkable goals ever seen in the long-running rivalry.";
            const message = MessageFactory.text(
              `Hello 👋️<br> Since you are interested in <b>sports⚽️</b>, have a look at this and discuss:<br><br><img src="https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/14406830/16x9/670/377/61ceb761d1902aedd32a1e4b3acef882/uI/britain-soccer-premier-league-94131-jpg-1615746668.jpg"><br>${news} <br> Source: https://www.channelnewsasia.com/news/sport/football-arsenal-rebound-lamela-beat-tottenham-premier-league-14407010 <br> <br> Reading Time: <b>2min</b> <br><br> Join your colleagues @ ${link}`
            );

            const ref = TurnContext.getConversationReference(context.activity);
            ref.user = member;

            await context.adapter.createConversation(ref, async context => {
              const ref = TurnContext.getConversationReference(
                context.activity
              );

              await context.adapter.continueConversation(ref, async context => {
                await context.sendActivity(message);
              });
            });
          })
        );

        await context.sendActivity(
          MessageFactory.text("All messages have been sent.")
        );
  }
}

module.exports.ReverseBot = ReverseBot;
