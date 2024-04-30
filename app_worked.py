30_April_2024
app.py
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'  # Define the folder where uploaded files are stored
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload', methods=['POST'])
def upload():   
       print("Getting request")    
       if 'photo' not in request.files:
        return {'error': 'No file part'}, 400

       file = request.files['photo']
       print(file.filename) 
       if file.filename == '':
        return {'error': 'No selected file'}, 400

       file.save('uploads/' + file.filename)
    #    iMAGE COMPRESSION lOGIC sTART
    
    # END

       return jsonify({
           "msg":"File Uploaded Succecfully",
           "fileName": file.filename
       })

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

