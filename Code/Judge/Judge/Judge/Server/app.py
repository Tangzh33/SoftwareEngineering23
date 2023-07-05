from flask import Flask
from flask import request
import time
import json
import os
import subprocess
import shutil

app = Flask(__name__)

@app.route("/View/<projectName>")
def view(projectName):
    responseDict = {}
    response = {}
    try:
        projectPath = os.path.join("Projects", projectName)
        # print(projectPath)
        introPath = os.path.join(projectPath, "Introduction.html")
        # print(introPath)
        with open(introPath,'r') as f:
            intro = f.read()
        response['introduction'] = intro
        response['name'] = projectName
        descPath = os.path.join(projectPath, "Description.json")
        with open(descPath, 'r') as f:
            description = json.load(f)
        infrastructurePath = os.path.join(projectPath, "Infrastructure")
        for k, v in description.items():
            if k == 'ignore':
                continue
            if k == 'problemNumRange':
                response['problemNumRange'] = v
                continue
            response[k] = {}
            for codeFile in v:
                codePath = os.path.join(infrastructurePath, codeFile)
                with open(codePath,'r') as f:
                    code = f.read()
                response[k][codeFile] = code
        responseDict['result'] = response
    except Exception as e:
        responseDict['error'] = str(e)
    return responseDict

@app.route("/Judge/<projectName>", methods=['POST'])
def judge(projectName):
    responseDict = {}
    try:
        projectPath = os.path.join("Projects", projectName)
        descPath = os.path.join(projectPath, "Description.json")
        with open(descPath, 'r') as f:
            description = json.load(f)
        tempName = time.strftime("%Y_%m_%d_%H_%M_%S", time.localtime()) 
        tempPath = os.path.join(projectPath, 'Submissions')
        tempPath = os.path.join(tempPath, tempName)
        infrastructurePath = os.path.join(projectPath, "Infrastructure")
        shutil.copytree(infrastructurePath, tempPath)

        for codeFile in description['write']:
            codePath = os.path.join(tempPath, codeFile)
            with open(codePath,'w') as f:
                f.write(request.form.get(codeFile))
        
        argv = ''
        problemNum = request.form.get('problemNum')
        if problemNum:
            argv = '-q q{}'.format(problemNum)
        currentPath = os.getcwd()

        os.chdir(tempPath)
        result = subprocess.check_output('python {} {}'.format('autograder.py', argv), shell=True)
        os.chdir(currentPath)

        shutil.rmtree(tempPath)
        responseDict['result'] = result.decode()
    except Exception as e:
        responseDict['error'] = str(e)

    return responseDict

@app.route("/")
def hello():
    return "Hello"

def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

app.after_request(after_request)