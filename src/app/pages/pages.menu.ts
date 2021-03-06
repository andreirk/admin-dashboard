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
        path: 'product_manage',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Products', // menu title
            icon: 'ion-android-home', // menu icon
          //  pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 101
          }
        },
        children: [
          {
            path: 'products',
            data: {
              menu: {
                title: 'Products'
              }
            },
          }
        ]
      },

      {
        path: 'merchants',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Merchants', // menu title
            icon: 'ion-android-home', // menu icon
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
            title: 'Category management', // menu title
            icon: 'ion-android-home', // menu icon
            //  pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 101
          }
        },
        children: [
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
            icon: 'ion-android-home', // menu icon
            selected: false,
            expanded: false,
            order: 100
          }
        }
      },


      // {
      //   path: 'editors',
      //   data: {
      //     menu: {
      //       title: 'Editors',
      //       icon: 'ion-edit',
      //       selected: false,
      //       expanded: false,
      //       order: 100,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'ckeditor',
      //       data: {
      //         menu: {
      //           title: 'CKEditor',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //  path: 'components',
      //  data: {
      //    menu: {
      //      title: 'Components',
      //      icon: 'ion-gear-a',
      //      selected: false,
      //      expanded: false,
      //      order: 250,
      //    }
      //  },
      //  children: [
      //    {
      //      path: 'treeview',
      //      data: {
      //        menu: {
      //          title: 'Tree View',
      //        }
      //      }
      //    }
      //  ]
      // },
      // {
      //   path: 'charts',
      //   data: {
      //     menu: {
      //       title: 'Charts',
      //       icon: 'ion-stats-bars',
      //       selected: false,
      //       expanded: false,
      //       order: 200,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'chartist-js',
      //       data: {
      //         menu: {
      //           title: 'Chartist.Js',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'ui',
      //   data: {
      //     menu: {
      //       title: 'UI Features',
      //       icon: 'ion-android-laptop',
      //       selected: false,
      //       expanded: false,
      //       order: 300,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'typography',
      //       data: {
      //         menu: {
      //           title: 'Typography',
      //         }
      //       }
      //     },
      //     {
      //       path: 'buttons',
      //       data: {
      //         menu: {
      //           title: 'Buttons',
      //         }
      //       }
      //     },
      //     {
      //       path: 'icons',
      //       data: {
      //         menu: {
      //           title: 'Icons',
      //         }
      //       }
      //     },
      //     {
      //       path: 'modals',
      //       data: {
      //         menu: {
      //           title: 'Modals',
      //         }
      //       }
      //     },
      //     {
      //       path: 'grid',
      //       data: {
      //         menu: {
      //           title: 'Grid',
      //         }
      //       }
      //     },
      //   ]
      // },
/*
      {
        path: 'forms',
        data: {
          menu: {
            title: 'Form Elements',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Form Inputs',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Form Layouts',
              }
            }
          }
        ]
      },
*/
      // {
      //   path: 'tables',
      //   data: {
      //     menu: {
      //       title: 'Tables',
      //       icon: 'ion-grid',
      //       selected: false,
      //       expanded: false,
      //       order: 500,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'basictables',
      //       data: {
      //         menu: {
      //           title: 'Basic Tables',
      //         }
      //       }
      //     },
      //     {
      //       path: 'smarttables',
      //       data: {
      //         menu: {
      //           title: 'Smart Tables',
      //         }
      //       }
      //     }
      //   ]
      // },

      {
        path: 'drivers',
        data: {
          menu: {
            title: 'Drivers',
            icon: 'ion-ios-location-outline',
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
        ]
      },
  //    {
        // path: 'maps',
        // data: {
        //   menu: {
        //     title: 'Maps',
        //     icon: 'ion-ios-location-outline',
        //     selected: false,
        //     expanded: false,
        //     order: 600,
        //   }
        // },
        // children: [
        //   {
        //     path: 'driver_map',
        //     data: {
        //       menu: {
        //         title: 'Drivers Locations',
        //       }
        //     }
        //   },
          // {
          //   path: 'googlemaps',
          //   data: {
          //     menu: {
          //       title: 'Google Maps',
          //     }
          //   }
          // },

          // {
          //   path: 'leafletmaps',
          //   data: {
          //     menu: {
          //       title: 'Leaflet Maps',
          //     }
          //   }
          // },
          // {
          //   path: 'bubblemaps',
          //   data: {
          //     menu: {
          //       title: 'Bubble Maps',
          //     }
          //   }
          // },
          // {
          //   path: 'linemaps',
          //   data: {
          //     menu: {
          //       title: 'Line Maps',
          //     }
          //   }
          // }
        // ]
 //     },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Pages',
      //       icon: 'ion-document',
      //       selected: false,
      //       expanded: false,
      //       order: 650,
      //     }
      //   },
      //   children: [
      //     {
      //       path: ['/login'],
      //       data: {
      //         menu: {
      //           title: 'Login'
      //         }
      //       }
      //     },
      //     {
      //       path: ['/register'],
      //       data: {
      //         menu: {
      //           title: 'Register'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'menu1',
      //   data: {
      //     menu: {
      //       title: 'Menu Level 1',
      //       icon: 'ion-ios-more',
      //       selected: false,
      //       expanded: false,
      //       order: 700,
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'Menu Level 1.1',

      //         }
      //       }
      //     },
      //     {
      //       path: 'menu1_2',
      //       data: {
      //         menu: {
      //           title: 'Menu Level 1.2',

      //         }
      //       },
      //       children: [
      //         {
      //           path: 'menu1_2_3',
      //           data: {
      //             menu: {
      //               title: 'Menu Level 1.2.1',

      //             }
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: 'version1',
      //   data: {
      //     menu: {
      //       title: 'Go to Version 1',
      //       url: 'http://lb.service:8080/ui-admin/',
      //       icon: 'ion-android-exit',
      //       order: 800,
      //       target: '_blank'
      //     }
      //   }
      // }
    ]
  }
];
