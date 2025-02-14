import OrderDetail from "./OrderDetailModel"

export default interface OrderHeaderModel {
    orderHeaderId?: number
  pickupName?: string
  pickupPhoneNumber?: string
  pickupEmail?: string
  applicationUserId?: string
  applicationUser?: any
  orderTotal?: number
  orderDate?: string
  status?: string
  stripePaymentIntentID?: string
  totalItems?: number
  orderDetails?: OrderDetail[]
}