export class Category {

  constructor(
    // public id: number,
    // public name: string,
    // public power: string,
    // public content?: string,
    // public alterEgo?: string  
    public id: string = '',
    public description: string = '',
    public imageUrl: string  = '',
    public name: string  = '',
    public sectionType: string  = '',
    public sortOrder: number  = 0,
    public type: string  = ''
  ) {  }

}
