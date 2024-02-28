export interface Review {
  id: string;
  user_Id: string;
  property_Id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}