def generateBinaryData(n):
    binary_numbers=[]
    for i in range(1,n+1): 
        binary_numbers.append(bin(i)[2:])
    return binary_numbers

print(generateBinaryData(3))