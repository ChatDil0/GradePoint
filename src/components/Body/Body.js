import React, { useState } from 'react';

const Body = () => {
  const [subjects, setSubjects] = useState([{ grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(0);
  const [classRank, setClassRank] = useState('');

  const gradeOptions = ['A', 'B', 'C', 'D', 'F'];

  const handleGradeChange = (index, grade) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = grade;
    setSubjects(updatedSubjects);
  };

  const handleCreditChange = (index, credit) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].credit = credit;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: '', credit: '' }]);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjects.forEach(subject => {
      const { grade, credit } = subject;
      if (grade && credit) {
        totalCredits += parseFloat(credit);
        totalGradePoints += parseFloat(getGradePoints(grade)) * parseFloat(credit);
      }
    });

    const calculatedGPA = totalGradePoints / totalCredits;
    setGpa(calculatedGPA);
    determineClassRank(calculatedGPA);
  };

  const determineClassRank = gpa => {
    if (gpa >= 3.5) {
      setClassRank('High Distinction');
    } else if (gpa >= 3.0) {
      setClassRank('Distinction');
    } else if (gpa >= 2.0) {
      setClassRank('Average');
    } else {
      setClassRank('Below Average');
    }
  };

  const resetForm = () => {
    setSubjects([{ grade: '', credit: '' }]);
    setGpa(0);
    setClassRank('');
  };

  const getGradePoints = grade => {
    switch (grade) {
      case 'A':
        return 4.0;
      case 'B':
        return 3.0;
      case 'C':
        return 2.0;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        return 0.0;
    }
  };

  return (
    <div>
      {subjects.map((subject, index) => (
        <div key={index}>
          <select
            value={subject.grade}
            onChange={e => handleGradeChange(index, e.target.value)}
          >
            <option value="">Select Grade</option>
            {gradeOptions.map(gradeOption => (
              <option key={gradeOption} value={gradeOption}>
                {gradeOption}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Credit"
            value={subject.credit}
            onChange={e => handleCreditChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addSubject}>Add Subject</button>
      <button onClick={calculateGPA}>Calculate GPA</button>
      <button onClick={resetForm}>Reset</button>
      {gpa > 0 && (
        <p>
          Your GPA: {gpa.toFixed(2)} (Class: {classRank})
        </p>
      )}
    </div>
  );
};

export default Body;
