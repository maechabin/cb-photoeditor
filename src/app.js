var drag_and_drop = (function() {

  var drag = document.getElementById("cb-drag");
  var disp = document.getElementById("cb-display");
  var file = document.getElementById("cb-file");

  function readImage(e) {

    var f = e.dataTransfer.files;

    for(var i = 0, l = f.length; i < l; i++) {

      var reader = new FileReader();

      console.log(f[i].name);
      console.log(f[i].type);
      console.log(f[i].size);
      console.log(f[i].lastModifiedDate.toLocaleDateString());

      reader.onload = (function(f) {

      return function(evt) {

        if (f.type === "image/gif" || f.type === "image/png" || f.type === "image/jpeg") {

          //var div = $("<div>").attr("class", "image");
          var div = document.createElement("div");
          div.setAttribute("class", "cb-image");

          //var img = $("<img>");
          //img.attr("src", evt.target.result);
          //img.css({"max-width": "100%", "height": "auto"});
          var img = document.createElement("img");
          img.src = evt.target.result;
          img.style.maxWidth = "100%";
          img.style.height = "auto";

          div.appendChild(img);
          //img.after("<p>■ファイル名: " + f.name + "<br>■容量: " + f.size + "バイト</p>");
          disp.appendChild(div);

          } else {
            return;
          }

        };

      })(f[i]);

      reader.readAsDataURL(f[i]);

    }

  }

  function dragAndDrop() {

    drag.addEventListener("drop", function(e) {
      console.log("aaa");
      e.preventDefault();
      readImage(e);
    }, false);

    drag.addEventListener("dragover", function(e) {
      e.preventDefault();
    }, false);
/*
    file.addEventListener("change", function(e) {
      readImage(e);
    }, false);
*/
  }

  return {

    init: function() {
      dragAndDrop();
    }

  };

})();

drag_and_drop.init();
