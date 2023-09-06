import React, { useState } from 'react';
import styles from '@/styles/pages/ProfileSetup.module.css';

const AvatarForm: React.FC<ProfileStepProps> = ({ profileData, setProfileData, onPrevious, onNext }) => {
  const [avatar, setAvatar] = useState(profileData.avatar || '');
   const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false)
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false)

  const handlePrevious = () => {
    setProfileData({ ...profileData, avatar });
    onPrevious?.();
  };

  const handleNext = () => {
    setProfileData({ ...profileData, avatar });
    onNext?.();
  };

  return (
    <div className={styles.step}>
      <h2>Step 5: Avatar</h2>
      <input
        className={styles.input}
        type="text"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Enter your avatar URL"
      />
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${isPreviousDisabled ? styles.disabledButton : ''}`}
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          Previous
        </button>
        <button  onClick={handleNext}
         className={`${styles.button} ${isNextDisabled ? styles.disabledButton : ''}`}
        disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AvatarForm;
