import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/ProfileSetup.module.css";
import { AiFillCheckCircle } from "react-icons/ai";

import { BiSolidError } from "react-icons/bi";
const UsernameForm: React.FC<ProfileStepProps> = ({
  profileData,
  setProfileData,
  onNext,
}) => {
  const [username, setUsername] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);

  const handleNext = () => {
    if (!onUsernameChange()) return;
    setProfileData({ ...profileData, username });
    onNext?.();
  };

  useEffect(() => {
    setUsername(profileData?.username);

    return () => {};
  }, []);

  useEffect(() => {
    onUsernameChange();
    return () => {};
  }, [username]);

  const onUsernameChange = () => {
    const err = false;
    if (username?.trim() !== "" && username?.length > 0) {
      setIsNextDisabled(false);
      setIsUsernameValid(true);
      return true;
    } else {
      setIsNextDisabled(true);
      setIsUsernameValid(false);
      return false;
    }
  };
  return (
    <div className={styles.step}>
      <h2>Step 1: Username</h2>
      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Enter your username"
      />

      <span className={styles.iconDiv}>
        {isUsernameValid ? (
          <>
            <AiFillCheckCircle className={styles.succIcon} />{" "}
            <span>Username is available</span>
          </>
        ) : (
          <>
            {" "}
            <BiSolidError className={styles.errIcon} />
            <span>This username isn&apos;t available!</span>
          </>
        )}
      </span>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${
            isNextDisabled ? styles.disabledButton : ""
          }`}
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsernameForm;
