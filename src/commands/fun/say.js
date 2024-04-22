const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {    
    const text = interaction.options.getString('text');
    const mentionedUsers = interaction.options.getUser('mentionedUsers');
    const mentionedRoles = interaction.options.getRole('mentionedRoles');
    const mentionedChannels = interaction.options.getChannel('mentionedChannels');

    let mentionedText = text;

    // Mention users
    if (mentionedUsers) {
        mentionedUsers.forEach(user => {
            const userMention = `<@${user.id}>`;
            mentionedText = mentionedText.replace(user.id, userMention);
        });
    }

    // Mention roles
    if (mentionedRoles) {
        mentionedRoles.forEach(role => {
            const roleMention = `<@&${role.id}>`;
            mentionedText = mentionedText.replace(role.id, roleMention);
        });
    }

    // Mention channels
    if (mentionedChannels) {
        mentionedChannels.forEach(channel => {
            const channelMention = `<#${channel.id}>`;
            mentionedText = mentionedText.replace(channel.id, channelMention);
        });
    }

    if (mentionedText.length >= 2000) return client.errNormal({ 
        error: "You may not use more than 2000 characters!", 
        type: 'editreply' 
    }, interaction);

    await interaction.channel.send({ content: mentionedText }).then(() => {
        client.succNormal({
            text: `Message sent successfully`,
            type: 'ephemeraledit'
        }, interaction)
    });
}

 
