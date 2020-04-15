function getUsername(url) {
	let urlParts = url.split('=');
	let userName = urlParts[1];

	return userName;
}

let url = window.location.toString();
let userName = getUsername(url);

fetch('https://api.github.com/users/' + userName)
	.then(res => res.json())
	.then(json => {
		let userPic = json.avatar_url;
		let userName = json.login;
		let userDescription = json.bio;
		let userLink = json.html_url;
		console.log(userName);
		if (userName) {
		  	document.getElementById('username').href = userLink;
			document.getElementById('username').innerHTML = userName;
			if (userPic) {
				document.getElementById('userpic').src = userPic;
			}
			else {
				document.getElementById('userpic').src = 'img/no-pic.png';
			}
			if (userDescription != null) {
				document.getElementById('description').innerHTML = userDescription;
				document.getElementById('description').classList.add('description_padding');
			}
		} else if (userDescription == undefined) {
			document.getElementById('description').innerHTML = 'Введите корректное имя пользователя';
			document.getElementById('description').classList.add('no-user');
		}
	})

