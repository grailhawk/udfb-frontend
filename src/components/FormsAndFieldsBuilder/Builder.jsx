import { fieldRegistry } from 'components/Fields';

function Builder({ list }) {
  const fields = [];

  Object.keys(list).forEach((key) => {
    const field = list[key];

    const Component = fieldRegistry[field.type];
    if (Component) {
      fields.push(
        <Component
          key={field.id}
          id={field.id}
          lable={field.lable || field.type}
        />
      );
    }
  });

  return <>{...fields}</>;
}

export default Builder;
