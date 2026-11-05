document.addEventListener('DOMContentLoaded', () => {
  // Data Vila (Array of Objects)
  const dataVila = [
    {
      id: 'v1',
      nama: 'Vila Permai 1 (Mawar)',
      tipe: '3 Kamar Tidur',
      lokasi: 'Puncak Atas',
      hargaPerMalam: 1200000,
      fasilitas: 'Kolam Renang, WiFi, Dapur, Dapur BBQ',
      tersedia: true
    },
    {
      id: 'v2',
      nama: 'Vila Permai 2 (Melati)',
      tipe: '2 Kamar Tidur',
      lokasi: 'Puncak Tengah',
      hargaPerMalam: 850000,
      fasilitas: 'Taman, WiFi, Dapur, Smart TV',
      tersedia: true
    },
    {
      id: 'v3',
      nama: 'Vila Permai 3 (Anggrek)',
      tipe: '4 Kamar Tidur',
      lokasi: 'Puncak Perkebunan Teh',
      hargaPerMalam: 1800000,
      fasilitas: 'Kolam Renang Pendopo, View Gunung, WiFi, Gazebo',
      tersedia: false
    }
  ];

  // Element DOM
  const villaContainer = document.getElementById('villa-container');
  const villaSelect = document.getElementById('villa-select');
  const searchInput = document.getElementById('search-input');
  const bookingForm = document.getElementById('booking-form');
  const errorMessage = document.getElementById('error-message');
  
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');
  const guestCountInput = document.getElementById('guest-count');
  const guestNameInput = document.getElementById('guest-name');
  const btnCheck = document.getElementById('btn-check');
  
  const summaryNights = document.getElementById('summary-nights');
  const summaryRate = document.getElementById('summary-rate');
  const summaryTotal = document.getElementById('summary-total');
  
  const bookingResult = document.getElementById('booking-result');
  const resultContent = document.getElementById('result-content');

  // Format Rupiah
  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  }

  // Render Kartu Vila (DOM Dynamic createElement & appendChild)
  function renderVilaList(daftar) {
    try {
      villaContainer.innerHTML = '';
      if (daftar.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'Tidak ada vila yang sesuai dengan pencarian Anda.';
        villaContainer.appendChild(noData);
        return;
      }

      daftar.forEach(vila => {
        const article = document.createElement('article');
        article.className = 'villa-card';

        const h3 = document.createElement('h3');
        h3.className = 'villa-card__title';
        h3.textContent = vila.nama;

        const pTipe = document.createElement('p');
        pTipe.className = 'villa-card__info';
        pTipe.innerHTML = `<strong>Tipe:</strong> ${vila.tipe} | <strong>Lokasi:</strong> ${vila.lokasi}`;

        const pHarga = document.createElement('p');
        pHarga.className = 'villa-card__price';
        pHarga.textContent = `${formatRupiah(vila.hargaPerMalam)} / malam`;

        const pFasilitas = document.createElement('p');
        pFasilitas.className = 'villa-card__facilities';
        pFasilitas.textContent = `Fasilitas: ${vila.fasilitas}`;

        const badgeSpan = document.createElement('span');
        badgeSpan.className = `badge ${vila.tersedia ? 'badge--available' : 'badge--full'}`;
        badgeSpan.textContent = vila.tersedia ? 'Tersedia' : 'Penuh / Tidak Tersedia';

        article.appendChild(h3);
        article.appendChild(pTipe);
        article.appendChild(pHarga);
        article.appendChild(pFasilitas);
        article.appendChild(badgeSpan);

        villaContainer.appendChild(article);
      });
    } catch (err) {
      console.error("Gagal merender daftar vila:", err);
    }
  }

  // Populate Option Dropdown Vila
  function populateSelectOptions() {
    dataVila.forEach(vila => {
      const option = document.createElement('option');
      option.value = vila.id;
      option.textContent = `${vila.nama} - ${formatRupiah(vila.hargaPerMalam)}/malam`;
      if (!vila.tersedia) {
        option.disabled = true;
        option.textContent += ' (Penuh)';
      }
      villaSelect.appendChild(option);
    });
  }

  // Hitung Total Biaya Otomatis
  function hitungTotalHarga() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const selectedId = villaSelect.value;

    if (isNaN(checkIn) || isNaN(checkOut) || !selectedId) {
      summaryNights.textContent = '0';
      summaryRate.textContent = 'Rp 0';
      summaryTotal.textContent = 'Rp 0';
      return 0;
    }

    const selisihWaktu = checkOut.getTime() - checkIn.getTime();
    const durasiMalam = Math.ceil(selisihWaktu / (1000 * 3600 * 24));

    if (durasiMalam <= 0) {
      summaryNights.textContent = '0 (Invalid)';
      summaryRate.textContent = 'Rp 0';
      summaryTotal.textContent = 'Rp 0';
      return 0;
    }

    const villaDipilih = dataVila.find(v => v.id === selectedId);
    const hargaMalam = villaDipilih ? villaDipilih.hargaPerMalam : 0;
    const total = durasiMalam * hargaMalam;

    summaryNights.textContent = durasiMalam;
    summaryRate.textContent = formatRupiah(hargaMalam);
    summaryTotal.textContent = formatRupiah(total);

    return total;
  }

  // Validasi Form Bahasa Indonesia
  function validasiForm() {
    const nama = guestNameInput.value.trim();
    const checkInStr = checkInInput.value;
    const checkOutStr = checkOutInput.value;
    const jumlahTamu = parseInt(guestCountInput.value, 10);
    const selectedId = villaSelect.value;
    
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    if (!nama) {
      return "Nama tamu wajib diisi.";
    }
    if (!checkInStr || !checkOutStr) {
      return "Tanggal check-in dan check-out wajib diisi.";
    }

    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);

    if (checkIn < hariIni) {
      return "Tanggal check-in tidak boleh di masa lalu.";
    }
    if (checkOut <= checkIn) {
      return "Tanggal check-out harus setelah tanggal check-in.";
    }
    if (isNaN(jumlahTamu) || jumlahTamu < 1 || jumlahTamu > 10) {
      return "Jumlah tamu harus berada di antara 1 hingga 10 orang.";
    }
    if (!selectedId) {
      return "Silakan pilih unit vila yang ingin dipesan.";
    }

    return ""; // Tidak ada error
  }

  // Fitur Filter / Pencarian Vila Dynamic
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const hasilFilter = dataVila.filter(vila => 
      vila.nama.toLowerCase().includes(keyword) || 
      vila.lokasi.toLowerCase().includes(keyword) ||
      vila.fasilitas.toLowerCase().includes(keyword)
    );
    renderVilaList(hasilFilter);
  });

  // Event listener auto calculate harga
  [checkInInput, checkOutInput, villaSelect].forEach(element => {
    element.addEventListener('change', hitungTotalHarga);
  });

  btnCheck.addEventListener('click', () => {
    const err = validasiForm();
    if (err) {
      errorMessage.textContent = err;
      errorMessage.classList.remove('hidden');
    } else {
      errorMessage.classList.add('hidden');
      hitungTotalHarga();
    }
  });

  // Event listener Submit Form
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const err = validasiForm();
    if (err) {
      errorMessage.textContent = err;
      errorMessage.classList.remove('hidden');
      bookingResult.classList.add('hidden');
      return;
    }

    errorMessage.classList.add('hidden');
    const totalBiaya = hitungTotalHarga();
    const villaDipilih = dataVila.find(v => v.id === villaSelect.value);

    // Menyimpan data pesanan ke localStorage
    const dataPesanan = {
      nama: guestNameInput.value.trim(),
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      jumlahTamu: guestCountInput.value,
      vila: villaDipilih.nama,
      totalBiaya: totalBiaya,
      waktuPesan: new Date().toLocaleString('id-ID')
    };

    try {
      localStorage.setItem('terakhir_pesan_vila', JSON.stringify(dataPesanan));
    } catch (e) {
      console.warn("Gagal menyimpan ke localStorage", e);
    }

    // Tampilkan Hasil Pesanan Terkirim
    resultContent.innerHTML = `
      <p><strong>Nama Pemesan:</strong> ${dataPesanan.nama}</p>
      <p><strong>Unit Vila:</strong> ${dataPesanan.vila}</p>
      <p><strong>Tanggal Menginap:</strong> ${dataPesanan.checkIn} s.d. ${dataPesanan.checkOut} (${summaryNights.textContent} malam)</p>
      <p><strong>Jumlah Tamu:</strong> ${dataPesanan.jumlahTamu} orang</p>
      <p><strong>Total Biaya:</strong> ${formatRupiah(totalBiaya)}</p>
      <p style="margin-top: 10px; color: #2e7d32; font-weight: bold;">✓ Pesanan berhasil dicatat! Silakan konfirmasi ke Pak Hendra via WhatsApp.</p>
    `;
    bookingResult.classList.remove('hidden');
  });

  // Load awal: Muat data dari localStorage jika ada
  function loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('terakhir_pesan_vila');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.nama) {
          guestNameInput.value = parsed.nama;
        }
      }
    } catch (e) {
      console.error("Gagal memuat data dari localStorage", e);
    }
  }

  // Inisialisasi
  renderVilaList(dataVila);
  populateSelectOptions();
  loadFromLocalStorage();
});