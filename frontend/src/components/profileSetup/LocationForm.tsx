import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city"; // Import the package functions
import styles from "@/styles/pages/ProfileSetup.module.css";

interface CountryOption {
  value: string;
  label: string;
}
interface StateOption {
  value: string;
  label: string;
}
const LocationForm: React.FC<ProfileStepProps> = ({
  profileData,
  setProfileData,
  onPrevious,
  onNext,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (selectedOption: any) => {
    setSelectedState(selectedOption);
  };

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption);
  };

  useEffect(() => {
    if (selectedCountry) {
      setSelectedState(null); // Reset state when country changes
      setSelectedCity(null); // Reset city when country changes
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setSelectedCity(null); // Reset city when state changes
    }
  }, [selectedState]);

  useEffect(() => {
    validate_input();
  }, [selectedCity, selectedState, selectedCountry]);

  const handlePrevious = () => {
    setProfileData({
      ...profileData,

      country: selectedCountry?.label,
      state: selectedState?.label,
      city: selectedCity?.label,
    });
    onPrevious?.();
  };

  const handleNext = () => {
    if (!validate_input()) return;
    setProfileData({
      ...profileData,

      country: selectedCountry?.label,
      state: selectedState?.label,
      city: selectedCity?.label,
    });
    onNext?.();
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry!.value, selectedState!.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  const validate_input = () => {
    // if (selectedCity && selectedState && selectedCountry) {
    if (selectedCountry) {
      setIsNextDisabled(false);
      return true;
    } else {
      setIsNextDisabled(true);
      return false;
    }
  };
  return (
    <div className={styles.step}>
      <h2>Step 4: Location</h2>
      <Select
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countryOptions}
        placeholder="Select country"
      />
      {selectedCountry && (
        <Select
          value={selectedState}
          onChange={handleStateChange}
          options={stateOptions}
          placeholder="Select state"
        />
      )}
      {selectedState && (
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          options={cityOptions}
          placeholder="Select city"
        />
      )}
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

export default LocationForm;
