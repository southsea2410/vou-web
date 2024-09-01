"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "@/components/ui/use-toast";
import useSubcribeNoti from "@/hooks/useSubcribeNoti";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { useAuth } from "./ClientAuthProvider";

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
  subcribe_successful: boolean;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<NotificationContextType>({
    token: "",
    subcribe_successful: false,
  });

  const auth = useAuth();

  const { data: profile } = useGetProfileByAccountId(auth.accountId, { enabled: !!auth.accountId });

  const { mutate: subscribeNotiToken } = useSubcribeNoti({
    onSuccess: (__, variables, _) => {
      setContext({ token: variables.token, subcribe_successful: true });
      console.log("[Notification] Subcribe notification successful, token: ", variables);
    },
    onError: (error) => {
      console.error("[Notification] Error when subcribe notification: ", error);
    },
  });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log("[Notification] Message received. ", payload);
      toast({
        title: payload.data?.title,
        description: payload.data?.body,
      });
    });

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_NOTIFICATION_VAPID_KEY,
    }).then((currentToken) => {
      if (currentToken) {
        setContext({ token: currentToken, subcribe_successful: false });
      } else {
        console.log(
          "[Notification] No registration token available. Request permission to generate one.",
        );
      }
    });

    console.log("[Notification] Firebase messaging initialized, waiting for notifications");
  }, []);

  useEffect(() => {
    if (context.token && profile) {
      subscribeNotiToken({ userId: profile.id, token: context.token });
    }
  }, [context.token, profile, subscribeNotiToken]);

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}
