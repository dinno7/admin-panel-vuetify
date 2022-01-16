export const required = (value, fieldName) =>
  !!value || `شما باید یک ${fieldName} صحیح وارد کنید`;

export const checkMail = (value) =>
  !!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value) ||
  `ایمیل شما صحیح نیست`;

export const checkPassword = (value) =>
  !!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
    value
  ) || `پسورد شما صحیح نیست`;