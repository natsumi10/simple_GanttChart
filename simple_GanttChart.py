#!/usr/bin/env python
import os
import sys
import csv

class SimpleGantt:
	"""Base Simple Gantt Chart class.
	"""
	def __init__(self):
			self.tasks_data = {}

	def add_id(self,id):
		''' 
		Add new dict with the key is id to tasks_data
		:rtype: int
		'''
		in_data = {}
		self.tasks_data[int(id)]=in_data
		return 0

	def add_work_info(self,data):
		'''
		!!!!! Working now !!!!!!!! 
		
		Add the task data to tasks_data.
		:rtype: int
		'''
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

def assemble_csv_strs(csv_db,line):
	'''
	Assembles each list data to make csv dict data .
	:rtype: list
	'''
	data = []
	#print(line["Id"])
	for key in line:
		# If the key is id, you can add the id number to csv_db class object.
		if key == "Id" :
			print(line[key])
			csv_db.add_id(int(line[key]))

		#print(key)
		#print(line[key])
		#print(type(line[key]))
		#print("\n")

	return 0

def read_cvs_file():
	'''
	Read the csv file.
	:rtype: list
	'''
	csv_db = SimpleGantt()
	with open(data_path(), "r") as fp:
		#reader = csv.reader(fp)
		reader = csv.DictReader(fp)
		print(reader)
		for line in reader:
			assemble_csv_strs(csv_db,line)
			#print(line)
			#print("\n\n")
	return 0

def main():
	''' 
	Main function 
	:rtype: int
	'''
	read_cvs_file()
	return 0

if __name__ == "__main__":
	sys.exit(main())