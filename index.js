const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    PermissionsBitField,
} = require("discord.js");
const fs = require("fs");

// Carica il file di configurazione
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

// Crea il client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Quando il bot è pronto
client.once("ready", () => {
    console.log(`Bot online: ${client.user.tag}`);
    client.user.setStatus("invisible"); // Imposta lo stato su invisibile (offline)
});

// Event Listener: Comandi testuali
client.on("messageCreate", async (message) => {
    // Comando: Apri Ticket
    if (
        message.content === "!Console_ticket" &&
        message.member.roles.cache.has(config.roleId)
    ) {
        const embed = new EmbedBuilder()
            .setTitle("SUPPORTO")
            .setDescription(
                "Se vuoi aprire un ticket clicca il pulsante qua in basso e seleziona il bisogno.\n\nLa risposta arriverà entro 24h dall'apertura del ticket.\n\nSe vuoi aprire una commissione visita ⁠#commissioni.",
            )
            .setColor(8322816);

        const button = new ButtonBuilder()
            .setCustomId("create_ticket")
            .setLabel("SUPPORTO")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🛡️");

        const row = new ActionRowBuilder().addComponents(button);

        await message.channel.send({
            embeds: [embed],
            components: [row],
        });
    }

    // Comando: Stato HUB
    if (
        message.content === "!Status_HUB" ||
        (message.content === "!status_hub" &&
            message.author.id === config.authorizedUserId)
    ) {
        const timestamp = new Date().toISOString();

        const embed1 = new EmbedBuilder()
            .setColor(42247)
            .setImage("https://i.imgur.com/xlBcMZt.png");

        const embed2 = new EmbedBuilder()
            .setTitle("Status | Service")
            .setColor(42247)
            .addFields(
                {
                    name: "Status Commissioni:",
                    value: "```diff\n+ Online\n```",
                },
                {
                    name: "Status Hub:",
                    value: "```diff\n- Offline\n```",
                },
                {
                    name: "Status BOT:",
                    value: "```diff\n+ Online\n```",
                },
            )
            .setFooter({
                text: "Assistenza Service - GG's",
                iconURL: "https://i.imgur.com/NGF0N4r.png",
            })
            .setTimestamp(new Date(timestamp))
            .setImage("https://i.imgur.com/xlBcMZt.png");

        await message.channel.send({
            embeds: [embed1, embed2],
        });
    }

    // Comando: Sviluppatori
    if (
        message.content === "!Sviluppatori" ||
        message.content === "!Developers" ||
        message.content === "!sviluppatori" ||
        message.content === "!developers"
    ) {
        const embed = new EmbedBuilder()
            .setColor(43268)
            .setAuthor({
                name: "Developers ||  Sviluppatori",
                iconURL: "https://i.imgur.com/NGF0N4r.png",
            })
            .setDescription(
                `**Italy:**\n\nIl bot è stato programmato da <@995992602639880322>, per far in modo che venga aiutato nella Gestione di [SERVICE - GG'S](https://discord.gg/cPT7X2C92j) e sia semplificato tutto il suo lavoro.\n\n**English:**\n\nThe bot was programmed by <@995992602639880322>, to help manage [SERVICE - GG'S](https://discord.gg/cPT7X2C92j) and simplify the work.`,
            )
            .setImage("https://i.imgur.com/jdS1iYI.png")
            .setThumbnail("https://i.imgur.com/NGF0N4r.png");

        await message.reply({
            embeds: [embed],
        });
    }

    // Comando: Chi sono
    if (message.content === "!Chi_sono" || message.content === "!chi_sono") {
        const embed = new EmbedBuilder()
            .setColor(43268)
            .setAuthor({
                name: "Chi sono?",
                iconURL: "https://i.imgur.com/NGF0N4r.png",
            })
            .setDescription(
                `**Italy:**\n\nSono un giovane Sviluppatore Italiano, so utilizzare diversi linguaggi di programmazione come: Lua, C++, C#, Node.js,Python; Posso creare BOT per discord che vi aiutino a Gestire il vostro server Discord.\n\n**English:**\n\nI am a young Italian Developer, I know how to use different programming languages ​​such as: Lua, C++, C#, Node.js,Python; I can create BOT for discord that help you manage your Discord server.`,
            )
            .setImage("https://i.imgur.com/jdS1iYI.png")
            .setThumbnail("https://i.imgur.com/NGF0N4r.png");

        await message.channel.send({
            embeds: [embed],
        });
    }

    // Comando: Verifica Ruoli
    if (
        message.content === "!Verifica" ||
        message.content === "!verifica" ||
        message.content === "!Verify" ||
        message.content === "!verify"
    ) {
        const embed = new EmbedBuilder()
            .setTitle("Verifica || Verify")
            .setDescription(
                `Premi i pulsanti per ricevere i ruoli corrispondenti: <@&1060328275240554617>, <@&1166058703364042832>, <@&1059912717974126652>.`,
            )
            .setColor(43268)
            .setThumbnail("https://i.imgur.com/NGF0N4r.png");

        const greenButton = new ButtonBuilder()
            .setCustomId("role_green")
            .setLabel("Verifed")
            .setStyle(ButtonStyle.Success)
            .setEmoji("1166020749237178429");

        const blueButton = new ButtonBuilder()
            .setCustomId("role_blue")
            .setLabel("Member Discord")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("1308844966684000297");

        const redButton = new ButtonBuilder()
            .setCustomId("role_red")
            .setLabel("Member Roblox")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("1300209968770715708");

        const row = new ActionRowBuilder().addComponents(
            greenButton,
            blueButton,
            redButton,
        );

        await message.channel.send({
            embeds: [embed],
            components: [row],
        });
    }
});

// Event Listener: Interazioni Bottoni
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const member = interaction.member;

    // Bottoni Ruoli
    if (interaction.customId === "role_green") {
        await member.roles.add("1060328275240554617");
        await interaction.reply({
            content: "Hai ricevuto il ruolo <@&1060328275240554617>!",
            ephemeral: true,
        });
    } else if (interaction.customId === "role_blue") {
        await member.roles.add("1166058703364042832");
        await interaction.reply({
            content: "Hai ricevuto il ruolo <@&1166058703364042832>!",
            ephemeral: true,
        });
    } else if (interaction.customId === "role_red") {
        await member.roles.add("1059912717974126652");
        await interaction.reply({
            content: "Hai ricevuto il ruolo <@&1059912717974126652>!",
            ephemeral: true,
        });
    }

    // Creazione Ticket
    if (interaction.customId === "create_ticket") {
        const guild = interaction.guild;
        const member = interaction.member;

        const ticketChannel = await guild.channels.create({
            name: `ticket-${member.user.username}`,
            type: 0, // Canale testuale
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: config.roleId,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setTitle("Grazie per aver aperto il ticket!")
            .setDescription(`Descrivi il tuo problema, <@${member.id}>.`)
            .setColor(8322816);

        const closeButton = new ButtonBuilder()
            .setCustomId("close_ticket")
            .setLabel("Chiudi Ticket")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(closeButton);

        await ticketChannel.send({
            embeds: [embed],
            components: [row],
        });

        await interaction.reply({
            content: `Il tuo ticket è stato aperto: ${ticketChannel}`,
            ephemeral: true,
        });
    }

    // Chiusura Ticket
    if (interaction.customId === "close_ticket") {
        const ticketChannel = interaction.channel;

        const logsChannel = interaction.guild.channels.cache.get(
            config.logsChannelId,
        );
        if (logsChannel) {
            const messages = await ticketChannel.messages.fetch({ limit: 100 });
            const logs = messages
                .map((m) => `${m.author.tag}: ${m.content}`)
                .reverse()
                .join("\n");
            await logsChannel.send({
                content: `**Log del ticket chiuso da <@${interaction.user.id}>**\n\n${
                    logs.length > 2000 ? logs.slice(0, 1997) + "..." : logs
                }`,
            });
        }

        await ticketChannel.delete();
    }
});

// Login del bot
client.login(config.token);
