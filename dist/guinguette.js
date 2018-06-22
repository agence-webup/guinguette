(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Guinguette = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guinguette = function () {
  function Guinguette(target, options) {
    _classCallCheck(this, Guinguette);

    // Selectors
    this.target = target;
    this.titles = this.target.querySelectorAll('[data-guinguette-title]');
    this.contents = this.target.querySelectorAll('[data-guinguette-content]');

    // CSS
    this.titleClass = 'guinguette-title';
    this.contentClass = 'guinguette-content';
    this.collapsedClass = 'collapsed';

    // Options
    this.defaults = {
      autoCollapse: false,
      anchorOpen: true
    };
    this.options = this._extendObject({}, this.defaults, options);

    // Init
    this.init();
  }

  _createClass(Guinguette, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // Initiate style + aria
      [].forEach.call(this.titles, function (item) {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.classList.add(_this.titleClass);
      });

      [].forEach.call(this.contents, function (item) {
        item.classList.add(_this.contentClass);
      });

      // Collapse all items on init
      [].forEach.call(this.titles, function (item, index) {
        _this.collapse(index);
      });

      // Open the accordion with anchor link
      [].forEach.call(this.titles, function (item, index) {
        if (_this.options.anchorOpen && window.location.hash === '#' + item.id) {
          _this.expand(index);
        }
      });

      // Target events
      this._bindEvents();
    }

    /**
     * Private methods
     */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      [].forEach.call(this.titles, function (item, index) {
        item.addEventListener('click', function () {
          _this2.contents[index].classList.contains(_this2.collapsedClass) ? _this2.expand(index) : _this2.collapse(index);
        });
      });

      /**
       * Keyboard navigation
       */

      this.target.addEventListener("keydown", function (event) {
        // Open accordion with enter or space key
        if (event.keyCode === 13 || event.keyCode === 32) {
          [].forEach.call(_this2.titles, function (item, index) {
            if (item === document.activeElement) {
              _this2._toggle(index);
            }
          });
        }
        // Close accordion with escape or space key
        if (event.keyCode === 27) {
          [].forEach.call(_this2.titles, function (item, index) {
            if (item === document.activeElement) {
              _this2.collapse(index);
            }
          });
        }
      });
    }
  }, {
    key: '_isExpanded',
    value: function _isExpanded(item) {
      return !!(item.getAttribute('aria-expanded') == 'true');
    }
  }, {
    key: '_toggle',
    value: function _toggle(index) {
      this._isExpanded(this.titles[index]) ? this.collapse(index) : this.expand(index);
    }
  }, {
    key: '_extendObject',
    value: function _extendObject() {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
      return arguments[0];
    }

    /**
     * Public methods
     */

  }, {
    key: 'collapse',
    value: function collapse(indexItem) {
      this.titles[indexItem].setAttribute('aria-expanded', 'false');
      this.titles[indexItem].classList.remove(this.collapsedClass);
      this.contents[indexItem].setAttribute('aria-hidden', 'true');
      this.contents[indexItem].classList.add(this.collapsedClass);
    }
  }, {
    key: 'collapseAll',
    value: function collapseAll() {
      var _this3 = this;

      [].forEach.call(this.titles, function (item, index) {
        _this3.collapse(index);
      });
    }
  }, {
    key: 'expand',
    value: function expand(indexItem, overrideAutoCollapse) {
      var _this4 = this;

      // If auto-collapse then close others accordions
      if (this.options.autoCollapse && !overrideAutoCollapse) {
        [].forEach.call(this.titles, function (item, index) {
          if (index !== indexItem) {
            _this4.collapse(index);
          }
        });
      }

      this.titles[indexItem].setAttribute('aria-expanded', 'true');
      this.titles[indexItem].classList.remove(this.collapsedClass);
      this.contents[indexItem].setAttribute('aria-hidden', 'false');
      this.contents[indexItem].classList.remove(this.collapsedClass);
    }
  }, {
    key: 'expandAll',
    value: function expandAll() {
      var _this5 = this;

      [].forEach.call(this.titles, function (item, index) {
        _this5.expand(index, true);
      });
    }
  }]);

  return Guinguette;
}();

module.exports = Guinguette;

},{}]},{},[1])(1)
});
