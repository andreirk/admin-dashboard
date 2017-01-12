##Contents

### Shared directives
- *category-type-options.directive.ts* - directive fills list of type options fetched from CategoryType enum
- *section-type-options.directive.ts* - directive fills list of type options fetched from SectionType enum

### Shared components
- *components/select-lang.component.ts* - component for selecting language in edit properties page,
 includes alert box for notification in case of unsaved data
- *components/upload-image.component.ts* - custom form control, displays and provides uploading image, returns url of 
 saved image
 
### Shared pipes
- *address.pipe.ts* - common pipe for address view
- *default-value.pipe.ts* - pipe to display default value
- *driver-location.pipe.ts* - pipe to display driver location as text
- *suffix.pipe.ts* - cuts suffix from too long text 
 
### Module files
- *shared.module.ts* - aggregates all metadata about shared module, also exports
  shared components and CommonModule, FormsModule, NgaModule 