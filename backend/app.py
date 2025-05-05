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
        "methods": ["GET", "POST", "PUT", "OPTIONS"],
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
    
    # Ensure thoughts collection exists
    if 'thoughts' not in db.list_collection_names():
        print("Creating thoughts collection")
        db.create_collection('thoughts')
    
    thoughts_collection = db['thoughts']
    print("Thoughts collection initialized")
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
@app.route('/thoughts', methods=['GET'])
def thoughts_create_form():
    return render_template('thoughts.html')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

# Route to serve the blog creation form
@app.route('/blogs', methods=['GET'])
def blog_create_form():
    return render_template('blog.html')

# Route to serve the blog edit form
@app.route('/blogs/<blog_id>/edit', methods=['GET'])
def blog_edit_form(blog_id):
    try:
        blog = blogs_collection.find_one({'_id': ObjectId(blog_id)})
        if blog:
            blog['_id'] = str(blog['_id'])
            return render_template('blog_edit.html', blog=blog)
        return render_template('error.html', message='Blog not found'), 404
    except Exception as e:
        print(f"Error fetching blog for edit: {str(e)}")
        return render_template('error.html', message='Error fetching blog'), 500

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

@app.route('/api/blogs/<blog_id>', methods=['PUT'])
def update_blog(blog_id):
    print(f"Received blog update request for ID: {blog_id}")
    try:
        if blogs_collection is None:
            print("MongoDB connection not available")
            return jsonify({'error': 'Database connection not available'}), 500
            
        data = request.json
        print(f"Request data: {data}")
        
        if not data:
            print("No data provided in request")
            return jsonify({'error': 'No data provided'}), 400

        # Check if blog exists
        blog = blogs_collection.find_one({'_id': ObjectId(blog_id)})
        if not blog:
            print(f"Blog with ID {blog_id} not found")
            return jsonify({'error': 'Blog not found'}), 404

        # Update fields that are provided in the request
        update_fields = {}
        for field in ['title', 'description', 'content']:
            if field in data and data[field]:
                update_fields[field] = data[field]
        
        if not update_fields:
            print("No valid fields to update")
            return jsonify({'error': 'No valid fields to update'}), 400
            
        # Add last updated timestamp
        update_fields['last_updated'] = datetime.utcnow()
        
        # Update the blog
        result = blogs_collection.update_one(
            {'_id': ObjectId(blog_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count > 0:
            print(f"Blog updated successfully: {blog_id}")
            # Get the updated blog
            updated_blog = blogs_collection.find_one({'_id': ObjectId(blog_id)})
            updated_blog['_id'] = str(updated_blog['_id'])
            return jsonify(updated_blog), 200
        else:
            print(f"No changes made to blog: {blog_id}")
            return jsonify({'message': 'No changes made to the blog'}), 200
            
    except Exception as e:
        print(f"Error updating blog: {str(e)}")
        return jsonify({'error': 'Failed to update blog post'}), 500

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
        required_fields = ['title', 'description', 'content']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            print(f"Missing fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        blog = {
            'title': data['title'],
            'description': data['description'],
            'content': data['content'],
            'date': datetime.now(),
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
        # Initialize images array
        images = []
        
        # Handle file uploads
        if 'images' in request.files:
            for file in request.files.getlist('images'):
                if file and file.filename:
                    # Read file as base64
                    file_data = base64.b64encode(file.read()).decode('utf-8')
                    images.append(f"data:image/{file.content_type.split('/')[1]};base64,{file_data}")
        
        # Handle image URLs
        image_urls = request.form.getlist('image_urls[]')
        if image_urls:
            images.extend([url for url in image_urls if url.strip()])
        
        # Get other form data
        data = {
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'content': request.form.get('content'),
            'tech': request.form.get('tech'),
            'github_link': request.form.get('github_link'),
            'category': request.form.get('category')
        }
        
        # Validate required fields
        required_fields = ['title', 'description', 'content', 'tech', 'github_link', 'category']
        missing_fields = [field for field in required_fields if not data[field]]
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
        
        # Create slug from title
        slug = data['title'].lower().replace(' ', '-')
        
        project = {
            'title': data['title'],
            'description': data['description'],
            'content': data['content'],
            'tech': data['tech'].split(',') if isinstance(data['tech'], str) else data['tech'],
            'github_link': data['github_link'],
            'category': data['category'],
            'images': images,
            'slug': slug,
            'created_at': datetime.utcnow()
        }
        
        result = db.projects.insert_one(project)
        project['_id'] = str(result.inserted_id)
        
        return jsonify(project), 201
    except Exception as e:
        print(f"Error creating project: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/projects/<project_id>/edit', methods=['GET'])
def project_edit_form(project_id):
    try:
        project = db.projects.find_one({'_id': ObjectId(project_id)})
        if project:
            project['_id'] = str(project['_id'])
            return render_template('project_edit.html', project=project)
        return render_template('error.html', message='Project not found'), 404
    except Exception as e:
        print(f"Error fetching project for edit: {str(e)}")
        return render_template('error.html', message='Error fetching project'), 500

@app.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    print(f"Received project update request for ID: {project_id}")
    try:
        if db.projects is None:
            print("MongoDB connection not available")
            return jsonify({'error': 'Database connection not available'}), 500
            
        data = request.json
        print(f"Request data: {data}")
        
        if not data:
            print("No data provided in request")
            return jsonify({'error': 'No data provided'}), 400

        # Check if project exists
        project = db.projects.find_one({'_id': ObjectId(project_id)})
        if not project:
            print(f"Project with ID {project_id} not found")
            return jsonify({'error': 'Project not found'}), 404

        # Update fields that are provided in the request
        update_fields = {}
        for field in ['title', 'description', 'content', 'status', 'github_link', 'image', 'tech', 'category']:
            if field in data and data[field]:
                update_fields[field] = data[field]
        
        if not update_fields:
            print("No valid fields to update")
            return jsonify({'error': 'No valid fields to update'}), 400
            
        # Add last updated timestamp
        update_fields['last_updated'] = datetime.utcnow()
        
        # Update the project
        result = db.projects.update_one(
            {'_id': ObjectId(project_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count > 0:
            print(f"Project updated successfully: {project_id}")
            # Get the updated project
            updated_project = db.projects.find_one({'_id': ObjectId(project_id)})
            updated_project['_id'] = str(updated_project['_id'])
            return jsonify(updated_project), 200
        else:
            print(f"No changes made to project: {project_id}")
            return jsonify({'message': 'No changes made to the project'}), 200
            
    except Exception as e:
        print(f"Error updating project: {str(e)}")
        return jsonify({'error': 'Failed to update project'}), 500

@app.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        result = db.projects.delete_one({'_id': ObjectId(project_id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Project deleted successfully'}), 200
        return jsonify({'error': 'Project not found'}), 404
    except Exception as e:
        print(f"Error deleting project: {e}")
        return jsonify({'error': 'Failed to delete project'}), 500

# Memories/Images routes
@app.route('/memories/upload', methods=['POST'])
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
            
        # Extract image format and data
        try:
            # Remove the data:image/xxx;base64, prefix
            image_data = image_data.split(',')[1]
            # Decode base64 to verify it's valid
            image_bytes = base64.b64decode(image_data)
            
            # Create memory document with the original base64 string
            memory = {
                'image': data['image'],  # Store the complete data URL
                'created_at': datetime.utcnow(),
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
            print(f"Error processing image: {str(e)}")
            return jsonify({'error': 'Failed to process image data'}), 400
            
    except Exception as e:
        print(f"Error uploading memory: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to upload memory: {str(e)}'}), 500

@app.route('/api/memories', methods=['GET'])
def get_memories():
    try:
        memories = list(memories_collection.find().sort('created_at', -1))
        for memory in memories:
            memory['_id'] = str(memory['_id'])
            # Ensure the image data is complete
            if 'image' in memory and not memory['image'].startswith('data:image/'):
                memory['image'] = f"data:image/jpeg;base64,{memory['image']}"
        print(f"Successfully fetched {len(memories)} memories")
        return jsonify(memories)
    except Exception as e:
        print(f"Error fetching memories: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to fetch memories: {str(e)}'}), 500

@app.route('/api/thoughts', methods=['GET'])
def get_thoughts():
    try:
        thoughts = list(thoughts_collection.find().sort('created_at', -1))
        # Convert ObjectId to string for JSON serialization
        for thought in thoughts:
            thought['_id'] = str(thought['_id'])
        return jsonify(thoughts), 200
    except Exception as e:
        print(f"Error getting thoughts: {e}")
        return jsonify({"error": "Failed to get thoughts"}), 500

@app.route('/api/thoughts/<thought_id>', methods=['GET'])
def get_thought(thought_id):
    try:
        thought = thoughts_collection.find_one({'_id': ObjectId(thought_id)})
        if thought:
            thought['_id'] = str(thought['_id'])
            return jsonify(thought), 200
        return jsonify({"error": "Thought not found"}), 404
    except Exception as e:
        print(f"Error getting thought: {e}")
        return jsonify({"error": "Failed to get thought"}), 500

@app.route('/api/thoughts', methods=['POST'])
def create_thought():
    try:
        data = request.json
        if not data or 'content' not in data:
            return jsonify({"error": "Content is required"}), 400
        
        thought = {
            'content': data['content'],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        
        result = thoughts_collection.insert_one(thought)
        thought['_id'] = str(result.inserted_id)
        
        return jsonify(thought), 201
    except Exception as e:
        print(f"Error creating thought: {e}")
        return jsonify({"error": "Failed to create thought"}), 500

@app.route('/api/thoughts/<thought_id>', methods=['PUT'])
def update_thought(thought_id):
    try:
        data = request.json
        if not data or 'content' not in data:
            return jsonify({"error": "Content is required"}), 400
        
        result = thoughts_collection.update_one(
            {'_id': ObjectId(thought_id)},
            {
                '$set': {
                    'content': data['content'],
                    'updated_at': datetime.now()
                }
            }
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Thought not found"}), 404
        
        updated_thought = thoughts_collection.find_one({'_id': ObjectId(thought_id)})
        updated_thought['_id'] = str(updated_thought['_id'])
        
        return jsonify(updated_thought), 200
    except Exception as e:
        print(f"Error updating thought: {e}")
        return jsonify({"error": "Failed to update thought"}), 500

@app.route('/api/thoughts/<thought_id>', methods=['DELETE'])
def delete_thought(thought_id):
    try:
        result = thoughts_collection.delete_one({'_id': ObjectId(thought_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Thought not found"}), 404
        
        return jsonify({"message": "Thought deleted successfully"}), 200
    except Exception as e:
        print(f"Error deleting thought: {e}")
        return jsonify({"error": "Failed to delete thought"}), 500

@app.route('/api/blogs/<blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    try:
        result = blogs_collection.delete_one({'_id': ObjectId(blog_id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Blog post deleted successfully'}), 200
        return jsonify({'error': 'Blog post not found'}), 404
    except Exception as e:
        print(f"Error deleting blog: {e}")
        return jsonify({'error': 'Failed to delete blog post'}), 500

@app.route('/api/memories/<memory_id>', methods=['DELETE'])
def delete_memory(memory_id):
    try:
        result = memories_collection.delete_one({'_id': ObjectId(memory_id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Memory deleted successfully'}), 200
        return jsonify({'error': 'Memory not found'}), 404
    except Exception as e:
        print(f"Error deleting memory: {e}")
        return jsonify({'error': 'Failed to delete memory'}), 500

# GitHub API configuration
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

def get_github_repo_stats(repo_url):
    try:
        # Extract owner and repo name from GitHub URL
        parts = repo_url.replace('https://github.com/', '').split('/')
        if len(parts) != 2:
            return None
            
        owner, repo = parts
        
        headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        
        # Fetch repository data
        response = requests.get(
            f'https://api.github.com/repos/{owner}/{repo}',
            headers=headers
        )
        
        if response.status_code != 200:
            return None
            
        data = response.json()
        
        return {
            'stars': data['stargazers_count'],
            'forks': data['forks_count'],
            'last_updated': data['updated_at'],
            'open_issues': data['open_issues_count'],
            'watchers': data['watchers_count']
        }
    except Exception as e:
        print(f"Error fetching GitHub stats: {str(e)}")
        return None

@app.route('/api/github-stats/<path:repo_url>', methods=['GET'])
def get_github_stats(repo_url):
    stats = get_github_repo_stats(repo_url)
    if stats:
        return jsonify(stats)
    return jsonify({'error': 'Could not fetch GitHub stats'}), 404

if __name__ == '__main__':
    # Run the app on all network interfaces
    app.run(host='0.0.0.0', port=5000, debug=True)