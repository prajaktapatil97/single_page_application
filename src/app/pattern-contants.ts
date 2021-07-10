export const checkPattern = {

    // Different regular expression required
    // Email Validation Pattern
    EMAIL_VALIDATION: '^[a-zA-Z0-9._%+-]{1}[a-zA-Z0-9._%+-]*@[a-zA-Z0-9]{2}[a-zA-Z0-9]*.[a-zA-Z]{2}[a-zA-Z]*',
    // THIS USED FOR VALIDATION ON NAME WITHOUT SPACE. THIS USED FOR DESIGNATION , BANK NAME
    NAME: '[A-Za-z. ]*$',
    // Character with space.
    NAME_WITH_SPACE: '[A-Za-z][A-Za-z ]+',
}