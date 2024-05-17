import os
from flask import Flask, request, jsonify
from flask_caching import Cache
from langchain.llms import OpenAI

app = Flask(__name__)

# Configure cache
app.config['CACHE_TYPE'] = 'simple'  # Consider using "redis" for production environments
cache = Cache(app)

# Initialize LangChain with OpenAI GPT-4
# read the API key from the environment variable
openai_api_key = os.environ.get("OPENAI_API_KEY")
langchain_client = OpenAI(api_key=openai_api_key, model="gpt-4")

@app.route('/chat', methods=['POST'])
def chat():
    prompt = request.json.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    # Check cache first
    cache_key = f"response-{prompt}"
    cached_response = cache.get(cache_key)
    if cached_response:
        return jsonify({'response': cached_response, 'from_cache': True})

    # Generate response using LangChain with GPT-4
    response = langchain_client.generate(prompt)
    
    # Cache the response
    cache.set(cache_key, response, timeout=3600)  # Cache for 1 hour

    return jsonify({'response': response, 'from_cache': False})

if __name__ == '__main__':
    app.run(debug=True)