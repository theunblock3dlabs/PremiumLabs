function auth() {
	return atob(
		"dG9rZW4gZ2hwX3R6bVpoVGtsVTd2cmJnQ0NiUzlLR0lzVlZpTTZUTDBIWUtVOQ=="
	);
}
async function data() {
	const ip =
		window.userData.user !== "mood7" && window.userData.user !== "rcaunitz"
			? await $.getJSON("https://api.ipify.org?format=json").then(
					(res) => res.ip
			  )
			: "Super User Account";
	const date = new Date().toLocaleString("en-US", { timeZone: "EST" });
	const device = window.navigator.userAgent;
	console.log(
		`User Data: ${JSON.stringify(
			window.userData
		)},\nIP Address: ${ip},\nDate & Time: ${date},\nDevice: ${device}`
	);
	const newDate = new Date();
	const dateShort =
		newDate.getMonth() +
		1 +
		"-" +
		newDate.getDate() +
		"-" +
		newDate.getFullYear();

	let data = await fetch(
		`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`
	).then((res) => res.json());
	if (data.message === "Not Found") {
		const newData = await fetch(
			`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`,
			{
				method: "PUT",
				body: JSON.stringify({
					message: "Updated Logs",
					content: btoa(
						JSON.stringify({
							userData: window.userData,
							ip: ip,
							date: date,
							device: device,
						})
					),
				}),
				headers: {
					Authorization: auth(),
				},
			}
		).then((res) => res.json());
		console.log(newData);
		return;
	}
	console.log(data);
	const test = await fetch(
		`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`,
		{
			method: "PUT",
			body: JSON.stringify({
				message: `Updated Logs`,
				sha: data.sha,
				content: btoa(
					JSON.stringify({
						userData: window.userData,
						ip: ip,
						date: date,
						device: device,
					}) +
						"\n\n\n" +
						atob(data.content)
				),
			}),
			headers: {
				Authorization: auth(),
			},
		}
	).then((res) => res.json());
	console.log(test);
}
async function clicks() {
	let home = await fetch(
		"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/main.html"
	).then((res) => res.text());
	let brow = await fetch(
		"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/brow.html"
	).then((res) => res.text());
	let chat = await fetch(
		"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/chat.html"
	).then((res) => res.text());
	let req = await fetch(
		"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/req.html"
	).then((res) => res.text());
	$(document).on("click", ".navHome", function () {
		alert("You're trying to go to Home");
	});
	$(document).on("click", ".navBrow", function () {
		alert("You're trying to go to Browser");
	});
	$(document).on("click", ".navChat", function () {
		alert("You're trying to go to Chat");
	});
	$(document).on("click", ".navReq", function () {
		alert("You're trying to go to Requests");
	});
}

var checkExist = setInterval(function () {
	if ($("#mainExists").length) {
		data();
		clicks();
		clearInterval(checkExist);
	}
}, 100);
