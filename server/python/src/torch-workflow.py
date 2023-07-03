from matplotlib import pyplot as plt
import torch
from torch import nn 

#nn consists of layers

# our goal is to  get data into a numerical representation that we can feed into a neural network
# we can find patterns 

# linear regression formula to make a straight line 
weight = 0.7
bias = 0.3

#create some data
start = 0
end = 1
step = 0.02
X = torch.arange(start, end, step).unsqueeze(1) #unsqueeze adds a dimension
y = weight * X + bias

#let's create a training set and a validation set
#we want to train on the training set and validate on the validation set
#we want to make sure that our model is not overfitting
#we want to make sure that our model is not underfitting
#we want to make sure that our model is just right
train_split = int(0.8 * len(X))
#train set (or split)
X_train, y_train = X[:train_split], y[:train_split]
#validation set (or split)
X_test, y_test = X[train_split:], y[train_split:]

def plot_predictions(train_data=X_train,
                     train_labels=y_train,
                     test_data=X_test,
                     test_labels=y_test,
                     predictions=None):
    """Plot training data, test data and prediction curves."""
    plt.figure(figsize=(10, 7))

    # Plot training data in blue
    plt.scatter(train_data, train_labels, c="b", label="Training data")

    # Plot test data in green
    plt.scatter(test_data, test_labels, c="g", label="Testing data")

    # If predictions given, plot them in red (predictions come from a
    # before model being trained)
    if predictions is not None:
        plt.scatter(test_data, predictions, c="r", label="Predictions")

    # Show the legend
    plt.legend()

#plot the training data and test data
plot_predictions()