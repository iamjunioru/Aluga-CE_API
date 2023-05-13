export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}