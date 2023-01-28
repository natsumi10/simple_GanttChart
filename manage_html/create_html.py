#!/usr/bin/env python
import os
import sys
import json

from jinja2 import Environment, FileSystemLoader

"""
from flask import Flask, render_template, url_for,request

app = Flask(__name__)
"""

def create_task_list(csv_db):
	''' 
	Make list from csv_db dictionary.
	:rtype: list
	'''
	task_list = []
	for key in csv_db.task_data :
		task_list.append(csv_db.task_data[key])
	#print ("\n\n",task_list[0])
	return task_list

def print_csvDb_forCheck(csv_db):
	''' 
	Print csv_db dictionary to check what is inside.
	:rtype: list
	'''
	for key in csv_db.task_data :
		print ("the key is",key,"\n")
		print ("data is ",csv_db.task_data[key],"\n")
	return 0

def write_html(csv_db):

	#print to check what is inside.
	#print_csvDb_forCheck(csv_db)

	task_list = []

	#Make the list from csv_db dictionary.
	task_list = create_task_list(csv_db)
	
	
	# get the path to tamplates folder. 
	base_dir = os.path.dirname(__file__)
	path_template = os.path.join(base_dir,"templates")
	
	# Set env which tells where is templates folder.
	fileLoader = FileSystemLoader(path_template)
	env = Environment(loader=fileLoader)

	# Get the data of task info (row)
	with open(f"{base_dir}/test_tasks_data.json", "r") as d:
		columns = json.load(d)
	
	#create html file.
	rendered = env.get_template("create_html.html").render( task_db = task_list,title="Simple GanttChart")

	#Write HTML to a file - index.html
	fileName = "index.html"
	with open(f"{base_dir}/site/{fileName}","w") as f:
		f.write(rendered)
	
	return task_list
"""
def main():
	''' 
	Main function. Comment out because this is python module file.
	:rtype: int
	'''
	w_html = write_html()
	
	
	return 0

if __name__ == "__main__":
	sys.exit(main())
"""