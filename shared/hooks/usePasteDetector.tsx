import { useState } from "react";
type Props = {
  handlePastedData: (textInput: Array<string>) => void;
  denyRepeat: boolean;
};
export default function usePasteDetector(props: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData?.getData("text/plain");
    const newUrls = pastedData
      ? pastedData.replace(/["']/g, "").split(/\n|,|\s+/)
      : [];
    if (props.denyRepeat) {
      props.handlePastedData(newUrls);
      setInputValue("");
    }
  };
  const handlePasteInputChange = (iv: string) => {
    setInputValue(iv);
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (props.denyRepeat) {
        props.handlePastedData(
          inputValue.replace(/["']/g, "").split(/\n|,|\s+/)
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
