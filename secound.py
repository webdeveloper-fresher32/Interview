def calculatetotalmarks(mid_marks):
    subjects = ['maths', 'physics', 'chemistry']
    best_two_total = 0
    for subject in subjects:
        subject_marks = [mid[subject] for mid in mid_marks]
        subject_marks.sort(reverse=True)
        best_two_total += sum(subject_marks[:2])
    return best_two_total

def assignranks(students):
    for student in students:
        student['totalMarks'] = calculatetotalmarks(student['midMarks'])

    students.sort(key=lambda x: x['totalMarks'], reverse=True)

    rank = 1
    for i in range(len(students)):
        if i > 0 and students[i]['totalMarks'] == students[i - 1]['totalMarks']:
            students[i]['rank'] = students[i - 1]['rank'] 
        else:
            students[i]['rank'] = rank
        rank += 1 if i == 0 or students[i]['totalMarks'] != students[i - 1]['totalMarks'] else 0
        rank += 1 

    return students

students = [
    {
        "name": "Max",
        "rollNo": 558,
        "midMarks": [
            {"type": "mid1", "maths": 30, "physics": 40, "chemistry": 44},
            {"type": "mid2", "maths": 35, "physics": 38, "chemistry": 40},
            {"type": "mid3", "maths": 33, "physics": 45, "chemistry": 28}
        ]
    },
    {
        "name": "Smith",
        "rollNo": 559,
        "midMarks": [
            {"type": "mid1", "maths": 80, "physics": 60, "chemistry": 60},
            {"type": "mid2", "maths": 60, "physics": 50, "chemistry": 80},
            {"type": "mid3", "maths": 70, "physics": 55, "chemistry": 70}
        ]
    }
]

output = assignranks(students)

for student in output:
    print(f"Name: {student['name']}, Roll No: {student['rollNo']}, Rank: {student['rank']}, Total Marks: {student['totalMarks']}")
