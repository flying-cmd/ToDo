import React, {
  createContext,
  FC,
  ReactElement,
  PropsWithChildren,
  useState,
} from 'react';

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});

export const TaskStatusChangedProvider: FC<
  PropsWithChildren
> = (props): ReactElement => {
  const [updated, setUpdated] = useState(false);

  function toggleHandler() {
    setUpdated((prevState) => !prevState);
  }

  return (
    <TaskStatusChangedContext.Provider
      value={{ updated: updated, toggle: toggleHandler }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
