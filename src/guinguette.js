class Guinguette {
  constructor (target) {
    // Selectors
    this.target = target
    this.titles = this.target.querySelectorAll('[data-guinguette-title]')
    this.contents = this.target.querySelectorAll('[data-guinguette-content]')

    // CSS
    this.titleClass = 'guinguette-title'
    this.contentClass = 'guinguette-content'
    this.collapsedClass = 'collapsed'

    // Options
    this.autoCollapse = true
    this.anchorOpen = true

    // Init
    this.init()
  }

  init () {    
    // Initiate style + aria
    [].forEach.call(this.titles, (item) => {
      item.setAttribute('role', 'button')
      item.setAttribute('tabindex', '0')
      item.classList.add(this.titleClass)
    });

    [].forEach.call(this.contents, (item) => {
      item.classList.add(this.contentClass)
    });

    // Collapse all items on init
    [].forEach.call(this.titles, (item, index) => {
      this.collapse(index)
    });

    // Open the accordion with anchor link
    [].forEach.call(this.titles, (item, index) => {
      if (this.anchorOpen && window.location.hash === ('#' + item.id)) {
        this.expand(index)
      }
    });

    // Target events
    this._bindEvents()
  }

  /**
   * Private methods
   */

  _bindEvents () {
    
    [].forEach.call(this.titles, (item, index) => {
      item.addEventListener('click', () => {
        this.contents[index].classList.contains(this.collapsedClass) ? this.expand(index) : this.collapse(index)
      })
    });

    /**
     * Keyboard navigation
     */

    this.target.addEventListener("keydown", (event) => {
      // Open accordion with enter or space key
      if (event.keyCode === 13 || event.keyCode === 32) {
        [].forEach.call(this.titles, (item, index) => {
          if (item === document.activeElement) { this._toggle(index) }
        })
      }
      // Close accordion with escape or space key
      if (event.keyCode === 27) {
        [].forEach.call(this.titles, (item, index) => {
          if (item === document.activeElement) { this.collapse(index) }
        })
      }
    });
  }

  _isExpanded(item) {
    return !!(item.getAttribute('aria-expanded') == 'true')
  }

  _toggle (index) {
    this._isExpanded(this.titles[index]) ? this.collapse(index) : this.expand(index)
  }

  /**
   * Public methods
   */

  collapse(indexItem) {
    this.titles[indexItem].setAttribute('aria-expanded', 'false')
    this.titles[indexItem].classList.remove(this.collapsedClass)
    this.contents[indexItem].setAttribute('aria-hidden', 'true')
    this.contents[indexItem].classList.add(this.collapsedClass)
  }

  collapseAll () {
    [].forEach.call(this.titles, (item, index) => { this.collapse(index) })
  }

  expand (indexItem, overrideAutoCollapse) {    
    // If auto-collapse then close others accordions
    if (this.autoCollapse && !(overrideAutoCollapse)) {
      [].forEach.call(this.titles, (item, index) => {
        if (index !== indexItem) { this.collapse(index) }
      });
    }

    this.titles[indexItem].setAttribute('aria-expanded', 'true')
    this.titles[indexItem].classList.remove(this.collapsedClass)
    this.contents[indexItem].setAttribute('aria-hidden', 'false')
    this.contents[indexItem].classList.remove(this.collapsedClass)
  }

  expandAll () {
    [].forEach.call(this.titles, (item, index) => { this.expand(index, true) })
  }
  
}

module.exports = Guinguette;
