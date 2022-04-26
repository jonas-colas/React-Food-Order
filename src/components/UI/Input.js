import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input}
        // id={props.input.id}
        // type="text"
        // className={classes.inputField}
        // onChange={props.changed}
        // value={props.value}
      />
    </div>
  );
};

export default Input;
