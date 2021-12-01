import styles from "./CartForm.module.css";
import useInput from "../../../hooks/use-input";

const CartForm = (props) => {
    const {
        value: nameValue,
        isValid: nameIsValid,
        isNotValid: nameIsNotValid,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput((value) => value !== "");

    const {
        value: streetNameValue,
        isValid: streetNameIsValid,
        isNotValid: streetNameIsNotValid,
        inputChangeHandler: streetNameChangeHandler,
        inputBlurHandler: streetNameBlurHandler,
        reset: streetNameReset,
    } = useInput((value) => value !== "");

    const {
        value: postCodeValue,
        isValid: postCodeIsValid,
        isNotValid: postCodeIsNotValid,
        inputChangeHandler: postCodeChangeHandler,
        inputBlurHandler: postCodeBlurHandler,
        reset: postCodeReset,
    } = useInput((value) => value !== "" && value.length === 7);

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
    if (
        nameIsValid &&
        streetNameIsValid &&
        phoneNumberIsValid &&
        emailIsValid &&
        postCodeIsValid
    )
        formIsValid = true;

    const submitHandler = (e) => {
        e.preventDefault();
        // reset values
        nameReset();
        streetNameReset();
        phoneNumberReset();
        emailReset();
        postCodeReset();

        // send data to the backend
        props.onOrder({
            name: nameValue,
            street: streetNameValue,
            postcode: postCodeValue,
            number: phoneNumberValue,
            email: emailValue,
        });
    };

    return (
        <form className={styles.checkoutForm} onSubmit={submitHandler}>
            <div>
                <label className={styles.inputLabel} htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={nameValue}
                    onBlur={nameBlurHandler}
                    onChange={nameChangeHandler}
                />
                {nameIsNotValid ? (
                    <p className={styles["error-text"]}>Name cannot be empty</p>
                ) : (
                    ""
                )}
            </div>
            <div>
                <label className={styles.inputLabel} htmlFor="streetName">
                    Street name
                </label>
                <input
                    id="streetName"
                    type="text"
                    value={streetNameValue}
                    onBlur={streetNameBlurHandler}
                    onChange={streetNameChangeHandler}
                />
                {streetNameIsNotValid ? (
                    <p className={styles["error-text"]}>Street name cannot be empty</p>
                ) : (
                    ""
                )}
            </div>
            <div>
                <label className={styles.inputLabel} htmlFor="postCode">
                    Postcode
                </label>
                <input
                    id="postCode"
                    type="text"
                    value={postCodeValue}
                    onBlur={postCodeBlurHandler}
                    onChange={postCodeChangeHandler}
                />
                {postCodeIsNotValid ? (
                    <p className={styles["error-text"]}>Postcode must be 7 characters</p>
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
            <div className={styles.buttons}>
                <button
                    disabled={!formIsValid}
                    className={formIsValid ? styles.submit : styles.disabled}
                    type="submit"
                >
                    Submit
                </button>
                <button className={styles.cancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CartForm;