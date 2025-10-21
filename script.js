 const tombolSapa = document.getElementById('sapaButton')
tombolSapa.addEventListener('click', function() {
  alert('Halo! Terima kasih sudah berkunjung!');
});

const modeToggle = document.getElementById('mode-toggle'); // 1. Ambil tombolnya
const body = document.body; // 2. Ambil elemen body

// 3. Jalankan fungsi saat tombol di-klik
modeToggle.addEventListener('click', function() {
    // 4. Tambahkan/hapus class 'dark-mode' pada body
    body.classList.toggle('dark-mode');
});
