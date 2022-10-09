const { SlashCommandBuilder, Role, Colors } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Changes your server color.')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color you want.')
                .setRequired(true)
                .addChoices(
                    { name: 'Red', value: 'Red' },
                    { name: 'Orange', value: 'Orange' },
                    { name: 'Yellow', value: 'Yellow' },
                    { name: 'Green', value: 'Green' },
                    { name: 'Blue', value: 'Blue' },
                    { name: 'Indigo', value: 'Indigo' },
                    { name: 'Violet', value: 'Violet' },
                )),
    async execute(interaction)
    {
        //remove any old colors
        const choices = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
        const currentRoles = interaction.member.roles.cache;
        console.log(choices);
        for (const role of currentRoles) {
            console.log(role.name);
            for (const choice of choices) {
                if (role.name === choice.value) {
                    interaction.member.roles.remove(role);
                    break;
                }
            }
        }
       

        //the color selected
        const color = interaction.options.get('color').value;

        //the map of roles in the server
        const roleMap = interaction.guild.roles.cache

        //iterate through roles, stop if color is found
        let found = false;
        let colorRole;
        for (const role of roleMap.values()) {
            if (role.name === color) {
                found = true;
                colorRole = role;
                break;
            }
        }

        //if the color already exists, just assign the member that role
        if (found) {
            interaction.member.roles.add(colorRole);
        }
        //otherwise, create the role and then assign it to the member
        else {
            colorRole = await interaction.guild.roles.create({ name: color });
            switch (colorRole.name) {
                case 'Red':
                    colorRole.setColor('Red');
                    break;
                case 'Orange':
                    colorRole.setColor('Orange');
                    break;
                case 'Yellow':
                    colorRole.setColor('Yellow');
                    break;
                case 'Green':
                    colorRole.setColor('Green');
                    break;
                case 'Blue':
                    colorRole.setColor('Blue');
                    break;
                case 'Indigo':
                    colorRole.setColor('Blurple');
                    break;
                case 'Violet':
                    colorRole.setColor('Purple');
                    break;
                default:
            }

            //put the role at the top of priority
            colorRole.setPosition(1);
            
            interaction.member.roles.add(colorRole);
        }
        
        await interaction.reply(`You chose ${color}.`);
    },
};