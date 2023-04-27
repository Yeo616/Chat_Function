// 옆부분 메뉴

class SideNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav>
      <nav>
        <div class="p-1 bg-blue-900 h-full">
          <ul class ="my-5">
            <li style="list-style: none">
              <button
                class="p-2 m-2 bg-purple-600 bg-opacity-75 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
              >
                <a href = "./inquiries.html">Inquiries</a>
              </button>
            </li>
            <li style="list-style: none">
              <button
                class="p-2 m-2 bg-purple-600 bg-opacity-75 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
              >
                <a href = "./consultant.html">Chating</a>
              </button>
            </li>
            <li style="list-style: none">
              <button
                class="p-2 m-2 bg-purple-600 bg-opacity-75 rounded-lg text-white hover:text-red-500 hover:bg-indigo-200"
              >
                Log
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </nav>`;
  }
}

customElements.define("side-nav", SideNav);
