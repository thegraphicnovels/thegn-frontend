export const defaults = {
  logged: Boolean(localStorage.getItem('token')) || false,
};

export const resolvers = {
  Mutation: {
    onLogin: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          logged: true,
        },
      });
      window.location = '/';
      return null;
    },
    onLogout: (_, __, { cache }) => {
      localStorage.removeItem('token');
      window.location = '/';
      return null;
    },
  },
};
