from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        
        # Open the uploaded image
        image = Image.open(image_file)

        # Compress the image
        compressed_image = io.BytesIO()
        image.save(compressed_image, format='JPEG', quality=50)  # Adjust quality as needed

        # Save the compressed image to a file
        compressed_image.seek(0)
        compressed_image.save('uploads/compressed_' + image_file.filename)

        return jsonify({'message': 'Image uploaded and compressed successfully'}), 200
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while uploading and compressing the image'}), 500

if __name__ == '__main__':
    app.run(debug=True)
