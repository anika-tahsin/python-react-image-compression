from flask import Flask, request, send_file
from PIL import Image
import io

app = Flask(__name__)

@app.route('/compress', methods=['POST'])
def compress_image():
    try:
        image = request.files['image']
        quality = int(request.form['quality'])

        img = Image.open(image)
        output = io.BytesIO()
        img.save(output, format='JPEG', quality=quality)
        output.seek(0)

        return send_file(output, mimetype='image/jpeg')
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
