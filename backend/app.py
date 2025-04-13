from flask import Flask, request, jsonify, render_template
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

# Load environment variables
load_dotenv()
print("Environment variables loaded")
print(f"MONGODB_URI: {'Set' if os.getenv('MONGODB_URI') else 'Not set'}")
print(f"ADMIN_USER_ID: {'Set' if os.getenv('ADMIN_USER_ID') else 'Not set'}")

app = Flask(__name__)
CORS(app)
sock = Sock(app)

# MongoDB connection
try:
    client = MongoClient(os.getenv('MONGODB_URI'))
    # Test the connection
    client.admin.command('ping')
    print("MongoDB connection successful")
    db = client['personal_website']
    blogs_collection = db['blogs']
    comments_collection = db['comments']
except Exception as e:
    print(f"MongoDB connection error: {str(e)}")
    # Set default values to prevent app from crashing
    db = None
    blogs_collection = None
    comments_collection = None

# Route to serve the blog creation form
@app.route('/blogs', methods=['GET'])
def blog_create_form():
    return render_template('blog.html')

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

if __name__ == '__main__':
    app.run(debug=True)