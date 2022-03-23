import { defineMessages } from "react-intl";

export const scope = "app.containers.survey";

export const personFormMessages = defineMessages({
  title: {
    id: `${scope}.personForm.title`,
    defaultMessage: "Please fill in your information to conduct a survey",
  },
  firstName: {
    id: `${scope}.personForm.firstName`,
    defaultMessage: "First Name",
  },
  lastName: {
    id: `${scope}.personForm.lastName`,
    defaultMessage: "Last Name",
  },
  email: {
    id: `${scope}.personForm.email`,
    defaultMessage: "Email",
  },
  gender: {
    id: `${scope}.personForm.gender`,
    defaultMessage: "Gender",
  },
  age: {
    id: `${scope}.personForm.age`,
    defaultMessage: "Select Age Range",
  },
  location: {
    id: `${scope}.personForm.location`,
    defaultMessage: "Select Location",
  },
});

export const verifyCodeFormMessages = defineMessages({
  code: {
    id: `${scope}.verifyForm.code`,
    defaultMessage: "Input your code",
  },
  submit: {
    id: `${scope}.verifyForm.submit`,
    defaultMessage: "Submit",
  },
  sentMessage: {
    id: `${scope}.verifyForm.sentMessage`,
    defaultMessage: "The code has been sent to your mail box !",
  },
});

export default defineMessages({
  emailFormPlaceholder: {
    id: `${scope}.emailForm.email`,
    defaultMessage: "Input your email",
  },
  submit: {
    id: `${scope}.emailForm.submit`,
    defaultMessage: "Submit",
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: "Mẫu in",
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: "バック",
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: "次に",
  },
  thankyou: {
    id: `${scope}.thankyou`,
    defaultMessage: "Thank you.",
  },
  checkResult: {
    id: `${scope}.checkResult`,
    defaultMessage: 'Check your survey result <a href="{url}">here</a>',
  },
});
