//AuthController.tsx
import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice"; // Adjust the path
import { RootState } from "@/store/store"; // Adjust the path
import { checkAuthState } from "@/utils/auth/checkAuthState"; // Adjust the path
import { useRouter } from "next/router";

interface AuthControllerProps {
  children: React.ReactNode;
}

const AuthController: React.FC<AuthControllerProps> = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    checkAuthState(setChecking, setError, dispatch, router);
  }, [dispatch]);

  return (
    <div>
      {!error ? checking ? <p>Loading...</p> : children : "Error loading page!"}
    </div>
  );
};

export default AuthController;
