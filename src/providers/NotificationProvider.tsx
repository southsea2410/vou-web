"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "@/components/ui/use-toast";

const firebaseConfig = {
  apiKey: "AIzaSyCseLYp1n8-zqNLRon-HYaHgxpQY4i_Ud8",
  authDomain: "vou-notifications-system.firebaseapp.com",
  databaseURL: "https://vou-notifications-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vou-notifications-system",
  storageBucket: "vou-notifications-system.appspot.com",
  messagingSenderId: "654939631313",
  appId: "1:654939631313:web:de4c177ab141d4f9c71ff0",
  measurementId: "G-RWRN34WZGV",
};

type NotificationContextType = {
  token: string;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<NotificationContextType>({ token: "" });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_NOTIFICATION_VAPID_KEY }).then(
    //   (currentToken) => {
    //     if (currentToken) {
    //       setContext({ token: currentToken });
    //     } else {
    //       console.log("No registration token available. Request permission to generate one.");
    //     }
    //   },
    // );

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast({
        title: payload.notification?.title,
        description: payload.notification?.body,
      });
    });
  }, []);

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}
