import styles from "./CartForm.module.css";
import useInput from "../../../hooks/use-input";

const CartForm = (props) => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        isNotValid: firstNameIsNotValid,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset,
    } = useInput((value) => value !== "");

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        isNotValid: lastNameIsNotValid,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset,
    } = useInput((value) => value !== "");

    const {
        value: phoneNumberValue,
        isValid: phoneNumberIsValid,
        isNotValid: phoneNumberIsNotValid,
        inputChangeHandler: phoneNumberChangeHandler,
        inputBlurHandler: phoneNumberBlurHandler,
        reset: phoneNumberReset,
    } = useInput((value) => value.length > 8 && value !== "");

    const {
        value: emailValue,
        isValid: emailIsValid,
        isNotValid: emailIsNotValid,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput((value) => value !== "" && value.includes("@"));

    let formIsValid = false;
    if (firstNameIsValid && lastNameIsValid && phoneNumberIsValid && emailIsValid)
        formIsValid = true;

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formIsValid);
        // reset values
        firstNameReset();
        lastNameReset();
        phoneNumberReset();
        emailReset();

        // hide the form from cart component
        props.onOrderFood();
    };

    return (
        <form className={styles.checkoutForm} onSubmit={submitHandler}>
            <div>
                <label className={styles.inputLabel} htmlFor="firstName">
                    First name
                </label>
                <input
                    id="firstName"
                    type="text"
                    value={firstNameValue}
                    onBlur={firstNameBlurHandler}
                    onChange={firstNameChangeHandler}
                />
                {firstNameIsNotValid ? (
                    <p className={styles["error-text"]}>First name cannot be empty</p>
                ) : (
                    ""
                )}
            </div>
            <div>
                <label className={styles.inputLabel} htmlFor="lastName">
                    Last name
                </label>
                <input
                    id="lastName"
                    type="text"
                    value={lastNameValue}
                    onBlur={lastNameBlurHandler}
                    onChange={lastNameChangeHandler}
                />
                {lastNameIsNotValid ? (
                    <p className={styles["error-text"]}>Last name cannot be empty</p>
                ) : (
                    ""
                )}
            </div>
            <div>
                <label className={styles.inputLabel} htmlFor="phoneNumber">
                    Phone Number
                </label>
                <input
                    id="phoneNumber"
                    type="number"
                    value={phoneNumberValue}
                    onBlur={phoneNumberBlurHandler}
                    onChange={phoneNumberChangeHandler}
                />
                {phoneNumberIsNotValid ? (
                    <p className={styles["error-text"]}>
                        Phone number must be at least 8 digits
                    </p>
                ) : (
                    ""
                )}
            </div>
            <div>
                <label className={styles.inputLabel} htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={emailValue}
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler}
                />
                {emailIsNotValid ? (
                    <p className={styles["error-text"]}>Enter a valid email</p>
                ) : (
                    ""
                )}
            </div>

            <button
                disabled={!formIsValid}
                className={
                    formIsValid ? styles.submit : [styles.submit, styles.disabled]
                }
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default CartForm;