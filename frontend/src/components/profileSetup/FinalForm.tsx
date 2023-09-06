import React, { useState } from "react";
import styles from "@/styles/pages/ProfileSetup.module.css";
import { MdClose } from "react-icons/md";

const FinalForm: React.FC<ProfileStepProps> = ({
  profileData,
  setProfileData,
  onPrevious,
  onNext,
  loading,
  setLoading,
  setupError,
  setSetupError,
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);

  const handlePrevious = () => {
    onPrevious?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  return (
    <div className={styles.step}>
      {setupError && (
        <div>
          {" "}
          <MdClose
            className={styles.errorDivIcon}
            onClick={() => (setSetupError as React.Dispatch<any>)(null)}
          />
          <div className={styles.errorDiv}>
            <span>{setupError}</span>
          </div>
        </div>
      )}

      <h2>Almost Done </h2>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${loading ? styles.disabledButton : ""}`}
          onClick={handlePrevious}
          disabled={loading}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`${styles.button} ${loading ? styles.disabledButton : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default FinalForm;
