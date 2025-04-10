// Set page title
document.title = "FLAVWELL";
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = "asset/image/ayur-logoTitle.png";
document.head.appendChild(favicon);


const loadCSS = (href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    document.head.appendChild(link);
  };

  // Add favicon

  
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      script.onload = () => resolve();
      script.onerror = () => reject(`Failed to load script: ${src}`);
      document.head.appendChild(script);
    });
  };
  
  const hideLoaderAndShowPage = () => {
    const loader = document.getElementById("global-loader");
    const content = document.getElementById("main-content");
  
    if (loader) loader.remove();
    if (content) {
      content.style.display = "block";
      content.style.opacity = 0;
      content.style.transition = "opacity 0.5s";
      setTimeout(() => (content.style.opacity = 1), 10);
    }
  };
  
  const navigateTo = async (page) => {
    const content = document.getElementById("main-content");
    if (!content) return;
  
    // Save the current page to sessionStorage
    sessionStorage.setItem("lastPage", page);
  
    content.style.opacity = 0;
  
    try {
      const response = await fetch(page);
      const html = await response.text();
      content.innerHTML = html;
  
      // Reinitialize AOS if you’re using animations
      if (AOS) AOS.refresh();
    } catch (err) {
      content.innerHTML = `<div class="p-5 text-center text-danger">Failed to load ${page}</div>`;
      console.error(err);
    } finally {
      setTimeout(() => {
        content.style.opacity = 1;
      }, 100);
    }
  };
  
  window.onload = async function () {
    const lastPage = sessionStorage.getItem("lastPage");
  
    if (lastPage) {
      await navigateTo(lastPage); // load last visited page
    } else {
      await navigateTo("home.html"); // default only on first visit
    }
  };
  
  (async () => {
    try {
      // Load core CSS libraries
      loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
      loadCSS("https://unpkg.com/aos@2.3.1/dist/aos.css");
      loadCSS("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
      loadCSS("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
  
      // Load JS libraries
      await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
      await loadScript("https://unpkg.com/aos@2.3.1/dist/aos.js");
  
      // Load header and footer using jQuery
      $('#header').load("component/navbar.html", function () {
        // console.log("header is loaded");
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "asset/css/navbar.css"
        }).appendTo("head");
    
        // Delegate event after header is loaded
        $(document).on("click", ".nav-page", async function (e) {
            e.preventDefault();
            const page = $(this).data("page");
            if (page) {
                await navigateTo(page);
                $(".navbar-toggler").removeClass("collapsed").attr("aria-expanded", "false");
                $(".navbar-collapse").removeClass("show");
            }
        });
    });
    
  
      $('#footer').load("component/footer.html", function () {
        // console.log("footer is loaded");
        $("<link/>", {
          rel: "stylesheet",
          type: "text/css",
          href: "asset/css/footer.css"
        }).appendTo("head");
      });
  
      // Load default page
      // await navigateTo("home.html");

      
      
  
      // Initialize AOS
      AOS.init();
  
    } catch (err) {
      console.error("Error loading resources:", err);
      document.getElementById("main-content").innerHTML = `<div class="text-danger text-center p-5">Error loading resources</div>`;
    } finally {
      hideLoaderAndShowPage();
    }
  })();



  function learnMore() {
    // console.log("Learn More");
    window.location.href = "idukki.html";
}
  