const filterContactsByQuery = (contacts, filter) => {
  return contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter),
  );
};

export default filterContactsByQuery;
