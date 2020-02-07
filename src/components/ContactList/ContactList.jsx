import React from 'react';
import PropTypes from 'prop-types';

const Contactlist = ({ onDelete, filtedContacts }) => (
  <ul>
    {filtedContacts.map(({ id, name, number }) => {
      return (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      );
    })}
  </ul>
);

Contactlist.propTypes = {
  onDelete: PropTypes.func.isRequired,
  filtedContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      number: PropTypes.string,
    }),
  ).isRequired,
};

export default Contactlist;
