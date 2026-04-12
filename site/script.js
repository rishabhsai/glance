// ---- Agent prompt copy ----
document.getElementById('copy-agent')?.addEventListener('click', () => {
  const text = document.getElementById('agent-prompt-text').textContent
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-agent')
    const label = btn.querySelector('.copy-label')
    btn.classList.add('copied')
    label.textContent = 'Copied!'
    setTimeout(() => {
      btn.classList.remove('copied')
      label.textContent = 'Copy'
    }, 2000)
  })
})

// ---- Code tabs ----
document.querySelectorAll('.ct').forEach(tab => {
  tab.addEventListener('click', () => {
    const lang = tab.dataset.lang
    const win = tab.closest('.code-window')

    win.querySelectorAll('.ct').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')

    win.querySelectorAll('.code-body').forEach(b => {
      b.classList.toggle('hidden', b.dataset.lang !== lang)
    })
  })
})

// ---- Counting animation ----
function animateCounters() {
  const counters = document.querySelectorAll('.count')

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      obs.unobserve(e.target)

      const el = e.target
      const to = parseInt(el.dataset.to)
      const suffix = el.dataset.suffix || ''
      const duration = 1000
      const start = performance.now()

      function tick(now) {
        const t = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - t, 4) // ease-out quart
        const val = Math.round(ease * to)
        el.textContent = val + suffix

        if (t < 1) {
          requestAnimationFrame(tick)
        } else {
          el.classList.add('done')
        }
      }
      requestAnimationFrame(tick)
    })
  }, { threshold: 0.3 })

  counters.forEach(c => obs.observe(c))
}

// ---- Scroll reveal ----
function setupReveal() {
  const els = document.querySelectorAll(
    '.why-card, .ig-card, .install-card, .api-item, .works-card, .contrib-card, ' +
    '.speed-table, .latency-note, .output-window, .code-window, .honest-card, .agent-card'
  )
  els.forEach(el => el.classList.add('reveal'))

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const parent = e.target.parentElement
      const siblings = [...parent.children].filter(c => c.classList.contains('reveal'))
      const i = siblings.indexOf(e.target)
      setTimeout(() => e.target.classList.add('visible'), i * 100)
      obs.unobserve(e.target)
    })
  }, { threshold: 0.08 })

  els.forEach(el => obs.observe(el))
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  animateCounters()
  setupReveal()
})
