import { Bot, Context } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { parse } from "jsr:@std/dotenv@0.222.1";

// Create an instance of the `Bot` class and pass your bot token to it.
const token = await Deno.readTextFile(".env")
	.then((dotenv) => parse(dotenv).TOKEN)
	.catch((_) => Deno.env.get("TOKEN"));

console.log(`Creating bot with TOKEN=${token}`);
const bot = new Bot(token ? token : "", {
	client: {
		canUseWebhookReply: (method) => method === "sendChatAction",
	}
});

// Bot command description
const commands = [
	// { command: "", description: "" },
	{ command: "start", description: "start the bot." },
	{ command: "help", description: "print this help message." },
	{ command: "die", description: "roll a die." },
];
await bot.api.setMyCommands(commands);

function commandsToString(commands: { command: string, description: string }[]) {
	let result: string = "";
	for (const command of commands)
		result += `/${command.command} - ${command.description}\n`;
	return result;
}

// Bot actions
bot.command("help", (ctx: Context) => ctx.reply(commandsToString(commands)))

bot.command("start", (ctx: Context) => ctx.reply(`
Welcome to the bot!
Try /help to get the list of commands!
`));

bot.command("die", (ctx: Context) => {
	const emoji = ctx.match ? ctx.match+"" : "🎲"; // +"" turns it into a string
	if (["🎲", "🎯", "🏀", "⚽", "🎰"].includes(emoji))
		ctx.replyWithDice(emoji);
	else
		ctx.reply(emoji + " isn't supported.");
});
	
bot.on("message", (ctx: Context) => {
	const tosynitus = 6011187837;
	const coolRaven =
		"https://wallpaperboat.com/wp-content/uploads/2020/10/16/56991/raven-08.jpg";
	if (ctx.from?.id === tosynitus) ctx.replyWithPhoto(coolRaven);
});

// Export bot for use with mod.ts
export { bot };
