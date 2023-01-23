#!/usr/bin/env python
import os
import sys

import json
from jinja2 import Environment, FileSystemLoader

def main():
	''' 
	Main function 
	:rtype: int
	'''
	
	with open("albums.json", "r") as d:
		albums = json.load(d)
	
	fileLoader = FileSystemLoader("templates")
	env = Environment(loader=fileLoader)

	#rendered = env.get_template("hello_jinja.html").render(albums=albums, title="Gallery")
	rendered = env.get_template("hello_jinja.html").render( title="Gallery")

	#Write HTML to a file - index.html
	fileName = "index.html"
	with open(f"./site/{fileName}","w") as f:
		f.write(rendered)
	return 0

if __name__ == "__main__":
	sys.exit(main())