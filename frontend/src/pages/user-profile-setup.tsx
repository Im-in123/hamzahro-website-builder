// user-profile-setup.tsx

import React, { useState } from "react";
import styles from "@/styles/pages/ProfileSetup.module.css";
import UsernameForm from "@/components/profileSetup/UsernameForm";
import FullnameForm from "@/components/profileSetup/FullnameForm";
import BirthdateForm from "@/components/profileSetup/BirthdateForm";
import LocationForm from "@/components/profileSetup/LocationForm";
import AvatarForm from "@/components/profileSetup/AvatarForm";
import { logger } from "@/logging/logger";
import { axiosHandler, errorHandler } from "@/utils/auth/api";
import { CREATE_PROFILE_URL, USER_PROFILE_URL } from "@/constants/urls";
import { loadTokenFromLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN_COOKIE } from "@/constants/others";
import { useRouter } from "next/router";
import FinalForm from "@/components/profileSetup/FinalForm";

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  state: string;
  country: string;
  avatar?: string;
}

// Other step components...

const UserProfileSetup: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [profileData, setProfileData] = useState<UserProfile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [setupError, setSetupError] = useState<any>();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    logger.log("Submitting profile:::", profileData);
    // Send profileData to backend for storage
    const result = await axiosHandler({
      method: "POST",
      url: CREATE_PROFILE_URL,
      data: profileData,
      token: loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE),
    }).catch((e: any) => {
      logger.error(e);
      const err = errorHandler(e, true);
      logger.log(err);
      setSetupError(err.message.message);
      if (err.message.message.toLowerCase() === "invalid token") {
        router.push("/auth/login");
      }
    });
    if (result) {
      logger.log("Result::", result);
      // const token = result.data.accessToken
      // saveTokenToLocalStorage(ACCESS_TOKEN_COOKIE, token)
    }
    setLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {currentStep === 1 && (
          <UsernameForm
            profileData={profileData}
            setProfileData={setProfileData}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <FullnameForm
            profileData={profileData}
            setProfileData={setProfileData}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentStep === 3 && (
          <BirthdateForm
            profileData={profileData}
            setProfileData={setProfileData}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentStep === 4 && (
          <LocationForm
            profileData={profileData}
            setProfileData={setProfileData}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentStep === 5 && (
          <FinalForm
            profileData={profileData}
            setProfileData={setProfileData}
            onPrevious={handlePrevious}
            onNext={handleSubmit} // Assuming handleSubmit is for final submission
            loading={loading}
            setLoading={setLoading}
            setupError={setupError}
            setSetupError={setSetupError}
          />
        )}

        {/* Render other step components based on currentStep */}
        {/* {currentStep >= totalSteps && (
        <div className={styles.step}>
          <button onClick={handleSubmit} className={styles.buttons}>
            Submit
          </button>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default UserProfileSetup;
