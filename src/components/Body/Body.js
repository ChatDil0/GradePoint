import React, { useState } from 'react';
import "./Body.css";

const Body = () => {
  const [subjects, setSubjects] = useState([{ grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(0);
  const [classRank, setClassRank] = useState('');

  const gradeOptions = ['A+', 'A', 'A-','B+', 'B', 'B-','C+', 'C', 'C-','D+', 'D', 'E',];

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
    if (gpa >= 3.70) {
      setClassRank('First Class');
    } else if (gpa >= 3.30) {
      setClassRank('Second Upper');
    } else if (gpa >= 3.00) {
      setClassRank('Second Lower');
    } else if (gpa >= 2.00) {
      setClassRank('General');
    } else {
      setClassRank('You fool');
    }
  };

  const resetForm = () => {
    setSubjects([{ grade: '', credit: '' }]);
    setGpa(0);
    setClassRank('');
  };

  const getGradePoints = grade => {
    switch (grade) {
      case 'A+':
        return 4.00;
      case 'A':
        return 4.00;
      case 'A-':
        return 3.70;
      case 'B+':
        return 3.30;
      case 'B':
        return 3.00;
      case 'B-':
        return 2.70;
      case 'C+':
        return 2.30;
      case 'C':
        return 2.00;
      case 'C-':
        return 1.70;
      case 'D+':
        return 1.30;
      case 'D':
        return 1.00;
      case 'E':
        return 0.00;
      default:
        return 0.00;
    }
  };

  return (
    <div className='body_container'>
      <div className='container'>
        <div className='content'>
          <div className='input_box'>
            <div className='input_container'>
              <div className='input_field'>
                {subjects.map((subject, index) => (
                  <div className='input_area' key={index}>
                    <select className='grade_field_box'
                      value={subject.grade}
                      onChange={e => handleGradeChange(index, e.target.value)}
                    >
                      <option value="">Grade</option>
                      {gradeOptions.map(gradeOption => (
                        <option key={gradeOption} value={gradeOption}>
                          {gradeOption}
                        </option>
                      ))}
                    </select>
                    <input className='input_field_box'
                      type="number"
                      placeholder="Credit"
                      value={subject.credit}
                      onChange={e => handleCreditChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='btn-container'>
            <div>
              <button className='btn_field add_btn' onClick={addSubject}>Add Subject</button>
              <div>
                <button className='btn_field gpa_btn' onClick={calculateGPA}>Calculate GPA</button>
                <button className='btn_field' onClick={resetForm}>Reset</button>
              </div>
            </div>
          </div>
        </div>
        <div className='output_field'>
          <div>
            {gpa > 0 && (
              <p className='out_put gpa'>
                Your GPA: {gpa.toFixed(2)}
              </p>
            )}
            {gpa > 0 && (
              <p className='out_put deg_class'>
                Class: {classRank}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
