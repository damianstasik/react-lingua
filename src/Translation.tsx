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
      .reduce<React.ReactChild[]>((components, [k, v]) => {
        const key = `{${k}}`;
        const index = components.findIndex(component => typeof component === 'string' && component.includes(key));

        if (index >= 0 && isValidElement(v)) {
          const [left, right] = (components[index] as string).split(key);

          components.splice(index, 1, left, cloneElement(v, { key: k }), right);
        }

        return components;
      }, [translation]),
    [translation],
  );

  return createElement(Fragment, {}, children);
};
