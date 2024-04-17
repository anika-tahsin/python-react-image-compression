from flask import Flask, request, jsonify, send_file
from PIL import Image
import io

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    print("Received image:", image_file.filename)
    image_file.save('uploads/' + image_file.filename)
    
    return jsonify({'message': 'Image uploaded successfully'}), 200

@app.route('/compress', methods=['POST'])
def compress_image():
    try:
        image = request.files['image']
        #resolution = int(request.form['resolution'])
        image_format = request.form['format']

        img = Image.open(image)
        img = img.convert('RGB')  # Convert image to RGB format
        #img.thumbnail((resolution, resolution))  # Resize image
        print("Compressed image:", img)
        output = io.BytesIO()
        img.save(output, format=image_format)  # Save compressed image to BytesIO
        output.seek(0)

        return send_file(output, mimetype='image/' + image_format.lower())
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True)
