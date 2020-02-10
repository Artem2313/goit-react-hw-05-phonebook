import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slide from '../../transitions/slide.module.css';

const Contactlist = ({ onDelete, filtedContacts }) =>
  filtedContacts && (
    <TransitionGroup component="ul">
      {filtedContacts.map(({ id, name, number }) => (
        <CSSTransition
          in
          classNames={slide}
          timeout={250}
          unmountOnExit
          className={name}
          key={id}
        >
          <li key={id}>
            {name}: {number}
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
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
