import './style.css'
import { initCounter } from './counter.js'

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar')

const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/90', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-warm-100')
    } else {
        navbar.classList.remove('bg-white/90', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-warm-100')
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true })
handleNavbarScroll()

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById('menuBtn')
const mobileMenu = document.getElementById('mobileMenu')
const menuIcon = document.getElementById('menuIcon')
const closeIcon = document.getElementById('closeIcon')
const mobileLinks = document.querySelectorAll('.mobile-link')

let menuOpen = false

const toggleMenu = () => {
    menuOpen = !menuOpen
    if (menuOpen) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px'
        menuIcon.classList.add('hidden')
        closeIcon.classList.remove('hidden')
    } else {
        mobileMenu.style.maxHeight = '0'
        menuIcon.classList.remove('hidden')
        closeIcon.classList.add('hidden')
    }
}

menuBtn.addEventListener('click', toggleMenu)
mobileLinks.forEach((link) => {
    link.addEventListener('click', () => { if (menuOpen) toggleMenu() })
})
document.addEventListener('click', (e) => {
    if (menuOpen && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) toggleMenu()
})

// ===== Portfolio Tabs =====
const portfolioTabs = document.querySelectorAll('[data-portfolio-tab]')
const portfolioItems = document.querySelectorAll('[data-portfolio-category]')

portfolioTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.portfolioTab

        portfolioTabs.forEach((t) => {
            t.classList.remove('bg-primary-600', 'text-white', 'border-primary-600')
            t.classList.add('text-warm-500', 'border-warm-200', 'hover:border-primary-300')
        })
        tab.classList.add('bg-primary-600', 'text-white', 'border-primary-600')
        tab.classList.remove('text-warm-500', 'border-warm-200', 'hover:border-primary-300')

        portfolioItems.forEach((item) => {
            if (category === 'semua' || item.dataset.portfolioCategory === category) {
                item.style.display = ''
                item.style.opacity = '0'
                item.style.transform = 'translateY(20px)'
                requestAnimationFrame(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
                    item.style.opacity = '1'
                    item.style.transform = 'translateY(0)'
                })
            } else {
                item.style.display = 'none'
            }
        })
    })
})

// ===== Pricing Data & Rendering =====
const WA_NUMBER = '6281271956020'

const pricingData = [
    {
        id: 'landing-page',
        label: 'Web Landing Page',
        period: 'Satu kali bayar',
        packages: [
            {
                name: 'Starter',
                price: '1.500.000',
                popular: false,
                benefits: [
                    'Desain custom 1 halaman',
                    'Responsive HP & laptop',
                    'Tombol WhatsApp langsung',
                    'Galeri foto (maks. 6 foto)',
                    'Hosting & domain gratis 1 tahun'
                ],
                booster: 'Cocok untuk bisnis yang baru ingin hadir di internet'
            },
            {
                name: 'Growth',
                price: '2.500.000',
                popular: true,
                benefits: [
                    'Semua fitur Starter',
                    'Animasi & tampilan lebih premium',
                    'Integrasi Google Maps',
                    'Section testimoni pelanggan',
                    'SEO dasar (meta title, description)'
                ],
                booster: 'Ideal untuk bisnis yang ingin tampil lebih profesional'
            },
            {
                name: 'Scale',
                price: '3.500.000',
                popular: false,
                benefits: [
                    'Semua fitur Growth',
                    'Hingga 3 halaman (Home, Layanan, Kontak)',
                    'Form pemesanan custom via WhatsApp',
                    'Blog/artikel sederhana (1 halaman)',
                    'Revisi hingga 3 kali'
                ],
                booster: 'Pilihan tepat untuk bisnis yang butuh website lebih lengkap'
            }
        ]
    },
    {
        id: 'company-profile',
        label: 'Web Company Profile',
        period: 'Satu kali bayar',
        packages: [
            {
                name: 'Starter',
                price: '2.000.000',
                popular: false,
                benefits: [
                    'Desain custom hingga 4 halaman',
                    'Halaman: Beranda, Tentang, Layanan, Kontak',
                    'Responsive HP & laptop',
                    'Tombol WhatsApp & form kontak',
                    'Hosting & domain gratis 1 tahun',
                    'Revisi hingga 2 kali'
                ],
                booster: 'Cocok untuk bisnis lokal yang ingin tampil profesional'
            },
            {
                name: 'Growth',
                price: '3.200.000',
                popular: true,
                benefits: [
                    'Semua fitur Starter',
                    'Hingga 6 halaman',
                    'Halaman portofolio / galeri foto',
                    'Integrasi Google Maps',
                    'SEO dasar',
                    'Revisi hingga 3 kali'
                ],
                booster: 'Ideal untuk bisnis yang ingin membangun kepercayaan klien'
            },
            {
                name: 'Scale',
                price: '5.000.000',
                popular: false,
                benefits: [
                    'Semua fitur Growth',
                    'Hingga 10 halaman',
                    'Klien bisa update konten sendiri',
                    'Halaman blog / artikel',
                    'Revisi hingga 5 kali'
                ],
                booster: 'Pilihan tepat untuk bisnis yang ingin kelola website mandiri'
            }
        ]
    },
    {
        id: 'katalog-produk',
        label: 'Web Katalog Produk',
        period: 'Satu kali bayar',
        packages: [
            {
                name: 'Starter',
                price: '2.000.000',
                popular: false,
                benefits: [
                    'Desain custom 1 halaman katalog',
                    'Tampilan responsive HP & laptop',
                    'Hingga 20 produk',
                    'Foto, nama & harga per produk',
                    'Tombol "Pesan via WhatsApp" di setiap produk',
                    'Hosting & domain gratis 1 tahun',
                    'Revisi hingga 2 kali',
                ],
                booster: 'Cocok untuk UMKM yang ingin punya katalog produk online tanpa ribet'
            },
            {
                name: 'Growth',
                price: '3.500.000',
                popular: true,
                benefits: [
                    'Semua fitur Starter',
                    'Hingga 50 produk',
                    'Filter kategori produk',
                    'Halaman detail produk (foto, deskripsi lengkap)',
                    'Kolom pencarian produk',
                    'Integrasi Google Maps (lokasi toko)',
                    'Revisi hingga 3 kali',
                ],
                booster: 'Ideal untuk toko dengan banyak variasi produk yang ingin tampil lebih profesional'
            },
            {
                name: 'Scale',
                price: '4.500.000',
                popular: false,
                benefits: [
                    'Semua fitur Growth',
                    'Produk tidak terbatas',
                    'Klien bisa tambah/edit produk sendiri',
                    'Halaman promo / diskon',
                    'SEO dasar agar produk mudah ditemukan Google',
                    'Revisi hingga 5 kali',

                ],
                booster: 'Pilihan tepat untuk toko yang ingin kelola katalog produk secara mandiri'
            }
        ]
    },
    // {
    //     id: 'seo',
    //     label: 'Optimasi SEO',
    //     period: 'Per bulan',
    //     packages: [
    //         {
    //             name: 'Starter',
    //             price: '1.500.000',
    //             popular: false,
    //             benefits: [
    //                 'Website Anda mulai muncul di pencarian Google untuk kata kunci lokal',
    //                 'Calon wisatawan di sekitar Yogyakarta bisa menemukan bisnis Anda',
    //                 'Membangun fondasi kehadiran digital yang kuat di mesin pencari'
    //             ],
    //             booster: 'Cocok untuk bisnis yang belum pernah muncul di Google sama sekali'
    //         },
    //         {
    //             name: 'Growth',
    //             price: '3.000.000',
    //             popular: true,
    //             benefits: [
    //                 'Website muncul di halaman pertama Google untuk kata kunci utama',
    //                 'Wisatawan yang mencari "homestay di Jogja" bisa menemukan Anda',
    //                 'Traffic organik meningkat secara signifikan dalam 1–3 bulan'
    //             ],
    //             booster: 'Ideal untuk homestay yang ingin mendapat tamu baru dari Google secara konsisten'
    //         },
    //         {
    //             name: 'Scale',
    //             price: '5.500.000',
    //             popular: false,
    //             benefits: [
    //                 'Mendominasi halaman pertama Google untuk banyak kata kunci sekaligus',
    //                 'Menjadi pilihan utama wisatawan yang mencari penginapan di Yogyakarta',
    //                 'Booking masuk hampir setiap hari tanpa harus iklan berbayar'
    //             ],
    //             booster: 'Pilihan tepat untuk bisnis yang ingin menjadi market leader di Google'
    //         }
    //     ]
    // },
    // {
    //     id: 'ads',
    //     label: 'Optimasi ADS',
    //     period: 'Per bulan',
    //     packages: [
    //         {
    //             name: 'Starter',
    //             price: '2.000.000',
    //             popular: false,
    //             benefits: [
    //                 'Iklan Anda muncul di Google & Instagram untuk calon wisatawan Jogja',
    //                 'Budget iklan terkontrol dan hanya menjangkau orang yang tepat',
    //                 'Mendapat kunjungan dan inquiry dalam minggu pertama'
    //             ],
    //             booster: 'Cocok untuk bisnis yang ingin dapat tamu baru dengan cepat'
    //         },
    //         {
    //             name: 'Growth',
    //             price: '4.000.000',
    //             popular: true,
    //             benefits: [
    //                 'Iklan berjalan otomatis dengan targeting yang sudah dioptimalkan',
    //                 'Biaya per inquiry turun karena iklan hanya muncul pada orang yang berpotensi booking',
    //                 'Laporan performa dikirim rutin agar Anda tahu hasilnya'
    //             ],
    //             booster: 'Ideal untuk bisnis yang ingin dapat tamu secara konsisten dari iklan'
    //         },
    //         {
    //             name: 'Scale',
    //             price: '7.500.000',
    //             popular: false,
    //             benefits: [
    //                 'Multi-platform ads (Google, Meta, TikTok) dengan strategi terintegrasi',
    //                 'Wisatawan yang sudah pernah lihat iklan Anda akan kembali mengunjungi website',
    //                 'Skalakan jumlah booking tanpa harus meningkatkan budget secara linear'
    //             ],
    //             booster: 'Pilihan tepat untuk bisnis yang ingin memaksimalkan ROI dari iklan digital'
    //         }
    //     ]
    // },
    {
        id: 'custom',
        label: 'Website Custom',
        period: 'Mulai dari',
        packages: [
            {
                name: 'Starter',
                price: '3.500.000',
                popular: false,
                benefits: [
                    'Desain custom sesuai kebutuhan klien',
                    '1 fitur khusus (form booking, reservasi, atau sistem sederhana lainnya)',
                    'Sistem login user (jika dibutuhkan)',
                    'Responsive HP & laptop',
                    'Hosting & domain gratis 1 tahun',
                    'Revisi hingga 2 kali',
                ],
                booster: 'Cocok untuk bisnis yang butuh 1 fitur spesifik di luar website standar'
            },
            {
                name: 'Growth',
                price: '6.000.000',
                popular: true,
                benefits: [
                    'Semua fitur Starter',
                    'Hingga 3 fitur khusus',
                    'Manajemen data (CRUD)',
                    'Notifikasi WhatsApp / Email otomatis',
                    'Revisi hingga 3 kali'
                ],
                booster: 'Ideal untuk bisnis yang butuh sistem pengelolaan data yang lebih terorganisir'
            },
            {
                name: 'Scale',
                price: '10.000.000',
                popular: false,
                benefits: [
                    'Semua fitur Growth',
                    'Fitur kompleks tanpa batas (sesuai diskusi)',
                    'Multi role user (admin, staff, pelanggan)',
                    'Laporan & rekap data otomatis',
                    'Integrasi API pihak ketiga',
                    'Revisi hingga 5 kali'
                ],
                booster: 'Pilihan tepat untuk bisnis yang butuh sistem website yang benar-benar custom'
            }
        ]
    }
]

const checkSvg = `<svg class="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`

const renderPricing = (categoryId) => {
    const category = pricingData.find((c) => c.id === categoryId)
    if (!category) return

    const container = document.getElementById('pricingCards')
    container.innerHTML = ''

    category.packages.forEach((pkg) => {
        const waMsg = encodeURIComponent(`Halo RakLabs, saya tertarik paket ${pkg.name} ${category.label}`)
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

        const card = document.createElement('div')
        card.className = pkg.popular
            ? 'relative bg-white border-2 border-primary-600 rounded-2xl p-6 sm:p-8 shadow-xl shadow-primary-600/10 md:-mt-4 md:mb-[-16px] transition-all duration-300'
            : 'bg-white border border-warm-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-warm-300 transition-all duration-300'

        card.innerHTML = `
            ${pkg.popular ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Paling Populer</div>` : ''}
            <div class="text-sm font-semibold ${pkg.popular ? 'text-primary-600' : 'text-warm-500'} uppercase tracking-wider mb-2">${pkg.name}</div>
            <div class="flex items-baseline gap-1 mb-1">
                <span class="text-warm-400 text-sm">Rp</span>
                <span class="text-4xl font-bold text-warm-900">${pkg.price}</span>
            </div>
            <div class="text-xs text-warm-400 mb-5">${category.period}</div>
            <div class="space-y-3 mb-5">
                ${pkg.benefits.map((b) => `<div class="flex items-start gap-2.5 text-sm text-warm-600">${checkSvg}<span>${b}</span></div>`).join('')}
            </div>
            <p class="text-xs text-primary-600 bg-primary-50 border border-primary-100 rounded-lg px-3 py-2 mb-6 leading-relaxed">${pkg.booster}</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="block w-full text-center ${pkg.popular
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25'
                : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
            } px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300">
                Konsultasi Sekarang
            </a>
        `

        container.appendChild(card)
    })

    // Trigger reveal animation
    container.querySelectorAll(':scope > div').forEach((card, i) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
        }, i * 120)
    })
}

// Init pricing tabs
const pricingTabs = document.querySelectorAll('[data-pricing-tab]')
pricingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const categoryId = tab.dataset.pricingTab

        pricingTabs.forEach((t) => {
            t.classList.remove('bg-primary-600', 'text-white', 'border-primary-600')
            t.classList.add('text-warm-500', 'border-warm-200', 'hover:border-primary-300')
        })
        tab.classList.add('bg-primary-600', 'text-white', 'border-primary-600')
        tab.classList.remove('text-warm-500', 'border-warm-200', 'hover:border-primary-300')

        renderPricing(categoryId)
    })
})

// Render default tab
renderPricing('landing-page')

// ===== FAQ Accordion =====
const faqBtns = document.querySelectorAll('.faq-btn')

faqBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const currentItem = btn.closest('.faq-item')
        const content = currentItem.querySelector('.faq-content')
        const icon = btn.querySelector('.faq-icon')
        const isOpen = btn.getAttribute('aria-expanded') === 'true'

        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== currentItem) {
                item.querySelector('.faq-content').style.maxHeight = '0'
                item.querySelector('.faq-icon').style.transform = 'rotate(0deg)'
                item.querySelector('.faq-btn').setAttribute('aria-expanded', 'false')
                item.classList.remove('border-primary-300')
                item.classList.add('border-warm-200')
            }
        })

        if (isOpen) {
            content.style.maxHeight = '0'
            icon.style.transform = 'rotate(0deg)'
            btn.setAttribute('aria-expanded', 'false')
            currentItem.classList.remove('border-primary-300')
            currentItem.classList.add('border-warm-200')
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'
            icon.style.transform = 'rotate(180deg)'
            btn.setAttribute('aria-expanded', 'true')
            currentItem.classList.add('border-primary-300')
            currentItem.classList.remove('border-warm-200')
        }
    })
})

// ===== Scroll Reveal =====
const revealItems = document.querySelectorAll('.reveal-item')

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-item')
                let staggerIndex = 0
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) staggerIndex = i
                })
                setTimeout(() => {
                    entry.target.classList.add('revealed')
                }, staggerIndex * 100)
                revealObserver.unobserve(entry.target)
            }
        })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

revealItems.forEach((item) => revealObserver.observe(item))

// ===== Init Counter =====
initCounter()