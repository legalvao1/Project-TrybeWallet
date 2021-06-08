// Coloque aqui suas actions

const userLoginAction = (email) => ({
  type: 'LOGAR',
  payload: {
    email,
  },
});

export default userLoginAction;
