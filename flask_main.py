from flask import Flask
from simple_GanttChart import start_simple_ganttchart

app = Flask(__name__)

@app.route("/")
def main():
    start_simple_ganttchart()
    return "<p>Hello world!</p>"

if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0')
