document.addEventListener('DOMContentLoaded', function(){
  const nav = document.querySelector('.site-nav');
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  const header = nav.closest('.site-header');

  // create indicator
  const indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  nav.style.position = 'relative';
  nav.appendChild(indicator);

  function moveTo(el){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = rect.left - navRect.left + nav.scrollLeft;
    indicator.style.width = rect.width + 'px';
    indicator.style.transform = `translateX(${left}px)`;
    // mark active
    links.forEach(a=>a.classList.toggle('active', a===el));
  }

  // choose active link by pathname
  const path = window.location.pathname.split('/').pop() || 'index.html';
  let active = links.find(a => a.getAttribute('href') === path) || links.find(a => a.classList.contains('active')) || links[0];

  // initial placement after layout
  setTimeout(()=> moveTo(active), 50);

  // desktop nav behavior (indicator)
  links.forEach(link => {
    link.addEventListener('mouseenter', ()=> moveTo(link));
    link.addEventListener('focus', ()=> moveTo(link));
    link.addEventListener('click', ()=> moveTo(link));
  });

  nav.addEventListener('mouseleave', ()=> moveTo(active));
  window.addEventListener('resize', ()=> moveTo(active));

  // mobile dropdown behavior (<600px)
  if(header){
    const container = header.querySelector('.container');
    const headerContainer = header.querySelector('.site-header .container') || container;
    
    // create hamburger toggle button
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.innerHTML = '☰';
    toggle.style.display = 'none'; // hidden by default, shown in media query
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-label', 'Toggle navigation');
    
    // inject toggle into container right before nav or after title
    if(headerContainer){
      headerContainer.appendChild(toggle);
    }

    function toggleNav(){
      if(window.innerWidth <= 600){
        nav.classList.toggle('active');
      }
    }

    // toggle on button click
    toggle.addEventListener('click', toggleNav);

    // auto-open on header hover for mobile
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

    // close nav when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', function(){
        if(window.innerWidth <= 600){
          nav.classList.remove('active');
        }
      });
    });
  }
});
