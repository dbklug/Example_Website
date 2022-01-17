import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.css']
})
export class TextbookComponent implements OnInit {
  url = environment.url;
  loading = true;

  constructor(private http: HttpClient) {
    this.http.get(`${this.url}/getVideoDescription`).toPromise().then(content => {
      var pageLoadingDiv = document.getElementById('loading-div');
      var pageLoadingCircle = document.getElementById('loading-circle');
      if (pageLoadingDiv != null && pageLoadingCircle != null) {
        this.loading = false;
        pageLoadingDiv.id = 'loading-div-hidden';
        pageLoadingCircle.style.height = '0px';
      }

      let contentLength = content["data"].length;

      let ul = document.getElementById("ul");
      if (ul != null) {
        ul.style.listStyleType = "none";
        ul.style.opacity = "2";
        ul.style.marginTop = "0px";
      }

      var li, a;

      for (let i = 0; i < contentLength; i++) {
        li = document.createElement("li");
        a = document.createElement("a");
        a.innerHTML = `<a style="text-decoration:none; color:rgb(188, 188, 188); text-overflow: ellipsis; overflow: hidden; whitespace: nowrap;" 
          href=${this.url}/getPdf${i}>${content["data"][i].title}<li></li></a>`;
        li.appendChild(a);
        if (ul != null) {
          ul.appendChild(li);
        }
        if (li != null) {
          li.style.textAlign = "center";
          li.style.fontSize = "25px";
          li.style.lineHeight = "80px";
          li.style.textOverflow = "ellipsis";
          li.style.overflow = "hidden";
          li.style.whiteSpace = "nowrap";
          li.style.color = "rgb(188, 188, 188)";
        }
      }
      if (li != null) {
        li.style.marginBottom = "50px";
      }
    })
  }

  ngOnInit(): void {
    this.loadingText();
  }

  async loadingText() {
    //var s = String.fromCharCode(9964);
    var loadingCircle = document.getElementById("loading-circle");

    if (loadingCircle != null) {
        // loadingCircle.innerHTML = s;
        var count = 1;

      while (this.loading) {
        loadingCircle.style.transform = `rotate(${count}deg)`;
        loadingCircle.style.transformOrigin = '50% 50%';
        count = count + 1.5;
        await this.sleep(1);
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

