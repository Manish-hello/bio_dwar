from flask import Flask,request,session,jsonify,render_template,send_from_directory, url_for
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from tinydb import Query
import db

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'iso'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app = Flask(__name__)
CORS(app,resource={
    r"/*":{
        "origins":"*"
    }
})
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return render_template('home.html')

@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == 'GET':
        if session.get("user") :
            return jsonify(session.get("user"))
        else:
            return "Not loged in",404
    else :
        req=request.json
        uname=req['uname']
        password=req['password']
        print(f"Loging in {uname} {password}")
        query=Query()
        data=db.user_db.search((query.user_name==uname) & (query.password==password))
        print(data)
        if len(data)==1:
            session['user']=data[0]
            return jsonify(data[0])
        else:
            return "User name or password incorrect",404

@app.route("/register", methods=['POST','GET'])
def register():
    pass

@app.route("/user_info", methods=['POST','GET'])
def user_info():
    if request.method=='POST':
        print(request.form)
        #print(request.form["name"])
        if 'finger_print' not in request.files:
            print('No file found')
            return "no file submitted",404
        file = request.files['finger_print']
        if file.filename == '':
            print('No file found')
            return "no file submitted1",404
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            data={}
            data["name"]=request.form.get("name")
            data["phone"]=request.form.get("phone")
            data["payment_date"]=request.form.get("payment_date")
            print(data)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            data["finger_print"]=url_for('download_file', name=filename)
            db.client_db.insert(data)
            return jsonify(data)


        

@app.route("/logout", methods=['GET'])
def logout():
    if session.get("user") :
        session.pop("user")
    return 'ok'


if __name__ == '__main__':  
   app.run()

