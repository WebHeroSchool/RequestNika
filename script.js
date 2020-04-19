let url = window.location.toString();
let userName = getUsername(url);

function getUsername(url) {
	let urlParts = url.split('=');
	let userName = urlParts[1];

	if (userName == undefined) {
		userName = 'nikakrash';
	}

	return userName;
}

let getDate = new Promise((resolve, reject) => {
	let date = new Date();
	setTimeout(() => date ? resolve(date) : reject ('Ошибка вычисления времени'), 3000)
});

let getUserInfo = fetch('https://api.github.com/users/' + userName);

Promise.all([getUserInfo, getDate])
	.then(([request, date]) => {
		requestInfo = request;
		requestDate = date;
	})
	.then(res => requestInfo.json())
	.then(showUserInfo => {
		let userPic = showUserInfo.avatar_url;
		let userName = showUserInfo.login;
		let userDescription = showUserInfo.bio;
		let userLink = showUserInfo.html_url;
		let preloader = document.getElementById('preloader');

        preloader.classList.add('hidden');

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
			document.getElementById('description').innerHTML = 'введите корректное имя пользователя';
			document.getElementById('description').classList.add('no-user');
		}
	})

.catch(err => alert(err + 'Информация о пользователе не доступна'));