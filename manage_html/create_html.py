#!/usr/bin/env python
import os
import sys
import json

from jinja2 import Environment, FileSystemLoader


def write_html():

	#fileLoader = FileSystemLoader("templates")
	base_dir = os.path.dirname(__file__)
	path_template = os.path.join(base_dir,"templates")
	
	#print (path_template)
	fileLoader = FileSystemLoader(path_template)
	#print(fileLoader)
	
	env = Environment(loader=fileLoader)

	# Read data of task info (row)
	with open(f"{base_dir}/test_tasks_data.json", "r") as d:
		columns = json.load(d)

	# Get the data of heads(colmuns)
	tmp_heads = "Task Name"

	#rendered = env.get_template("hello_jinja.html").render(albums=albums, title="Gallery")
	rendered = env.get_template("create_html.html").render( tmp_heads = tmp_heads,elements = columns,title="Simple GanttChart")

	#Write HTML to a file - index.html
	fileName = "index.html"
	with open(f"{base_dir}/site/{fileName}","w") as f:
		f.write(rendered)
	
	return 0
"""
def main():
	''' 
	Main function 
	:rtype: int
	'''
	w_html = write_html()
	
	
	return 0

if __name__ == "__main__":
	sys.exit(main())
"""