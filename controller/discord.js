const Discord = require("discord.js");
const axios = require("axios");
const cron = require("node-cron");

// Set up Discord webhook client
const webhookClient = new Discord.WebhookClient({
  id: "1091719267726139444",
  token: "GoodxS-yAsGlD7l0ntn8rgqISJ8l9pFqeDaNQ2234gw1vUaDRqLVAFi8a2cyiyoT8EvQ",
});

// Function to send Discord webhook notification
function sendWebhookNotification(liveInfo) {
  const name = liveInfo.url_key.replace("JKT48_", "") + " JKT48";
  const link = `https://www.jkt48-showroom.com/room/${liveInfo.url_key}/${liveInfo.id}`;

  const description = new Discord.EmbedBuilder()
    .setTitle(`${name} is now live on Showroom!`)
    .setURL(link)
    .addFields(
      // {
      //   name: "Live Started:",
      //   value: liveStarted(1680379248),
      // },
      {
        name: "Watch On JKT48 Showroom:",
        value: `[Here](${link})`,
        inline: true,
      },
      {
        name: "Watch On Showroom:",
        value: `[Here](https://www.showroom-live.com/r/${liveInfo.url_key})`,
        inline: true,
      }
    )
    .setDescription(`Silahkan Pilih Link Streaming`)
    .setImage(liveInfo.image_url)
    .setColor("#FF0000")
    .setTimestamp();

  webhookClient.send({
    username: "JKT48 SHOWROOM Live Notification",
    avatarURL:
      "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87",
    embeds: [description],
  });
}

function liveStarted(times) {
  function formatTime(n) {
    return n < 10 ? '0' + n : n;
  }

  function getTimes(dateInput) {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
    return time;
  }

  return times ? getTimes(times * 1000) : 'TBD';
}

const dummyLive = [
  {
    id: 317727,
    name: "Zee/ジー（JKT48）",
    url_key: "JKT48_Zee",
    image_url:
      "https://static.showroom-live.com/image/room/cover/a9aa6279cf53c4b3f2d79e35a098e94934506edc56b60896dcc44a45f940611e_m.jpeg?v=1675092985",
    description:
      '"Name: Azizi Asadel/アジジ・アサデル\r\nBirthday: 16-May-2004\r\nBirthplace: Jakarta\r\nBlood type: O\r\nZodiac signs: Taurus  \r\nHobby: Social media activities, Playing mobile games\r\n\r\nTwitter: http://www.twitter.com/A_ZeeJKT48\r\nInstagram:http://www.instagram.com/jkt48.zee"',
    follower_num: 107533,
    is_live: true,
    is_party: false,
    next_live_schedule: 0,
  },
  {
    id: 318227,
    name: "Indah/インダー（JKT48）",
    url_key: "JKT48_Indah",
    image_url:
      "https://static.showroom-live.com/image/room/cover/58f3d939319e28956fd771e0f587a347ea0fec6b5c3415067e122f4794fd3514_m.jpeg?v=1675091960",
    description:
      '"Name: Indah Cahya / インダー・チャヤ\r\nBirthday:20-March-2001\r\nBirthplace: Jambi\r\nBlood type:  A\r\nZodiac signs:  Pisces\r\nHobby: Cooking, Traveling, Watching film\r\n\r\nTwitter: https://twitter.com/C_IndahJKT48\r\nInstagram:https://www.instagram.com/jkt48indah_/"',
    follower_num: 65789,
    is_live: false,
    is_party: false,
    next_live_schedule: 0,
  },
  {
    id: 318207,
    name: "Shani/シャニ（JKT48）",
    url_key: "JKT48_Shani",
    image_url:
      "https://static.showroom-live.com/image/room/cover/15391680ed61e9c6c53454d5f56f63236e29a261ee5054e42daee3f04b630567_m.jpeg?v=1675092514",
    description:
      "Name: Shani Indira Natio\r\nBirthday: 5 October 1998\r\nBirthplace: Kebumen\r\nBlood type: B\r\nZodiac signs:  Libra\r\nHobby: Swimming, Listening to music, Strolling\r\n\r\nTwitter: N_ShaniJKT48\r\nInstagram:jkt48shani",
    follower_num: 100277,
    is_live: true,
    is_party: false,
    next_live_schedule: 0,
  },
];

async function getLiveInfo() {
  const response = await axios.get(
    `https://jkt48-showroom-api.vercel.app/api/rooms`
  );
  const rooms = response.data;

  for (const member of rooms) {
    if (member.is_live) {
      sendWebhookNotification(member);
    } else {
      console.log(`${member.name}not live`);
    }
  }
}

const DiscordApi = {
  getLiveNotification: async (req, res) => {
    try {
      cron.schedule("*/5 * * * *", async () => {
        getLiveInfo()
      });

      res.send("Live notification sent!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending live notification");
    }
  },
};

module.exports = DiscordApi;
