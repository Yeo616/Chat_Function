class SideNav extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="flex-2 p-1 bg-blue-900">
        <p>this is navigation bar</p>`;
  }
}

customElements.define("side-nav", MyComponent);
