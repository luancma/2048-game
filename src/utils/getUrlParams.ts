export const getUrlParams = () => {
  const queryString = window.location.search.substring(1);
  const urlParams = new URLSearchParams(queryString);
  const port = urlParams.get("port") || 13337;
  const radius = urlParams.get("radius") || 2;
  const hostname = urlParams.get("hostname") || "localhost";
  return { port: Number(port), radius: Number(radius), hostname };
};
