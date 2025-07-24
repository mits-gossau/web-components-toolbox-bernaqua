// @ts-check

import { Shadow } from '../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
 * Footer is sticky and hosts uls
 * Example at: /src/es/components/organisms/Playlist.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {
 * }
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1em]
 *  --a-link-font-size-2 [1em]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1em]
 *  --p-margin [0]
 * }
 */
export default class Footer extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.setAttribute('role', 'navigation')
    this.setAttribute('aria-label', 'Footer')
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => {
      const wrappers = Array.from(this.root.querySelectorAll('o-wrapper[namespace=footer-default-]'))
      Footer.recalcWrappers(wrappers) // make sure that the wrapper has all the variables just set and recalc
      this.injectCssIntoWrappers(wrappers)
      this.fetchModules([
        {
          path: `${this.importMetaUrl}'../../../../web-components-toolbox/src/es/components/molecules/details/Details.js`,
          name: 'm-details'
        }
      ]).then(modules => {
        let moduleDetails
        if ((moduleDetails = modules.find(element => element.name === 'm-details'))) this.injectCssIntoDetails(this.autoAddDetails(wrappers, moduleDetails).details)
      })
      this.hidden = false
    })
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderCSS () {
    return !this.root.querySelector(`${this.cssSelector} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderHTML () {
    return !this.footer
  }

  /**
   * renders the o-footer css
   *
   * @return {Promise<void>}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: footer;
        color: var(--a-color);
        background-color: var(--background-color);
      }
      :host > footer {
        margin: var(--footer-margin, 0);
        width: var(--footer-width, auto);
      }
      :host > footer > *, :host > footer .invert > * {
        padding: var(--footer-any-padding, 0);
        margin: var(--content-spacing, unset) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 55%);
      }
      :host > footer .invert {
        display: flow-root;
        margin: 0;
        width: 100%;
        color: var(--invert-color);
        --a-color-hover: var(--invert-a-color-hover);
        --a-color: var(--invert-color);
        --color: var(--invert-color);
        background-color: var(--invert-background-color);
      }
      :host > footer o-wrapper[namespace=footer-default-] {
        --align-items: normal;
        --gap: var(--gap-custom, var(--content-spacing));
        --justify-content: var(--justify-content-custom, left);
      }
      :host > footer .footer-links > ul {
        --color: var(--background-color);
        --padding: 1.1429em 1.2143em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0;
        padding: 0;
      }
      :host > footer .footer-links > ul {
        flex-direction: row;
        justify-content: var(--links-justify-content-custom, start);
        align-items: var(--links-align-items, start);
        gap: var(--links-gap, var(--content-spacing));
      }
      :host > footer .footer-links > ul > li {
        border: 0;
        list-style: var(--list-style, none);
        width: auto;
        padding: var(--links-ul-li-padding, 0);
        order: 1;
      }
      :host > footer .footer-links > ul > li a {
        --a-font-size: var(--meta-a-font-size);
      }
      :host > footer .footer-links > ul > li.copyright {
        order: 0;
        margin: var(--copyright-margin, 0 auto 0 0);
        font-size: var(--copyright-font-size);
      }
      :host > footer .footer-logo-languageswitch {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: auto;
        margin-bottom: var(--logo-margin-bottom);
      }
      
      @media only screen and (max-width: _max-width_) {
        :host > footer {
          margin: var(--footer-margin-mobile, var(--footer-margin, 0));
          width: var(--footer-width-mobile, var(--footer-width, auto));
        }
        :host > footer > *, :host > footer .invert > * {
          padding: var(--footer-any-padding-mobile, var(--footer-any-padding, 0));
          margin: var(--content-spacing-mobile, var(--content-spacing, unset)) auto var(--content-spacing-mobile, var(--content-spacing, unset)); /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-mobile, calc(100% - var(--content-spacing-mobile, var(--content-spacing)) * 2));
        }
        :host > footer *.last-contains-details {
          margin-top: var(--wrapper-last-contains-details-margin-top, var(--content-spacing-mobile, var(--content-spacing, unset))); /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          margin-bottom: var(--wrapper-last-contains-details-margin-bottom, var(--content-spacing-mobile, var(--content-spacing, unset))); /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        }
        :host > footer o-wrapper[namespace=footer-default-] {
          --gap: var(--gap-mobile-custom, var(--gap-custom, var(--content-spacing-mobile, var(--content-spacing))));
        }
        :host > footer .footer-links > ul {
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          gap: var(--links-gap-mobile, var(--content-spacing));
          justify-content: var(--links-justify-content-mobile-custom, start);
        }
        :host > footer .footer-links > ul > li {
          padding: var(--links-ul-li-padding-mobile, 0);
          width: 50%;
        }
        :host > footer .footer-links > ul > li a {
          --a-font-size-mobile: var(--meta-a-font-size-mobile);
        }
        :host > footer .footer-links > ul > li.copyright {
          order: 2;
          margin: var(--copyright-margin-mobile, 1em 0 0 0);
          width: 100%;
          font-size: var(--copyright-font-size-mobile);
        }
      }
    `
    return this.fetchTemplate()
  }

  /**
   * fetches the template
   *
   * @return {Promise<void>}
   */
  fetchTemplate () {
    /** @type {import("../../web-components-toolbox/src/es/components/prototypes/Shadow.js").fetchCSSParams[]} */
    const styles = [
      {
        path: `${this.importMetaUrl}../../web-components-toolbox/src/css/reset.css`, // no variables for this reason no namespace
        namespace: false,
        maxWidth: this.getMobileBreakpoint({})
      },
      {
        path: `${this.importMetaUrl}../../web-components-toolbox/src/css/style.css`, // apply namespace and fallback to allow overwriting on deeper level
        namespaceFallback: true,
        maxWidth: this.getMobileBreakpoint({})
      }
    ]
    switch (this.getAttribute('namespace')) {
      case 'footer-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }, ...styles], false)
      default:
        return this.fetchCSS(styles)
    }
  }

  /**
   * renders the html
   *
   * @return {Promise<void>}
   */
  renderHTML () {
    this.footer = this.root.querySelector(this.cssSelector + ' > footer') || document.createElement('footer')
    Array.from(this.root.children).forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE' || node.tagName === 'FOOTER') return false
      this.footer.appendChild(node)
    })
    this.html = this.footer
    return Promise.resolve()
  }

  /**
   * replaces by CSS resp. clones "o-wrapper > section > *" into a "div > m-details" structure for certain view ports
   *
   * @param {HTMLElement[] & any} wrappers
   * @param {import("../../web-components-toolbox/src/es/components/prototypes/Shadow.js").fetchModulesParams} moduleDetails
   * @returns {{wrappers: HTMLElement[], details: HTMLElement[]}}
   */
  autoAddDetails (wrappers, moduleDetails) {
    if (!moduleDetails) return wrappers
    const details = []
    const hasDetailsMobile = !this.hasAttribute('no-details-mobile') // mobile default true
    const hasDetailsDesktop = this.hasAttribute('details-desktop') // desktop default false
    // check if wrappers.map returns any true
    if ((hasDetailsMobile || hasDetailsDesktop) && wrappers.map(wrapper => {
      let lastContainsDetails = false
      // check if section children.filter returns any element. map.length
      if (Array.from((!wrapper.hasAttribute('no-details') && wrapper.section && wrapper.section.children) || [])
        // filter and add only details to wrapper-sections which have multiple children
        .filter((sectionChild, i, arr) => {
          const addDetails = sectionChild.children && sectionChild.children.length > 1 && sectionChild.children[0] && !!sectionChild.children[0].tagName
          return i === arr.length - 1 ? (lastContainsDetails = addDetails) : addDetails
        })
        // append m-details to each section
        .reduceRight((accumulator, sectionChild, i, arr) => {
          if(sectionChild.classList.contains('no-details')) {
            return accumulator;
          }

          // html adjustments
          sectionChild.classList.add('contains-details')
          /** @type {HTMLElement[]} */
          const sectionChildChildren = Array.from(sectionChild.children)
          // if summary title is empty add it to the next details if possible
          if (i > 0 && sectionChildChildren[0].outerHTML.includes('>&nbsp;<')) {
            sectionChildChildren.splice(0, 1)
            sectionChildChildren.forEach(child => {
              const clone = child.cloneNode(true)
              // @ts-ignore
              clone.classList.add('clone')
              arr[i - 1].appendChild(clone)
            })
          } else {
            // grab all web components to be cloned (only works on first level, means atoms)
            const clones = []
            Array.from(sectionChild.querySelectorAll('*')).filter(node => node.root).forEach(node => {
              const clone = node.cloneNode(true)
              clones.push(clone)
              clone.html = ''
              clone.html = node.html
              node.classList.add(`placeholder-node-${clones.length - 1}`)
            })
            // move all children into a dedicated div
            // create a summary/details for each sectionChild
            const detailsDiv = document.createElement('div')
            detailsDiv.innerHTML = `
              <m-details mobile-breakpoint="${this.getMobileBreakpoint({})}" namespace="details-default-icon-right-" open-event-name="open-footer">
                <details>
                  <summary>${sectionChildChildren.splice(0, 1)[0].outerHTML}</summary>
                  <div class=footer-links-row>${sectionChildChildren.reduce((previousValue, currentValue) => previousValue + currentValue.outerHTML, '')}</div>
                </details>
              </m-details>
            `
            // replace the placeholders with its clones
            clones.forEach((clone, i) => {
              let placeholderNode
              // @ts-ignore
              if ((placeholderNode = detailsDiv.children[0].root.querySelector(`.placeholder-node-${i}`))) placeholderNode.replaceWith(clone)
            })
            // set the details
            details.push(detailsDiv.children[0])
            sectionChild.appendChild(detailsDiv.children[0])
          }
          accumulator.push(sectionChild)
          return accumulator
        }, [])
        .length) {
        // found eligible elements to make summary details
        if (wrapper.previousElementSibling) wrapper.previousElementSibling.classList.add('next-contains-details')
        // inject the CSS logic to display by hasDetailsMobile and hasDetailsDesktop
        if (lastContainsDetails) wrapper.classList.add('last-contains-details')
        wrapper.setCss(/* css */`
          :host > section > *.contains-details > *:not(m-details).clone {
            display: none !important;
          }
          ${hasDetailsDesktop
            ? /* css */`
              :host > section > *.contains-details > m-details {
                display: block !important;
              }
              :host > section > *.contains-details > *:not(m-details) {
                display: none !important;
              }
            `
            : /* css */`
              :host > section > *.contains-details > m-details {
                display: none !important;
              }
              :host > section > *.contains-details > *:not(m-details) {
                display: block !important;
              }
            `
          }
          @media only screen and (max-width: _max-width_) {
            ${hasDetailsMobile
              ? /* css */`
                :host > section {
                  gap: 0;
                }
                :host > section > *:not(.contains-details):not(:first-child) {
                  margin-top: var(--${this.getAttribute('namespace') || ''}gap-mobile-custom, var(--${this.getAttribute('namespace') || ''}gap-custom, var(--content-spacing-mobile, var(--content-spacing)))) !important;
                }
                :host > section > *.contains-details > m-details {
                  --details-default-icon-right-border-top-custom: 0;
                  display: block !important;
                }
                :host > section > *.contains-details > *:not(m-details) {
                  display: none !important;
                }
              `
              : /* css */`
                :host > section > *.contains-details > m-details {
                  display: none !important;
                }
                :host > section > *.contains-details > *:not(m-details) {
                  display: block !important;
                }
              `
            }
          }
        `, undefined, false)
        return true
      }
      // didn't find any elements which could be used as summary details
      return false
    }).includes(true)) {
      // found eligible wrappers
      // make the invert style useable for summary details within
      this.setCss(/* css */`
        :host > footer .invert {
          --details-default-icon-right-summary-child-color-hover-custom: var(--${this.getAttribute('namespace') || ''}a-color);
          --details-default-icon-right-a-color-hover: var(--${this.getAttribute('namespace') || ''}a-color-hover);
          --details-default-icon-right-summary-child-color-custom: var(--${this.getAttribute('namespace') || ''}invert-color);
          --details-default-icon-right-a-text-decoration: var(--${this.getAttribute('namespace') || ''}a-text-decoration);
          --details-default-icon-right-a-text-decoration-hover: var(--${this.getAttribute('namespace') || ''}a-text-decoration-hover);
          --details-default-icon-right-summary-child-color-hover-custom: var(--${this.getAttribute('namespace') || ''}invert-color);
          --details-default-icon-right-a-color: var(--${this.getAttribute('namespace') || ''}invert-color);
          --details-default-icon-right-svg-color-custom: var(--${this.getAttribute('namespace') || ''}invert-color);
          --details-default-icon-right-border-color-custom: var(--${this.getAttribute('namespace') || ''}invert-color);
          --color: var(--${this.getAttribute('namespace') || ''}invert-color);
        }
        @media only screen and (max-width: ${(wrappers[0] && wrappers[0].mobileBreakpoint) || '_max-width_'}) {
          ${hasDetailsMobile
            ? /* css */`
              :host > footer hr.next-contains-details, :host > footer div.next-contains-details {
                display: none;
              }
            `
            : ''
          }
        }
      `, undefined, false)
    }
    return { wrappers, details }
  }

  /**
   * force the wrapper to recalc its column width with the new variables set in the css above
   *
   * @param {HTMLElement[] & any} wrappers
   * @returns {HTMLElement[]}
   * @static
   */
  static recalcWrappers (wrappers) {
    wrappers.forEach(wrapper => wrapper.calcColumnWidth())
    return wrappers
  }

  /**
   * should actually be done with the template for o-detail namespace="footer-default-" but this has already been done within the razor template, this fix should work without any razor adjustments
   *
   * @param {HTMLElement[] & any} details
   * @returns {HTMLElement[]}
   */
  injectCssIntoDetails (details) {
    details.forEach(detail => detail.setCss(/* css */`
      ${this.injectCssIntoWrapperAndDetails()}
      :host .footer-links-row {
        --details-default-icon-right-child-margin-mobile: var(--footer-links-row-margin, var(--details-default-icon-right-child-margin-mobile, var(--details-default-icon-right-child-margin, 0)));
      }
      
    `, undefined, false))
    return details
  }

  /**
   * should actually be done with the template for o-wrapper namespace="footer-default-" but this has already been done within the razor template, this fix should work without any razor adjustments
   *
   * @param {HTMLElement[] & any} wrappers
   * @returns {HTMLElement[]}
   */
  injectCssIntoWrappers (wrappers) {
    wrappers.forEach(wrapper => wrapper.setCss(/* css */`
      ${this.injectCssIntoWrapperAndDetails()}
      :host .footer-links-row:not(:last-child){
        border-right: var(--${this.getAttribute('namespace') || ''}boarder-right, 1px solid var(--m-gray-500));
      }
      :host .footer-links-row ul.bull li::before {
        border: 0;
        background-color: transparent;
      }
      @media only screen and (max-width: _max-width_) {
          :host .footer-links-row:not(:last-child){
            border-right: none;
          }
      }
    `, undefined, false))
    return wrappers
  }

  injectCssIntoWrapperAndDetails () {
    return /* css */ `
      :host .footer-links-row ul, :host .footer-links-row ul.bull {
        list-style: none;
        padding-left: 0;
      }
      :host .social-links {
        display: flex;
        flex-direction: row;
        gap: 1.875rem;
      }
      :host .social-links img {
        height: 1.625rem;
        width: auto;
      }
      :host a-button {
        --button-primary-background-color: var(--footer-default-button-background-color);
        --button-primary-background-color-hover: var(--footer-default-button-background-color-hover);
        --button-primary-width: var(--footer-default-button-width);
        width: var(--footer-default-button-width);
        margin: var(--footer-default-button-margin);
      }
    `
  }
}
