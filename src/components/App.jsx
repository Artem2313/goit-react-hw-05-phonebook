import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CreateContact from './CreateContact/CreateContact';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import filterContactsByQuery from '../tools/FilterContactsByQuery/FilterContactsByQuery';
import '../transitions/title.css';
import pop from '../transitions/pop.module.css';
import slide from '../transitions/slide.module.css';
import CheckContact from './CheckContact/CheckContact';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    message: false,
    messageText: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    if (contactsFromLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const ContactExists = contacts.find(
      contact => contact.name === newContact.name,
    );
    if (ContactExists) {
      this.setState({
        message: true,
        messageText: `Contact ${newContact.name} is already exists in your phonebook!`,
      });
      setTimeout(() => {
        this.setState({
          message: false,
        });
      }, 2000);
    } else {
      this.setState(state => ({
        contacts: [...state.contacts, newContact],
      }));
    }
  };

  handleDelete = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, message, messageText } = this.state;
    const onDelete = this.handleDelete;

    const filtedContacts = filterContactsByQuery(contacts, filter);

    return (
      <div>
        <TransitionGroup>
          <CSSTransition in timeout={500} appear classNames="title">
            <h1 className="title">Phonebook</h1>
          </CSSTransition>
          <CreateContact onAddContact={this.addContact} />
          <h2>Contacts</h2>
          {contacts.length > 1 && (
            <CSSTransition timeout={500} classNames={pop}>
              <Filter value={filter} onChange={this.handleChange} />
            </CSSTransition>
          )}
          <ContactList onDelete={onDelete} filtedContacts={filtedContacts} />
          {message && (
            <CSSTransition in timeout={250} classNames={slide}>
              <CheckContact messageText={messageText} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
