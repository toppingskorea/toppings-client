import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

const useSentry = ({
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

export default useSentry;
