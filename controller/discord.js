const Discord = require("discord.js");
const axios = require("axios");

// Set up Discord webhook client
const webhookClient = new Discord.WebhookClient({
  id: "1091719267726139444",
  token: "GoodxS-yAsGlD7l0ntn8rgqISJ8l9pFqeDaNQ2234gw1vUaDRqLVAFi8a2cyiyoT8EvQ",
});

// Function to send Discord webhook notification
function sendWebhookNotification(liveInfo) {
  const name = liveInfo.url_key
    ? liveInfo.url_key.replace("JKT48_", "") + " JKT48"
    : liveInfo.room_url_key.replace("JKT48_", "") + " JKT48";
  const link = `https://www.jkt48-showroom.com/room/${
    liveInfo.url_key ?? liveInfo.room_url_key
  }/${liveInfo.id ?? liveInfo.room_id}`;

  const description = new Discord.EmbedBuilder()
    .setTitle(`${name} is now live on Showroom!`)
    .setURL(link)
    .addFields(
      {
        name: "Watch On JKT48 Showroom:",
        value: `[Here](${link})`,
        inline: true,
      },
      {
        name: "Watch On Showroom:",
        value: `[Here](https://www.showroom-live.com/r/${
          liveInfo.url_key ?? liveInfo.room_url_key
        })`,
        inline: true,
      }
    )
    .setDescription(`Silahkan Pilih Link Streaming`)
    .setImage(liveInfo.image_url ?? liveInfo.image)
    .setColor("#FF0000")
    .setTimestamp();

  webhookClient.send({
    username: "JKT48 SHOWROOM Live Notification",
    avatarURL:
      "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87",
    embeds: [description],
  });
}

async function getLiveInfo() {
  const response = await axios.get(
    `https://jkt48-showroom-api.vercel.app/api/rooms`
  );
  const rooms = response.data;

  for (const member of rooms) {
    if (member.is_live) {
      await sendWebhookNotification(member);
    } else {
      console.log(`${member.name}not live`);
    }
  }
}

async function getLiveInfoAcademy() {
  const response = await axios.get(
    `https://jkt48-showroom-api.vercel.app/api/rooms/academy`
  );
  const roomsAcademy = response.data;

  for (const member of roomsAcademy) {
    if (member.is_onlive) {
      await sendWebhookNotification(member);
    } else {
      console.log(`${member.main_name}not live`);
    }
  }
}

const DiscordApi = {
  getLiveNotification: async (req, res) => {
    try {
      // cron.schedule("*/5 * * * *", async () => {
      if (req.params.type === "regular") {
        await getLiveInfo();
      } else {
        await getLiveInfoAcademy();
      }
      // });

      res.send("Live notification sent!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending live notification");
    }
  },
};

module.exports = DiscordApi;
