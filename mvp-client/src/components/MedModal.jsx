import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import appTheme from '../styles/theme';

import SelectStatus from './SelectStatus';
import { AlertSuccess, AlertError } from './AlertStatus';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato',
    lineHeight: 1.5,
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #303030',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '50vw',
  },
  root: {
    flexGrow: 1,
  },
  leftDiv: {
    padding: theme.spacing(2),
    textAlign: 'left'
  },
  centerDiv: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
      fontFamily: 'Lato',
    },
  },
}));

export default function MedModal({ content, onClose, open }) {
  const classes = useStyles();

  const [success, setSuccess] = React.useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    
    setTimeout(() => {setSuccess(false)}, 1000);
  }

  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
    setTimeout(() => {setError(false)}, 1000);
  }

  return (
    <ThemeProvider theme={appTheme}>
      <div className="MedModal">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.modalPaper}>
            {success && <AlertSuccess />}
            {error && <AlertError />}
              <div className={classes.root}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <div className={classes.leftDiv}>
                      <h2 id="transition-modal-title">
                        {content.medication.brand_name} ({content.medication.generic_name}) {content.medication.dosage}
                      </h2>
                      <p id="transition-modal-description">
                        <strong>What is it used for</strong>: {content.medication.usage}
                        <br />
                        <strong>How to take it</strong>: {content.dose} 
                        <br />
                        <strong>What to watch out for</strong>: {content.medication.side_effects}
                        <br />
                        <strong>How to store it</strong>: {content.medication.storage}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.centerDiv}>
                      <img 
                        src={content.medication.image}
                        style={{
                          maxWidth: '70%',
                          maxHeight: '70%',
                          display: 'block',
                          borderRadius: '5px'
                        }} 
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={0} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={classes.buttonRoot}>
                    <Button variant="contained" color="primary" href={content.medication.video}>
                    Video Instructions
                    </Button>
                    <Button variant="contained" color="primary" href={content.medication.info}>
                    More Information
                    </Button>
                  </div>
                  <SelectStatus 
                    content={content} 
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </Grid>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
