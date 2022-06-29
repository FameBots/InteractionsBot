const {
  glob
} = require("glob"), {
    promisify
  } = require("util"),
  globPromise = promisify(glob);
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const fs = require('node:fs');
  


module.exports = async (client) => {
  // apps
  const appFiles = await globPromise(`${process.cwd()}/apps/*.js`);
  appFiles.map((value) => require(value));


  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.commands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });

  const rest = new REST({ version: '9' }).setToken("T0K3N");

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(
        Routes.applicationCommands("CL1NT_ID"),
        { body: client.commands },
      );
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

  // Buttons
  const buttonFiles = await globPromise(`${process.cwd()}/buttons/**/*.js`);
  buttonFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = {
        directory,
        ...file
      };
      client.buttons.set(file.name, properties);
    }
  });

    // modals
    const modalFiles = await globPromise(`${process.cwd()}/modals/**/*.js`);
    modalFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
  
      if (file.name) {
        const properties = {
          directory,
          ...file
        };
        client.modals.set(file.name, properties);
      }
    });
};