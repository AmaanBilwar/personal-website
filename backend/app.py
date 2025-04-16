from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv
import jwt
from functools import wraps
from flask_sock import Sock
import json
import base64
import traceback
import sys
import requests

# Load environment variables
load_dotenv()
print("Environment variables loaded")
print(f"MONGODB_URI: {'Set' if os.getenv('MONGODB_URI') else 'Not set'}")

app = Flask(__name__)
# Configure CORS to allow all origins for testing
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
sock = Sock(app)

# MongoDB connection
try:
    # Add connection timeout
    client = MongoClient(os.getenv('MONGODB_URI'), serverSelectionTimeoutMS=5000)
    # Test the connection
    client.admin.command('ping')
    print("MongoDB connection successful")
    db = client['personal_website']
    blogs_collection = db['blogs']
    comments_collection = db['comments']
    
    # Ensure memories collection exists
    if 'memories' not in db.list_collection_names():
        print("Creating memories collection")
        db.create_collection('memories')
    
    memories_collection = db['memories']
    print("Memories collection initialized")
except Exception as e:
    print(f"MongoDB connection error: {str(e)}")
    print(traceback.format_exc())
    sys.exit(1)  # Exit if we can't connect to MongoDB

# Spotify API configuration
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
SPOTIFY_REFRESH_TOKEN = os.getenv('SPOTIFY_REFRESH_TOKEN')

def get_spotify_access_token():
    auth_header = base64.b64encode(
        f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()
    ).decode()
    
    response = requests.post(
        'https://accounts.spotify.com/api/token',
        headers={
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data={
            'grant_type': 'refresh_token',
            'refresh_token': SPOTIFY_REFRESH_TOKEN
        }
    )
    
    return response.json()['access_token']

@app.route('/api/spotify', methods=['GET'])
def get_spotify_now_playing():
    try:
        access_token = get_spotify_access_token()
        
        response = requests.get(
            'https://api.spotify.com/v1/me/player/currently-playing',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        if response.status_code == 204:
            return jsonify({'isPlaying': False})
            
        if response.status_code != 200:
            return jsonify({'isPlaying': False})
            
        data = response.json()
        
        if not data.get('item'):
            return jsonify({'isPlaying': False})
            
        return jsonify({
            'isPlaying': data['is_playing'],
            'title': data['item']['name'],
            'artist': ', '.join(artist['name'] for artist in data['item']['artists']),
            'songUrl': data['item']['external_urls']['spotify']
        })
        
    except Exception as e:
        print(f"Error fetching Spotify data: {str(e)}")
        return jsonify({'isPlaying': False})

# Route to serve the blog creation form
@app.route('/blogs', methods=['GET'])
def blog_create_form():
    return render_template('blog.html')

# Route to serve the memories upload page
@app.route('/memories', methods=['GET'])
def memories_page():
    return render_template('memories.html')

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = list(blogs_collection.find())
    for blog in blogs:
        blog['_id'] = str(blog['_id'])
    return jsonify(blogs)

@app.route('/api/blogs/<blog_id>', methods=['GET'])
def get_blog(blog_id):
    blog = blogs_collection.find_one({'_id': ObjectId(blog_id)})
    if blog:
        blog['_id'] = str(blog['_id'])
        return jsonify(blog)
    return jsonify({'message': 'Blog not found'}), 404

@app.route('/api/blogs', methods=['POST'])
def create_blog():
    print("Received blog creation request")
    try:
        if blogs_collection is None:
            print("MongoDB connection not available")
            return jsonify({'error': 'Database connection not available'}), 500
            
        data = request.json
        print(f"Request data: {data}")
        
        if not data:
            print("No data provided in request")
            return jsonify({'error': 'No data provided'}), 400

        # Validate required fields
        required_fields = ['title', 'description', 'content', 'category', 'readTime', 'image', 'author']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            print(f"Missing fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        blog = {
            'title': data['title'],
            'description': data['description'],
            'content': data['content'],
            'category': data['category'],
            'readTime': data['readTime'],
            'image': data['image'],
            'author': data['author'],
            'date': datetime.utcnow(),
            'comments': []
        }

        print(f"Creating blog with title: {blog['title']}")
        result = blogs_collection.insert_one(blog)
        blog['_id'] = str(result.inserted_id)
        
        print(f"Blog created successfully: {blog['title']}")
        return jsonify(blog), 201
    except Exception as e:
        print(f"Error creating blog: {str(e)}")
        return jsonify({'error': 'Failed to create blog post'}), 500

# Projects routes
@app.route('/projects')
def projects_page():
    return render_template('projects.html')

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = list(db.projects.find().sort('created_at', -1))
        
        # Convert ObjectId to string for JSON serialization
        for project in projects:
            project['_id'] = str(project['_id'])
            # Convert tech string to list if it's a string
            if isinstance(project.get('tech'), str):
                project['tech'] = project['tech'].split(',')
        
        return jsonify(projects)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = db.projects.find_one({'_id': ObjectId(project_id)})
        
        if project is None:
            return jsonify({'error': 'Project not found'}), 404
        
        # Convert ObjectId to string for JSON serialization
        project['_id'] = str(project['_id'])
        
        # Convert tech string to list if it's a string
        if isinstance(project.get('tech'), str):
            project['tech'] = project['tech'].split(',')
        
        return jsonify(project)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        title = request.form['title']
        description = request.form['description']
        content = request.form['content']
        status = request.form['status']
        github_link = request.form['github_link']
        image = request.form['image']
        tech = request.form['tech']
        category = request.form['category']
        
        # Create slug from title
        slug = title.lower().replace(' ', '-')
        
        project = {
            'title': title,
            'description': description,
            'content': content,
            'status': status,
            'github_link': github_link,
            'image': image,
            'tech': tech,
            'category': category,
            'slug': slug,
            'created_at': datetime.utcnow()
        }
        
        result = db.projects.insert_one(project)
        project['_id'] = str(result.inserted_id)
        
        return jsonify({'message': 'Project created successfully', 'id': project['_id']}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Memories/Images routes
@app.route('/api/memories', methods=['GET'])
def get_memories():
    try:
        memories = list(memories_collection.find().sort('created_at', -1))
        for memory in memories:
            memory['_id'] = str(memory['_id'])
        print(f"Successfully fetched {len(memories)} memories")
        return jsonify(memories)
    except Exception as e:
        print(f"Error fetching memories: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to fetch memories: {str(e)}'}), 500

@app.route('/api/memories', methods=['POST'])
def upload_memory():
    try:
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
            
        data = request.json
        print(f"Received memory upload request")
        
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']  # Base64 encoded image
        
        # Check if image data is valid
        if not isinstance(image_data, str) or not image_data.startswith('data:image/'):
            return jsonify({'error': 'Invalid image data format'}), 400
            
        # Create memory document
        memory = {
            'image': image_data,
            'created_at': datetime.now(),
            'width': int(data.get('width', 0)),
            'height': int(data.get('height', 0))
        }
        
        print(f"Inserting memory with dimensions: {memory['width']}x{memory['height']}")
        
        # Insert with a timeout
        result = memories_collection.insert_one(memory)
        memory['_id'] = str(result.inserted_id)
        
        print(f"Memory uploaded successfully with ID: {memory['_id']}")
        return jsonify(memory), 201
    except Exception as e:
        print(f"Error uploading memory: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to upload memory: {str(e)}'}), 500

if __name__ == '__main__':
    # Run the app on all network interfaces
    app.run(host='0.0.0.0', port=5000, debug=True)