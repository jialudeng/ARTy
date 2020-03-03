import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import SelectStatus from './SelectStatus';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato',
    lineHeight: 1.5,
    letterSpacing: 1.1,
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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
}));

export default function MedModal({ content, onClose, open }) {
  const classes = useStyles();

  return (
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
                      <br />
                      <a href={content.medication.video.toString()}><strong>Video Instructions</strong></a>
                      <br />
                      <a href={content.medication.info}><strong>More Info</strong></a>
                      <br />
                    </p>
                    <SelectStatus taken={content.taken} />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.centerDiv}>
                    <img 
                      src={content.medication.image}
                      style={{ width: '100%' }} 
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <SelectStatus />
                </Grid>
                <Grid item xs={4}>
                  <SelectStatus />
                </Grid>
                <Grid item xs={4}>
                  <SelectStatus />
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
