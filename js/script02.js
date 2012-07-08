var wd;
var hg;

var img1;
Filters = {};

window.onload = function() {
	var canvas1 = document.getElementById("IMGManipulate1");
	var context1 = canvas1.getContext("2d");
	img1 = new Image();
	img1.src = "img/test02.jpg";
	img1.addEventListener('load', eventImageLoaded, false);

	function eventImageLoaded() {
		context1.drawImage(img1, 0, 0);
	}
	
	var canvas2 = document.getElementById("IMGManipulate2");
	var context2 = canvas2.getContext("2d");
	img2 = new

}
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

original1 = function(){
	runFilter('IMGManipulate1', Filters.original, img1);
}


// ==========================
// -------------------------------
// ==========================

function runFilter(id, filter, image, arg1, arg2, arg3) {
	var c = document.getElementById(id);

	var idata = Filters.filterImage(filter, image, arg1, arg2, arg3);
	console.log("idata: " + idata);
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
		d[i + 2] =  Math.max(d[i + 2] - 60, 0);
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

Filters.original = function(pixels, args){
	return pixels;
}
