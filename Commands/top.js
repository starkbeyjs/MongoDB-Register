const { MessageEmbed } = require('discord.js');
const stark = require("../stark.json");
const RegisterData = require("../models/Register.js")

exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setTimestamp().setColor(stark.renk).setFooter(stark.footer);
    if (!message.member.roles.cache.has(stark.kayıtcı) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 5000}));


 let RegisterSiralama = await RegisterData.find({ guildId: message.guild.id }).sort({ toplamkayit: -1 }).exec();

 if(!RegisterSiralama.length) return message.channel.send(embed.setDescription(`Herhangi bir kayıt verisi bulunamadı!`))
 RegisterSiralama = RegisterSiralama.filter(x => message.guild.members.cache.has(x.userId) &&  x.toplamkayit).splice(0, 10)
 message.channel.send(embed.setDescription(RegisterSiralama.map((x, i) => `\`${i+1}.\` <@${x.userId}> Toplam **${x.toplamkayit}** (\`${x.erkekkayit} Erkek, ${x.kadinkayit} Kız\`)`)))

};

exports.conf = {
    command: "top",
    description: "",
    aliases: ["sıralama", "top10"]
  }