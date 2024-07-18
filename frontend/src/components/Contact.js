import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    marginTop: theme.spacing(2),
  },
  field: {
    marginTop: theme.spacing(2),
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rawResponse = await fetch('https://portfolio-backend-lilac-sigma.vercel.app', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const content = await rawResponse.json();
      alert('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      console.log(content);
    } catch (error) {
      console.log('error sending message', error);
      alert('error sending message from contact form');
    }
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Me
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={classes.field}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={classes.field}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
            className={classes.field}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.field}>
            Send Message
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;
