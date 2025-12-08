//JavaScript for navigation bar movement and mobile dropdown menu
//Defining a function to handle navigation bar indicator movement
//Note: I did use AI to help me learn some new operations and techniques for making an awesome nav. I had it show me what it was doing, and explain what each part accomplished.
document.addEventListener('DOMContentLoaded', function(){
  const nav = document.querySelector('.site-nav');
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  const header = nav.closest('.site-header');

  //Creating an indicator element for the navigation bar
  const indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  nav.style.position = 'relative';
  nav.appendChild(indicator);
// Function to move indicator to element
  function moveTo(el){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = rect.left - navRect.left + nav.scrollLeft;
    indicator.style.width = rect.width + 'px';
    indicator.style.transform = `translateX(${left}px)`;
    //This part highlights the active link by toggling the 'active' class
    links.forEach(a=>a.classList.toggle('active', a===el));
  }

  // Choose active link by pathname
  const path = window.location.pathname.split('/').pop() || 'index.html';
  let active = links.find(a => a.getAttribute('href') === path) || links.find(a => a.classList.contains('active')) || links[0];

  // Sets the initial position for the indicator after layout
  setTimeout(()=> moveTo(active), 50);

  // Desktop nav behavior (indicator) for each link for each event
  links.forEach(link => {
    link.addEventListener('mouseenter', ()=> moveTo(link));
    link.addEventListener('focus', ()=> moveTo(link));
    link.addEventListener('click', ()=> moveTo(link));
  });

  nav.addEventListener('mouseleave', ()=> moveTo(active));
  window.addEventListener('resize', ()=> moveTo(active));

  // Mobile dropdown behavior (<600px), this corresponds to the media query in the CSS
  if(header){
    const container = header.querySelector('.container');
    const headerContainer = header.querySelector('.site-header .container') || container;
    
    // This helps create a hamburger icon for the mobile dropdown menu when it's closed
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.innerHTML = '☰';
    toggle.style.display = 'none'; // This part is hidden by default, shown in media query
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-label', 'Toggle navigation');
    
    // This injects toggle into container right before nav or after title
    if(headerContainer){
      headerContainer.appendChild(toggle);
    }

    function toggleNav(){
      if(window.innerWidth <= 600){
        nav.classList.toggle('active');
      }
    }

    // Toggle on button click
    toggle.addEventListener('click', toggleNav);

    // Auto-open on header hover for mobile
    header.addEventListener('mouseenter', function(){
      if(window.innerWidth <= 600){
        nav.classList.add('active');
      }
    });
    header.addEventListener('mouseleave', function(){
      if(window.innerWidth <= 600){
        nav.classList.remove('active');
      }
    });

    // Close nav when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', function(){
        if(window.innerWidth <= 600){
          nav.classList.remove('active');
        }
      });
    });
  }
});
