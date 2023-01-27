from flask import Flask, render_template, url_for, redirect
from simple_GanttChart import read_csv_file
from manage_html.create_html import write_html

app = Flask(__name__)

def create_posts():
    created_posts = []
    created_posts = [
    [11,12,13,14],
    [21,22,23,24],
    [31,32,33,34]
    ]
    return created_posts

def settings():
    csv_db = read_csv_file()
    task_db = write_html(csv_db)
    
    return task_db


@app.route("/")
def index():
    task_db = settings()
    created_posts = create_posts()
    return render_template("home.html", posts=created_posts,title="Simple GanttChart",task_db=task_db)

if __name__ == '__main__':
    settings()
    app.run(debug=True, host='0.0.0.0')
