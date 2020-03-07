#ml categorical decision tree to predict happiness

#################################################
# import necessary libraries
#################################################
import pandas
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
import matplotlib.image as pltimg
import graphviz 
import pydotplus


#################################################
# load dataset
#################################################
df = pandas.read_csv("mlds.csv")
# print df


#################################################
# define X,y values
#################################################
features = ['Score', 'Health', 'Relationship', 'Beauty', 'Living', 'Support']

X = df[features]
y = df['Outcome']

# print(X)
# print(y)



#################################################
# Fit the Model and Save Decision Tree Map Image
#################################################
dtree = DecisionTreeClassifier()
dtree = dtree.fit(X, y)
data = tree.export_graphviz(dtree, out_file=None, feature_names=features,
        filled=True, rounded=True,  
        special_characters=True)  
graph = pydotplus.graph_from_dot_data(data)
graph.write_png('decisiontree.png')



#######################################################################
#serializing our model to a file called model.pkl in order to use this  
# model with new unknown data so that we can predict the values later.
#######################################################################
import pickle
pickle.dump(dtree, open(".../model.pkl","wb"))




