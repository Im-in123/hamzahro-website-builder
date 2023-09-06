import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/ProfileSetup.module.css";
import { logger } from "@/logging/logger";
const BirthdateForm: React.FC<ProfileStepProps> = ({
  profileData,
  setProfileData,
  onPrevious,
  onNext,
}) => {
  const [birthDate, setBirthdate] = useState(profileData.birthDate);

  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);

  useEffect(() => {
    validate_input();
    return () => {};
  }, [birthDate]);

  const handlePrevious = () => {
    setProfileData({ ...profileData, birthDate });
    onPrevious?.();
  };

  const handleNext = () => {
    if (!validate_input()) return;

    setProfileData({ ...profileData, birthDate });
    onNext?.();
  };
  const validate_input = () => {
    if (!birthDate || new Date(birthDate) > new Date()) {
      logger.warn("Please provide a valid birthDate.");
      setIsNextDisabled(true);
      return false;
    }
    setIsNextDisabled(false);
    return true;
  };
  return (
    <div className={styles.step}>
      <h2>Step 3: Birthdate</h2>
      <input
        className={styles.input}
        type="date"
        value={birthDate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${
            isPreviousDisabled ? styles.disabledButton : ""
          }`}
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`${styles.button} ${
            isNextDisabled ? styles.disabledButton : ""
          }`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BirthdateForm;
