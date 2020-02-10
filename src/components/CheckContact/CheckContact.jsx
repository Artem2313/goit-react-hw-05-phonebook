import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckContact.module.css';

const CheckContact = ({ messageText }) => (
  <div className={styles.div}>{messageText}</div>
);

CheckContact.propTypes = {
  messageText: PropTypes.string.isRequired,
};

export default CheckContact;
