import './style.css'

/* ── Navbar ── */
const nav = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

/* ── Mobile menu ── */
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
  menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open'))
})

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href')
    if (href === '#') return
    e.preventDefault()
    mobileMenu.classList.remove('open')
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70)
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
revealEls.forEach(el => revealObserver.observe(el))

/* ── Stagger children ── */
document.querySelectorAll('.stagger > *').forEach((child, i) => {
  child.style.transitionDelay = `${i * 90}ms`
  child.classList.add('reveal')
  revealObserver.observe(child)
})

/* ── Active nav highlight ── */
const sections = document.querySelectorAll('section[id]')
const navLinks  = document.querySelectorAll('.nav-link')
window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id
  })
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`
    link.style.color = active ? '#fbbf24' : ''
  })
}, { passive: true })

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item')
    const body = item.querySelector('.faq-body')
    const isOpen = item.classList.contains('open')

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open')
      i.querySelector('.faq-body').style.maxHeight = '0'
    })

    // Open clicked
    if (!isOpen) {
      item.classList.add('open')
      body.style.maxHeight = body.scrollHeight + 'px'
    }
  })
})

/* ── Stats counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10)
  const suffix = el.dataset.suffix || ''
  const prefix = el.dataset.prefix || ''
  const duration = 1500
  const start = performance.now()

  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const value = Math.round(target * eased)
    el.textContent = prefix + value + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter)
      statsObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })

const statsSection = document.getElementById('stats-row')
if (statsSection) statsObserver.observe(statsSection)