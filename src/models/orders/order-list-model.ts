export interface ColumnDef {
    field?: string,
    header?: string,
    cell?: any,
    body?: any,
    sortable?: boolean,
    style?: any,
    expander?: any
}

export interface OrderDetail {
    orderDetailID: number,
    productID: number,
    productName: string,
    categoryName: string,
    subCategoryName: string,
    hsN_Code: string,
    orderStatusName: string,
    measurementTypeName: string,    
    unitPrice: number,
    minOrderQty: number,
    orderMultiples: number,
    quantity: number,
    pendingQuantity: number,
    taxableAmount: number,
    gst: number,
    taxAmount: number,
    grossAmount: number,
    url: string,
    trackingID: string,
}

export interface OrderModel {
    orderID: number,
    createdDate: string,
    invoiceNumber: number,
    invoiceDate: string,
    orderStatusName: string,
    userName: string,
    primaryContactNbr: string,
    address1: string,
    address2: string,
    landmark: string,
    zipcode: string,
    cityName: string,
    stateName: string,
    routeCodeName: string,
    gpsLocation: string,
    taxableAmount:number,
    taxAmount: number,
    grossAmount: number,
    paymentGatewayCharges: number,
    paymentModeID: number,
    paymentModeName: string,
    gsT_Number: string,
    paymentStatus: string,
    courierProviderName: string,
    orderDetail: OrderDetail[],
    orderInvoice: OrderInvoice[]
}

export interface OrderInvoice {
    invoiceNo: number,
    taxableAmount: number,
    taxAmount: number,
    discountAmount: number,
    grossAmount: number,
    paymentGatewayCharges: number,
    paymentModeID: number,
    paymentModeName: string,    
    createdDate: string,
    orderInvoiceDetail: OrderInvoiceDetail[]
}

export interface OrderInvoiceDetail {
    productID: number,
    productName: string,
    unitPrice: number,
    invoicedQuantity: number,
    totalAmount: number 
}

export interface InvoiceUserModel {
    userID: number,
    name: string
}

export interface userOption {
    userID: number;
    name: string;
    primaryContactNbr: string;
}

export interface userResult {
    userID: number;
    detail: string;
}

export interface RouteCodeModel {
    routeCodeID: number,
    name: string
}