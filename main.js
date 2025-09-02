// Year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
// Progress bar
const progress = document.getElementById('progress'); let ticking=false;
function updateProgress(){ const h=document.documentElement; const denom=Math.max(1,h.scrollHeight-h.clientHeight); const ratio=Math.min(1,Math.max(0,h.scrollTop/denom)); progress.style.transform=`scaleX(${ratio})`; ticking=false; }
window.addEventListener('scroll', ()=>{ if(!ticking){ requestAnimationFrame(updateProgress); ticking=true; } }, {passive:true}); updateProgress();
// Active nav
const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const linkFor = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ navLinks.forEach(a=>a.removeAttribute('aria-current')); const l=linkFor(e.target.id); if(l) l.setAttribute('aria-current','page'); } }); }, {rootMargin:'0px 0px -60% 0px', threshold:0.2});
sections.forEach(s=>io.observe(s)); document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') io.takeRecords(); });
// Reveal
const revealables = document.querySelectorAll('.revealable, .card');
const io2 = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); io2.unobserve(e.target);} }); }, {threshold:.15});
revealables.forEach(el=>io2.observe(el));
// Mobile menu
const menuBtn=document.getElementById('menuBtn'); const siteNav=document.getElementById('siteNav');
if(menuBtn && siteNav){ menuBtn.addEventListener('click', ()=>{ const open=siteNav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open?'true':'false'); }); }
// Theme toggle
const themeBtn=document.getElementById('themeBtn');
if(themeBtn){ themeBtn.addEventListener('click', ()=>{ const cur=document.documentElement.getAttribute('data-theme')||'dark'; const next=cur==='dark'?'light':'dark'; document.documentElement.setAttribute('data-theme', next); localStorage.setItem('theme', next); }); }
// Contact form (Formspree optional)
const form=document.getElementById('contactForm'); const formMsg=document.getElementById('formMsg');
if(form){ form.addEventListener('submit', async (e)=>{ if(!form.action.includes('formspree.io')) return; e.preventDefault(); formMsg.textContent='Sending…'; try{ const res=await fetch(form.action,{method:'POST', body:new FormData(form), headers:{'Accept':'application/json'}}); if(res.ok){ form.reset(); formMsg.textContent='Thanks! I will get back to you soon.';} else { formMsg.textContent='Something went wrong. Please email me directly.';} }catch(err){ formMsg.textContent='Network error. Please email me directly.';} }); }
