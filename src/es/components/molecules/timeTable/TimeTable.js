// @ts-check
import { Shadow } from '../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
 * TimeTable
* @export
* @class TimeTable
* @type {CustomElementConstructor}
*/
export default class TimeTable extends Shadow() {
  constructor(options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args);
  }

  connectedCallback() {
    if (this.shouldRenderCSS()) this.renderCSS();
    if (this.shouldRenderHTML()) this.renderHTML();

    this.aButtonBackward?.addEventListener('click', () => this.scrollToNextColumn(false));
    this.aButtonForward?.addEventListener('click', () => this.scrollToNextColumn(true));
    window.addEventListener('resize', () => {
      this.css = /* css */`
      :host .button-group {
        ${this.timeTable.scrollWidth > this.timeTable.clientWidth ? 'display: flex' : ' display: none'};
      }`
    });

    setTimeout(() => {
      const timeColumnWidth = this.tableHeaders[0].getBoundingClientRect().width;
      this.tableHeaders.forEach(th => {
        th.style.scrollMarginLeft = `${timeColumnWidth}px`;
      });
    }, 600);
  }

  disconnectedCallback() {
    // TODO check if this is right
    this.aButtonBackward?.removeEventListener('click', () => this.scrollToNextColumn(false));
    this.aButtonForward?.removeEventListener('click', () => this.scrollToNextColumn(true));
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderCSS() {
    return !this.root.querySelector(`${this.cssSelector} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderHTML() {
    return !this.div
  }

  /**
   * renders the css
   */
  renderCSS() {
    let accentColorsCSS = "";
    if (this.getAttribute('accent-colors')) {
      const accentColors = this.getAttribute('accent-colors')?.split(" ");
      accentColors?.forEach((color, i) => {
        accentColorsCSS += /* css */`
          :host .accent-${i + 1} {
            background: ${color} !important;
          }`
      });
    }

    // :host {
    //   --timetable-accent-${i + 1}: ${color};
    // }
    // :host .accent-${i + 1} {
    //     background: var(--timetable-accent-${i + 1});
    //   }`

    // const test = accentColors?.map((color, i) => {
    //   return /* css */`
    //   :host .accent-${i + 1} {
    //     background: ${color};
    //   }`
    // });


    // const test3 = accentColors?.reduce((css, color, i) => {
    //   console.log(css, color, i);

    //   return css + `
    //   :host .accent-${i + 1} {
    //     background: ${color};
    //   }`
    // });

    console.log(this.timeTable.scrollWidth, this.timeTable.clientWidth);

    this.css = /* css */`

      :host .button-group {
        ${this.timeTable.scrollWidth > this.timeTable.clientWidth ? 'display: flex' : ' display: none'};
      }

      ${accentColorsCSS}

      @media only screen and (max-width: _max-width_) {
        :host {}
      }
    `

    return this.fetchTemplate()
  }

  /**
   * fetches the template
   */
  fetchTemplate() {
    /** @type {import("../../web-components-toolbox/src/es/components/prototypes/Shadow.js").fetchCSSParams[]} */
    // const styles = [
    //   {
    //     path: `${this.importMetaUrl}../../web-components-toolbox/src/css/reset.css`, // no variables for this reason no namespace
    //     namespace: false
    //   },
    //   // {
    //   //   path: `${this.importMetaUrl}../../web-components-toolbox/src/css/style.css`, // apply namespace and fallback to allow overwriting on deeper level
    //   //   namespaceFallback: true
    //   // }
    // ]
    switch (this.getAttribute('namespace')) {
      case 'timetable-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }])
      default:
        return Promise.resolve()
      // return this.fetchCSS(styles) 
    }
  }

  /**
   * Render HTML
   * @returns void
   */
  renderHTML() {
    // this.html = 'Content rendered from Component: Example'
  }

  scrollToNextColumn(isScrollingForward = true) {
    // this.getElementById(monthHeaderId).scrollIntoView({ behavior: "smooth", inline: "start" });

    // const timeColumnWidth = this.tableHeaders[0].getBoundingClientRect().width;
    // console.log('scrollToNextColumn: ' + timeColumnWidth);

    let columnPositions = [];
    for (let i = 0; i < this.tableHeaders.length; i++) {
      if (i === 0)
        columnPositions.push(0)
      else
        columnPositions.push(columnPositions[i - 1] + this.tableHeaders[i].getBoundingClientRect().width)
    }

    // let nextColumnIndex = 0;
    for (let i = 0; i < columnPositions.length - 1; i++) {
      if (this.timeTable.scrollLeft >= Math.round(columnPositions[i]) && this.timeTable.scrollLeft < Math.round(columnPositions[i + 1])) {
        // let currentColumnIndex = i + 1;
        const isCurrentColumnCutOff = Math.abs(this.timeTable.scrollLeft - columnPositions[i]) >= 1;
        // const isCurrentColumnCutOff = this.timeTable.scrollLeft !== Math.round(distances[i]);

        // nextColumnIndex = forward ? currentColumnIndex + 1 : isCurrentColumnCutOff ? currentColumnIndex : currentColumnIndex - 1;
        // console.log("scrollLeft: ", this.timeTable.scrollLeft, `\ndistances ${i} and ${i + 1}: `, distances[i], distances[i + 1]);
        // console.log("now: ", this.tableHeaders[nextColumnIndex].innerHTML, ", last: ", this.tableHeaders[currentColumnIndex].innerHTML);

        const scrollDistanceLeft = isScrollingForward ? columnPositions[i + 1] : isCurrentColumnCutOff ? columnPositions[i] : columnPositions[i - 1];

        this.timeTable.scroll({ left: scrollDistanceLeft, behavior: "smooth" })
        break;
      }
    }

    // this.tableHeaders[nextColumnIndex]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest", container: "nearest" })
    // this.timeTable.scrollIntoView(this.tableHeaders[nextColumnIndex], { behavior: "smooth", inline: "start", block: "nearest", container: "nearest" })


    // if (scrollLeftTotal == this.timeTable.scrollLeft) {
    //   console.log(this.tableHeaders[i + 1].innerHTML);
    //   break;
    // }

    // if (scrollLeftTotal + this.tableHeaders[i].getBoundingClientRect().width == this.timeTable.scrollLeft) {
    //   console.log("test " + this.tableHeaders[i].innerHTML);
    //   scrollLeftTotal += this.tableHeaders[i].getBoundingClientRect().width;
    //   break;
    // }
    // else
    //   scrollLeftTotal += this.tableHeaders[i].getBoundingClientRect().width;
    // console.log(distances);

    // this.tableHeaders[3]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest", container: "nearest" })
  }

  get timeTable() {
    return this.root.querySelector('.timetable');
  }

  get aButtonBackward() {
    return this.root.querySelector('.button-backward')
  }

  get aButtonForward() {
    return this.root.querySelector('.button-forward')
  }

  get tableHeaders() {
    return this.root.querySelectorAll('th');
  }
}