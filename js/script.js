var wd;
var hg;

var img1;
var img2;
var img3;
Filters = {};

window.onload = function() {
	var canvas1 = document.getElementById("IMGManipulate1");
	var context1 = canvas1.getContext("2d");
	img1 = new Image();
	img1.src = "img/test01.jpg";
	img1.addEventListener('load', eventImageLoaded, false);

	function eventImageLoaded() {
		context1.drawImage(img1, 0, 0);
	}

	var canvas2 = document.getElementById("IMGManipulate2");
	var context2 = canvas2.getContext("2d");
	img2 = new Image();
	img2.src = "img/test02.jpg"
	img2.addEventListener('load', eventImageLoaded2, false);

	function eventImageLoaded2() {
		context2.drawImage(img2, 0, 0);
	}

	var canvas3 = document.getElementById("IMGManipulate3");
	var context3 = canvas3.getContext("2d");
	img3 = new Image();
	img3.src = "img/test03.jpg";
	img3.addEventListener('load', eventImageLoaded3, false);

	function eventImageLoaded3() {
		context3.drawImage(img3, 0, 0);
	}

	var canvas4 = document.getElementById("IMGManipulate4");
	var context4 = canvas4.getContext("2d");
	img4 = new Image();
	img4.src = "img/test04.jpg";
	img4.addEventListener('load', eventImageLoaded4, false);

	function eventImageLoaded4() {
		context4.drawImage(img4, 0, 0);
	}

}
// ==========================
// id isIMGManipulate1
// ==========================

grayscale = function() {
	runFilter('IMGManipulate1', Filters.grayscale, img1);
}
bright = function() {
	runFilter('IMGManipulate1', Filters.bright, img1);
}
dark = function() {
	runFilter('IMGManipulate1', Filters.dark, img1);
}
threshold = function() {
	runFilter('IMGManipulate1', Filters.threshold, img1);
}
original1 = function() {
	runFilter('IMGManipulate1', Filters.original, img1);
}
// ==========================
// id isIMGManipulate2
// ==========================

sharpenImage = function() {
	// runFilter('IMGManipulate2', Filters.convolute, img2, [0, -1, 0, -1, 5, -1, 0, -1, 0]);
		runFilter('IMGManipulate2', Filters.convolute, img2, [0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, -1, 9, -1, -1, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0]);
}

blurImage = function(){
	var a = 16;
	var array = new Array();
	
	for(var i = 0; i < a; i++){
		array[i] = 1/a;
	}
	
	runFilter('IMGManipulate2', Filters.convolute, img2, array);
}

original2 = function() {
	runFilter('IMGManipulate2', Filters.original, img2);
}

// ==========================
// -------------------------------
// ==========================

function runFilter(id, filter, image, arg1, arg2, arg3) {
	var c = document.getElementById(id);

	var idata = Filters.filterImage(filter, image, arg1, arg2, arg3);
	console.log(idata.data);
	c.width = idata.width;
	c.height = idata.height;
	var ctx = c.getContext('2d');
	ctx.putImageData(idata, 0, 0);

}


// the below is filters

Filters.getPixels = function(img) {
	var c = this.getCanvas(img.width, img.height);
	var ctx = c.getContext('2d');

	ctx.drawImage(img, 0, 0);
	return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function(w, h) {
	var c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	return c;
};

Filters.filterImage = function(filter, image, var_args) {
	var args = [this.getPixels(image)];
	for(var i = 2; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	return filter.apply(null, args);
};

Filters.grayscale = function(pixels, args) {
	var d = pixels.data;
	for(var i = 0; i < d.length; i += 4) {
		var r = d[i];
		var g = d[i + 1];
		var b = d[i + 2];
		// CIE luminance for the RGB
		// The human eye is bad at seeing red and blue, so we de-emphasize them.
		var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		d[i] = d[i + 1] = d[i + 2] = v
	}

	return pixels;
};

Filters.bright = function(pixels, args) {
	var d = pixels.data;
	for(var i = 0; i < d.length; i += 4) {
		d[i] = Math.min(d[i] + 60, 255);
		d[i + 1] = Math.min(d[i + 1] + 60, 255);
		d[i + 2] = Math.min(d[i + 2] + 60, 255);
	}

	return pixels;
}

Filters.dark = function(pixels, args) {
	var d = pixels.data;
	for(var i = 0; i < d.length; i += 4) {
		d[i] = Math.max(d[i] - 60, 0);
		d[i + 1] = Math.max(d[i + 1] - 60, 0);
		d[i + 2] = Math.max(d[i + 2] - 60, 0);
	}

	return pixels;
}

Filters.threshold = function(pixels, args) {
	var d = pixels.data;
	for(var i = 0; i < d.length; i += 4) {
		var r = d[i];
		var g = d[i + 1];
		var b = d[i + 2];
		// CIE luminance for the RGB
		// The human eye is bad at seeing red and blue, so we de-emphasize them.
		var v = (0.2126 * r + 0.7152 * g + 0.0722 * b) > 128 ? 255 : 0;

		d[i] = d[i + 1] = d[i + 2] = v;
	}

	return pixels;
}

Filters.original = function(pixels, args) {
	return pixels;
}

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
  return this.tmpCtx.createImageData(w,h);
};

Filters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};
