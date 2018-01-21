import { h as hh } from "hyperapp";

const propRename = name => (name.startsWith("on") ? name.toLowerCase() : name);
export const h = (type, props, ...children) =>
  hh(
    type,
    typeof type === "function" && type.length === 1
      ? { ...props, children }
      : Object.keys(props).reduce(
          (otherProps, name) => ({
            ...otherProps,
            [propRename(name)]: props[name]
          }),
          {}
        ),
    ...children
  );

const secretInternals = (window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_SERIOUSLY_IM_NOT_JOKING = {});

const makeInternalStore = ({ actions, reducer }) => ({
  getState: () => actions.getState(),
  dispatch: action => actions.setState(reducer(actions.getState(), action))
});

export const withReducer = reducer => nextApp => (
  initialState,
  actionsTemplate,
  view,
  container
) => {
  const reducerDefaultState = reducer(undefined, {});
  const actions = nextApp(
    { ...reducerDefaultState, ...initialState },
    {
      ...actionsTemplate,
      getState: () => state => state,
      setState: state => state
    },
    view,
    container
  );
  secretInternals.store = makeInternalStore({ actions, reducer });
  return actions;
};

export const connect = (mapStateToProps, mapDispatchToProps) => Component => (
  props,
  children
) =>
  h(
    Component,
    {
      ...props,
      ...mapStateToProps(secretInternals.store.getState(), props),
      ...Object.keys(mapDispatchToProps).reduce(
        (otherActions, name) => ({
          ...otherActions,
          [name]: data =>
            secretInternals.store.dispatch(mapDispatchToProps[name](data))
        }),
        {}
      )
    },
    children
  );
