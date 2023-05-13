export interface Property {
  id: string;
  inscription_number: string;
  type: string;
  description: string;
  rent_price: string;
  cep: string;
  neighborhood: string;
  street_name: string;
  street_number: string;
  total_occupancy: number;
  total_bedrooms: number;
  total_bathrooms: number;
  has_wifi?: Boolean;
  has_tv?: Boolean;
  has_air_conditioning?: Boolean;
  has_washing_machine?: Boolean;
  has_kitchen?: Boolean;
  has_suite?: Boolean;
  has_parking_space?: Boolean;
  has_pool?: Boolean;
  has_beach_view?: Boolean;
  user_Id: string;
  createdAt: Date;
  updatedAt: Date;
}
