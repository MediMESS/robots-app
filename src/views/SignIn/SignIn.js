import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkMaterialUi from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRouter, Redirect } from 'react-router-dom';

import 'common/UnSigned.css';
import {
  NavigationUnSigned,
  Slogan
} from 'components';


function Copyright() {
  return (
    <Typography variant="body1" style={{color:'black'}} align="center">
      {'Created By '}
      <LinkMaterialUi color="primary" href="https://github.com/MediMESS" style={{fontWeight: 800}}>
        Mehdi Messarat
      </LinkMaterialUi>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signInError: false
    }
  }

  onEmailChange = (e) => {this.setState({email: e.target.value})}

  onPasswordChange = (e) => {this.setState({password: e.target.value})}

  onSignIn = (e) => {
    // fetch('https://moviz-  app.herokuapp.com/signIn', {
    fetch('http://localhost:4000/signIn', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user[0].id)
        {
          console.log("Signed");
          console.log("ALOOOOOOOOOOOOOOOOOOO\n\n\n\n\n\n\n\nakdsjalk");
          return <Redirect to='/moviz' />

        }
        else{
          this.setState({signInError: true})
          return <Redirect to='/signIn' />
        }
    });
  }

  render ()
  {

   const {classes} = this.props;
    return (
      <div className="unSigned">
        <NavigationUnSigned />
        <Slogan />
        <Container component="main" maxWidth="xs" style={{backgroundColor:"white"}}>
          <CssBaseline />
          <div className={classes.paper}>
          {
            this.state.signInError ?
            <h2 style={{color:'red', marginBottom:'0'}}>WRONG CREDENTIALS!</h2>
            :<div></div>
          }
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.onEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onPasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSignIn}
                href="/moviz"
              >
                  Sign In
              </Button>
              <Grid container>
                <Grid item xs style={{textAlign:'left'}}>
                  <LinkMaterialUi href="#" variant="body2">
                    Forgot password?
                  </LinkMaterialUi>
                </Grid>
                <Grid item>
                  <LinkRouter
                    variant="body2"
                    style={{cursor:'pointer'}}
                    to="/register"
                    >
                    {"No Account? Sign Up"}
                  </LinkRouter>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box py={2}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}
export default withStyles(useStyles)(SignIn);
