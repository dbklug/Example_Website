import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  url = environment.url;

  constructor() { }

  ngOnInit(): void {
  }

  async uploadVid() {
    var inpFile = document.getElementById('inpFile') as HTMLInputElement;
    var inpImageFile = document.getElementById('inpImageFile') as HTMLInputElement;
    var inpPdfFile = document.getElementById('inpPdfFile') as HTMLInputElement;
    var title = document.getElementById('titleText') as HTMLInputElement;
    var description = document.getElementById('descriptionText') as HTMLInputElement;
    var file = inpFile.value;
    var imageFile = inpImageFile.value;
    var pdfFile = inpPdfFile.value;

    if (inpFile.value == '') {
      alert('Please select a video to upload');
    }
    else if (!file.includes('.mp4')) {
      alert('Please select a .mp4 file to upload');
    }
    else if (imageFile == '') {
      alert('Please choose a thumbnail');
    }
    else if (!imageFile.toLowerCase().includes('png')) {
      alert('Please choose a png for thumbnail');
    }
    else if (pdfFile == '') {
      alert('Please select a cited-sources pdf');
    }
    else if (!pdfFile.toLowerCase().includes('pdf')) {
      alert('Please select a pdf')
    }
    else if (title.value == '' && description.value == '') {
      console.log('reached');
      alert('Please enter a title and description for the video');
    }
    else if (title.value == '') {
      alert('Please enter a title');
    }
    else if (description.value == '') {
      alert('Please enter a description');
    }
    else {
      await this.performUploadofVideo();
      await this.performUploadOfImage();
      await this.performUploadOfPdf();
      await this.performUploadOfContent();
    }
  }

  async performUploadofVideo() {
    var inpFile = document.getElementById('inpFile') as HTMLInputElement;
    var inpImageFile = document.getElementById('inpImageFile') as HTMLInputElement;
    var inpPdfFile = document.getElementById('inpPdfFile') as HTMLInputElement;
    var title = document.getElementById('titleText') as HTMLInputElement;
    var description = document.getElementById('descriptionText') as HTMLInputElement;

    if (inpFile != null) {
      try {
        var submitBtn = document.getElementById('submitBtn');
        if (submitBtn != null) {
          submitBtn.setAttribute('disabled', 'disabled');
          submitBtn.style.cursor = 'progress';
        }

        // formdata
        let data = new FormData();
        if (inpFile.files != null) {
          data.append("file", inpFile.files[0]);
        }

        var uploadUrl = this.url + "/upload-video";

        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", progressHandler, false);

        ajax.open("POST", uploadUrl);
        ajax.send(data);

        ajax.onreadystatechange = function () {
          var response = document.getElementById('responseText') as HTMLInputElement;
          if (this.readyState == 4 && this.status == 200) {
            if (response != null && inpFile != null && inpImageFile != null && inpPdfFile != null && submitBtn != null) {
              response.style.opacity = '1';
              response.innerHTML = 'Video uploaded successfully!';
              inpFile.value = '';
              inpImageFile.value = '';
              inpPdfFile.value = '';
              title.value = "";
              description.value = "";
              submitBtn.removeAttribute("disabled");
              submitBtn.style.cursor = 'pointer';
            }
          }
          else if (this.readyState == 4 && this.status != 200 && submitBtn != null) {
            if (response != null && inpFile != null) {
              response.style.opacity = '1';
              response.innerHTML = 'Uploaded failed';
              inpFile.value = '';
              submitBtn.removeAttribute("disabled");
              submitBtn.style.cursor = 'pointer';
            }
          }
        }
      }
      catch (e) {
      }
    }
  }

  async performUploadOfImage() {
    var inpImageFile = document.getElementById('inpImageFile') as HTMLInputElement;

    if (inpImageFile != null) {
      try {
        // formdata
        let data = new FormData();
        if (inpImageFile.files != null) {
          data.append("file", inpImageFile.files[0]);
        }

        var uploadUrl = this.url + "/upload-image";

        var ajax = new XMLHttpRequest();

        ajax.open("POST", uploadUrl);
        ajax.send(data);
      }
      catch (e) {
      }
    }
  }

  async performUploadOfPdf() {
    var inpPdfFile = document.getElementById('inpPdfFile') as HTMLInputElement;

    if (inpPdfFile != null) {
      try {
        // formdata
        let data = new FormData();
        if (inpPdfFile.files != null) {
          data.append("file", inpPdfFile.files[0]);
        }

        var uploadUrl = this.url + "/upload-pdf";

        var ajax = new XMLHttpRequest();

        ajax.open("POST", uploadUrl);
        ajax.send(data);
      }
      catch (e) {
        // catch rejected Promises and Error objects
      }
    }
  }

  async performUploadOfContent() {
    var title = document.getElementById('titleText') as HTMLInputElement;
    var description = document.getElementById('descriptionText') as HTMLInputElement;
    var titleTxt, descriptionTxt;

    if (title != null && description != null) {
      titleTxt = title.value;
      descriptionTxt = description.value;
    }

    const data = { titleTxt, descriptionTxt };
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    }

    fetch(this.url + '/uploadContent', options)
      .then(response => {
        console.log(response.status);
        if (response.status == 200) { }
        else {
          alert("Error sending content");
        }
      })
  }
}

// displays progress of video being uploaded
function progressHandler(event) {
  var progress = document.getElementById("progressBar") as HTMLProgressElement;
  var percent = (event.loaded / event.total) * 100;
  if (progress != null) {
    progress.value = Math.round(percent);
    if (progress.value == 100) {
      progress.value = 0;
    }
  }
}