import { useEffect } from "react";

export const useAddUrlSearch = () => {
  useEffect(() => {
    if (window.location.search === "") {
      const defaultHostname =
        process.env.NODE_ENV === "development"
          ? window.location.hostname
          : "hex2048-lambda.octa.wtf";
      const defaultPort = process.env.NODE_ENV === "development" ? 13337 : 80;
      const defaultRadius = 2;
      window.location.search = `?hostname=${defaultHostname}&port=${defaultPort}&radius=${defaultRadius}`;
    }
  }, []);
};
