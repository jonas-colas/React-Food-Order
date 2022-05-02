import { useRef, useState } from 'react';
import classes from './Checkout.module.css';
import { isEmpty, isValidZipcode} from '../Helpers/Helpers';

const Checkout = (props) => {
  const [formData, setFormData] = useState({
    name: true,
    street: true,
    city: true,
    zipcode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const zipcodeRef = useRef();
  const cityRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const nameIsValid = !isEmpty(nameRef.current.value);
    const streetIsValid = !isEmpty(streetRef.current.value);
    const cityIsValid = !isEmpty(zipcodeRef.current.value);
    const zipcodeIsValid = isValidZipcode(cityRef.current.value);

    setFormData({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      zipcode: zipcodeIsValid,
    });

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && zipcodeIsValid;

    if(!formIsValid) {
      return;
    }
    props.onConfirm({
      name: nameRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      zipcode: zipcodeRef.current.value,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`${classes.control} ${formData.name ? '' : classes.invalid}` }>
        <label htmlFor='name'>Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formData.name && <span className={classes.error}> Please enter your name</span>}
      </div>
      <div className={`${classes.control} ${formData.street ? '' : classes.invalid}` }>
        <label htmlFor='street'>Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formData.street && <span className={classes.error}> Please enter a valid street</span>}
      </div>
      <div className={`${classes.control} ${formData.zipcode ? '' : classes.invalid}` }>
        <label htmlFor='zipcode'>Postal Code</label>
        <input type="text" id="zipcode" ref={zipcodeRef} />
        {!formData.zipcode && <span className={classes.error}> Please enter a valid zipcode (5 chars)</span>}
      </div>
      <div className={`${classes.control} ${formData.city ? '' : classes.invalid}` }>
        <label htmlFor='city'>City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formData.city && <span className={classes.error}> Please enter a valid city</span>}
      </div>
      <div className={classes.actions}>
        <button className={classes.cancel} type="submit" onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit} type="submit">Confirm</button>
      </div>
    </form>
  )
}

export default Checkout;