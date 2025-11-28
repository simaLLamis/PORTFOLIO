/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let hight = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + hight) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  /*==================== sticky navbar ====================*/
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 120);
  /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*==================== scroll reveal ====================*/
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 1000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/*==================== typed js ====================*/
const typed = new Typed(".multiple-text", {
  strings: [
    "Backend Developer",
    "Graphic Designer",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 100,
  loop: true,
});

/*==================== dark theme toggle ====================*/
let dali = document.querySelector("#switch");
dali.addEventListener("change", function () {
  document.body.classList.toggle("dark-theme");
  navbar.classList.remove("active");
  menuIcon.classList.remove("bx-x");
});

/*==================== form alert ====================*/
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", function () {
    alert("✅ Your message has been sent successfully!");
  });
});

/*==================== 3D University GLB Viewer ====================*/
(function(){
  const container = document.getElementById('university3d');
  if (!container) return; // Skip if the container doesn't exist

  // Three.js setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.maxDistance = 50;
  controls.minDistance = 1;

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Load GLB model
  const loader = new THREE.GLTFLoader();
  loader.load('uni_gen5.gltf', function(gltf){
      const model = gltf.scene;
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      controls.target.copy(center);

      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.set(center.x, center.y + size/2, center.z + size * 1.5);
      camera.lookAt(center);
  });

  // Animation loop
  function animate(){
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
  }
  animate();

  // Responsive resize
  window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
