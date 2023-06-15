import SelectHeaderDialog from "@/components/ToolsComponents/UtilityComponents/SelectHeaderDialog";
import processFile from "@/shared/functions/processFile";
import { uniqueKeys } from "@/shared/functions/uniqueKeys";
import IToolFormContext, {
  CountryStateCity,
  IToolFormData,
} from "@/shared/interfaces/ToolForm";
import { Dialog } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const ToolFormContext = createContext<any>({});
export const useToolForm = (): IToolFormContext => useContext(ToolFormContext);
export const ToolFormContextProvider = ({
  children,
  checkFunction,
  singleRequest, //api url
  fileRequest, //upload to db
  initialFormData,
}: {
  children: React.ReactNode;
  singleRequest: string;
  fileRequest: () => void;
  checkFunction: (data: any) => Array<any>;
  initialFormData: any;
}) => {
  const [formData, setFormData] = useState<IToolFormData>(initialFormData);
  const [showHeaderSelect, setShowHeaderSelect] = useState<boolean>(false);
  const handleSingleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, singleData: e.target.value });
  };
  const handleKeywordChange = (val: Array<string>) => {
    setFormData({ ...formData, keywords: val });
  };
  const handleCountryChange = (val: CountryStateCity) => {
    if (val.iso2)
      setFormData({
        ...formData,
        countryCode: val.iso2,
        country: val.name,
        state: "",
        stateCode: "",
        city: "",
      });
  };
  const handleStateChange = (val: CountryStateCity) => {
    if (val.iso2)
      setFormData({
        ...formData,
        stateCode: val.iso2,
        state: val.name,
        city: "",
      });
  };
  const handleCityChange = (val: CountryStateCity) => {
    setFormData({ ...formData, city: val.name });
  };
  const handleFileDataChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const fileName = e.target.files[0].name;
      await processFile(e)
        ?.then((res) => {
          if (Array.isArray(res)) {
            const uniqueHeaders = uniqueKeys(res);
            setFormData((formData) => ({
              ...formData,
              unformattedData: res,
              fileName: fileName,
              allColumnHeaders: uniqueHeaders,
            }));
            setShowHeaderSelect(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const checkDataInColumn = () => {
    console.log("here");
    if (formData.columnHeader) {
      console.log("here too");
      const extract = formData.unformattedData.map((row: any) => {
        return row[formData.columnHeader];
      });
      const checkedExtract = checkFunction(extract);
      setFormData({
        ...formData,
        formattedData: checkedExtract,
        extractLength: extract.length,
      });
    }
  };
  const handleHeaderSelect = (headerValue: string | null) => {
    if (headerValue) setFormData({ ...formData, columnHeader: headerValue });
  };
  const handleHeaderSelectDialogClose = () => {
    setFormData(initialFormData);
    setShowHeaderSelect(false);
  };
  const submitSingleInput = (e: React.SyntheticEvent) => {};
  const submitFileInput = (e: React.SyntheticEvent) => {
    console.log("submitting file!");
  };
  return (
    <ToolFormContext.Provider
      value={{
        formData,
        handleKeywordChange,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        handleSingleDataChange,
        handleFileDataChange,
        submitSingleInput,
        submitFileInput,
      }}
    >
      <form>
        {children}
        {formData.allColumnHeaders && (
          <SelectHeaderDialog
            open={showHeaderSelect}
            onClose={handleHeaderSelectDialogClose}
            headerSelect={handleHeaderSelect}
            checkData={checkDataInColumn}
            handleSubmit={submitFileInput}
            formData={formData}
          />
        )}
      </form>
    </ToolFormContext.Provider>
  );
};
