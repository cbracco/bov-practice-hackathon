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
  var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_') && 'getComputedStyle' in window;

  // Define default settings
  var defaults = {
    initClass: 'js-accordion',
    accordionSelector: '.accordion',
    toggleSelector: '.accordion-toggle',
    panelSelector: '.accordion-panel',
    panelActiveClass: 'is-active',
    panelTransitionClass: 'is-transitioning',
    contentSelector: '.accordion-content'
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

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * @author David Walsh
   * @link https://davidwalsh.name/javascript-debounce-function
   */
  var debounce = function (func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;

      var later = function() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  /**
   * Detect which transition event is being used
   * @author David Walsh
   * @link http://davidwalsh.name/css-animation-callback
   */
  var whichTransitionEvent = function () {
    var t, el = document.createElement('fakeelement');

    var transitions = {
      'transition'      : 'transitionend',
      'OTransition'     : 'oTransitionEnd',
      'MozTransition'   : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
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

    // Disable click event listener while transitioning to prevent a user
    // from toggling more than one panel at a time
    document.removeEventListener('click', clickHandler);

    // Find the parent panel, accordion, and sibling panels
    var thisPanel = toggle.parentNode;
    var thisContent = thisPanel.querySelector(settings.contentSelector);
    var accordion = toggle.parentNode.parentNode;
    var allPanels = accordion.querySelectorAll(settings.panelSelector);
    var transitionEvent = whichTransitionEvent();

    // Close this panel if already open
    if (thisPanel.classList.contains(settings.panelActiveClass)) {
      // Begin close transition
      thisPanel.classList.remove(settings.panelActiveClass);
      thisPanel.classList.add(settings.panelTransitionClass);

      // Set styles
      thisContent.style.maxHeight = '0px';
      thisContent.style.opacity = '0';
      thisContent.style.overflow = 'hidden';

      // End close transition
      var whenCloseTransitionEnds = function (event) {
        // Remove transition event listener so it only listens once
        thisContent.removeEventListener(transitionEvent, whenCloseTransitionEnds);
        // Remove classes
        thisPanel.classList.remove(settings.panelTransitionClass);
        // Add back click event listener
        document.addEventListener('click', clickHandler, false);
      };

      // Listen for transitionend events
      thisContent.addEventListener(transitionEvent, whenCloseTransitionEnds);
    } else { // Close all panels, otherwise
      for (var i = 0; i < allPanels.length; i++) {
        // Cache each panel content so we can style them later
        var content = allPanels[i].querySelector(settings.contentSelector);

        // When clicking a non-active toggle, we need to indicate that any
        // previously active panels are transitioning to close
        if (allPanels[i].classList.contains(settings.panelActiveClass)) {
          // Cache this panel so we can target it later on transitionend
          var previouslyActivePanel = allPanels[i];

          // Begin close transition
          previouslyActivePanel.classList.remove(settings.panelActiveClass);
          previouslyActivePanel.classList.add(settings.panelTransitionClass);

          // Set styles
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
          content.style.overflow = 'hidden';

          // End close transition
          var whenCloseTransitionEnds = function (event) {
            // Kill transition event listener so it only listens once
            content.removeEventListener(transitionEvent, whenCloseTransitionEnds);
            // Remove classes
            previouslyActivePanel.classList.remove(settings.panelTransitionClass);
            // Add back click event listener
            document.addEventListener('click', clickHandler, false);
          };

          // Listen for transitionend events
          content.addEventListener(transitionEvent, whenCloseTransitionEnds);
        } else {
          // Remove transition and active classes from each panel
          allPanels[i].classList.remove(settings.panelTransitionClass);
          allPanels[i].classList.remove(settings.panelActiveClass);

          // Reset styles
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
          content.style.overflow = 'hidden';
        }
      }

      // Begin open transition
      thisPanel.classList.add(settings.panelTransitionClass);

      // Set styles
      thisContent.style.maxHeight = thisContent.scrollHeight + 'px';
      thisContent.style.opacity = '1';

      // End open transition
      var whenOpenTransitionEnds = function (event) {
        // Remove transition event listener so it only fires once
        thisContent.removeEventListener(transitionEvent, whenOpenTransitionEnds);

        // Remove transition class
        thisPanel.classList.remove(settings.panelTransitionClass);

        // Add active class
        thisPanel.classList.add(settings.panelActiveClass);

        // Change overflow here to prevent content from being visible before
        // the transition has ended
        thisContent.style.overflow = 'visible';

        // Add back click event listener
        document.addEventListener('click', clickHandler, false);
      };

      // Add event listener for transitionend
      thisContent.addEventListener(transitionEvent, whenOpenTransitionEnds);
    }
  };

  /**
   * Handle window.onresize events
   * @private
   */
  var resizeHandler = debounce(function (event) {
    // Get all the accordions
    var accordions = document.querySelectorAll(settings.accordionSelector);

    // Loop through each accordion
    for (var i = 0; i < accordions.length; i++) {
      var activePanel = accordions[i].querySelector('.' + settings.panelActiveClass);

      // Do nothing if there are no active panels in accordion
      if (!activePanel) return;

      // If there are, get the active panel content
      var content = activePanel.querySelector(settings.contentSelector);

      // Reset max-height so it can be recalculated
      content.style.maxHeight = 'none';

      // Recalculate content height and set the max-height
      content.style.maxHeight = content.clientHeight + 'px';
    }
  }, 100);

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

    // Set initial styles for accordions
    var accordions = document.querySelectorAll(settings.accordionSelector);

    for (var i = 0; i < accordions.length; i++) {
      // Get the accordion panels
      var panels = accordions[i].querySelectorAll(settings.panelSelector);

      for (var j = 0; j < panels.length; j++) {
        // Get the panel content element
        var content = panels[j].querySelector(settings.contentSelector);

        // If panel has active class on init, set open styles
        if (panels[j].classList.contains(settings.panelActiveClass)) {
          content.style.maxHeight = content.clientHeight + 'px';
          content.style.opacity = '1';
          content.style.overflow = 'visible';
        } else { // Otherwise, set closed styles
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
          content.style.overflow = 'hidden';
        }
      }
    }

    // Add event listeners
    document.addEventListener('click', clickHandler, false);
    window.addEventListener('resize', resizeHandler, false);
  };

  // Return public APIs
  return accordion;
});

console.log('accordion.js has loaded.');
