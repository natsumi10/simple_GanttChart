#!/usr/bin/env python
import os
import sys
import csv

class SimpleGantt:
	"""Base Simple Gantt Chart class.
	"""
	def __init__(self):
			self.tasks_data = {}

	def add_id(self,task_id):
		''' 
		Add new dict with the key is task_id to tasks_data
		:rtype: int
		'''
		in_data = {}
		self.tasks_data[int(task_id)]=in_data
		return 0

	def add_work_info(self,task_id,data):
		'''
		Add the task data to tasks_data["task_id"].
		:rtype: int
		'''
		#print("Befor is",self.tasks_data[task_id])
		#print("\n")
		 
		self.tasks_data[task_id] = data
		hoge = self.tasks_data[task_id].get
		
		print("After is",self.tasks_data[task_id])

		return 0


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

def assemble_csv_list(csv_db,line):
	'''
	Assembles to make csv dict database and add to csv_db which is the class object
	for csv database.
	:rtype: list
	'''
	data = []

	# Add the id number to csv_db class object
	for item in line:
			#print(item["Id"])
			#print("\n")
			#task_id = int(item.pop("Id"))
			task_id = int(item["Id"])
			csv_db.add_id(task_id)
			csv_db.add_work_info(task_id,item)
	
	return 0

def read_csv_file():
	'''
	Read the csv file.
	:rtype: list
	'''
	csv_list = []
	csv_db = SimpleGantt()
	with open(data_path(), "r") as fp:
		#reader = csv.reader(fp)
		reader = csv.DictReader(fp)
		
		for line in reader:
			csv_list.append(line)

			# If there is empty key in line, you delete it. 
			if('' in line.keys()):
				hoge = line.pop("")

	assemble_csv_list(csv_db,csv_list)
		
	return 0

def main():
	''' 
	Main function 
	:rtype: int
	'''
	read_csv_file()
	return 0

if __name__ == "__main__":
	sys.exit(main())