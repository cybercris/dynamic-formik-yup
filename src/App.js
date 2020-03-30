import React, { useState } from "react";
import "./styles.css";
import * as yup from "yup";
import { useFormik } from "formik";

const optionalRequiredSchema = yup.object().shape({
  optionalObject: yup.lazy(value => {
    if (value !== undefined) {
      yup.mixed().notRequired();
    }
    return yup.object().shape({
      otherData: yup.string().required()
    });
  })
});

export default function App() {
  const [state, setState] = useState({
    optionalObject: {
      otherData: ""
    }
  });

  const valid = optionalRequiredSchema.isValidSync(state);

  const formik = useFormik({
    initialValues: {
      otherData: state.optionalObject.otherData
    },
    validationSchema: optionalRequiredSchema,
    onSubmit: values => {
      console.log(values);
    }
  });

  function handleChange(e) {
    setState({ optionalObject: { otherData: e.target.value } });
    formik.setFieldValue("otherData", e.target.value);
    console.log("before: ", state.optionalObject.otherData);
  }

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <h5>Handling dynamic validation with formik and yup</h5>
        <div
          className="text"
          style={{ backgroundColor: valid ? "green" : "red" }}
        >
          Valid Data: {"" + valid}
        </div>
        <input
          type="text"
          name="otherData"
          value={formik.values.otherData}
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="submit">Submit</button>
        <br />
        {!valid && formik.touched.otherData && (
          <div className="blackText">this field is required</div>
        )}
      </form>
    </div>
  );
}
