// Create a class for the element
class WordCount extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();

    // count words in element's parent element

    // parent node of new element customElements.define('word-count', WordCount, { extends: 'p' });
    const wcParent = this.parentNode;

    console.log('this.parentNode', this.parentNode)
    // parent node of of
    //this.parentNode
    //  <article contenteditable>
    //    ​<h2>​Sample heading​</h2>
    //    ​<p>​…​</p>
    //    ​<hr>​
    //    <p class=​"wordCount" is=​"word-count">​…​</p>
    //  ​</article>​


    function countWords(node){
      const text = node.innerText || node.textContent;
      return text.trim().split(/\s+/g).filter(a => a.trim().length > 0).length;
    }

    const count = `Words: ${countWords(wcParent)}`;

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    console.log('shadow', shadow)
    //  <p class="wordCount" is="word-count"></p>
    //    #shadow-root: (open)
    //      <span>Words: 212</span>

    // Create text node and add word count to it
    const text = document.createElement('span');
    text.textContent = count;

    // Append it to the shadow root
    shadow.appendChild(text);

    // Update count when element content changes
    // waits 200ms before updating (very fast but not instantaneous)
    setInterval(function() {
      const count = `Words: ${countWords(wcParent)}`;
      text.textContent = count;
    }, 200);
  }
}

// Define the new element
customElements.define('word-count', WordCount, { extends: 'p' });