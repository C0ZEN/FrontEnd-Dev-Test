export enum TypeOf {
  photovoltaic = 0,
  hybrid = 1
}

export interface SolarPanel {
  type_of: TypeOf;
  serial_number: string;
}

export interface Address {
  city: string;
  street: string;
  country: string;
  zip_code: string;
}

export interface Company {
  name: string;
  siren: string;
}

export interface Customer {
  name: string;
  email: string;
  telephone: string;
}

export interface PVMiseEnService {
  pv_mise_en_service: {
    company_attributes: Company,
    customer_attributes: Customer,
    solar_panels_attributes: SolarPanel[],
    address: Address,
    installation_date: Date
  }
}
