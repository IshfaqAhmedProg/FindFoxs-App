import Loading from "@/components/CustomComponents/Loading/Loading";
import React, { Suspense, lazy, useState } from "react";
import processFile from "../functions/processFile";
import { uniqueKeys } from "../functions/uniqueKeys";
import SelectHeaderDialog from "@/components/ToolsComponents/UtilityComponents/SelectHeaderDialog";

interface FileColumnCheckFormData {
  fileName: string;
  unformattedData: Array<string>;
  extractLength: number;
  allColumnHeaders: Array<string>;
  columnHeader: string;
}
interface CommonFormData {
  textData: string | string[];
  formattedData: Array<string>;
}
export interface ToolFormData extends CommonFormData, FileColumnCheckFormData {}
export interface GoogleMapsScraperFormData extends CommonFormData {
  language: string;
  addons: string;
  coords: string;
}
export type UToolFormData = GoogleMapsScraperFormData | ToolFormData;

const initialFileColumnCheckData = {
  fileName: "",
  unformattedData: [],
  extractLength: 0,
  allColumnHeaders: [],
  columnHeader: "",
};
const initialCommonData = { textData: [], formattedData: [] };
export const initialFormData = {
  ...initialCommonData,
  ...initialFileColumnCheckData,
};

export type ToolFormInputProps = {
  submitSingle?: (formData: UToolFormData) => Promise<any>;
  submitTask: (formData: UToolFormData) => Promise<any>;
  checkFunction?: (data: Array<string>) => Array<string>;
} & {
  description?: string;
  unit?: string;
};
export type ToolFormProps = {
  initialState: ToolFormData;
  submitSingle?: (formData: UToolFormData) => Promise<any>;
  submitTask: (formData: UToolFormData) => Promise<any>;
  checkFunction?: (data: Array<string>) => Array<string>;
};
const useToolForm = ({
  initialState,
  checkFunction,
  submitTask,
  submitSingle,
}: ToolFormProps) => {
  const [formData, setFormData] = useState<typeof initialState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [showHeaderSelect, setShowHeaderSelect] = useState<boolean>(false);
  const handleTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      textData: e.target.value,
      formattedData: checkFunction ? checkFunction([e.target.value]) : [],
    });
  };
  const handleTextMultipleInputChange = (
    textInput: Array<string>,
    limit: number | undefined = 20
  ) => {
    setFormData({
      ...formData,
      textData: textInput,
      formattedData:
        textInput.length <= limit && checkFunction
          ? checkFunction(
              Array.from(new Set([...formData.formattedData, ...textInput]))
            )
          : formData.formattedData,
    });
  };
  const handleFileDataChange = async (files: FileList | null) => {
    if (files) {
      setLoading(true);
      const fileName = files[0].name;
      await processFile(files)
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
        .catch((err) => {
          console.log(err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  };
  const handleUpdateFormData = (obj: Record<string, any>) => {
    setFormData({ ...formData, ...obj });
  };
  const resetFormData = () => {
    setFormData(initialState ?? initialFormData);
  };
  // Submit Functions
  const handleTaskSubmit = async (e: React.SyntheticEvent) => {
    if (submitTask) {
      setLoading(true);
      await submitTask(formData)
        .catch((err) => {
          console.log("Error on task submit", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  };
  const handleSingleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (submitSingle) {
      setLoading(true);
      await submitSingle(formData)
        .catch((err) => {
          console.log("Error on single submit", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  };

  // Header Select dialog functions
  const handleHeaderSelect = (headerValue: string | null) => {
    if (headerValue) setFormData({ ...formData, columnHeader: headerValue });
  };
  const handleHeaderSelectDialogClose = () => {
    if (!loading) {
      resetFormData();
      setShowHeaderSelect(false);
    }
  };
  const checkDataInColumn = () => {
    if (formData.columnHeader) {
      // console.log("here too");
      setLoading(true);
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
    setLoading(false);
  };
  const headerSelectDialog = (
    //Show a dialog to select header columns and submit the task for validators only
    <SelectHeaderDialog
      loading={loading}
      open={showHeaderSelect}
      onClose={handleHeaderSelectDialogClose}
      headerSelect={handleHeaderSelect}
      checkData={checkDataInColumn}
      handleSubmit={handleTaskSubmit}
      formData={formData}
    />
  );

  return {
    formData,
    handleTextInputChange,
    handleTaskSubmit,
    handleTextMultipleInputChange,
    handleFileDataChange,
    handleUpdateFormData,
    handleSingleSubmit,
    resetFormData,
    headerSelectDialog,
    loading,
    error,
  };
};
export default useToolForm;
