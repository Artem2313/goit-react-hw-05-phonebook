import React, { Component } from 'react';
import CreateContact from './CreateContact/CreateContact';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import filterContactsByQuery from '../tools/FilterContactsByQuery/FilterContactsByQuery';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
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
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert('This name already exists');
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
    const { contacts, filter } = this.state;
    const onDelete = this.handleDelete;

    const filtedContacts = filterContactsByQuery(contacts, filter);

    return (
      <div>
        <h1>Phonebook</h1>
        <CreateContact onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <ContactList onDelete={onDelete} filtedContacts={filtedContacts} />
      </div>
    );
  }
}

export default App;
