import React, { useState } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { ProgramBuilder } from './components/ProgramBuilder';
import type { SelfAssessment } from './types/assessment';

export const FitnessProgram = () => {
  const [assessment, setAssessment] = useState<SelfAssessment | null>(null);

  const handleAssessmentSubmit = (data: SelfAssessment) => {
    setAssessment(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Fitness Program Builder</h1>

      {!assessment ? (
        <AssessmentForm onSubmit={handleAssessmentSubmit} />
      ) : (
        <ProgramBuilder assessment={assessment} />
      )}
    </div>
  );
};