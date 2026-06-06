function sendMailto(e) {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:cmabutol@asiagate.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
}

function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

// Lightbox slideshow
let _lbImages = [];
let _lbIndex = 0;

function openLightbox(title, images) {
    _lbImages = images;
    _lbIndex = 0;

    document.getElementById('lightboxTitle').textContent = title;

    const thumbs = document.getElementById('lightboxThumbs');
    thumbs.innerHTML = '';
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        img.onclick = () => _lbSet(i);
        thumbs.appendChild(img);
    });

    _lbSet(0);
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function _lbSet(index) {
    _lbIndex = index;

    const main = document.getElementById('lightboxMainImg');
    main.src = _lbImages[index];
    main.alt = document.getElementById('lightboxTitle').textContent;

    document.getElementById('lightboxCounter').textContent =
        _lbImages.length > 1 ? `${index + 1} / ${_lbImages.length}` : '';

    document.getElementById('lightboxPrev').disabled = index === 0;
    document.getElementById('lightboxNext').disabled = index === _lbImages.length - 1;

    document.querySelectorAll('#lightboxThumbs img').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

function lightboxNav(dir) {
    const next = _lbIndex + dir;
    if (next >= 0 && next < _lbImages.length) _lbSet(next);
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
});

// Tech Stack filter
document.querySelectorAll('.stack-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.stack-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.stack-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});
