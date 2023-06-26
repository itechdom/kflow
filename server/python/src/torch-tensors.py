import torch 
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
#print(torch.__version__)

#create a scalar
scalar = torch.tensor(7)

#create a vector
vector = torch.tensor([1,2,3,4,5])

#create a matrix
MATRIX = torch.tensor([[1,2,3],[4,5,6],[7,8,9]])

#create a 4 dimensional tensor
TENSOR = torch.tensor([
    [[1,2,3],[4,5,6],[7,8,9]],
    [[10,11,12],[13,14,15],[16,17,18]],
    [[19,20,21],[22,23,24],[25,26,27]],
    [[28,29,30],[31,32,33],[34,35,36]]
])

#shape of the matrix
# #print(MATRIX.shape)

#neural networks start with a random numbers of tensors and then readjust the weights
#to get the desired output
#random numbers are generated using torch.rand()

#create a random tensor of size (3,4) most common way to create tensors
random_tensor = torch.rand(3,4)

#create a zero tensor of size (3,4)
zero_tensor = torch.zeros(3,4)

#create a tensor of size (3,4) with all values as 1
ones_tensor = torch.ones(3,4)

#create a range of tensors
range_tensor = torch.arange(start=0, end=10, step=2)

#tensors can be created with dtype and device and requires_grad
#dtype is the data type of the tensor (32 is the recomemended size)
#device is the device on which the tensor is created
#requires_grad is used to calculate the gradients of the tensor
dtype_tensor = torch.tensor([1,2,3], dtype=torch.float32, device='cpu', requires_grad=True)

#most common errors with tensors
#1. tensor is not the right data type
#2. tensor is not on the right device
#3. tensor is not the right shape

# tensor operations
# * Addition
# * Subtraction
# * Multiplication (element wise)
# * Division
# * Matrix Multiplication

# write an example of matrix multiplication of two tensors (dot product) a . b
# inner dimensions (3 in this case) must match
# the result will be the outer dimensions (2,2 in this case)
tensor1 = torch.rand(2,3)
tensor2 = torch.rand(3,2)
# #print(f'1: {tensor1} . 2:{tensor2}')
# #print(torch.matmul(tensor1, tensor2))
#or
# #print(tensor1 @ tensor2)
#or
# #print(tensor1.mm(tensor2))

# Element wise multiplication of two tensors
tensor1 = torch.tensor([3,7], dtype=torch.float32)
tensor2 = torch.tensor([6,2], dtype=torch.float32)
# #print(tensor1 * tensor2)


#to fix tensor shape use transpose
tensor1 = torch.tensor([[1,2,3],[4,5,6]])
tensor2 = torch.tensor([[7,8,9],[10,11,12]])
# #print(tensor1.shape)
# #print(tensor2.shape)
# #print(torch.matmul(tensor1, tensor2.transpose(0,1)))

#find the max value in a tensor
tensor1 = torch.tensor([1,2,3,4,5,6,7,8,9,10], dtype=torch.float32)
#print(tensor1.max())

#find the min value in a tensor
#print(tensor1.min())

#find the mean value in a tensor (has to be of type float)
#print(tensor1.mean())

#find the sum of all values in a tensor
#print(tensor1.sum())

#find the standard deviation of all values in a tensor
#print(tensor1.std())

#find the variance of all values in a tensor
#print(tensor1.var())

#find the absolute value of all values in a tensor
#print(tensor1.abs())

#find the argmax of all values in a tensor
#argmax is the index of the max value
#print(tensor1.argmax())

#argmin is the index of the min value
#print(tensor1.argmin())

#reshape a tensor
tensor1 = torch.tensor([[1,2,3],[4,5,6]])
# print(tensor1.reshape(3,2))

#return a view of the tensor
#this will return a view of the tensor and not a copy (reference)
# print(tensor1.view(3,2))

#stacking tensors
tensor1 = torch.tensor([1,2,3])
tensor2 = torch.tensor([4,5,6])
tensor3 = torch.tensor([7,8,9])
stacked = torch.stack((tensor1, tensor2, tensor3))

one_dim = torch.tensor([[[1,2,3],[3,4,5]]])

#squeeze a tensor stacked
#this will remove all the dimensions that have a value of 1
# print(one_dim.shape)
#so if it encounters a 1 in the first dimension it will remove it
# print(one_dim.squeeze(dim=0))

#permute a tensor (change the order of the dimensions)
tensor1 = torch.tensor([[1,2,3],[4,5,6]])
# print(tensor1.shape)
#current shape is (2,3)
#change it to (3,2)
# print(tensor1.permute(1,0))

#select a specific element from a tensor
tensor1 = torch.tensor([[[1,2,3],[4,5,6]]])
# print(tensor1[0,2])

#select all first dimensions and the second dimension and the thrid element in the third dimension
# print(tensor1.shape)
# print(tensor1[:,:,2])

#convert from numpy to tensor
numpy_array = np.array([1,2,3,4,5])
tensor1 = torch.from_numpy(numpy_array)

#convert from tensor to numpy
numpy_array = tensor1.numpy()

#generate random tensor with a manual seed
torch.manual_seed(42)
random_tensor_A = torch.rand(3,4)

#generate random tensor with a manual seed
torch.manual_seed(42)
random_tensor_B = torch.rand(3,4)

#check if two tensors are equal
# output will be true because the seed is the same
print(torch.eq(random_tensor_A, random_tensor_B))

#check for a GPU device
print(torch.cuda.is_available())