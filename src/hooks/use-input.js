import { useState } from "react";

const useInput = (validate) => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    // conditional checks
    const isValid = validate(value);
    const isNotValid = !isValid && touched;

    // input handlers
    const inputChangeHandler = (e) => {
        setValue(e.target.value);
    };

    const inputBlurHandler = (e) => {
        setTouched(true);
    };

    const reset = () => {
        setValue("");
        setTouched(false);
    };

    return {
        value,
        isValid,
        isNotValid,
        inputBlurHandler,
        inputChangeHandler,
        reset,
    };
};

export default useInput;