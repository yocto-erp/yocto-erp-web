import Mustache from 'mustache';

export const renderTemplate = (content, values) =>
  Mustache.render(content, values);
