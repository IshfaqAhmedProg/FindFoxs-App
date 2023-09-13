import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import Loading from "@/components/CustomComponents/Loading/Loading";
import { Autocomplete, Stack } from "@mui/material";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useSWR, { Fetcher } from "swr";

export interface CountryStateCity {
  id?: number;
  name: string;
  iso2?: string;
}
export interface LocationFormData {
  country: CountryStateCity | null;
  state: CountryStateCity | null;
  city: CountryStateCity | null;
  coords: string;
}

const fetcher: Fetcher<Array<CountryStateCity>, string> = (...args) =>
  fetch(...args).then((res) => res.json());
const options = {
  dedupingInterval: 10000,
};

export default function useLocationForm() {
  const [location, setLocation] = useState<LocationFormData>({
    country: null,
    state: null,
    city: null,
    coords: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [countryStates, setCountryStates] = useState([]);
  const [statesCity, setStateCity] = useState([]);
  const { data: allCountries, error: allCountryError } = useSWR(
    "/api/geoData/getCountry",
    fetcher,
    options
  );
  //fetch states from country
  useEffect(() => {
    if (!loading && location.country) {
      setLoading(true);
      fetch("/api/geoData/getStateFromCountry", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          iso2: location.country.iso2,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setCountryStates(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.country]);
  //fetch city from states and country
  useEffect(() => {
    if (!loading && location.state && location.country) {
      setLoading(true);
      fetch("/api/geoData/getCityFromState", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isoC: location.country.iso2,
          isoS: location.state.iso2,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStateCity(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.state, location.country]);

  const handleCountryChange = (val: CountryStateCity) => {
    if (val.iso2)
      setLocation({
        ...location,
        country: val,
        state: null,
        city: null,
      });
  };
  const handleStateChange = (val: CountryStateCity) => {
    if (val.iso2)
      setLocation({
        ...location,
        state: val,
        city: null,
      });
  };
  const handleCityChange = (val: CountryStateCity) => {
    setLocation({ ...location, city: val });
  };
  const resetCountryStateCity = (
    reset: "countryStates" | "stateCity" | "all"
  ) => {
    if (reset == "countryStates" || reset == "all") setCountryStates([]);
    if (reset == "stateCity" || reset == "all") setStateCity([]);
  };
  const fetchCoords = async () => {
    if (loading) {
      return "";
    }
    setLoading(true);
    const res = await fetch("/api/geoData/getGeoCoordinates", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: location.city?.name ?? null,
        state: location.state?.name ?? null,
        country: location.country?.name,
      }),
    })
      .then((res) => res.json())
      .finally(() => {
        setLoading(false);
      });
    const coords = `@${res[0].lat},${res[0].lon},12z`;
    setLocation({ ...location, coords });
    return coords;
  };
  const LocationForm = allCountries ? (
    <>
      <Autocomplete
        size="small"
        options={allCountries}
        getOptionLabel={(option: CountryStateCity) => option.name}
        onChange={(e, val) => {
          if (val) {
            handleCountryChange(val);
            resetCountryStateCity("all");
          }
        }}
        loading={loading}
        loadingText={"Please wait..."}
        sx={{ flex: "1 0 auto" }}
        renderOption={(props, option) => (
          <Stack direction={"row"} component="li" {...props} gap={1}>
            {option.iso2 && (
              <Image
                loading="lazy"
                height={"12"}
                width={"20"}
                src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                alt={`flag of ${option.name}`}
              />
            )}
            {option.name}
          </Stack>
        )}
        renderInput={(props) => (
          <CustomTextInput placeholder="Select Country" {...props} />
        )}
      />
      <Stack direction={"row"} gap={2}>
        <Autocomplete
          size="small"
          options={countryStates}
          getOptionLabel={(option: CountryStateCity) => option.name}
          limitTags={5}
          onChange={(e, val) => {
            if (val) {
              handleStateChange(val);
              resetCountryStateCity("stateCity");
            }
          }}
          loading={loading}
          loadingText={"Please wait..."}
          value={location.state}
          sx={{ flex: "1 0 auto" }}
          disabled={countryStates.length == 0}
          renderInput={(params) => (
            <CustomTextInput placeholder="Select State" {...params} />
          )}
        />
        <Autocomplete
          size="small"
          options={statesCity}
          getOptionLabel={(option: CountryStateCity) => option.name}
          limitTags={5}
          onChange={async (e, val) => {
            if (val) {
              handleCityChange(val);
            }
          }}
          loading={loading}
          loadingText={"Please wait..."}
          value={location.city}
          disabled={statesCity.length == 0}
          sx={{ flex: "1 0 auto" }}
          renderInput={(params) => (
            <CustomTextInput placeholder="Select City" {...params} />
          )}
        />
      </Stack>
    </>
  ) : (
    <Loading />
  );
  return {
    LocationForm,
    location,
    allCountries,
    countryStates,
    statesCity,
    loading,
    resetCountryStateCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    fetchCoords,
  };
}
