import React from "react";
import { useFormContext } from ".././context/njangi.form.context";
import Stepper from "../components/njangi.form.ui/stepper";
import Step1AccountInfo from "../components/njangi.form.steps/step1AccountInfo";
import Step2GroupDetails from "../components/njangi.form.steps/step2GroupDetails";
import Step3InviteMembers from "../components/njangi.form.steps/step3InviteMember";
import Step4Review from "../components/njangi.form.steps/step4Review";

const FormStepper: React.FC = () => {
  const { state, goToStep } = useFormContext();
  const { currentStep } = state;

  const steps = [
    "Account Setup",
    "Group Details",
    "Invite Members",
    "Review & Submit",
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1AccountInfo />;
      case 2:
        return <Step2GroupDetails />;
      case 3:
        return <Step3InviteMembers />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1AccountInfo />;
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      goToStep(step);
    }
  };

  return (
    <div className="w-full">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <div className="mt-8">{renderStep()}</div>
    </div>
  );
};

export default FormStepper;
