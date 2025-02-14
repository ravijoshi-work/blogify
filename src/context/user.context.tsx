"use client";
import { IGetUser } from "@/types/user";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextProps {
  user: IGetUser;
  setUser: (user: IGetUser) => void;
  updateUser: (partialUser: Partial<IGetUser>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{
  children: ReactNode;
  initialUser: IGetUser;
}> = ({ children, initialUser }) => {
  const [user, setUserState] = useState<IGetUser>(initialUser);

  const setUser = (newUser: IGetUser) => {
    setUserState(newUser);
  };
  const updateUser = (partialUser: Partial<IGetUser>) => {
    setUserState((prevUser) => ({ ...prevUser, ...partialUser }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
