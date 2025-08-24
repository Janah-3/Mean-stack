
const students = [
  { id: 1, name: "Ahmed", grade: 85, passed: true },
  { id: 2, name: "Mona", grade: 45, passed: false },
  { id: 3, name: "Ali", grade: 70, passed: true },
  { id: 4, name: "Sara", grade: 30, passed: false },
  { id: 5, name: "Omar", grade: 90, passed: true },
];
//find studentd is not pass
var fail = students.find((s) =>{ return s.passed == false })
console.log(fail)
//conver the name to upercase
var upperCase = students.map((s) => { return {...s, name: s.name.toUpperCase()} })
console.log(upperCase)
//return the passes students
var passed = students.filter((s) => {return s.passed == true})
console.log(passed)
///calculte the avg
var average = students.reduce((sum,s) =>  sum + s.grade, 0) / students.length;
console.log(average)
//check that all students is passed
var IsPassed= students.every((s)=> s.passed == true)
console.log(IsPassed)
//check that if any student is failed
var IsFail= students.some((s)=> s.passed == false)
console.log(IsFail)