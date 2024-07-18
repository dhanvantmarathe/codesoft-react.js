
import React, { useState } from 'react';
// import axios from 'axios';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

import { styled } from '@mui/material/styles';




const PREFIX = 'Contact';
const classes = {
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
  field: `${PREFIX}-field`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(10),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [`& .${classes.field}`]: {
    margin: theme.spacing(2),
    width: '100%',
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 // try{
    //   await axios.post(`http://localhost:5000/contact`, formData);
      
    
    //   alert('Message sent successfully');
    //   setFormData({
    //     name: '',
    //     email: '',
    //     message: '',
    //   })
    //   console.log(formData);
    // } catch (error) {
    //   console.error('Error sending message', error);
    //   alert('Error sending message || from contac form');
    // }

    
  //};
  (async () => {
    const rawResponse = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
   try {
    const content = await rawResponse.json();
    alert('Message sent successfully');
    setFormData({
      name: '',
      email: '',
      message: '',
    })

  console.log(content);
    
   } catch (error) {
    console.log("error sending message",error);
    alert("error sending message from contact form")
    
   }
  })();
  }
  return (
    <Root>
    <Container > 
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
        <Button type="submit"  variant="contained" color="primary"  className={classes.field}>
          Send Message
        </Button>
      </form>
     </Paper>
    </Container>
    </Root>
  );
};

export default Contact;
