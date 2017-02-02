export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      // {
      //   path: 'dashboard',
      //   data: {
      //     menu: {
      //       title: 'Dashboard',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },

      {
        path: 'merchants',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Merchants', // menu title
            icon: 'fa fa-shopping-basket', // menu icon
            selected: false,
            expanded: false,
            order: 101
          }
        }
      },

      {
        path: 'category-manage',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Taxonomy', // menu title
            icon: 'fa fa-list', // menu icon
            //  pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 101
          }
        },
        children: [
          {
            path: 'root-categories',  // path for our page
            data: { // custom menu declaration
              menu: {
                title: 'Root Categories', // menu title
                selected: false,
                expanded: false,
                order: 100
              }
            }
          },
          {
            path: 'categories',
            data: {
              menu: {
                title: 'Categories',
                selected: false,
                expanded: false
              }
            }
          },
          {
            path: 'groups',  // path for our page
            data: { // custom menu declaration
              menu: {
                title: 'Groups', // menu title
                selected: false,
                expanded: false,
                order: 100
              }
            }
          }
        ]
      },

      {
        path: 'orders',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Delivery Orders', // menu title
            icon: 'fa fa-gift', // menu icon
            selected: false,
            expanded: false,
            order: 100
          }
        }
      },
      {
        path: 'drivers',
        data: {
          menu: {
            title: 'Drivers',
            icon: 'fa fa-car',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'driver_map_locations',
            data: {
              menu: {
                title: 'Drivers Locations',
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Drivers List',
              }
            }
          }
        ]
      },
    ]
  }
];
