const express = require("express");
const { Collection } = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
  verifyKeyMiddleware,
} = require("discord-interactions");

const port = process.env.PORT;

const Client = {};
Client.capitalize = async (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

Client.commands = new Collection();
Client.buttons = new Collection();
Client.modals = new Collection();
Client.wait = setTimeout;

Client.getOption = (interaction, option) => {
  return interaction.data.options[0].options.filter(
    (boo) => boo.name === option
  )[0];
};
Client.getSubCommandName = (interaction) => {
  return interaction.data.options[0].name;
};

// Create an express app
const app = express();

require("./database/mongoose.js");
require("./commands.js")(Client);

app.post("/interactions", verifyKeyMiddleware("SECRET"), (req, res) => {
  const startAt = Date.now();
  const interaction = req.body;
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const cmd = Client.commands.get(interaction.data.name);

    console.log(interaction);

    if (!cmd) {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Can't find this Command. :(`,
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      });
    }

    cmd.run(Client, interaction, res, startAt);
  } else if (interaction.type === InteractionType.MODAL_SUBMIT) {
    const modal = Client.modals.get(interaction.data.name);
    if (!modal) return;
    console.log(interaction);

    modal.run(Client, interaction, res, startAt);
  } else if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    const button = Client.buttons.get(interaction.data.name);
    if (!button) return;
    console.log(interaction);

    button.run(Client, interaction, res, startAt);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
