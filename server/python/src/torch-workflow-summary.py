# we can use this shortcut
# nn.linear instead of writing out the parameters ourselves
from torch import nn
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

#build a model
class LinearRegressionModelV2(nn.Module):
  def __init__(self):
    super().__init__()
    # parameters we need to learn
    # linear transform, probing layer are also names
    # 1 layer of input and 1 layer of output ()
    self.linear_layer = nn.Linear(in_features=1,
                                  out_features=1)
    #torch.optim: contains algorithms needed to figure out the parameters
  def forward(self, x: torch.Tensor) -> torch.Tensor:
    # we will return "Y" since we pass x to the first layer (in_features)
    return self.linear_layer(x)

#Create random seed
torch.manual_seed(42)

#crete an instance of the model
model_1 = LinearRegressionModelV2()

# we want our parameters
list(model_1.parameters())
print(model_1.state_dict())

### to correct these predictions we need to use a loss function (cost function) measure how wrong the model is
### we take the average of the difference between the predictions and the actual values (mean absolute error, where error = prediction - actual)
### L1 loss is less sensitive to outliers than the L2 loss (Mean Squared Error), making it a good choice when the dataset contains significant outliers.
### The use of absolute values makes the L1 loss less influenced by large errors.
### One disadvantage of L1 loss is that it is not differentiable at zero. However, subgradients can be used in optimization algorithms for non-differentiable functions.
loss_fn = nn.L1Loss()
### optimizer takes into account the loss and adjust the model's parameters
optimizer = torch.optim.SGD(params=model_1.parameters(),
                            lr=0.1) #hyper parameter is the most important one

epochs = 200 # one loop through the data
for epoch in range(epochs):
  # Set the model to training mode
  model_1.train() # set gradients in each run
  #1. Forward pass
  y_pred = model_1(X_train)
  #2. Caclulate loss
  loss = loss_fn(y_pred, y_train)
  #3. optimizer zero grad (refresh the gradient descent value since it accumulates for each loop)
  optimizer.zero_grad()
  #4. performs backpropagation on the loss with respect to the parameters of the model
  ## which means we correct based on the loss
  loss.backward()
  #5. Step the optimizer (perform gradient descent)
  optimizer.step()
  
  ### testing loop
  model_1.eval()
  with torch.inference_mode():
    #forward pass
    test_pred = model_1(X_test)
    #2. Calculate the loss
    test_loss = loss_fn(test_pred, y_test)
  if epoch % 10 == 0:
    print(f"Epoch {epoch} | Loss: {test_loss}")
    print(model_1.state_dict())
plot_predictions(predictions=test_pred)