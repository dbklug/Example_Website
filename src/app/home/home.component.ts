import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	url = environment.url;
	latestVid = "";
	emailApi: any;
	numVideos: any;

	constructor(private http: HttpClient) {
		this.http.get(`${this.url}/getVideoDescription`).toPromise().then(content => {
			// get number of videos
			this.numVideos = content["data"].length;
			var archiveVids = 0;
			archiveVids = this.numVideos;

			// initialize url for email
			this.emailApi = `${this.url}/sendEmail`;

			// initialize new episode content
			let newestEpiTitle = document.getElementById('newestEpisodeTitle') as HTMLInputElement;
			let newestEpiDescription = document.getElementById('newestEpisodeDescription') as HTMLInputElement;

			if (newestEpiTitle != null && newestEpiDescription != null) {
				newestEpiTitle.innerText = content["data"][archiveVids - 1].title;
				newestEpiDescription.innerText = content["data"][archiveVids - 1].description;
			}

			localStorage.setItem('lastVid', this.numVideos.toString());

			// set latest video src
			var latestVideo = document.getElementById("latestVideo");
			if (latestVideo != null) {
				latestVideo.setAttribute('src', `../../assets/vid/video-${this.numVideos}.MP4`);
			}

			// initialize new episode content
			let newestArchiveEpiTitle = document.getElementById('archiveVideoTitle') as HTMLInputElement;
			let newestArchiveEpiDescription = document.getElementById('archiveVideoDescription') as HTMLInputElement;

			if (newestArchiveEpiTitle != null && newestArchiveEpiDescription != null) {
				newestArchiveEpiTitle.innerText = content["data"][archiveVids - 2].title;
				newestArchiveEpiDescription.innerText = content["data"][archiveVids - 2].description;
			}

			// set latest archive video
			var archiveVideo = document.getElementById("currentArchiveVideo");
			if (archiveVideo != null) {
				archiveVideo.setAttribute('src', `../../assets/vid/video-${this.numVideos - 1}.MP4`);
			}

			let otherVideos = document.getElementById("otherVideos");
			
			// determine if mobile or not in order to properly set margin-left for 1st video length background
			var marginLeft = '';
			if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1200) {
				marginLeft = '10px';
			}
			else {
				marginLeft = '5px';
			}
			
			// dynamically generate all archive videos in scrollable window
			for (let i = 0; i < this.numVideos - 1; i++) {
				var div = document.createElement("div");
				div.id = `video-${(archiveVids - 1) - i}`;
				// if this is the most recent (other than the latest video at top of page) video
				// add a red underline to the image
				if (i == this.numVideos - (this.numVideos)) {
					localStorage.setItem('lastVid', (this.numVideos - 1).toString());
					div.innerHTML = `
						<h4 style='color:white; max-width: 210px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'>
						${content["data"][(archiveVids - 2) - i].title}</h4>
						<div id='thumbnailContainer' style='position:relative; text-align:center'>
							<img id="img-${(archiveVids - 1) - i}" src="../../assets/thumbnail/thumbnail-${(this.numVideos - 1) - i}.PNG" 
							style='cursor:none; pointer-events: none; margin-top:-7px; border: 2px solid #e52f3c; width: 200px; height: 118px;'>
							<div id='timeBckgrnd' style='position:absolute; bottom:8px; margin-left: ${marginLeft}; background: rgba(0, 0, 0, 0.750);'>
								<div id='vid-length-${i}' style='bottom:8px; padding: 0px 4px; color:white; font-weight:bold; font-size:14px'>
								${content["data"][(archiveVids - 2) - i].vidLength}
								</div>
							</div>
						</div
					`;
				}
				else {
					div.innerHTML = `
						<h4 style='color:white; max-width: 210px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'>
						${content["data"][(archiveVids - 2) - i].title}</h4>
						<div id='thumbnailContainer' style='position:relative; text-align:center'>
							<img id="img-${(archiveVids - 1) - i}" src="../../assets/thumbnail/thumbnail-${(this.numVideos - 1) - i}.PNG" 
							style='cursor:pointer; margin-top:-7px; width: 200px; height: 118px;'>
							<div style='position:absolute; bottom:8px; margin-left: 5px; background: rgba(0, 0, 0, 0.750);'>
								<div id='vid-length-${i}' style='bottom:8px; padding: 0px 4px; color:white; font-weight:bold; font-size:14px'>
								${content["data"][(archiveVids - 2) - i].vidLength}
								</div>
							</div>
						</div
					`;
				}

				if (div != null) {
					var latestVideo = document.getElementById("latestVideo");
					var archiveVideo = document.getElementById("currentArchiveVideo");
					// if mobile or window is less than 1200 px, change layout of archive video section
					if (otherVideos != null && latestVideo != null && archiveVideo != null) {
						otherVideos.appendChild(div);
						if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
						|| window.innerWidth < 1200) {
							otherVideos.style.display = "flex";
							otherVideos.style.width = '100%';
							otherVideos.style.overflowX = 'scroll';
							div.style.marginBottom = '0px';
							latestVideo.style.width = '100%';
						}
						else if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
							otherVideos.style.display = "flex";
							otherVideos.style.width = '100%';
							otherVideos.style.overflowX = 'scroll';
							div.style.marginBottom = '0px';
							latestVideo.style.width = '100%';
							archiveVideo.style.height = '200px';
						}
						else {
							div.style.marginBottom = '50px';
							latestVideo.style.width = '270px';
						}
					}
					div.style.marginRight = '15px';
					div.style.marginTop = '-15px';

					// change video in media player if clicked
					div.onclick = function changeArchiveVideo(e) {
						const myId = (<HTMLInputElement>e.target).src.toString();
						if (myId != null) {
							const delimiter = '/';
							var token = myId.substring(myId.indexOf(delimiter) + 1);
							var token2 = token.substring(token.indexOf(delimiter) + 1);
							var token3 = token2.substring(token2.indexOf(delimiter) + 1);
							var token4 = token3.substring(token3.indexOf(delimiter) + 1);
							var token5 = token4.substring(token4.indexOf(delimiter) + 11);
							var result = token5.replace('PNG', '');
							var episodeClicked = parseInt(result);

							// underline current video selected
							var archiveImg = document.getElementById(`img-${episodeClicked}`);
							if (archiveImg != null) {
								archiveImg.style.border = '2px solid #e52f3c';
								archiveImg.style.transition = 'all 0.5s ease-in-out';
								archiveImg.style.cursor = 'none';
								archiveImg.style.pointerEvents = 'none';
							}
							// remove last underline from last video selected
							if (localStorage.getItem('lastVid') != null) {
								var lastVidImg = localStorage.getItem('lastVid');
								if (lastVidImg != null) {
									var lastVidImgNum = parseInt(lastVidImg);
									var vidImg = document.getElementById(`img-${lastVidImgNum}`);
									if (vidImg != null) {
										vidImg.style.border = 'none';
										vidImg.style.cursor = 'pointer';
										vidImg.style.pointerEvents = 'auto';
									}
								}
							}
							// update last selected video
							localStorage.setItem('lastVid', episodeClicked.toString());

							// update video
							var archiveVideo = document.getElementById("currentArchiveVideo");
							if (archiveVideo != null) {
								archiveVideo.setAttribute('src', `../../assets/vid/video-${episodeClicked}.MP4`);
							}
							// update content
							var newestArchiveEpiTitle = document.getElementById('archiveVideoTitle') as HTMLInputElement;
							var newestArchiveEpiDescription = document.getElementById('archiveVideoDescription') as HTMLInputElement;

							if (newestArchiveEpiTitle != null && newestArchiveEpiDescription != null) {
								newestArchiveEpiTitle.innerText = content["data"][episodeClicked - 1].title;
								newestArchiveEpiDescription.innerText = content["data"][episodeClicked - 1].description;
							}
						}
					}
				}
			}
		})
	}

	ngOnInit(): void {
		window.addEventListener("resize", this.windowSizeChanged);
	}

	windowSizeChanged() {
		let otherVideos = document.getElementById("otherVideos");
		var latestVideo = document.getElementById("latestVideo");
		var timeBckgrnd = document.getElementById("timeBckgrnd");
		var archiveVideo = document.getElementById("currentArchiveVideo");
		// change archive video section look and arrangment if window is resized
		if (otherVideos != null && latestVideo != null && timeBckgrnd != null) {
			if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
			|| window.innerWidth < 1200) {
				otherVideos.style.display = "flex";
				otherVideos.style.width = '100%';
				otherVideos.style.overflowX = 'scroll';
				latestVideo.style.width = '100%';
				timeBckgrnd.style.marginLeft = '10px';
				// this is for spacing below latest video to be less if mobile
				for (var i = 1; i < 1000 - 1; i++) {
					var archiveVid = document.getElementById(`video-${i}`);
					if (archiveVid != null) {
						archiveVid.style.marginBottom = '0px';
					}
				}
			}
			// put archive video section back to full-size browser look and arrangment
			// if window size exceeds or equals 1200 px upon window resize
			else {
				otherVideos.style.display = 'inline'
				otherVideos.style.maxHeight = 'auto';
				otherVideos.style.width = '20%';
				otherVideos.style.overflowX = 'hidden';
				latestVideo.style.width = '270px';
				timeBckgrnd.style.marginLeft = '5px';
				for (var i = 1; i < 1000 - 1; i++) {
					var archiveVid = document.getElementById(`video-${i}`);
					if (archiveVid != null) {
						archiveVid.style.marginBottom = '50px';
					}
				}
			}
		}
	}

	sendEmail() {
		console.log('Sending mail from client...')
		var getName = document.getElementById("name") as HTMLInputElement;
		var getEmail = document.getElementById("email") as HTMLInputElement;
		var getMessage = document.getElementById("message") as HTMLInputElement;
		var submitButton = document.getElementById("submitButton");
		var name = getName.value;
		var email = getEmail.value;
		var message = getMessage.value;

		// regex for email validation
		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var goodEmail = true;

		if (!email.match(mailformat)) {
			goodEmail = false;
		}

		const data = { name, email, message }

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(data)
		}

		if (name != "" && email != "" && goodEmail == true && message != "") {
			// make submit button disabled and change button
			if (submitButton != null) {
				submitButton.style.cursor = "not-allowed";
				submitButton.innerHTML = "SUBMITTING...";
			}

			fetch(this.emailApi, options)
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						alert("Message sent.\n\nWe will reply to you as soon as we can.\n\nThank you!");
					}
					else {
						alert("Error sending message");
					}
					getName.value = "";
					getEmail.value = "";
					getMessage.value = "";
					if (submitButton != null) {
						submitButton.style.cursor = "pointer";
						submitButton.innerHTML = "SEND MESSAGE";
					}
				})
		}
		// error handling for email section
		else if (name == "" && email == "" && message == "") {
			alert("Please fill out all fields.")
		}
		else if (name == "") {
			alert("Please let us know your Name.");
		}
		else if (email == "") {
			alert("Please fill out the Email field so we can get back to you.");
		}
		else if (goodEmail == false) {
			alert("Please make sure your Email is valid.");
		}
		else if (message == "") {
			alert("Don't forget to fill out the Message field!");
		}
		else {
			alert("Error, couldn't send message. Try filling out form again.");
		}
	}
}