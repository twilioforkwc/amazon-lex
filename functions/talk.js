/**
 * Conversation to Amazon lex
 */
const AWS = require("aws-sdk");

exports.handler = async function (context, event, callback) {
  try {
    // Check variables
    const user = event.user || "TEST_USER";
    const message = event.message || "";

    // Initialize AWS configure
    AWS.config.update({
      region: context.AWS_REGION,
      credentials: new AWS.Credentials(
        context.AWS_ACCESS_KEY,
        context.AWS_SECRET_ACCESS_KEY
      ),
    });

    // Send message to lex
    const lexRuntime = new AWS.LexRuntime();
    const params = {
      botAlias: context.BOT_ALIAS,
      botName: context.BOT_NAME,
      inputText: message,
      userId: user,
      sessionAttributes: {},
    };
    lexRuntime.postText(params, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
      console.dir(data.slots);
      callback(null, {
        message: data.message,
        dialogState: data.dialogState,
        slots: data.slots,
      });
    });
  } catch (err) {
    // Error handle
    console.log(err);
    callback(err);
  }
};
