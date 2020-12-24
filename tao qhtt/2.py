import math
# def answer(coins, quantity):
#     max = sum((map(lambda t:t[0]*t[1],zip(coins,quantity))))
#     x = [False]*(max+1)
#     x[0] = True
#     for a,b in zip(coins,quantity):
#         for c in range(a):
#             l = -1
#             for i in range(c,max+1,a):
#                 if x[i]:
#                     l = 0
#                 else:
#                     if l>=0:
#                         l +=1
#
#                 x[i] = 0<=l<=b
#     print (sum(x) - 1)



def AllSums(values, sizes,max):
    f = open("./fileProcess/2.txt", "w")
    f.write("")
    totalSet = set([0])
    for value, size in zip(values, sizes):
        subset = set()
        for i in range(1, size + 1):
            for element in totalSet:
                subset.add(element + value * i)

        totalSet = totalSet | subset
    f = open("./fileProcess/2.txt", "a")
    for x in totalSet:
        if x<=max:
            f.write(str(x))
            f.write("\n")
    f.close()
    print(len(totalSet) - 1)

text_file = open("./fileProcess/1.txt", "r")
lines= text_file.read().split(',')
values=[int(numeric_string) for numeric_string in lines]

maxtime=open("./data/maxtime.txt","r")
max=int(maxtime.read())
sizes=list()
if max!=0:
    for item in values:
        if item==0:
            sizes.append(0)
        else:
            sizes.append(math.ceil(max/item))
else:
    for item in values:
        sizes.append(0)
print(sizes)
# possibleSums2(values,sizes)
# answer(values,sizes)
AllSums(values, sizes,max)
