export const dateFilterRouteList = [
  { url: "today", name: "Today", icon: "", type: "" },
  { url: "this-week", name: "This week", icon: "", type: "" },
  { url: "next-week", name: "Next week", icon: "", type: "" },
];

export const mainFilterRouteList = [{ url: "all", name: "All", icon: "" }];

export const mainRouteList = [
  { url: "/", name: "Knowledge", icon: "memory" }
];

export const adminRoute = {
  url: "/admin",
  name: "Admin",
  icon: "settings_applications",
};

export const logoutRoute = {
  url: "/logout",
  name: "Log Out",
  icon: "exit_to_app",
};

export const editableSchemas = [
  {
    modelName: "knowledge",
    resource: { defaultValue: "knowledge" },
  },
];
