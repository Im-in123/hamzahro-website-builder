interface ProfileStepProps {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
    onPrevious?: () => void;
    onNext?: () => void;
    loading?:boolean;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setupError?:any;
    setSetupError?: React.Dispatch<React.SetStateAction<any>>;
  }