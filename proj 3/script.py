#ml categorical decision tree to predict happiness - flask

#################################################
# import libraries
#################################################
import os
import numpy as np
import flask
import pickle
from flask import Flask, render_template, request

# pathStr = 'model.pkl'
# if os.path.exists(pathStr) :
#     print("Path " , pathStr, " exists")
# else:
#     print("Path " , pathStr, " does not exists")   



#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# ID url to trigger decision tree html
#################################################

@app.route('/')
# @app.route('/index')
def ML():
    return flask.render_template('mlDT.html')


#################################################
#prediction function
#################################################

def ValuePredictor(to_predict_list):

    print(to_predict_list)
    to_predict = np.array(to_predict_list).reshape(1,6)
    # loaded_model = pickle.load(open("/static/data/model.pkl","rb"))
    loaded_model = pickle.load(open("model.pkl","rb"))
    result = loaded_model.predict(to_predict)
    return result[0]
    # return to_predict_list


@app.route('/result',methods = ['POST'])
def result():

    # test
    
    to_predict_list = request.form.to_dict()
    to_predict_keys=list(to_predict_list.keys())
    to_predict_list=list(to_predict_list.values())
    print(to_predict_keys)
    print(to_predict_list)
    

    if request.method == 'POST':
        to_predict_list = request.form.to_dict()
        to_predict_list=list(to_predict_list.values())
        to_predict_list = list(map(int, to_predict_list))
        result = ValuePredictor(to_predict_list)
        

        if int(result)==4:
            prediction='Very Happy, #Blessed!'
        elif int(result)==3:
            prediction='Happy, Live is good!'
        elif int(result)==2:
            prediction='Somewhat Happy, Doing alright.'   
        elif int(result)==1:
            prediction='Not too Happy, Things could be better'  
        else:
            prediction='Not Happy, To know happiness, you have to be unhappy sometimes.' 
            
        return render_template("result.html",prediction=prediction)   
    
    return render_template("result.html")   


if __name__ == "__main__":
    app.run()

