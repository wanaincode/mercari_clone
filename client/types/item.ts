// client/types/item.ts
export type Item = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  seller?: string;
  createdAt?: string;
  updatedAt?: string;
};