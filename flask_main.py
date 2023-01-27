from flask import Flask
from simple_GanttChart import read_csv_file
from simple_GanttChart import start_simple_ganttchart
from manage_html.create_html import write_html

app = Flask(__name__)

@app.route("/")
def main():
    return "<p>Hello world!</p>"

def settings():
    csv_db = read_csv_file()
    write_html(csv_db)
    #start_simple_ganttchart()
    return 0

if __name__ == '__main__':
    settings()
    app.run(debug=True, host='0.0.0.0')
