import { Bot, Context } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { parse } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

// Create an instance of the `Bot` class and pass your bot token to it.
const dotenv = await Deno.readTextFile(".env");
const bot = new Bot(parse(dotenv).TOKEN);

// Bot commands and behaviour
bot.command("start", (ctx: Context) => ctx.reply(
	"Welcome to the bot!\
\nYou seeing this message is a sign of dev being a lazy fuck. Go and bully him"
));
bot.command("die", (ctx: Context) => ctx.replyWithDice("🎲"));
bot.on("message", (ctx: Context) => {
	const tosynitus = 6011187837;
	const coolRaven = "https://wallpaperboat.com/wp-content/uploads/2020/10/16/56991/\
raven-08.jpg";
	if (ctx.from?.id === tosynitus) ctx.replyWithPhoto(coolRaven);
});

// Start the bot.
bot.start();
