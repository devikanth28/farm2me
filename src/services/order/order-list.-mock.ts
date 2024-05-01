export const statusTypes = [
    { id: 1, name: 'Order Received' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Shipped' },
    { id: 4, name: 'Out for delivery' },
    { id: 5, name: 'Delivered' },
    { id: 6, name: 'Completed'},
    { id: 7, name: 'Cancelled' },
    { id: 8, name: 'Return Placed' },
    { id: 9, name: 'Item Returned'}  
];

export const reportTypes = [
    { name: 'Order' },
    { name: 'Invoice' }    
];

export const getSeverity = (status: number) => {
    switch (status) {
        case 1:
        case 2:
          return 'info';
        case 3:            
        case 4:
          return 'warning';
        case 5:
        case 6:
          return 'success';
        case 7:
        case 8:
        case 9:
          return 'danger';
    }
};