export interface IorderItem {
  Order_ID: number
  Item_ID: string
  Quantity: number
  Price_out: number
  Discount: number
  Item_Name: string
  Rate: number
  Image_Cover: string
  Category_Image: string
  Sub_Category_Name: string
}
export interface Iorder {
  IDFromPaymob: number
  Total_Price: number
  Status: string
  Delivery_Date: string
  Book_Date: string
  Addess: number
  Street: string
  City: string
  Building: string
  Floor: string
  Apartment: string
  Buyer_Name: string
  PhoneNumber: string
  Buyer_ID: number
}
