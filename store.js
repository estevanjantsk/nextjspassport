import { createStore, action } from 'easy-peasy';

export const store = createStore({
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  })
});

