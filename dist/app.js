var dragAndDrop=function(e,t){"use strict";function n(e){var n,i,r;n=t.createElement("div"),n.setAttribute("class","cb-div"),i=t.createElement("img"),i.src=e.url,i.setAttribute("class","cb-image"),i.style.maxWidth="100%",i.style.height="auto",n.appendChild(i),i.insertAdjacentHTML("afterend","<p>■ファイル名: <b>"+e.name+"</b><br>■容量: <b>"+e.size+"</b>バイト</p>"),d.appendChild(n),r=t.createEvent("HTMLEvents"),r.initEvent("makeView",!0,!1),n.dispatchEvent(r)}function i(e){for(var t=e.dataTransfer?e.dataTransfer.files:e.target.files,i=0,r=t.length;r>i;i++){var a=new FileReader;a.onload=function(e){var t={};return function(i){("image/gif"===e.type||"image/png"===e.type||"image/jpeg"===e.type)&&(t.type=e.type,t.name=e.name,t.size=e.size,t.date=e.lastModifiedDate.toLocaleDateString(),t.url=i.target.result,n(t))}}(t[i]),a.readAsDataURL(t[i])}}function r(){o.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault(),i(e)},!1),o.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault()},!1)}function a(){c.addEventListener("change",function(e){i(e)},!1)}var o=t.getElementById("cb-drag"),d=t.getElementById("cb-display"),c=t.getElementById("cb-file");return{init:function(){r(),a()}}}(window,document),photoEditor=function(e,t){"use strict";function n(){this.parentNode.style.display="none"}function i(e,t){return d.launch({image:e,url:t}),!1}function r(){var e=this.getAttribute("id"),t=this.getAttribute("src");i(e,t)}function a(){var e=t.createElement("button");return e.setAttribute("style","width: 64px; line-height: 24px; background-color: #37474F; color: #fff; border: none; cursor: pointer; border-radius: 2px; font-size: 14px; position: absolute; text-align: center; top: 16px; right: 8px; padding: 0; z-index: 1000;"),e.innerHTML="削除",e}function o(){var e=t.getElementById("cb-display");e.addEventListener("makeView",function(){for(var e=t.querySelectorAll(".cb-image"),i=[],o=0,d=e.length;d>o;o++)i[o]=a(),e[o].setAttribute("id","cb-image_"+o),e[o].parentNode.style.position="relative",e[o].parentNode.appendChild(i[o]),i[o].addEventListener("click",n,!1),e[o].addEventListener("click",r,!1)},!1)}var d=new Aviary.Feather({apiKey:"4aa4ec3a537c433abd5842b9fb971942",onSave:function(e,n){var i=t.getElementById(e);i.src=n}});return{init:function(){o()}}}(window,document);dragAndDrop.init(),photoEditor.init();