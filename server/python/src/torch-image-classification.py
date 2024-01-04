import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms

# Define the transformation for the input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load the pre-trained ResNet model
model = models.resnet50(pretrained=True)
num_features = model.fc.in_features

# Replace the last fully connected layer with a new one
model.fc = nn.Linear(num_features, 3)

# Load the image and apply the transformation
image = Image.open('path_to_image.jpg')
image = transform(image).unsqueeze(0)

# Load the model weights
model.load_state_dict(torch.load('path_to_model_weights.pth'))

# Set the model to evaluation mode
model.eval()

# Forward pass through the model
with torch.no_grad():
    output = model(image)

# Get the predicted class
_, predicted = torch.max(output, 1)

# Map the predicted class index to the actual class label
class_labels = ['sushi', 'cat', 'dog']
predicted_label = class_labels[predicted.item()]

print('Predicted class:', predicted_label)
