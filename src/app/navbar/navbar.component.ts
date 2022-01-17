import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {
		var count = 0;
		var count2 = 0;
		this.initializeNavbar();
		window.addEventListener('scroll', async function (e) {
			var scrollPosition = Math.round(this.window.pageYOffset);
			await sleep(100);
			var nextScrollPos = Math.round(this.window.pageYOffset);
			// scrolling down --> nabvar visible
			if (scrollPosition < nextScrollPos) {
				if (count == 0) {
					hideNavbar();
					count++;
				}
				count2 = 0;
			}
			// scrolling up --> pull navbar up
			else if (scrollPosition > nextScrollPos) {
				if (count2 == 0) {
					revealNavbar();
				}
				count = 0;
			}
			// stopped scrolling
			else if (scrollPosition == nextScrollPos) {
				// do nothing
			}
		});
	}

	async initializeNavbar() {
		var checkExist = setInterval(function () {
			const navArchiveIcon = document.getElementById("archive-icon") as HTMLElement;
			const navWorldviewIcon = document.getElementById("worldview-icon") as HTMLElement;
			const navWorksCitedIcon = document.getElementById("works-cited-icon") as HTMLElement;
			const navContactIcon = document.getElementById("contact-icon") as HTMLElement;
			// const navText = document.getElementById("top-nav-text") as HTMLElement;
			const navTopText = document.getElementById("top-nav-text") as HTMLElement;
			const navItem = document.getElementById("nav-item") as HTMLElement;
			const navText = document.getElementById("nav-text") as HTMLElement;

			// wait until navbar elements load
			if ($('#archive-icon').length) {
				let navbar = document.getElementById('mainNav');
				// load navbar
				if (navbar != null) {
					navbar.style.marginTop = '0';
					navbar.style.transition = 'all .5s';
					navbar.style.opacity = '1';
				}

				const isMobile = window.matchMedia("only screen and (max-width: 1100px)").matches;
				// if device is mobil
				if (isMobile) {
					try {
						navTopText.style.display = "inline-flex";
						navTopText.style.marginTop = "80px";
						navArchiveIcon.style.width = "0px";
						navWorldviewIcon.style.width = "0px";
						navWorksCitedIcon.style.width = "0px";
						navContactIcon.style.width = "0px";
					} catch (error) {
						console.log("error: " + error);
					}
				}

				// if window is resized, hide nav icons
				window.addEventListener('resize', function (event) {
					let width = this.window.innerWidth;
					if (width < 1100) {
						try {
							navTopText.style.display = "inline-flex";
							navTopText.style.marginTop = "80px";
							navArchiveIcon.style.width = "0px";
							navWorldviewIcon.style.width = "0px";
							navWorksCitedIcon.style.width = "0px";
							navContactIcon.style.width = "0px";
						} catch (error) { }
					}
					else {
						try {
							navTopText.style.display = "inline";
							navTopText.style.marginTop = "0px";
							navArchiveIcon.style.width = "19px";
							navWorldviewIcon.style.width = "15px";
							navWorksCitedIcon.style.width = "23px";
							navContactIcon.style.width = "24px";
						} catch (error) { }
					}
				}, true);

				clearInterval(checkExist);
			}
		}, 100);
	}

	toggleNav() {
		const checkbox = document.getElementById("check") as HTMLInputElement;
		const ul = document.getElementById("nav-list") as HTMLInputElement;
		const nav = document.getElementById("mainNav") as HTMLInputElement;
		const hamburger = document.getElementById("hamburgerIcon") as HTMLInputElement;

		//navbar contracted
		if (checkbox.checked) {
			ul.style.left = "-100%";
			hamburger.style.transform = "rotate(0deg)";
			hamburger.style.transition = "all .5s";
			hamburger.style.fontSize = "30px";
			enableScrolling();
		}
		//navbar expanded
		else {
			ul.style.left = "0";
			nav.style.background = "#6c757d;";
			hamburger.style.transform = "rotate(-270deg)";
			hamburger.style.transition = "all .5s";
			hamburger.style.fontSize = "40px";
			if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				disableScrolling();
			}
		}
	}

	toggleCheckbox() {
		const checkbox = document.getElementById("check") as HTMLInputElement;
		this.toggleNav();
		checkbox.checked = false;
	}
}

var count = 0;
var y = 0;
var y2 = 0;
var fullView = true;

function hideNavbar() {
	var checkbox = document.getElementById("check") as HTMLInputElement;
	var nav = document.getElementById('mainNav');
	var hamburger = document.getElementById('bars-div');
	if (nav != null && hamburger != null && checkbox != null) {
		if (checkbox.checked == false) {
			nav.style.marginTop = '-80px';
			nav.style.transition = 'all 0.2s';
		}
	}
}

async function revealNavbar() {
	var checkbox = document.getElementById("check") as HTMLInputElement;
	var nav = document.getElementById('mainNav');
	var hamburger = document.getElementById('bars-div');
	if (nav != null && hamburger != null  && checkbox != null) {
		if (checkbox.checked == false) {
			nav.style.marginTop = '0px';
			nav.style.transition = 'all 0.2s';
		}
	}
}

function disableScrolling() {
	var x = window.scrollX;
	var y = window.scrollY;
	window.onscroll = function () { window.scrollTo(x, y); };
};

function enableScrolling() {
	window.onscroll = function () { };
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
