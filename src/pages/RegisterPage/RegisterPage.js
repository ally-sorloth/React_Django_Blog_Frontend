import React from 'react';
import { Button, Grid, TextField, Container, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as Yup from "yup";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { postData } from '../../services/PostData'

const signUpValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid Email").required("Email is required!!"),
    password: Yup.string().required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
    password2: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
})


const stylesFunc = makeStyles((theme) => ({
    wrapper: {
        marginTop: "10rem",
        
        textAlign: "center"
    },

    div: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    avatar: {
        textAlign: "center",
        backgroundColor:theme.palette.primary.main,

    },

    register: {
        margin: "1rem",
    },
}));


function RegisterPage() {
    const formik = useFormik({
        initialValues: {
          username: "",
          email:"",
          password:"",
          password2:""
        },
        validationSchema: signUpValidationSchema,
        onSubmit: async (values) => {
          alert(JSON.stringify(values, null, 2));
          try {
              const result = await postData("https://django-react-blog-36.herokuapp.com/api/user/register/", values);
          } 
          catch ({ response }) {
            if (response) {
              console.log(response.data.non_field_errors[0]);
            } else {
              console.log("Something went wrong!");
            }
        }

        },
      });
    //   console.log(formik)
    const registerStyles = stylesFunc();
    return (
        <Container className={registerStyles.wrapper} maxWidth="sm" justify="right">
            <div className={registerStyles.div}>
                <Avatar className={registerStyles.avatar}>
                    <PersonAddIcon/>
                </Avatar>
            </div>
            <Typography className={registerStyles.register} variant="h4">
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} justify="flex-end" alignItems="flex-end">
                    <Grid item xs={12}>
                        <TextField
                        name="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        values={formik.initialValues.username}
                        onChange={formik.handleChange}
                        // {...formik.getFieldProps('displayNa')}
                        error={formik.errors.username}
                        helperText={formik.errors.username}
                        // error={formik.touched.displayName && formik.errors.displayName}
                        // helperText={formik.touched.displayName && formik.errors.displayName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        values={formik.initialValues.email}
                        onChange={formik.handleChange}
                        // {...formik.getFieldProps('email')}
                        error={formik.errors.email}
                        helperText={formik.errors.email}
                        // error={formik.touched.email && formik.errors.email}
                        // helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        values={formik.initialValues.password}
                        onChange={formik.handleChange}
                        // {...formik.getFieldProps('password')}
                        error={formik.errors.password}
                        helperText={formik.errors.password}
                        // error={formik.touched.password && formik.errors.password}
                        // helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="password2"
                        label="Password Again"
                        variant="outlined"
                        type="password"
                        fullWidth
                        values={formik.initialValues.password2}
                        onChange={formik.handleChange}                        

                        // {...formik.getFieldProps('password')}
                        error={formik.errors.password2}
                        helperText={formik.errors.password2}
                        // error={formik.touched.password && formik.errors.password}
                        // helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            SUBMIT
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <a href="/login">Already have an account? Sign In</a>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default RegisterPage;