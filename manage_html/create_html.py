#!/usr/bin/env python
import os
import sys
import json

from jinja2 import Environment, FileSystemLoader

"""
from flask import Flask, render_template, url_for,request

app = Flask(__name__)
"""

def set_keys(csv_db):
	for key in csv_db.task_data:
		print("\n",key,"\n")

def create_task_list(csv_db):
	task_list = []
	for key in csv_db.task_data :
		task_list.append(csv_db.task_data[key])
	print ("\n\n",task_list[0])
	return task_list

def print_csvDb_forCheck(csv_db):
	for key in csv_db.task_data :
		print ("the key is",key,"\n")
		print ("data is ",csv_db.task_data[key],"\n")
	return 0

def write_html(csv_db):

	print_csvDb_forCheck(csv_db)
	task_list = []
	task_list = create_task_list(csv_db)
	#set_keys(csv_db)
	
	
	
	base_dir = os.path.dirname(__file__)
	path_template = os.path.join(base_dir,"templates")
	
	
	fileLoader = FileSystemLoader(path_template)
	
	env = Environment(loader=fileLoader)

	# Read data of task info (row)
	with open(f"{base_dir}/test_tasks_data.json", "r") as d:
		columns = json.load(d)

	#print (columns)
	# Get the data of heads(colmuns)
	tmp_heads = "Task Name"

	#rendered = env.get_template("create_html.html").render( tmp_heads = tmp_heads,elements = task_list,title="Simple GanttChart")
	rendered = env.get_template("create_html.html").render( task_db = task_list,title="Simple GanttChart")

	#Write HTML to a file - index.html
	fileName = "index.html"
	with open(f"{base_dir}/site/{fileName}","w") as f:
		f.write(rendered)
	
	return task_list
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