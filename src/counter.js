/**
 * Counter Animation
 * Menjalankan animasi angka dari 0 ke target menggunakan Intersection Observer
 */
export function initCounter() {
    const counters = document.querySelectorAll('.counter')

    if (!counters.length) return

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10)
        const duration = 2000
        const startTime = performance.now()

        const update = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing: ease-out-cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * target)

            el.textContent = current

            if (progress < 1) {
                requestAnimationFrame(update)
            } else {
                el.textContent = target
            }
        }

        requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.5 }
    )

    counters.forEach((counter) => observer.observe(counter))
}