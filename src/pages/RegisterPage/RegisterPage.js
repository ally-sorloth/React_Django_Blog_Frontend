import React from 'react';
import { Button, Grid, TextField, Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';

const stylesFunc = makeStyles({
    wrapper: {
        marginTop: "10rem",
    }
})


function RegisterPage() {
    const formik = useFormik({
        initialValues: {
          username: "",
          email:"",
          password:"",
          password2:""
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    //   console.log(formik)
    const registerStyles = stylesFunc();
    return (
        <Container className={registerStyles.wrapper} maxWidth="sm" justify="right">
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
                        // {...formik.getFieldProps('displayName')}
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