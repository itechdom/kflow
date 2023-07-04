#@title Default title text
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

#build a model
class LinearRegressionModel(nn.Module):
  def __init__(self):
    super().__init__()
    # parameters we need to learn
    # we start with random and then eventually reach the above graph
    self.weights = nn.Parameter(torch.randn(1))
    self.bias = nn.Parameter(torch.randn(1))
    #torch.optim: contains algorithms needed to figure out the parameters
  def forward(self, x: torch.Tensor) -> torch.Tensor:
    return self.weights * x + self.bias

#Create random seed
torch.manual_seed(42)

#crete an instance of the model
model_0 = LinearRegressionModel()

# we want our parameters
list(model_0.parameters())
#to be close to bias, weight
bias, weight

### making prediction using torch.inference_mode()
### it removes gradient decent tracking
### to check our model's prediction, let's see how it predicts y_test based on X_test
# with torch.inference_mode():
#   y_preds = model_0(X_test)
# y_preds

#plot_predictions(predictions=y_preds)

### to correct these predictions we need to use a loss function (cost function) measure how wrong the model is
loss_fn = nn.L1Loss()
### optimizer takes into account the loss and adjust the model's parameters
optimizer = torch.optim.SGD(params=model_0.parameters(),
                            lr=0.1) #hyper parameter is the most important one
### let's setup training loop
### 0. Loop through the data
### 1. Forward pass (forward propagation)
### 2. Calculate the loss
### 3. Optimizer zero grad
### 4. Loss backward - move backwards to calcuate the gradients
### 5. Optimzier step - use the optimizer to adjust the parameters
epochs = 1000 # one loop through the data
for epoch in range(epochs):
  # Set the model to training mode
  model_0.train() # set gradients in each run
  #1. Forward pass
  y_pred = model_0(X_train)
  #2. Caclulate loss
  loss = loss_fn(y_pred, y_train)
  #print(f"Loss: {loss}")
  #3. optimizer zero grad (refresh the gradient descent value since it accumulates for each loop)
  optimizer.zero_grad()
  #4. performs backpropagation on the loss with respect to the parameters of the model
  loss.backward()
  #5. Step the optimizer (perform gradient descent)
  optimizer.step()
  ### testing loop
  model_0.eval()
  with torch.inference_mode():
    #forward pass
    test_pred = model_0(X_test)
    #2. Calculate the loss
    test_loss = loss_fn(test_pred, y_test)
  if epoch % 10 == 0:
    print(f"Epoch {epoch} | Loss: {test_loss}")
    print(model_0.state_dict())
plot_predictions(predictions=test_pred)