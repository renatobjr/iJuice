const validator = {
  isRequired: (value) => {
    if (value) return true;
    return "This field is required";
  },
  isSelected: (value) => {
    if (value) return true;
    return "You need to select a flavor!"
  }
}

export default validator;
