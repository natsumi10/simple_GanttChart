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
		Add the task data to tasks_data["id"].
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

def assemble_csv_list(csv_db,line):
	'''
	Assembles to make csv dict database and add to csv_db which is the class object
	for csv database.
	:rtype: list
	'''
	data = []
	#print(line["Id"])
	print (line["Id"])
	print("\n")

	# Add the id number to csv_db class object
	csv_db.add_id(int(line["Id"]))

	#print(line)
	"""
	for key in line:
		# If the key is id, you can add the id number to csv_db class object.
		if key == "Id" :
			print(line[key])
			csv_db.add_id(int(line[key]))
		else :
			#csv_db.add_work_info()
			print("\n")
			print(key)
			print(line[key])
			print(line)

		#print(key)
		#print(line[key])
		#print(type(line[key]))
		#print("\n")
	"""
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