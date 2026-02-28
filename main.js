
/* ---- 1. SET CURRENT YEAR IN FOOTER ---- */
// Finds the element with id="year" and fills it with the current year
// So you never have to manually update "© 2024" to "© 2025" etc.
document.getElementById('year').textContent = new Date().getFullYear();


/* ---- 2. NAVBAR — SCROLLED STATE ---- */
// When user scrolls down, we add a border to the navbar so it looks
// separated from the content behind it.

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    // scrollY tells us how many pixels we've scrolled from the top
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ---- 3. HAMBURGER MENU (Mobile Nav) ---- */
// On small screens, clicking the ☰ button shows/hides the nav links.

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  // 'toggle' adds the class if it's not there, removes it if it is
  navLinks.classList.toggle('open');
});

// Close the mobile menu when any nav link is clicked
// (otherwise the menu stays open after you tap a link)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ---- 4. SCROLL REVEAL ANIMATION ---- */
// Sections fade up into view as you scroll to them.
// We use the IntersectionObserver API — it watches when elements
// enter the visible area of the screen.

// First, add the 'reveal' class to every section
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('reveal');
});

// Create an observer that adds 'visible' when 20% of the element is on screen
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is visible — add class to trigger CSS animation
        entry.target.classList.add('visible');
        // Stop watching once it's animated (no need to re-animate)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 } // 10% of element must be visible to trigger
);

// Start watching all reveal elements
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---- 5. JOIN FORM — SUBMISSION ---- */
// We intercept the form submit, show a success message,
// and reset the form. In a real project, you'd send the data
// to a backend or a service like Formspree.

 

const joinForm   = document.getElementById('join-form');
const successMsg = document.getElementById('form-success');
const submitBtn  = joinForm.querySelector('button[type="submit"]');

joinForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // still prevent reload

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(joinForm.action, {
      method: "POST",
      body: new FormData(joinForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      submitBtn.style.display = 'none';
      successMsg.style.display = 'block';
      joinForm.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (error) {
    alert("Error submitting form.");
  }
});


/* ---- 6. ACTIVE NAV LINK HIGHLIGHTING ---- */
// Highlights the nav link for the section you're currently reading.

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove 'active' from all nav links
        navAnchors.forEach(a => a.classList.remove('active'));
        // Add 'active' to the link matching the current section
        const id = entry.target.getAttribute('id');
        const matchingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (matchingLink) matchingLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 } // section must be 40% visible to highlight its link
);

sections.forEach(section => sectionObserver.observe(section));