#!/usr/bin/env python
import os
import sys

from jinja2 import Environment, FileSystemLoader

def write_html():

	fileLoader = FileSystemLoader("templates")
	env = Environment(loader=fileLoader)

	#rendered = env.get_template("hello_jinja.html").render(albums=albums, title="Gallery")
	rendered = env.get_template("create_html.html").render( title="Simple GanttChart")

	#Write HTML to a file - index.html
	fileName = "index.html"
	with open(f"./site/{fileName}","w") as f:
		f.write(rendered)
	
	return 0

def main():
	''' 
	Main function 
	:rtype: int
	'''
	w_html = write_html()
	
	
	return 0

if __name__ == "__main__":
	sys.exit(main())
	