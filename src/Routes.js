export const dateFilterRouteList = [
  { url: "today", name: "Today", icon: "", type: "" },
  { url: "this-week", name: "This week", icon: "", type: "" },
  { url: "next-week", name: "Next week", icon: "", type: "" },
];

export const mainFilterRouteList = [{ url: "all", name: "All", icon: "" }];

export const mainRouteList = [{ url: "/", name: "Knowledge" }];

export const adminRoute = {
  url: "/admin",
  name: "Admin",
};

export const logoutRoute = {
  // url: "/logout",
  // name: "Log Out",
};

export const editableSchemas = [
  {
    modelName: "knowledge",
    resource: { defaultValue: "knowledge" },
  },
];
