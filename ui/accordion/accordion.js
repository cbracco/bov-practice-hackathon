/**
 * UMD (Universal Module Definition)
 * Patterns for JavaScript modules that work everywhere.
 * @link https://github.com/umdjs/umd/
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.accordion = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  // Use strict mode
  'use strict';

  //
  // VARIABLES
  //

  // Create object for public APIs
  var accordion = {};

  // Define feature test - http://stackoverflow.com/q/22172924
  var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_');

  // Define default settings
  var defaults = {
    initClass: 'js-accordion',
    accordionSelector: '.accordion',
    panelSelector: '.accordion-panel',
    toggleSelector: '.accordion-toggle',
    panelActiveClass: 'is-active'
  };

  // Placeholder for user settings
  var settings;

  //
  // UTILITY METHODS
  //

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   * @author Chris Ferdinandi
   * @link https://github.com/cferdinandi/houdini
   */
  var extend = function () {

    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;

  };

  /**
   * Get the closest matching element up the DOM tree
   * @private
   * @param {Element} elem Starting element
   * @param {String} selector Selector to match against (class, ID, or data attribute)
   * @return {Boolean|Element} Returns false if not match found
   * @author Chris Ferdinandi
   * @link https://github.com/cferdinandi/houdini
   */
  var getClosest = function (elem, selector) {

    // Variables
    var firstChar = selector.charAt(0);
    var attribute, value;

    // If selector is a data attribute, split attribute from value
    if (firstChar === '[') {
      selector = selector.substr(1, selector.length - 2);
      attribute = selector.split('=');

      if (attribute.length > 1) {
        value = true;
        attribute[1] = attribute[1].replace(/"/g, '').replace(/'/g, '');
      }
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {

      // If selector is a class
      if (firstChar === '.') {
        if (elem.classList.contains(selector.substr(1))) {
          return elem;
        }
      }

      // If selector is an ID
      if (firstChar === '#') {
        if (elem.id === selector.substr(1)) {
          return elem;
        }
      }

      // If selector is a data attribute
      if (firstChar === '[') {
        if (elem.hasAttribute(attribute[0])) {
          if (value) {
            if (elem.getAttribute(attribute[0]) === attribute[1]) {
              return elem;
            }
          } else {
            return elem;
          }
        }
      }

      // If selector is a tag
      if (elem.tagName.toLowerCase() === selector) {
        return elem;
      }

    }

    return null;

  };

  //
  // MODULE-SPECIFIC METHODS
  //

  /**
   * Handle click events
   * @private
   */
  var clickHandler = function (event) {

    // Do nothing if right-click or command/control + click
    if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

    // Check if toggle was clicked
    var toggle = getClosest(event.target, settings.toggleSelector);

    // Do nothing if toggle was not clicked
    if (!toggle) return;

    // Find the parent panel, accordion, and sibling panels
    var thisPanel = toggle.parentNode;
    var accordion = toggle.parentNode.parentNode;
    var allPanels = accordion.querySelectorAll(settings.panelSelector);

    // If this panel is already open, close it
    if (thisPanel.classList.contains(settings.panelActiveClass)) {
      thisPanel.classList.remove(settings.panelActiveClass);
    } else { // Otherwise, close all other panels and open this one
      // Remove active class from all panels
      for (var i = 0; i < allPanels.length; i++) {
        allPanels[i].classList.remove(settings.panelActiveClass);
      }
      // Add active class to this panel
      thisPanel.classList.add(settings.panelActiveClass);
    }

  };

  /**
   * Initialize
   * @public
   * @params {Object} options User settings
   */
  accordion.init = function (options) {

    // Do nothing if features are not supported
    if (!supports) return;

    // Merge user options with defaults
    settings = extend(defaults, options || {});

    // Add class to HTML element for conditional CSS
    document.documentElement.classList.add(settings.initClass);

    // Add event listeners
    document.addEventListener('click', clickHandler, false);

  };

  // Return public APIs
  return accordion;
});

console.log('accordion.js has loaded.');
