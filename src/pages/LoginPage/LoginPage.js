import React, {useState, useContext} from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import firebase from "../firebase/firebase.utils";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { postData } from "../../services/PostData";
import { appContext } from "../../context/AppContext";

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required!!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "10rem",
    height: "calc(100vh - 19.0625rem)",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.primary.main,
  },
  signIn: {
    margin: "1rem",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

function LoginPage () {
  const [loginError,setLoginError]=useState(null)
  const signinStyles = stylesFunc();
  const history = useHistory();
  const { token, setToken } = useContext(appContext);

  const formik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      try {
        const result = await postData(
          "https://django-react-blog-36.herokuapp.com/dj-rest-auth/login/",
          values
        );
        setToken(result?.data?.key)
        localStorage.setItem("token", result?.data?.key);
        history.push("/");
      } catch ({ response }) {
        if (response) {
          console.log(response.data.non_field_errors[0]);
        } else {
          console.log("Something went wrong!");
        }
      }
    },
  });
  // const handleGoogleButtonClick = () => {
  //   firebase.useGoogleProvider();
  // };

  // const handleFormSubmit = async (values) => {
  //   try {
  //     const result = await postData
  //   } catch (error) {
      
  //   }
    // alert(JSON.stringify(values, null, 2));
  //   firebase.signIn(values.email, values.password).then(res=>{
  //     res? setLoginError(res):setLoginError(null)
  //     });
  // };

  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <Avatar className={signinStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={signinStyles.signIn} variant="h4">
        Sign In
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={formik.handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleGoogleButtonClick}
                >
                  Sign In with Google
                </Button>
              </Grid> */}
            </Grid>
            <p style={{textAlign:"center",color:"red"}}><small>{loginError}</small></p>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default LoginPage;