import { useState } from "react";
type Props = {
  handlePastedData: (textInput: Array<string>, limit: number) => void;
  denyRepeat: boolean;
  limit?: number;
};
export default function usePasteDetector({
  handlePastedData,
  denyRepeat,
  limit = 20,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData?.getData("text/plain");
    const newUrls = pastedData
      ? pastedData.replace(/["']/g, "").split(/\n|,|\s+/)
      : [];
    if (denyRepeat) {
      handlePastedData(newUrls, limit);
      setInputValue("");
    }
  };
  const handlePasteInputChange = (iv: string) => {
    setInputValue(iv);
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (denyRepeat) {
        handlePastedData(
          inputValue.replace(/["']/g, "").split(/\n|,|\s+/),
          limit
        );
        setInputValue("");
      }
    }
  };
  return {
    handlePaste,
    handlePasteInputChange,
    handleEnterPress,
    inputValue,
  };
}
