import * as myFunctions from "./modules/functions.js";
import * as myDa from "./modules/da.js";

window.onload = function () { 
	myFunctions.isWebp();
	myFunctions.ibg();

	document.addEventListener("click", documentActions);

	// Инициализация Динамического адаптива
	const da = new myDa.DynamicAdapt("max");
	da.init();

	// Скрытие и показ значка очистить у поиска
	const searchForm = document.querySelector('.header__search-form');
	const resetButton = document.querySelector('.header__icon-reset');
	searchForm.addEventListener('input', resetVisible);

	function resetVisible(e) {
		if (searchForm.value) {
			resetButton.classList.add('_visible');
		} else {
			resetButton.classList.remove('_visible');
		}
		if ( window.innerWidth <= 991) {
			resetButton.classList.add('_active');
		} else {
			resetButton.classList.remove('_active');
		}
	}

	// Очищение поля поиска
	resetButton.addEventListener('click', resetInput);

	function resetInput(e) {
		searchForm.value = '';
		resetButton.classList.remove('_visible');
	}

	const moreNavButton = document.querySelector('.header__nav-arrow');
	const nav = document.querySelector('.header__nav');
	const navMenu = document.querySelector('.header__nav-links');
	moreNavButton.addEventListener('click', allNav);

	function allNav(e) {
		const links = document.querySelectorAll('.header__nav-link._invisible');
		moreNavButton.classList.add('_invisible');
		navMenu.classList.add('_active');
		links.forEach(link => {
			link.classList.remove('_invisible');
		});
	}

	// Скрытие лишних пунктов меню в nav
	const menuLinks = document.querySelectorAll('.header__nav-link');
	navInvis();
	function navInvis() {
		if (window.innerWidth > 991) {
			let result = 0;
			let maxwidth = navMenu.getBoundingClientRect().width;
			menuLinks.forEach(link => {
				if (result + link.getBoundingClientRect().width < maxwidth) {
					if (result + link.getBoundingClientRect().width + 20 < maxwidth) {
						result += link.getBoundingClientRect().width + 20;
						link.classList.remove('_invisible');
					} else {
						result += link.getBoundingClientRect().width;
						link.classList.remove('_invisible');
					}
				}
				else {
					maxwidth = 0;
					link.classList.add('_invisible');
				}
			});
		} else {
			menuLinks.forEach(link => {
				link.classList.remove('_invisible');
			});
		}
	}


	// Нажатие на бургер, выдвигаем еню
	const menuBurger = document.querySelector('.header__burger');
	const menuCloseIcon = document.querySelector('.header__nav-icon');
	const headerOverlay = document.querySelector('.header__overlay');
	menuBurger.addEventListener('click', Burger);

	function Burger() {
		nav.classList.add('_active');
		headerOverlay.classList.add('_active');
	}

	menuCloseIcon.addEventListener('click', CloseNav);
	function CloseNav() {
		nav.classList.remove('_active');
		headerOverlay.classList.remove('_active');
	}

	// Переключение ссылок сайдбара
	const sidebarLinks = document.querySelectorAll('.sidebar__link');
	sidebarLinks.forEach(sidebarLink => {
		sidebarLink.addEventListener('click', sidebarLinkSwitch)
	});

	function sidebarLinkSwitch(element) {
		sidebarLinks.forEach(sidebarLink => {
			if (sidebarLink.classList.contains('_active')) {
				sidebarLink.classList.remove('_active');
			}
		});
		element.preventDefault();
		element.target.closest('.sidebar__link').classList.add('_active');
	};

	const score = document.querySelector('.score__graphic');
	const ctx = document.querySelector('#myChart').getContext('2d');
	ctx.canvas.parentNode.style.height = '260px';
	ctx.canvas.parentNode.style.width = '860px';

	const getOrCreateTooltip = (chart) => {
		let tooltipEl = chart.canvas.parentNode.querySelector('div');
	
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			chart.canvas.parentNode.appendChild(tooltipEl);
		}
 
		return tooltipEl;
	};
 
 const externalTooltipHandler = (context) => {
	// Tooltip Element
	const {chart, tooltip} = context;
	const tooltipEl = getOrCreateTooltip(chart);
	tooltipEl.classList.add('score__tooltip');
	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		tooltipEl.style.removeProperty('z-index');
		return;
	}
 
	// Set Text
	if (tooltip.body) {
		const bodyLines = tooltip.body.map(b => b.lines);
	 // Remove old children
		while (tooltipEl.firstChild) {
			tooltipEl.firstChild.remove();
		}
 
		bodyLines.forEach((body, i) => {
			if (!tooltipEl.firstChild) {
				const txt = document.createTextNode('Проходной балл на бюджет: ');
				tooltipEl.appendChild(txt);
				const span = document.createElement('span');
				const text = document.createTextNode(body);
				span.appendChild(text);
				tooltipEl.appendChild(span);
			}
		});
	}
	// Display, position, and set styles for font
	
	tooltipEl.style.cssText = `
		z-index: 3;
		opacity: 1;
		top: ${tooltip.caretY + 40}px;
		`;
		if (tooltip.caretX + tooltipEl.offsetWidth > score.offsetWidth) {
		tooltipEl.style.right = 10 +'px';
	} else {
		tooltipEl.style.left = tooltip.caretX +'px';
	}
 };

	const speedData = {
		labels: [2012, 2013, 2014, 2015, 2016 , 2017, 2018, 2019, 2020, 2021],
		datasets: [
			{
			data: [120, 190, 100, 220, 170, 140, 205, 150, 10, 200],
			fill: true,
			backgroundColor: 'rgba(171, 200, 234, 0.6)',
			pointRadius: 4,
			borderColor: 'rgba(171, 200, 234, 0.6)',
			hoverRadius: 8,
			hitRadius: 8,
		},
		{	
			data: [10, 110, 140, 220, 60, 160, 140, 15, 10, 150],
			fill: true,
			borderColor: 'rgba(6, 86, 180, 0.6)',
			backgroundColor: 'rgba(6, 86, 180, 0.6)',
			pointRadius: 4,
			hoverRadius: 8,
			hitRadius: 8,
		}
	],
	};

	let lineChart = new Chart(ctx, {
		type: 'line',
		label: false,
		data: speedData,
		options: {
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: false,
					position: 'nearest',
					external: externalTooltipHandler
					
				},
			},
		}
	});


	// сортировка специальностей
	const sortButtons = document.querySelectorAll('.sort-specialty__list li');
	sortButtons.forEach(sortButton => {
		sortButton.addEventListener('click', sortButtonHandler);
	});

	function sortButtonHandler(element) {
		sortButtons.forEach(sortButton => {
			sortButton.classList.remove('_active');
			sortButton.children[0].classList.remove('_active');
		});
		element.target.classList.add('_active');
		element.target.children[0].classList.add('_active');
	}

	const specialtyItems = document.querySelector('.specialty__items');
	const specialtySlider = document.querySelector('.specialty__slider');
	
	specialtyResizeHandler();

	// Запуск слайдера для 
	if (document.querySelector('.specialty__slider')) {
		const slider = new Swiper('.specialty__slider', {
			slidesPerView: 1,
			watchOverflow: true,
			speed: 800,
			loop: true,
			spaceBetween: 24,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 3,
			},
		});
	};

	
	function specialtyResizeHandler() {
		if (window.innerWidth <= 1262) {
			specialtyItems.style.cssText=`
				display: none;
			`;
			specialtySlider.style.cssText=`
				display: block;
			`;
		} else {
			specialtyItems.style.cssText=`
				display: block;
			`;
			specialtySlider.style.cssText=`
				display: none;
			`;
		}
	}

	// Функция кнопки развернуть (об университете)
	const fullAboutBtn = document.querySelector('.about__full');
	const aboutText = document.querySelector('.about__text');
	const aboutFirstParagraph = document.querySelector('.about__text p');
	aboutInvis();
	fullAboutBtn.addEventListener('click', fullAbout);


	 function aboutInvis() {
			if (window.innerWidth <= 991) {
				const aboutTextMaxHeight = aboutFirstParagraph.getBoundingClientRect().height + 5;
				aboutText.style.cssText=`
					max-height: ${aboutTextMaxHeight}px;
				`;
			} else {
				const aboutSecondParagraph = aboutFirstParagraph.nextElementSibling;
				const aboutTextMaxHeight = aboutFirstParagraph.getBoundingClientRect().height + aboutSecondParagraph.getBoundingClientRect().height + 53; // margin-bottom = 48 и 5px с запасом
				aboutText.style.cssText=`
					max-height: ${aboutTextMaxHeight}px;
				`;
			}
	 }

	function fullAbout() {
		fullAboutBtn.classList.add('_invisible');
		const allParagraph = document.querySelectorAll('.about__text p');
		let maxHeight = 0;
		allParagraph.forEach(paragraph => {
			maxHeight += paragraph.getBoundingClientRect().height;
		});
		maxHeight += 40 * allParagraph.length;
		aboutText.style.cssText=`
			max-height: ${maxHeight}px;
		`;
	}

	// Добавление в избранное
	const favoriteQuantity = document.querySelector('.header__favorite-count');
	const favoriteButton = document.querySelector('.info-preview__favorite');

	favoriteButton.addEventListener('click', addToFavorite);

	function addToFavorite() {
		favoriteQuantity.innerHTML = ++favoriteQuantity.innerHTML;
	}

	// Делегирование resize
	window.addEventListener('resize', resizeAction);

	function resizeAction() {
		if (!moreNavButton.classList.contains('_invisible')) {
			navInvis();
		} else {
		};
		if (fullAboutBtn.classList.contains('_visible')) {
			aboutInvis();
		};
		if (fullAboutBtn.classList.contains('_invisible')) {
			fullAbout();
		};
		specialtyResizeHandler();
	}




	// Actions (делегирование события click)
	function documentActions(e) {

		// Открытие меню поиска на мобильном экране
		// Условие является ли экран мобильным
		const mobileWindow = window.innerWidth <= 991;
		if ((e.target.closest('.header__icon-search') || e.target.classList.contains('header__search-form')) && mobileWindow) {
			searchForm.classList.add('_active');
			resetVisible();
		} else {
			searchForm.classList.remove('_active');
			resetVisible();
			resetButton.classList.remove('_active');
		}

		// Закрытие мобильного меню при клике в любую точку экрана
		if (!e.target.closest('.header__burger')) {
			nav.classList.remove('_active');
			headerOverlay.classList.remove('_active');
		}

		
		


	}




}