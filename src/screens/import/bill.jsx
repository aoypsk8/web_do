import React from "react";
import ReactToPrint from "react-to-print";

const Bill = React.forwardRef(({ hideDialogBill, summaryData, productData }, ref) => {
  const { customerName, Phone, Location, Products, totalAmount } = summaryData;

  const getProductDetails = (productId) => {
    return productData.find(product => product.Product_ID === productId);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div ref={ref} className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p><strong>Customer Name:</strong> {customerName}</p>
        <p><strong>Phone:</strong> {Phone}</p>
        <p><strong>Location:</strong> {Location}</p>
        <h3 className="mt-4 font-bold">Products:</h3>
        <ul>
          {Products.map((product, index) => {
            const productDetails = getProductDetails(product.Product_ID);
            return (
              <li key={index} className="mt-2">
                <div className="flex items-center">
                  {productDetails && productDetails.Product_img && (
                    <img
                      src={productDetails.Product_img}
                      alt={productDetails.Product_Name}
                      className="w-12 h-12 object-cover mr-2"
                    />
                  )}
                  <div>
                    <p>{productDetails ? productDetails.Product_Name : 'Unknown Product'}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.Price}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4"><strong>Total Amount:</strong> {totalAmount}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={hideDialogBill}
            className="bg-secondaryColor text-white py-1 px-3 rounded"
          >
            Close
          </button>
          <ReactToPrint
            trigger={() => <button className="bg-primaryColor text-white py-1 px-3 rounded ml-2">Print</button>}
            content={() => ref.current}
          />
        </div>
      </div>
    </div>
  );
});

export default Bill;
