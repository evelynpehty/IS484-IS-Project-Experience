class Product:
  def __init__(self, productID, productName, productDescription, status):
    self.productID = productID
    self.productName = productName
    self.productDescription = productDescription
    self.status = status

  def to_dict(self):
    return{
      "ProductID": self.productID,
      "ProductName": self.productName,
      "ProductDescription": self.productDescription,
      "Status": self.status
    }