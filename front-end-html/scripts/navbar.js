header = document.getElementsByTagName("header")[0];
header.insertAdjacentHTML(
  "beforeend",
  `
    <nav>
    <button>
      <i class="las la-bars"></i>
    </button>
    <a href="./home.html" class="Home">
      <div class="logo"></div>
    </a>
  </nav>`
);
