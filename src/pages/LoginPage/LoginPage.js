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
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://picsum.photos/640/480)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkWrapper: {
    textAlign: "center",
    margin: theme.spacing(1.5),
  },
}));

function LoginPage () {
  const [loginError,setLoginError]=useState(null)
  const signinStyles = stylesFunc();
  const history = useHistory();
  const classes = useStyles();
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          {/*           <Grid container className={classes.linkWrapper}>
            <Grid item xs textAlign="center">
              <Link href="#" variant="body2" mx="auto">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
          <Grid container className={classes.linkWrapper}>
            <Grid item xs>
              <Link href="/register" variant="body2" mx="auto">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="/">
                Our Website
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>

    // <Container className={signinStyles.wrapper} maxWidth="sm">
    //   <Avatar className={signinStyles.avatar}>
    //     <LockOutlinedIcon />
    //   </Avatar>
    //   <Typography className={signinStyles.signIn} variant="h4">
    //     Sign In
    //   </Typography>
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={signInValidationSchema}
    //     onSubmit={formik.handleSubmit}
    //   >
    //     {({ handleSubmit, handleChange, values, errors }) => (
    //       <form onSubmit={handleSubmit}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <TextField
    //               name="email"
    //               label="Email"
    //               variant="outlined"
    //               fullWidth
    //               value={values.email}
    //               onChange={handleChange}
    //               error={errors.email}
    //               helperText={errors.email}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               name="password"
    //               label="Password"
    //               variant="outlined"
    //               type="password"
    //               fullWidth
    //               value={values.password}
    //               onChange={handleChange}
    //               error={errors.password}
    //               helperText={errors.password}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <Button
    //               type="submit"
    //               variant="contained"
    //               color="primary"
    //               fullWidth
    //             >
    //               Login
    //             </Button>
    //           </Grid>
    //           {/* <Grid item xs={12}>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               fullWidth
    //               onClick={handleGoogleButtonClick}
    //             >
    //               Sign In with Google
    //             </Button>
    //           </Grid> */}
    //         </Grid>
    //         <p style={{textAlign:"center",color:"red"}}><small>{loginError}</small></p>
    //       </form>
    //     )}
    //   </Formik>
    // </Container>
  );
}

export default LoginPage;