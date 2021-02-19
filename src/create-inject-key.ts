export const createInjectKey = () => {
  const randomNumber = Math.round(Math.random() * 10 ** 12);
  return randomNumber.toString();
};
