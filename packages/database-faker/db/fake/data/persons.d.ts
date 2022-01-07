type Persons = {
  personId: number,
  firstName: string,
  lastName: string,
  email: string,
  avatar?: string,
  address?: {
    streetAddress: string,
    zipCode: string,
    city: string,
    country: string,
  }
}[]

declare const persons: Persons

export = persons;
