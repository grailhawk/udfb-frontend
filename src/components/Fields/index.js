import InputField from 'components/Fields/InputField';
import CountrySelectField from 'components/Fields/CountrySelectField';
import LoginForm from 'components/Fields/LoginForm';

export const FieldTypesId = 'fields';
export const FormTypesId = 'built-forms';
export const CustomeUserFormTypeId = 'udfb-custom-user-form';

export const registryForFields = {
  CountrySelectField,
  InputField,
};

export const registryForForms = {
  LoginForm,
};
export const fieldRegistry = {
  ...registryForFields,
  ...registryForForms,
};

export default fieldRegistry;
