(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsSlides = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require(1);

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"1":1}],3:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));
var document = _interopDefault(require(2));

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

var VideoSlides = function () {
  /**
  * VideoSlides Constructor.
  *
  * @classdesc A class that represents a slides.
  * @constructs VideoSlides
  * @param {Array} items Array Object Items has slide image and time to show the slide
  */
  function VideoSlides(items) {
    _classCallCheck(this, VideoSlides);

    this.slides = document.createElement('ul');
    this.slidesItems = items;
    this.oldTime = 0;
    this.appendSlider();
  }
  /**
  * AppendSlider function to append Slide list into VideoJS.
  *
  * @return {void} doesn't return enething
  * @function appendSlider
  *
  */


  _createClass(VideoSlides, [{
    key: 'appendSlider',
    value: function appendSlider() {
      // Get control bar element
      var controlBar = document.getElementsByClassName('vjs-control-bar')[0];

      // Add slide list className
      this.slides.className = 'video-slides';
      controlBar.parentNode.insertBefore(this.slides, controlBar);
      this.appendSliderItem();
    }
    /**
    * AppendSliderItem function to append SlideItem  into Slide List.
    *
    * @return {void} doesn't return enething
    * @function appendSliderItem
    *
    */

  }, {
    key: 'appendSliderItem',
    value: function appendSliderItem() {
      for (var i = 0; i <= this.slidesItems.length - 1; i++) {
        // Create an image and li tag
        var img = document.createElement('img');
        var li = document.createElement('li');

        // Added src and Class name
        img.src = this.slidesItems[i].url;
        li.className = 'slide_' + this.slidesItems[i].time;
        // Append image into li
        li.appendChild(img);
        // Append li into ul list
        this.slides.appendChild(li);
      }
    }
    /**
    * slideShow function to show the current slide according to the time.
    *
    * @param {number} time the current video time
    * @return {void} doesn't return enething
    * @function slideShow
    *
    */

  }, {
    key: 'slideShow',
    value: function slideShow(time) {
      var currentTime = Math.floor(time);

      for (var i = 0; i <= this.slidesItems.length - 1; i++) {
        if (currentTime === this.slidesItems[i].time && this.oldTime !== currentTime) {
          var firstItem = i === 0 ? 0 : 1;
          var oldItem = 'slide_' + this.slidesItems[i - firstItem].time;
          var currentItem = 'slide_' + this.slidesItems[i].time;
          var beforeSlide = document.getElementsByClassName(oldItem)[0];
          var currentSlide = document.getElementsByClassName(currentItem)[0];

          beforeSlide.style.display = 'none';
          currentSlide.style.display = 'block';
          this.oldTime = currentTime;
          return false;
        }
      }
    }
  }]);

  return VideoSlides;
}();

var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-slides');
  var slides = new VideoSlides(options.slides);

  player.on('timeupdate', function () {
    slides.slideShow(this.currentTime());
  });
};

/**
 * A video.js plugin.
 *
 * @function slides
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var slides = function slides(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('slides', slides);

// Include the version number.
slides.VERSION = '0.0.0';

module.exports = slides;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2dsb2JhbC9kb2N1bWVudC5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNmQTs7Ozs7Ozs7QUFFQSxTQUFTLGVBQVQsQ0FBMEIsRUFBMUIsRUFBOEI7QUFBRSxTQUFRLE1BQU8sUUFBTyxFQUFQLHlDQUFPLEVBQVAsT0FBYyxRQUFyQixJQUFrQyxhQUFhLEVBQWhELEdBQXNELEdBQUcsU0FBSCxDQUF0RCxHQUFzRSxFQUE3RTtBQUFrRjs7QUFFbEgsSUFBSSxVQUFVLGdCQUFnQixRQUFRLFVBQVIsQ0FBaEIsQ0FBZDtBQUNBLElBQUksV0FBVyxnQkFBZ0IsUUFBUSxpQkFBUixDQUFoQixDQUFmOztBQUVBO0FBQ0EsSUFBTSxXQUFXLEVBQWpCOztBQUVBO0FBQ0EsSUFBTSxpQkFBaUIsUUFBUSxjQUFSLElBQTBCLFFBQVEsTUFBekQ7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQVNNLFc7QUFDSjs7Ozs7OztBQU9BLHVCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFFakIsU0FBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWQ7QUFDQSxTQUFLLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxZQUFMO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7bUNBT2U7QUFDYjtBQUNBLFVBQU0sYUFBYSxTQUFTLHNCQUFULENBQWdDLGlCQUFoQyxFQUFtRCxDQUFuRCxDQUFuQjs7QUFFQTtBQUNBLFdBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsY0FBeEI7QUFDQSxpQkFBVyxVQUFYLENBQXNCLFlBQXRCLENBQW1DLEtBQUssTUFBeEMsRUFBZ0QsVUFBaEQ7QUFDQSxXQUFLLGdCQUFMO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozt1Q0FPbUI7QUFDakIsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixLQUFLLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUEwQixDQUEvQyxFQUFrRCxHQUFsRCxFQUF1RDtBQUNyRDtBQUNBLFlBQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFlBQU0sS0FBSyxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDs7QUFFQTtBQUNBLFlBQUksR0FBSixHQUFVLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixHQUE5QjtBQUNBLFdBQUcsU0FBSCxHQUFlLFdBQVcsS0FBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLElBQTlDO0FBQ0E7QUFDQSxXQUFHLFdBQUgsQ0FBZSxHQUFmO0FBQ0E7QUFDQSxhQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLEVBQXhCO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7Ozs7Ozs4QkFRVSxJLEVBQU07QUFDZCxVQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFwQjs7QUFFQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLEtBQUssS0FBSyxXQUFMLENBQWlCLE1BQWpCLEdBQTBCLENBQS9DLEVBQWtELEdBQWxELEVBQXVEO0FBQ3JELFlBQUksZ0JBQWdCLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixJQUFwQyxJQUE0QyxLQUFLLE9BQUwsS0FBaUIsV0FBakUsRUFBOEU7QUFDNUUsY0FBTSxZQUFhLE1BQU0sQ0FBUCxHQUFZLENBQVosR0FBZ0IsQ0FBbEM7QUFDQSxjQUFNLFVBQVUsV0FBVyxLQUFLLFdBQUwsQ0FBaUIsSUFBSSxTQUFyQixFQUFnQyxJQUEzRDtBQUNBLGNBQU0sY0FBYyxXQUFXLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFvQixJQUFuRDtBQUNBLGNBQU0sY0FBYyxTQUFTLHNCQUFULENBQWdDLE9BQWhDLEVBQXlDLENBQXpDLENBQXBCO0FBQ0EsY0FBTSxlQUFlLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsRUFBNkMsQ0FBN0MsQ0FBckI7O0FBRUEsc0JBQVksS0FBWixDQUFrQixPQUFsQixHQUE0QixNQUE1QjtBQUNBLHVCQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQSxlQUFLLE9BQUwsR0FBZSxXQUFmO0FBQ0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRjs7Ozs7O0FBRUgsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFxQjtBQUN6QyxTQUFPLFFBQVAsQ0FBZ0IsWUFBaEI7QUFDQSxNQUFNLFNBQVMsSUFBSSxXQUFKLENBQWdCLFFBQVEsTUFBeEIsQ0FBZjs7QUFFQSxTQUFPLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFlBQVc7QUFDakMsV0FBTyxTQUFQLENBQWlCLEtBQUssV0FBTCxFQUFqQjtBQUNELEdBRkQ7QUFHRCxDQVBEOztBQVNBOzs7Ozs7O0FBT0EsSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFTLE9BQVQsRUFBa0I7QUFBQTs7QUFDL0IsT0FBSyxLQUFMLENBQVcsWUFBTTtBQUNmLGtCQUFjLEtBQWQsRUFBb0IsUUFBUSxZQUFSLENBQXFCLFFBQXJCLEVBQStCLE9BQS9CLENBQXBCO0FBQ0QsR0FGRDtBQUdELENBSkQ7O0FBTUE7QUFDQSxlQUFlLFFBQWYsRUFBeUIsTUFBekI7O0FBRUE7QUFDQSxPQUFPLE9BQVAsR0FBaUIsYUFBakI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiIiwidmFyIHRvcExldmVsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge31cbnZhciBtaW5Eb2MgPSByZXF1aXJlKCdtaW4tZG9jdW1lbnQnKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50O1xufSBlbHNlIHtcbiAgICB2YXIgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2NjeTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciB2aWRlb2pzID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3ZpZGVvLmpzJykpO1xudmFyIGRvY3VtZW50ID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpKTtcblxuLy8gRGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGx1Z2luLlxyXG5jb25zdCBkZWZhdWx0cyA9IHt9O1xyXG5cclxuLy8gQ3Jvc3MtY29tcGF0aWJpbGl0eSBmb3IgVmlkZW8uanMgNSBhbmQgNi5cclxuY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSB2aWRlb2pzLnJlZ2lzdGVyUGx1Z2luIHx8IHZpZGVvanMucGx1Z2luO1xyXG4vLyBjb25zdCBkb20gPSB2aWRlb2pzLmRvbSB8fCB2aWRlb2pzO1xyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHkuXHJcbiAqXHJcbiAqIEBmdW5jdGlvbiBvblBsYXllclJlYWR5XHJcbiAqIEBwYXJhbSAgICB7UGxheWVyfSBwbGF5ZXJcclxuICogICAgICAgICAgIEEgVmlkZW8uanMgcGxheWVyLlxyXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXHJcbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cclxuICovXHJcbmNsYXNzIFZpZGVvU2xpZGVzIHtcclxuICAvKipcclxuICAqIFZpZGVvU2xpZGVzIENvbnN0cnVjdG9yLlxyXG4gICpcclxuICAqIEBjbGFzc2Rlc2MgQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzbGlkZXMuXHJcbiAgKiBAY29uc3RydWN0cyBWaWRlb1NsaWRlc1xyXG4gICogQHBhcmFtIHtBcnJheX0gaXRlbXMgQXJyYXkgT2JqZWN0IEl0ZW1zIGhhcyBzbGlkZSBpbWFnZSBhbmQgdGltZSB0byBzaG93IHRoZSBzbGlkZVxyXG4gICovXHJcbiAgY29uc3RydWN0b3IoaXRlbXMpIHtcclxuXHJcbiAgICB0aGlzLnNsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICB0aGlzLnNsaWRlc0l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLm9sZFRpbWUgPSAwO1xyXG4gICAgdGhpcy5hcHBlbmRTbGlkZXIoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBBcHBlbmRTbGlkZXIgZnVuY3Rpb24gdG8gYXBwZW5kIFNsaWRlIGxpc3QgaW50byBWaWRlb0pTLlxyXG4gICpcclxuICAqIEByZXR1cm4ge3ZvaWR9IGRvZXNuJ3QgcmV0dXJuIGVuZXRoaW5nXHJcbiAgKiBAZnVuY3Rpb24gYXBwZW5kU2xpZGVyXHJcbiAgKlxyXG4gICovXHJcbiAgYXBwZW5kU2xpZGVyKCkge1xyXG4gICAgLy8gR2V0IGNvbnRyb2wgYmFyIGVsZW1lbnRcclxuICAgIGNvbnN0IGNvbnRyb2xCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtY29udHJvbC1iYXInKVswXTtcclxuXHJcbiAgICAvLyBBZGQgc2xpZGUgbGlzdCBjbGFzc05hbWVcclxuICAgIHRoaXMuc2xpZGVzLmNsYXNzTmFtZSA9ICd2aWRlby1zbGlkZXMnO1xyXG4gICAgY29udHJvbEJhci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLnNsaWRlcywgY29udHJvbEJhcik7XHJcbiAgICB0aGlzLmFwcGVuZFNsaWRlckl0ZW0oKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBBcHBlbmRTbGlkZXJJdGVtIGZ1bmN0aW9uIHRvIGFwcGVuZCBTbGlkZUl0ZW0gIGludG8gU2xpZGUgTGlzdC5cclxuICAqXHJcbiAgKiBAcmV0dXJuIHt2b2lkfSBkb2Vzbid0IHJldHVybiBlbmV0aGluZ1xyXG4gICogQGZ1bmN0aW9uIGFwcGVuZFNsaWRlckl0ZW1cclxuICAqXHJcbiAgKi9cclxuICBhcHBlbmRTbGlkZXJJdGVtKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5zbGlkZXNJdGVtcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGFuZCBsaSB0YWdcclxuICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHJcbiAgICAgIC8vIEFkZGVkIHNyYyBhbmQgQ2xhc3MgbmFtZVxyXG4gICAgICBpbWcuc3JjID0gdGhpcy5zbGlkZXNJdGVtc1tpXS51cmw7XHJcbiAgICAgIGxpLmNsYXNzTmFtZSA9ICdzbGlkZV8nICsgdGhpcy5zbGlkZXNJdGVtc1tpXS50aW1lO1xyXG4gICAgICAvLyBBcHBlbmQgaW1hZ2UgaW50byBsaVxyXG4gICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAvLyBBcHBlbmQgbGkgaW50byB1bCBsaXN0XHJcbiAgICAgIHRoaXMuc2xpZGVzLmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgKiBzbGlkZVNob3cgZnVuY3Rpb24gdG8gc2hvdyB0aGUgY3VycmVudCBzbGlkZSBhY2NvcmRpbmcgdG8gdGhlIHRpbWUuXHJcbiAgKlxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgdGhlIGN1cnJlbnQgdmlkZW8gdGltZVxyXG4gICogQHJldHVybiB7dm9pZH0gZG9lc24ndCByZXR1cm4gZW5ldGhpbmdcclxuICAqIEBmdW5jdGlvbiBzbGlkZVNob3dcclxuICAqXHJcbiAgKi9cclxuICBzbGlkZVNob3codGltZSkge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKHRpbWUpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuc2xpZGVzSXRlbXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIGlmIChjdXJyZW50VGltZSA9PT0gdGhpcy5zbGlkZXNJdGVtc1tpXS50aW1lICYmIHRoaXMub2xkVGltZSAhPT0gY3VycmVudFRpbWUpIHtcclxuICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSAoaSA9PT0gMCkgPyAwIDogMTtcclxuICAgICAgICBjb25zdCBvbGRJdGVtID0gJ3NsaWRlXycgKyB0aGlzLnNsaWRlc0l0ZW1zW2kgLSBmaXJzdEl0ZW1dLnRpbWU7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSAnc2xpZGVfJyArIHRoaXMuc2xpZGVzSXRlbXNbaV0udGltZTtcclxuICAgICAgICBjb25zdCBiZWZvcmVTbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUob2xkSXRlbSlbMF07XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjdXJyZW50SXRlbSlbMF07XHJcblxyXG4gICAgICAgIGJlZm9yZVNsaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY3VycmVudFNsaWRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIH1cclxuY29uc3Qgb25QbGF5ZXJSZWFkeSA9IChwbGF5ZXIsIG9wdGlvbnMpID0+IHtcclxuICBwbGF5ZXIuYWRkQ2xhc3MoJ3Zqcy1zbGlkZXMnKTtcclxuICBjb25zdCBzbGlkZXMgPSBuZXcgVmlkZW9TbGlkZXMob3B0aW9ucy5zbGlkZXMpO1xyXG5cclxuICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgIHNsaWRlcy5zbGlkZVNob3codGhpcy5jdXJyZW50VGltZSgpKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIHZpZGVvLmpzIHBsdWdpbi5cclxuICpcclxuICogQGZ1bmN0aW9uIHNsaWRlc1xyXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXHJcbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cclxuICovXHJcbmNvbnN0IHNsaWRlcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICB0aGlzLnJlYWR5KCgpID0+IHtcclxuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlZ2lzdGVyIHRoZSBwbHVnaW4gd2l0aCB2aWRlby5qcy5cclxucmVnaXN0ZXJQbHVnaW4oJ3NsaWRlcycsIHNsaWRlcyk7XHJcblxyXG4vLyBJbmNsdWRlIHRoZSB2ZXJzaW9uIG51bWJlci5cclxuc2xpZGVzLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNsaWRlcztcbiJdfQ==
