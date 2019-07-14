import { createElement, cloneElement, Fragment, useMemo, isValidElement } from 'react';
import { useTranslation } from './hooks';

type Props = {
  id: string;
  values?: {
    [key: string]: React.ReactChild;
  };
};

export const Translation: React.FC<Props> = ({ id, values = {} }) => {
  const { t } = useTranslation();
  const translation = t(id);

  const children = useMemo(
    () => Object
      .entries(values)
      .reduce<React.ReactChild[]>((components, [key, value]) => {
        const placeholder = `{${key}}`;
        const index = components.findIndex(component => typeof component === 'string' && component.includes(placeholder));

        if (index >= 0 && isValidElement(value)) {
          const [left, right] = (components[index] as string).split(placeholder);

          components.splice(index, 1, left, cloneElement(value, { key }), right);
        }

        return components;
      }, [translation]),
    [translation],
  );

  return createElement(Fragment, {}, children);
};
