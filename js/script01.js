var canvas;
var context;

var wd;
var hg;

var dataArray;

var canvas2;
var context2;

var wd2;
var hg2;

var dataArray2;

var canvas3;
var context3;

var wd3;
var hg3;

var dataArray3;

var canvas4;
var context4;

var wd4;
var hg4;

var dataArray4;



// the below function

window.onload = function() {
	// alert("test");

	canvas = document.getElementById("IMGManipulate");
	context = canvas.getContext("2d");

	wd = canvas.width;
	hg = canvas.height;

	var img = new Image();
	img.src = "img/test02.jpg";
	img.addEventListener('load', eventImgLoaded, false);

	function eventImgLoaded() {

		context.drawImage(img, 0, 0);
		var rowData = context.getImageData(0, 0, wd, hg);
		dataArray = rowData.data;

	}

	canvas2 = document.getElementById("IMGManipulate1");
	context2 = canvas2.getContext("2d");

	wd2 = canvas2.width;
	hg2 = canvas2.height;

	var img2 = new Image();
	img2.src = "img/test06.jpg";
	img2.addEventListener('load', eventImgLoaded2, false);

	function eventImgLoaded2() {

		context2.drawImage(img2, 0, 0);
		var rowData2 = context2.getImageData(0, 0, wd2, hg2);
		dataArray2 = rowData2.data;

	}

	canvas3 = document.getElementById("IMGManipulate3");
	context3 = canvas3.getContext("2d");

	wd3 = canvas3.width;
	hg3 = canvas3.height;

	var img3 = new Image();
	img3.src = "img/test07.jpg";
	img3.addEventListener('load', eventImgLoaded3, false);

	function eventImgLoaded3() {

		context3.drawImage(img3, 0, 0);
		var rowData3 = context3.getImageData(0, 0, wd3, hg3);
		dataArray3 = rowData3.data;

	}
	
	canvas4 = document.getElementById("IMGManipulate4");
	context4 = canvas4.getContext("2d");

	wd4 = canvas4.width;
	hg4 = canvas4.height;

	var img4 = new Image();
	img4.src = "img/test08.jpg";
	img4.addEventListener('load', eventImgLoaded4, false);

	function eventImgLoaded4() {

		context4.drawImage(img4, 0, 0);
		var rowData4 = context4.getImageData(0, 0, wd4, hg4);
		dataArray4 = rowData4.data;

	}

}
grayscale = function() {

	var rowData = context.getImageData(0, 0, wd, hg);

	for (var i = 0; i < dataArray.length; i += 4) {
		// dataArray[i] = 0;
		var r = dataArray[i];
		var g = dataArray[i + 1];
		var b = dataArray[i + 2];
		var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

		rowData.data[i] = rowData.data[i + 1] = rowData.data[i + 2] = v;
	}
	// var manpulateData = dataArray;
	context.putImageData(rowData, 0, 0);

}
original = function() {
	var rowData = context.getImageData(0, 0, wd, hg);

	for (var i = 0; i < dataArray.length; i++) {
		rowData.data[i] = dataArray[i];
	}

	context.putImageData(rowData, 0, 0);

}
original2 = function() {
	var rowData = context2.getImageData(0, 0, wd2, hg2);

	for (var i = 0; i < dataArray2.length; i++) {
		rowData.data[i] = dataArray2[i];
	}

	context2.putImageData(rowData, 0, 0);

}

original3 = function() {
	var rowData = context3.getImageData(0, 0, wd3, hg3);

	for (var i = 0; i < dataArray3.length; i++) {
		rowData.data[i] = dataArray3[i];
	}

	context3.putImageData(rowData, 0, 0);

}

original4 = function() {
	var rowData = context4.getImageData(0, 0, wd4, hg4);
	for (var i = 0; i < dataArray4.length; i++) {
		rowData.data[i] = dataArray4[i];
	}

	context4.putImageData(rowData, 0, 0);

}

// thresholding an image
threshold = function() {

	var manData = context.getImageData(0, 0, wd, hg);
	var threshold = 120;

	for (var i = 0; i < dataArray.length; i += 4) {

		var r = dataArray[i];
		var g = dataArray[i + 1];
		var b = dataArray[i + 2];
		var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

		if (threshold > v) {
			v = 255;
		} else {
			v = 0;
		}

		manData.data[i] = manData.data[i + 1] = manData.data[i + 2] = v;
	}

	context.putImageData(manData, 0, 0);
}
bright = function() {
	var rowData = context.getImageData(0, 0, wd, hg);
	var ad = 60;
	for (var i = 0; i < dataArray.length; i += 4) {
		rowData.data[i] = Math.min(dataArray[i] + ad, 255);
		rowData.data[i + 1] = Math.min(dataArray[i + 1] + ad, 255);
		rowData.data[i + 2] = Math.min(dataArray[i + 2] + ad, 255);

	}

	context.putImageData(rowData, 0, 0);

}
sharpenImage = function() {
	var manData = context2.getImageData(0, 0, wd2, hg2);

	var weight = [0, -1, 0, -1, 5, -1, 0, -1, 0];
	convoltionFilter2(weight, manData);

	context2.putImageData(manData, 0, 0);
}
blurImage = function() {
	var manData = context2.getImageData(0, 0, wd2, hg2);

	// var weight = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
	var rec = 5 * 5;
	var weight = new Array()
	for (var i = 0; i < rec; i++) {
		weight[i] = 1 / rec;
	}

	// console.log("length" + weight.length +", " +weight);

	convoltionFilter2(weight, manData);

	context2.putImageData(manData, 0, 0);

}
vericalImage = function() {
	var verticalData3 = context3.getImageData(0, 0, wd3, hg3);

	var vertialWeight = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
	convoltionFilter3(vertialWeight, verticalData3);

	context3.putImageData(verticalData3, 0, 0);
}

horizonalImage = function() {
	var horizonalData3 = context3.getImageData(0, 0, wd3, hg3);

	var horizonalWeight = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
	convoltionFilter3(horizonalWeight, horizonalData3);

	context3.putImageData(horizonalData3, 0, 0);
}

sobelImage = function() {

	var verticalData = context3.getImageData(0, 0, wd3, hg3);
	var resultVerticalData = context3.getImageData(0, 0, wd3, hg3);

	var horizonalData = context3.getImageData(0, 0, wd3, hg3);
	var resultHorizonalData = context3.getImageData(0, 0, wd3, hg3);

	// convert the image to BW
	for (var i = 0; i < dataArray3.length; i += 4) {

		var r = dataArray3[i];
		var g = dataArray3[i + 1];
		var b = dataArray3[i + 2];
		var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

		verticalData.data[i] = verticalData.data[i + 1] = verticalData.data[i + 2] = v;
		horizonalData.data[i] = horizonalData.data[i + 1] = horizonalData.data[i + 2] = v;
	}

	var vertialWeight = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
	convoltioningFilter(vertialWeight, verticalData, resultVerticalData);

	var horizonalWeight = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
	convoltioningFilter(horizonalWeight, horizonalData, resultHorizonalData);

	var finalImage = context3.getImageData(0, 0, wd3, hg3);

	for (var i = 0; i < finalImage.data.length; i += 4) {
		var v = resultVerticalData.data[i]
		finalImage.data[i] = v;
		// console.log(v);
		var h = Math.abs(resultHorizonalData.data[i]);
		finalImage.data[i + 1] = h;
		finalImage.data[i + 2] = (v + h) / 4;
	}

	context3.putImageData(finalImage, 0, 0);

}
// this is the function for managing of the excuting co convoltion filter. About convoltion filter: http://en.wikipedia.org/wiki/Convolution
function convoltionFilter(weight, manData) {

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg; y++) {
		for (var x = 0; x < wd; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd + x) * 4;

			var r = 0, g = 0, b = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;

					if (scy >= 0 && scy < hg && scx >= 0 && scx < wd) {
						var srcoff = (scy * wd + scx) * 4;
						var wt = weight[cy * side + cx];
						r += dataArray[srcoff] * wt;
						g += dataArray[srcoff + 1] * wt;
						b += dataArray[srcoff + 2] * wt;
					}

				}
			}

			manData.data[dstoff] = r;
			manData.data[dstoff + 1] = g;
			manData.data[dstoff + 2] = b;

		}
	}

}

function convoltionFilter2(weight, manData) {

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg2; y++) {
		for (var x = 0; x < wd2; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd2 + x) * 4;

			var r = 0, g = 0, b = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;

					if (scy >= 0 && scy < hg2 && scx >= 0 && scx < wd2) {
						var srcoff = (scy * wd2 + scx) * 4;
						var wt = weight[cy * side + cx];
						r += dataArray2[srcoff] * wt;
						g += dataArray2[srcoff + 1] * wt;
						b += dataArray2[srcoff + 2] * wt;
					}

				}
			}

			manData.data[dstoff] = r;
			manData.data[dstoff + 1] = g;
			manData.data[dstoff + 2] = b;

		}
	}

}

function convoltionFilter3(weight, manData) {

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg3; y++) {
		for (var x = 0; x < wd3; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd3 + x) * 4;

			var r = 0, g = 0, b = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;

					if (scy >= 0 && scy < hg3 && scx >= 0 && scx < wd3) {
						var srcoff = (scy * wd3 + scx) * 4;
						var wt = weight[cy * side + cx];
						r += dataArray3[srcoff] * wt;
						g += dataArray3[srcoff + 1] * wt;
						b += dataArray3[srcoff + 2] * wt;
					}

				}
			}

			manData.data[dstoff] = r;
			manData.data[dstoff + 1] = g;
			manData.data[dstoff + 2] = b;

		}
	}

}

function convoltioningFilter(weight, manData, returnData) {

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg3; y++) {
		for (var x = 0; x < wd3; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd3 + x) * 4;

			var r = 0, g = 0, b = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;

					if (scy >= 0 && scy < hg3 && scx >= 0 && scx < wd3) {
						var srcoff = (scy * wd3 + scx) * 4;
						var wt = weight[cy * side + cx];
						r += manData.data[srcoff] * wt;
						g += manData.data[srcoff + 1] * wt;
						b += manData.data[srcoff + 2] * wt;
					}

				}
			}

			returnData.data[dstoff] = r;
			returnData.data[dstoff + 1] = g;
			returnData.data[dstoff + 2] = b;

		}
	}

}

crazy1 = function() {
	var manData = context4.getImageData(0, 0, wd4, hg4);

	var weight = [0, -1, 0, -1, 5, -1, 0, -1, 0];

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg4; y++) {
		for (var x = 0; x < wd4; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd4 + x) * 4;

			var r = 0, g = 0, b = 0, a = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;
					if (scy >= 0 && scy < hg4 && scx >= 0 && scx < wd4) {
						var srcoff = (scy * hg4 + wd4);
						var wt = weight[cy * side + cx];
						r += dataArray4[srcoff] * wt;
						g += dataArray4[srcoff + 1] * wt;
						b += dataArray4[srcoff + 2] * wt;
					}

				}
			}

			manData.data[dstoff] = r;
			manData.data[dstoff + 1] = g;
			manData.data[dstoff + 2] = b;

		}
	}

	context4.putImageData(manData, 0, 0);
}
crazy2 = function() {
	var manData = context4.getImageData(0, 0, wd4, hg4);

	var weight = [0, -1, 0, -1, 5, -1, 0, -1, 0];

	var side = Math.round(Math.sqrt(weight.length));
	var halfside = Math.floor(side / 2);

	for (var y = 0; y < hg4; y++) {
		for (var x = 0; x < wd4; x++) {
			var sy = y;
			var sx = x;
			var dstoff = (y * wd4 + x) * 4;

			var r = 0, g = 0, b = 0;

			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {

					var scy = sy + cy - halfside;
					var scx = sx + cx - halfside;

					if (scy >= 0 && scy < hg4 && scx >= 0 && scx < wd4) {
						var srcoff = (scy * wd4 + scx);
						var wt = weight[cy * side + cx];
						r += dataArray4[srcoff] * wt;
						g += dataArray4[srcoff + 1] * wt;
						b += dataArray4[srcoff + 2] * wt;
					}

				}
			}

			manData.data[dstoff] = r;
			manData.data[dstoff + 1] = g;
			manData.data[dstoff + 2] = b;

		}
	}

	context4.putImageData(manData, 0, 0);
}