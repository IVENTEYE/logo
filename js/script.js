(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

let isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};

const menu = document.querySelector('.top-header__icon'),
	sideMenu = document.querySelector('.main__menu-header-icon'),
	sideMenuBody = document.querySelector('.main__menu-body'),
	sideBars = document.querySelectorAll('.body-menu-link-arrow'),
	sideBarItems = document.querySelectorAll('.list-body'),
	menuBody = document.querySelector('.menu__body'),
	searchSelect = document.querySelector('.search-button'),
	searchSelectBody = document.querySelector('.categories-search')
	categoriesSearchCheckbox = document.querySelectorAll('.categories-search__checkbox'),
	sliders = document.querySelectorAll('.swiper-container');

const toggleBurger = (button, side) => {
	button.addEventListener('click', () => {
		button.classList.toggle('active');
		side.classList.toggle('active');
	});
};

menu.addEventListener('click', toggleBurger(menu, menuBody));

sideMenu.addEventListener('click', () => {
	sideMenu.classList.toggle('active');
	$('.main__menu-body').slideToggle();
});

searchSelect.addEventListener('click', toggleBurger(searchSelect, searchSelectBody));

for (let i = 0; i < categoriesSearchCheckbox.length; i++) {
	const checkbox = categoriesSearchCheckbox[i];

	checkbox.addEventListener('change', () => {
		checkbox.classList.toggle('checked');
		const checkboxChecked = document.querySelectorAll('.categories-search__checkbox.checked');

		if (checkboxChecked.length > 0) {
			searchSelect.classList.add('categories');
			const searchQuantity = document.querySelector('.search-main__quantity');
			searchQuantity.innerHTML = searchQuantity.dataset['text'] + ' ' + checkboxChecked.length;
		} else {
			searchSelect.classList.remove('categories');
		}
	});
}

function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (let i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector("img")) {
			ibg[i].style.backgroundImage =
				"url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
		}
	}
}

ibg();

let mySwiper = new Swiper('.slider-main', {
	loop: true,
	slidesPerView: 1,
	autoHeight: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

let swiper= new Swiper('.products-slider__item', {
	slidesPerView: 1,
	autoHeight: true,
	navigation: {
		nextEl: '.header-slider__arrow--next',
		prevEl: '.header-slider__arrow--prev',
	},
	pagination: {
		el: '.header-slider__info',
		type: 'fraction',
	},
});

let swiperBrands= new Swiper('.brands-slider__container', {
	slidesPerView: 5,
	autoHeight: false,
	loop: true,
	navigation: {
		nextEl: '.brands-slider__arrow--next',
		prevEl: '.brands-slider__arrow--prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		660: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 5,
		}
	},
});



const sliderMainImages = document.querySelectorAll('.slider-main__image'),
	  sliderMainDots = document.querySelectorAll('.slider-main__dots .swiper-pagination-bullet');

if (isMobile.any()) {
	const sideBars = document.querySelectorAll('.body-menu-link-arrow');
	for (let i = 0; i < sideBars.length; i++) {
		const sideBar = sideBars[i];
		sideBar.addEventListener('click', (e) => {
			sideBar.classList.toggle('active');
			e.preventDefault();
		});
	}
} else {
	const sideList = (e) => {
		const sideBarData = sideBars.forEach( item => {
			item.getAttribute('data-product');
		});

		const sideBarItemsData = sideBarItems.forEach( item => {
			item.getAttribute('data-product');
		});
	 
	 if (sideBarData === sideBarItemsData) {
		 for (let i = 0; i < sideBars.length; i++) {
			let sideBar = sideBars[i];
			sideBar.addEventListener('mouseenter', () => {
				sideBar.classList.add('active');
			});
			sideBar.addEventListener('mouseleave', () => {
				sideBar.classList.remove('active');
			});
		 }	
	 }
};

sideList();
}



// sideBars.forEach(item => {
// 	item.addEventListener('mouseenter', sideList);
// 	item.addEventListener('mouseout', (e) => {
// 		sideBarItems.forEach(item => {
// 			if (e.target.closest('.body-menu-link-arrow')) {
// 				item.classList.remove('active');
// 			}
// 		});	
// 	});
// });
	  
	for (let i = 0; i < sliderMainImages.length; i++) {
		const sliderImage = sliderMainImages[i].querySelector('img').getAttribute('src');
		sliderMainDots[i].style.backgroundImage = "url('" + sliderImage + "')";

	}