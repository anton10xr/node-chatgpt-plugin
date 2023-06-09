const manifest = (hostname) => ({
  schema_version: "v1",
  name_for_human: "TODO Plugin (no auth)",
  name_for_model: "todo",
  description_for_human:
    "Plugin for managing a TODO list, you can add, remove and view your TODOs.",
  description_for_model:
    "Plugin for managing a TODO list, you can add, remove and view your TODOs.",
  auth: {
    type: "none",
  },
  api: {
    type: "openapi",
    url: `${hostname}/openapi.json`,
    is_user_authenticated: false,
  },
  logo_url: `${hostname}/logo.png`,
  contact_email: "dummy@email.com",
  legal_info_url: "http://www.example.com/legal",
});

module.exports = manifest;
