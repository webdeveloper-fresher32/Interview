
def corresponding_brackets(sequence):
    n = len(sequence)
    result = [-1] * n  
    stack = []

    for i in range(n):
        if sequence[i] == '(':
            stack.append(i)  
        elif sequence[i] == ')':
            if stack:
                open_index = stack.pop()  
                result[i] = open_index 
                result[open_index] = i 

    return result

sequence1 = "(())()"
output1 = corresponding_brackets(sequence1)
print(output1) 