#!/usr/bin/env python
import os
import sys
import csv
import json
from collections import OrderedDict

from manage_html.create_html import write_html

class SimpleGantt:
	"""Base Simple Gantt Chart class.
	"""
	def __init__(self):
			self.task_data = {}

	def add_id(self,task_id):
		''' 
		Add new dict with the key is task_id to task_data
		:rtype: int
		'''
		in_data = {}
		self.task_data[int(task_id)]=in_data
		return 0

	def add_work_info(self,task_id,data):
		'''
		Add the task data to task_data["task_id"].
		:rtype: int
		'''
		#print("Befor is",self.task_data[task_id])
		#print("\n")
		 
		self.task_data[task_id] = data
		hoge = self.task_data[task_id].get
		
		#print("After is",self.task_data[task_id])

		return 0

	def get_all_ids(self):
		'''
		Return the list which has all ids of tasks database.
		:rtype: list
		'''
		all_keys = []
		for key in self.task_data:
			all_keys.append(int(key))

		return all_keys


def base_dir():
	''' 
	Return the path of given file name
	:rtype: str
	'''
	return os.path.dirname(os.path.abspath(__file__))

def data_path():
	'''
	Return the file path of cvs path
	:rtype: str
	'''
	return os.path.join(base_dir(), "csv", "tasks.csv")

def print_csv_db(csv_db):
	''' 
	Print what is csv_db inside. 
	:rtype: int
	'''
	for key in csv_db.task_data :
		print ("the key is",key,"\n")
		print ("data is ",csv_db.task_data[key],"\n")
	return 0

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

def assemble_csv_list(csv_db,line):
	'''
	Assemble the csv data and add to csv_db.task_data.
	Before adding data, change some keys to fit to database.
	For example, Id -> id or Task Name -> name
	If you want to change the key name, you should change it here.
	:rtype: int
	'''
	data = []
	new_key = ""

	# Add the id number to csv_db class object
	for item in line:
			print (f"\nBefore : {item}\n")
			
			new_item = OrderedDict()
			task_id = int(item["Id"])

			#change the key : Id -> id
			new_item["id"] = task_id
			item.pop("Id")

			#change the key : Task Name -> name
			new_item["name"] = item.pop("Task Name")

			#change the key : Start Date -> start
			new_item["start"] = item.pop("Start Date")

			#change the key : Due Date -> end
			new_item["end"] = item.pop("Due Date")

			#Create progress data : progress
			new_item["progress"] = int(100)

			# Change the order of OrderedDict.
			# And make all keys to lower case letter
			for key in item:
				tmp_key =key.lower()
				print (tmp_key)
				new_item[tmp_key] = item[key]

			#new_item.update(item)
			print (f"\nAfter : {new_item}\n")

			csv_db.add_id(task_id)
			csv_db.add_work_info(task_id,new_item)
	
	return 0

def create_json_data(task_list):
	'''
	Write tasks_data in js file.
	:rtype: int
	'''
	with open('./static/tasks_data.json.js','w') as fp:
		fp.write("var task_data = \n")
		json.dump(task_list,fp,ensure_ascii=False)
		fp.write(";")
	return 0

def read_csv_file():
	'''
	Read the csv file.
	:rtype: class instance.
	'''
	csv_list = []

	#SimpleGantt class object.
	csv_db = SimpleGantt()

	#Read csv file. Make the data as dictionary.
	with open(data_path(), "r") as fp:
		#csv_reader = csv.reader(fp)
		csv_reader = csv.DictReader(fp)
		
		# Collect all csv data into a list.(The name is "csv_list")
		for line in csv_reader:
			#print(line["Task Name"],"\n")
			csv_list.append(line)

			# If there is empty key in line, you delete it.
			if('' in line.keys()):
				hoge = line.pop("")

	assemble_csv_list(csv_db,csv_list)
	#print ("All task ids are", csv_db.get_all_ids(),"\n")
		
	return csv_db


def start_with_flask():
	''' 
	Start simple GanttChart program.
	Get task database from csv and Create html via Flask. 
	:rtype: int
	'''
	csv_db = read_csv_file()
	
	task_list = write_html(csv_db)
	create_json_data(task_list)
	return 0

def get_task_database():
	''' 
	Get task database from csv and Return them as list.
	:rtype: int
	'''
	csv_db = read_csv_file()
	task_list = create_task_list(csv_db)
	return task_list


"""
def main():
	''' 
	Main function. 
	Comment out because this python file is used as module.
	:rtype: int
	'''
	csv_db = read_csv_file()

	write_html(csv_db)
	return 0

if __name__ == "__main__":
	sys.exit(main())
"""