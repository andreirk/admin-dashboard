##Contents

###Merchants model
- *model/merchant.ts* - merchant class, response from backend for one selected language
- *model/merchant-page.ts* - merchants page class, response from backend
- *model/merchant-list.ts* - merchant list class, which contains all data from pages

###Merchants services
- *services/merchant-backend.service.ts* : provides api calls to merchants backend
- *services/merchant-list.service.ts* : provides api calls for working with list of merchants, which combines data from pages

### Merchants components
- *components/merchant-card-component.ts* - view for merchant list item, provides deleting and navigation to editing merchant
- *components/merchant-list-component.ts* - contains list of merchant-card-components, allows to loading more merchants by request
- *components/merchant-details/merchant-details-component.\* * - merchant details page, used for creating and editing merchant's properties

### Module files
- *merchant.module.ts* - aggregates all metadata about merchants management module
- *merchant.routing.ts* - contains routes for merchants management module