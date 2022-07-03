const {
  MessageButton,
  MessageActionRow,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
  verifyKeyMiddleware,
} = require("discord-interactions");

module.exports = {
  name: "ping",
  description: "Get the current bot ping.",
  cooldown: 5,
  run: async (client, interaction, res, startAt) => {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Pong! :) **${Date.now() - startAt}ms**`,
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  },
};
