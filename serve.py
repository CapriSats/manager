#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse, unquote

PORT = 8000
DIRECTORY = "dist"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Parse the URL path
        parsed_path = urlparse(path).path
        parsed_path = unquote(parsed_path)
        
        # Map root and unknown paths to index.html for SPA support
        if parsed_path == "/" or not os.path.exists(os.path.join(DIRECTORY, parsed_path.lstrip("/"))):
            return os.path.join(DIRECTORY, "index.html")
        
        # Otherwise serve the requested file
        return os.path.join(DIRECTORY, parsed_path.lstrip("/"))
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        super().end_headers()

def run_server():
    if not os.path.isdir(DIRECTORY):
        print(f"Error: Directory '{DIRECTORY}' not found. Please build the project first.")
        print("Run 'npm run build' or 'bun run build' to generate the dist directory.")
        sys.exit(1)
        
    handler = CustomHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            
if __name__ == "__main__":
    run_server()