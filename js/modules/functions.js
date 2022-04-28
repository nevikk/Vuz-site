/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function ibg() {

	let ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('source')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('source').getAttribute('srcset') + ')';
		} else {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iOS/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

//Слайдер
// @@include('slider.js', {});

// if (isMobile.any()) {
// 	document.body.classList.add('_touch');
// } else{
// 	document.body.classList.add('_pc');
// };

// Удаление классов у коллекции элементов
export function _removeClasses(elements, classes) {
	elements.forEach(element => {
		element.classList.remove(classes);
	});
}

// Спойлеры
// @@include('spoilers.js', {});


// Бургер
// const menuIcon = document.querySelector('.icon-menu');
// const menuBody = document.querySelector('.menu__body');
// const body = document.querySelector('body');

// menuIcon.addEventListener("click", function (event) {
// 	menuIcon.classList.toggle('_active');
// 	menuBody.classList.toggle('_active');
// 	body.classList.toggle('_lock');
// });


// Проверка email
export function emailsCheck() {
	const emails = document.querySelectorAll('._email');

	if (emails.length > 0) {
		emails.forEach(email => {
			email.parentElement.addEventListener("submit", function (event) {
				if (emailTest(email) && !email.parentElement.lastElementChild.classList.contains("form__error")) {
					email.parentElement.insertAdjacentHTML(
						"beforeend",
						`<div class="form__error">
							Wrong email
						</div>`
					);
					event.preventDefault();
				}
			});

			email.addEventListener("focus", function (event) {
				if (email.parentElement.lastElementChild.classList.contains("form__error")) {
					email.parentElement.lastElementChild.remove();
				}
			});
		})
	}
}

// Функция теста email
export function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//Динамический адаптив
// @@include('da.js', {});
