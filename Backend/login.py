from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB bilan bog'lanish
client = MongoClient('mongodb://localhost:27017/')
db = client['pentester_helper']
users = db['users']

app.config['JWT_SECRET_KEY'] = 'b12a8b26d13f9a843409ba5ad01a56432c3fba7ed0b5ae15901b6a3c97182d3f'


# Ro'yxatdan o'tish API
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    # Parolni hashlash
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Foydalanuvchini bazaga qo'shish
    user = {
        'username': username,
        'email': email,
        'password': hashed_password
    }

    users.insert_one(user)
    return jsonify({'message': 'Ro\'yxatdan o\'tish muvaffaqiyatli bo\'ldi'})

# Kirish API
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({'token': access_token, 'message': 'Kirish muvaffaqiyatli bo\'ldi'})
    
    return jsonify({'message': 'Noto\'g\'ri email yoki parol'}), 401

if __name__ == '__main__':
    app.run(debug=True)
