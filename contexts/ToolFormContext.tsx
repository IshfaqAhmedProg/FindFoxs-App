import SelectHeaderDialog from "@/components/ToolsComponents/UtilityComponents/SelectHeaderDialog";
import processFile from "@/shared/functions/processFile";
import { uniqueKeys } from "@/shared/functions/uniqueKeys";
import IToolFormContext, {
  CountryStateCity,
  IToolFormData,
} from "@/shared/interfaces/ToolForm";
import React, { createContext, useContext, useState } from "react";

const ToolFormContext = createContext<any>({});
export const useToolForm = (): IToolFormContext => useContext(ToolFormContext);
export const ToolFormContextProvider = ({
  children,
  checkFunction,
  singleInputSubmitFunction, //function to call the api and get the results used for anything where i need to directly call the api
  fileInputSubmitFunction, //function to upload task to db
  initialFormData,
  singleDataLoading,
  fileDataLoading,
}: {
  children: React.ReactNode;
  singleInputSubmitFunction?: (formData: IToolFormData) => Promise<any>;
  fileInputSubmitFunction: (formData: IToolFormData) => void;
  checkFunction?: (data: any) => Array<any>;
  initialFormData: any;
  singleDataLoading?: boolean;
  fileDataLoading?: boolean;
}) => {
  const [formData, setFormData] = useState<IToolFormData>(initialFormData);
  const [showHeaderSelect, setShowHeaderSelect] = useState<boolean>(false);
  const resetFormData = () => {
    setFormData(initialFormData);
  };
  const handleSingleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      singleData: e.target.value,
      formattedData: (checkFunction && checkFunction([e.target.value])) ?? [],
    });
  };
  const handleKeywordChange = (val: Array<string>) => {
    if (val.length < 6) setFormData({ ...formData, keywords: val });
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
      const checkedExtract = (checkFunction && checkFunction(extract)) ?? [];
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
    resetFormData();
    setShowHeaderSelect(false);
  };
  const handleSingleInputSubmit = async (e: React.SyntheticEvent) => {
    //checking if singlerequest exist and the sending formdata to single request
    singleInputSubmitFunction && (await singleInputSubmitFunction(formData));
  };
  const handleFileInputSubmit = (e: React.SyntheticEvent) => {
    fileInputSubmitFunction(formData);
  };
  return (
    <ToolFormContext.Provider
      value={{
        formData,
        singleDataLoading,
        resetFormData,
        handleKeywordChange,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        handleSingleDataChange,
        handleFileDataChange,
        handleSingleInputSubmit,
        handleFileInputSubmit,
      }}
    >
      <form>
        {children}
        {formData.allColumnHeaders && (
          //Show a dialog to select header columns and submit the task
          <SelectHeaderDialog
            loading={fileDataLoading}
            open={showHeaderSelect}
            onClose={handleHeaderSelectDialogClose}
            headerSelect={handleHeaderSelect}
            checkData={checkDataInColumn}
            handleSubmit={handleFileInputSubmit}
            formData={formData}
          />
        )}
      </form>
    </ToolFormContext.Provider>
  );
};
