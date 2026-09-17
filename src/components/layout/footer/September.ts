const day = new Date().getDate();

function suffix(number: number) {
	let t = number % 10,
		h = number % 100;
	if (t === 1 && h !== 11) {
		return number + "st";
	}
	if (t === 2 && h !== 12) {
		return number + "nd";
	}
	if (t === 3 && h !== 13) {
		return number + "rd";
	}
	return number + "th";
}

export const September = [
	{
		lyric: "",
		beats: 1,
	},
	{
		lyric: " ",
		beats: 38,
	},
	{
		lyric: "Do you remember",
		beats: 6,
	},
	{
		lyric: `the ${(day !== 21 && "<s>21st</s>") || ""} ${suffix(day)} night of September?`,
		beats: 7,
	},
	{
		lyric: "Love was changing the minds of pretenders",
		beats: 8,
	},
	{
		lyric: "while chasing the clouds awaaayyyy~",
		beats: 11,
	},
	{
		lyric: "Our hearts were ringing",
		beats: 4,
	},
	{
		lyric: "In the key that our souls were singing",
		beats: 8,
	},
	{
		lyric: "As we danced in the night, remember",
		beats: 8,
	},
	{
		lyric: "How the stars stole the night awaaayyyeyeyyyey~",
		beats: 10,
	},
	{
		lyric: "Ah, ah, ahh",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Say, do you remember",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Dancin' in September",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Never was a cloudy daaaaaaaayyyyy~",
		beats: 12,
	},
	{
		lyric: "Baa-duu, baa-duu",
		beats: 4,
	},
	{
		lyric: "Baa-duu-ah, baa-duu",
		beats: 4,
	},
	{
		lyric: "Baa-duu, baa-duu",
		beats: 4,
	},
	{
		lyric: "Baa-duu-ah, baa-duu",
		beats: 4,
	},
	{
		lyric: "Baa-duu, baa-duu",
		beats: 4,
	},
	{
		lyric: "Baa-duu-ahh",
		beats: 4,
	},
	{
		lyric: " ",
		beats: 6,
	},
	{
		lyric: "My thoughts are with you",
		beats: 4,
	},
	{
		lyric: "Holding hands with your heart to see you",
		beats: 8,
	},
	{
		lyric: "Only blue talk and love, remember",
		beats: 8,
	},
	{
		lyric: "How we knew love was here to staaaaayyyy~",
		beats: 12,
	},
	{
		lyric: "Now December",
		beats: 4,
	},
	{
		lyric: "Found the love we shared in September",
		beats: 8,
	},
	{
		lyric: "Only blue talk and love, remember",
		beats: 9,
	},
	{
		lyric: "True love we share todaaaaayyyyyyyyaaaAAAAAAAAaaAAAee",
		beats: 9,
	},
	{
		lyric: "Ah, ah, ahh",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Say, do you remember",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Dancin' in September",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Never was a cloudy daaaaaaaayyyyy~",
		beats: 10,
	},
	{
		lyric: "And we'll say baa-dee-yaa",
		beats: 6,
	},
	{
		lyric: "Say, do you remember",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Dancin' in September",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Golden dreams were shiny daaaaaaaaaayyyss~",
		beats: 12,
	},
	{
		lyric: "The bell was ringiiing",
		beats: 6,
	},
	{
		lyric: "Ah-aaahh",
		beats: 2,
	},
	{
		lyric: "Our sooooouuls were singiiiing",
		beats: 8,
	},
	{
		lyric: "Do you remembeeer?",
		beats: 4,
	},
	{
		lyric: "Never a cloudy day~",
		beats: 5,
	},
	{
		lyric: "yeow",
		beats: 2,
	},
	{
		lyric: " ",
		beats: 3,
	},
	{
		lyric: "And we'll say baa-dee-yaa",
		beats: 6,
	},
	{
		lyric: "Say, do you remember",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Dancin' in September",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Never was a cloudy daaaaaaaayyyyy~",
		beats: 10,
	},
	{
		lyric: "And we'll day baa-dee-yaa",
		beats: 6,
	},
	{
		lyric: "Say, do you remember",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Dancin' in September",
		beats: 4,
	},
	{
		lyric: "Baa-dee-yaa",
		beats: 4,
	},
	{
		lyric: "Golden dreams were shiny daaaaaaaaaayyyss~",
		beats: 12,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaaa",
		beats: 8,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaaa",
		beats: 8,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaa",
		beats: 7,
	},
	{
		lyric: "Dee-yaaaaaaaaaaaaaaaaa",
		beats: 9,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaaa",
		beats: 8,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaaa",
		beats: 8,
	},
	{
		lyric: "Baa-dee-yaa dee-yaa dee-yaa",
		beats: 7,
	},
	{
		lyric: "",
		beats: 0,
	},
];
