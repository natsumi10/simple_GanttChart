from flask import Flask, render_template, url_for, redirect
from simple_GanttChart import read_csv_file, create_json_data, get_task_database
from manage_html.create_html import write_html

app = Flask(__name__)

def print_database(task_db):
    ''' 
        Print task_db list. 
        :rtype: int
    '''
    print ("\n\n","Start task database print here.")
    for task_info in task_db:
        print ("\n",task_info,"\n")
    print ("End.\n")

    return 0

def settings():
    ''' 
        Get task information database. 
        :rtype: list
    '''
    # gett csv data from simple_GanttChart.py
    # csv_db is "SimpleGantt class" instance.
    csv_db = read_csv_file()
    task_db = get_task_database()
    
    # The variable, task_db is the list contains ordered dictionary.
    # For example, [OrderedDict('Id', '5827'), ('Task Name', 'Model')]
    """
    task_db = write_html(csv_db)
    """
    create_json_data(task_db)

    # For checking what is task_db insides.
    #print_database(task_db)

    return task_db


@app.route("/")
def index():
    """
        Root page. Get task information data and post to home.html
        :rtype: home.html in templates folder.
    """
    #Get task info database to post on home.html
    task_db = settings()
    return render_template("home.html",title="Simple GanttChart",task_db=task_db)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    settings()
