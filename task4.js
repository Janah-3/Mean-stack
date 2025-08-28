use facultySystem2


db.course.aggregate([{ $group: { _id: null, totalMarks: { $sum: "$finalMark" } } }])

//Display the count of students (use Group by with _id: null, to not specify grouping column).
db.createCollection("students")

db.students.insertMany([{
    studentId: "1",
    firstName: "jana",
    lastName: "ahmad",
    email: "jana@gmail.com"
},
{
    studentId: "2",
    firstName: "omar",
    lastName: "ahmad",
    email: "omar@gmail.com"
}])


db.students.aggregate([{ $group: { _id: null, total: { $sum: 1 } } }])

//    3. Implement Embedded modeling between Student and Course, by adding array of Courses in the student object.
// Write a query to select courses of specific student.

db.students.insertOne({
    studentId: 4, firstName: "youssef", lastName: "ayoub", email: "joe@gmail.com", courses: [{ courseId: "1", courseName: "programming" }
        , { courseId: "2", courseName: "english" }]
})

db.students.find({ firstName: "youssef" }, { courses: 1 })

//    4. Implement referenced modeling (Manual references) between Student and faculty by adding the faculty id in student object.
//        ◦ Select specific student with his name, and then display his faculty.
db.students.insertOne({ _id: "4", firstName: ",malek", lastName: "hany", email: "malek@gmail.com", facultyId: 1 })



db.students.aggregate([
    {
        $match: { firstName: ",malek" }
    },
    {
        $addFields: {
            numericFacultyId: { $toInt: "$facultyId" }
        }
    },
    {
        $lookup: {
            from: "faculty",
            localField: "numericFacultyId",
            foreignField: "facultyId",
            as: "facultyInfo"
        }
    },
    {
        $project: {
            _id: 0,
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
            facultyName: { $arrayElemAt: ["$facultyInfo.name", 0] }
        }
    }
])

//  
//  3. In previous relation, use DbRefs and replace faculty id with faculty object containing $ref, $id.
//        ◦ Select specific student with his name, and then display his faculty.


db.faculty.findOne({ facultyId: 1 })

db.students.updateOne(
    { _id: "4" },
    {
        $set: {
            faculty: {
                $ref: "faculty",
                $id: ObjectId("68ada9ba0700376c54eec4ac"),
            }
        },
        $unset: { facultyId: "" }
    }
)

db.students.aggregate([
    {
        $match: { firstName: ",malek" }
    },
    {
        $lookup: {
            from: "faculty",
            localField: "faculty.$id",
            foreignField: "_id",
            as: "facultyInfo"
        }
    },
    {
        $project: {
            _id: 0,
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
            facultyName: { $arrayElemAt: ["$facultyInfo.name", 0] }
        }
    }
])


//Create unique index on FacultyName on the Faculty collection.

db.faculty.createIndex(
    { "FacultyName": 1 },
    { "unique": true }
)

//
//    1. Use map reduce to display total mark in all courses for each student (You can add collection or edit in your collections to add students’ marks in each course).
db.students.mapReduce(
  function () {
    var total = 0;
    this.courses.forEach(c => { total += c.finalMark });
    emit(this.firstName + " " + this.lastName, total);
  },
  function (key, values) {
    return Array.sum(values);
  },
  { out: "students_total_marks" }
)

db.students_total_marks.find()

//    2. Display students count in each faculty (group by faculty name, you may need to use $unwind – search for it).
db.students.aggregate([
  {
    $lookup: {
      from: "faculty",
      localField: "facultyId",
      foreignField: "facultyId",
      as: "facultyInfo"
    }
  },
  { $unwind: "$facultyInfo" },
  {
    $group: {
      _id: "$facultyInfo.name",
      totalStudents: { $sum: 1 }
    }
  }
])

//    4. Display each student Full Name along with his average grade in all courses.
db.students.aggregate([
  { $unwind: "$courses" },
  {
    $group: {
      _id: { firstName: "$firstName", lastName: "$lastName" },
      avgGrade: { $avg: "$courses.finalMark" }
    }
  },
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$_id.firstName", " ", "$_id.lastName"] },
      avgGrade: 1
    }
  }
])

//    5. Display Student data along with his faculty data (in one Object).
db.students.updateOne(
  { firstName: "jana" },
  { $set: { facultyId: 1 } }
)


db.students.aggregate([
  {
    $lookup: {
      from: "faculty",
      localField: "facultyId",
      foreignField: "facultyId",
      as: "facultyInfo"
    }
  },
  { $unwind: "$facultyInfo" },
  {
    $project: {
      _id: 0,
      studentId: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      faculty: "$facultyInfo"
    }
  }
])


