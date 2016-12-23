##Contents

###Merchants model
- *model/merchant-view-model.ts* - merchant view model class, which contains merchant and linked root categories

### Merchant services
- *services/merchant-view-model.service.ts* - provides methods for loading and saving merchant's view model 

### Merchants components
- *components/merchant-card-component.ts* - view for merchant list item, provides deleting and navigation to editing merchant
- *components/merchant-list-component.ts* - contains list of merchant-card-components, allows to loading more merchants by request
- *components/merchant-details/merchant-details-component.\* * - merchant details page, used for creating and editing merchant's properties
- *components/root-category-mutliselect.component.ts* - contains view of multiselect for root categories linked with merchant

### Module files
- *merchant.module.ts* - aggregates all metadata about merchants management module
- *merchant.routing.ts* - contains routes for merchants management module