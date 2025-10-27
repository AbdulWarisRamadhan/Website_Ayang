let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.gallery-photo');
const totalPhotos = photos.length;
let messageInterval;
let musicStarted = false;

// Daftar kata-kata romantis
const romanticMessages = [
    "💖 I Love You 💖",
    "Ayang Yang Paling Cantik 🌸",
    "Ochi Ketot 💫",
    "Maafin DIdy yah 💕",
    "Kamu Semangatku ✨",
    "Forever Yours 🌹",
    "My Everything 🌟",
    "Jangan Marah Mulu💝",
    "Tetap Jadi Istrinya Didy tu 🦋",
    "My Happiness 🌈",
    "Terima Kasih 💐",
    "INGAT MAKAN 💎",
    "Always Smile 😊",
    "My Dream 🌠",
    "Perfect Love 💞",
    "You Complete Me 🌟",
    "My Heart is Yours 💘",
    "Beautiful Inside Out 🌺",
    "Precious Moments 🌸",
    "Endless Love 💕"
];

const heartMessages = [
    "💖", "💕", "💗", "💓", "💘", "💝", "💞", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍",
    "💟", "❣️", "❤️‍🔥", "❤️‍🩹", "💌"
];

// Fungsi untuk membuat pesan mengambang
function createFloatingMessage() {
    const messagesContainer = document.getElementById('floatingMessages');
    const message = document.createElement('div');
    
    // Pilih random antara pesan teks atau hati
    const isHeart = Math.random() > 0.6;
    const messagesArray = isHeart ? heartMessages : romanticMessages;
    const text = messagesArray[Math.floor(Math.random() * messagesArray.length)];
    
    message.className = `floating-message ${isHeart ? 'heart' : Math.random() > 0.5 ? 'romantic' : 'special'}`;
    message.textContent = text;
    
    // Posisi random
    const left = Math.random() * 80 + 10; // 10% - 90%
    message.style.left = left + '%';
    
    // Delay random
    message.style.animationDelay = (Math.random() * 2) + 's';
    
    // Ukuran random untuk variasi
    if (isHeart) {
        const size = Math.random() * 0.5 + 0.8;
        message.style.fontSize = (size * 2.5) + 'rem';
    } else {
        const size = Math.random() * 0.4 + 0.8;
        message.style.fontSize = (size * 1.8) + 'rem';
    }
    
    messagesContainer.appendChild(message);
    
    // Hapus elemen setelah animasi selesai
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 10000);
}

// Fungsi untuk memulai pesan mengambang
function startFloatingMessages() {
    // Hapus semua pesan sebelumnya
    const messagesContainer = document.getElementById('floatingMessages');
    messagesContainer.innerHTML = '';
    
    // Buat pesan pertama segera
    createFloatingMessage();
    
    // Buat pesan berkelanjutan
    messageInterval = setInterval(createFloatingMessage, 1500); // Setiap 1.5 detik
}

// Fungsi untuk menghentikan pesan mengambang
function stopFloatingMessages() {
    clearInterval(messageInterval);
}

// Fungsi untuk menampilkan foto
function showPhoto(index) {
    photos.forEach(photo => photo.classList.remove('active'));
    photos[index].classList.add('active');
    document.getElementById('photoCounter').textContent = `${index + 1}/${totalPhotos}`;
}

// Fungsi foto berikutnya
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
    showPhoto(currentPhotoIndex);
}

// Fungsi foto sebelumnya
function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
    showPhoto(currentPhotoIndex);
}

// Fungsi memulai galeri
function startGallery() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const gallery = document.getElementById('photoGallery');
    
    welcomeMessage.style.display = 'none';
    gallery.style.display = 'flex';
    showPhoto(0);
}

// Fungsi memulai animasi bunga dan musik
function startMagic() {
    if (musicStarted) return;
    musicStarted = true;
    
    const music = document.getElementById('backgroundMusic');
    const gallery = document.getElementById('photoGallery');
    const flowers = document.getElementById('flowersContainer');
    const night = document.querySelector('.night');
    
    // Sembunyikan galeri
    gallery.style.display = 'none';
    
    // Tampilkan bunga dan background
    flowers.style.display = 'block';
    night.style.display = 'block';
    
    // Mulai musik
    const playMusic = () => {
        music.play().then(() => {
            console.log('Musik mulai diputar 🎵');
            // Mulai pesan mengambang setelah musik mulai
            setTimeout(startFloatingMessages, 500);
        }).catch(e => {
            console.log('Autoplay prevented:', e);
        });
    };
    
    // Coba putar musik
    playMusic();
    
    // Fallback untuk autoplay restrictions
    const showMusicButton = () => {
        const playButton = document.createElement('button');
        playButton.innerHTML = '🎵 Klik untuk Memutar Musik & Kata-Kata Romantis';
        playButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #39c6d6, #ce3edc);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 25px;
            cursor: pointer;
            z-index: 1002;
            font-size: 1rem;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(57, 198, 214, 0.7);
            animation: pulse 2s infinite;
        `;
        playButton.onclick = () => {
            playMusic();
            playButton.remove();
        };
        document.body.appendChild(playButton);
    };
    
    // Jika musik tidak bisa autoplay, tampilkan tombol
    music.addEventListener('canplay', () => {
        const promise = music.play();
        if (promise !== undefined) {
            promise.catch(showMusicButton);
        }
    });
    
    // Mulai animasi bunga
    document.body.classList.remove("container");
    
    // Tambahkan event untuk menghentikan pesan jika musik berhenti
    music.addEventListener('pause', stopFloatingMessages);
    music.addEventListener('ended', stopFloatingMessages);
}

// Auto-play galeri foto (opsional)
let galleryInterval;
function startAutoPlay() {
    galleryInterval = setInterval(nextPhoto, 3000);
}

function stopAutoPlay() {
    clearInterval(galleryInterval);
}

// Event listeners untuk kontrol manual
document.querySelector('.next-btn')?.addEventListener('click', stopAutoPlay);
document.querySelector('.prev-btn')?.addEventListener('click', stopAutoPlay);

// Cleanup ketika meninggalkan halaman
window.addEventListener('beforeunload', function() {
    stopFloatingMessages();
    const music = document.getElementById('backgroundMusic');
    if (music) {
        music.pause();
        music.currentTime = 0;
    }
});

// Keyboard controls untuk galeri
document.addEventListener('keydown', function(e) {
    const gallery = document.getElementById('photoGallery');
    if (gallery.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            nextPhoto();
            stopAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevPhoto();
            stopAutoPlay();
        } else if (e.key === 'Escape') {
            startMagic();
        }
    }
});

// Tampilkan foto pertama saat galeri dimulai
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Hadiah Spesial siap! 💝');
    console.log('Kata-kata romantis akan muncul saat musik diputar! 🎵💖');
});

// Fungsi untuk menambahkan efek konfeti (bonus)
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
    `;
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = '💖';
            confetti.style.cssText = `
                position: absolute;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 20 + 15}px;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            confettiContainer.appendChild(confetti);
            
            // Hapus confetti setelah animasi
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
    
    // Hapus container setelah selesai
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 6000);
}

// Panggil konfeti saat mulai keajaiban (opsional)
// Tambahkan ini di fungsi startMagic() jika ingin konfeti:
// setTimeout(createConfetti, 1000);