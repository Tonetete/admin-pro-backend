const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        {
          title: "Main",
          url: "/",
        },
        {
          title: "Graphs",
          url: "graph1",
        },
        {
          title: "ProgressBar",
          url: "progress",
        },
        {
          title: "Promises",
          url: "promises",
        },
        {
          title: "RxJS",
          url: "rxjs",
        },
      ],
    },
    {
      title: "Management",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        {
          title: "Doctors",
          url: "doctors",
        },
        {
          title: "Hospitals",
          url: "hospitals",
        },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({
      title: "Users",
      url: "users",
    });
  }
  return menu;
};

module.exports = {
  getMenuFrontend,
};
