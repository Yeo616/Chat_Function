// 챗 윗부분의 네비게이션

class ChatNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
      <div id="navi" class="bg-slate-900 container mx-auto rounded-lg">
        <nav>
          <ul class="flex py-4">
            <li class="list-none">
              <a
                class="no-underline p-3 mr-4 text-xl bg-slate-900 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
                href="./consultant.html"
                >Main Chat</a
              >
              </li>
            <li class="list-none">
              <a
                class="no-underline p-3 mr-4 text-xl bg-slate-900 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
                href="../test/test.html"
                >test</a
              >
            </li>
            <li class="list-none">
              <a 
                class="no-underline p-3 mr-4 text-xl bg-slate-900 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
                >Contact</a
              >
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
customElements.define("chat-nav", ChatNav);
