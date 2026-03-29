import { useEffect, useState } from "react";
import { getCountries } from "../utils/countries";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCountries = async () => {
      setIsLoading(true);
      setError("");

      try {
        const items = await getCountries();

        if (isActive) {
          setCountries(items);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(
            fetchError.message || "Unable to load countries right now."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      isActive = false;
    };
  }, []);

  const reload = async () => {
    setIsLoading(true);
    setError("");

    try {
      const items = await getCountries(true);
      setCountries(items);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load countries right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return { countries, isLoading, error, reload };
};

export default useCountries;
