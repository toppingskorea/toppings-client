import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export const useSentry = ({
  dsn,
  allowUrls
}: {
  dsn: string;
  allowUrls: string[];
}) => {
  useEffect(() => {
    Sentry.init({
      dsn,
      enabled: process.env.STAGE === "production",
      allowUrls
    });
  }, [allowUrls, dsn]);
};
