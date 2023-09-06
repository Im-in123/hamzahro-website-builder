import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/ProfileSetup.module.css";

const FullnameForm: React.FC<ProfileStepProps> = ({
  profileData,
  setProfileData,
  onPrevious,
  onNext,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);

  useEffect(() => {
    setFirstName(profileData?.firstName);
    setLastName(profileData?.lastName);

    return () => {};
  }, []);

  useEffect(() => {
    validate_input();
    return () => {};
  }, [lastName, firstName]);

  const handlePrevious = () => {
    setProfileData({ ...profileData, firstName, lastName });
    onPrevious?.();
  };

  const handleNext = () => {
    if (!validate_input()) return;
    setProfileData({ ...profileData, firstName, lastName });
    onNext?.();
  };

  const validate_input = () => {
    if (lastName?.trim() === "" || firstName?.trim() === "") {
      setIsNextDisabled(true);
      return false;
    } else {
      if (lastName?.length > 0 && firstName?.length > 0) {
        setIsNextDisabled(false);
        return true;
      } else {
        setIsNextDisabled(true);
        return false;
      }
    }
  };
  return (
    <div className={styles.step}>
      <h2>Step 2: Full Name</h2>
      <input
        className={styles.input}
        type="text"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        placeholder="Enter your first name"
      />
      <input
        className={styles.input}
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        placeholder="Enter your last name"
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

export default FullnameForm;
