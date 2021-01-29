import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const stylesFunc = makeStyles({
    wrapper: {
        marginTop: "10rem",
    }
})


function LoginPage() {
    return (
        <Container className={signupStyles.wrapper} maxWidth="sm">
      <Avatar className={signupStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={signupStyles.signUp} variant="h4">
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="displayName"
              label="Display Name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('displayName')}
              error={formik.touched.displayName && formik.errors.displayName}
              helperText={formik.touched.displayName && formik.errors.displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('email')}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGoogleButtonClick}
            >
              SignUp with Google
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
        )
}

    