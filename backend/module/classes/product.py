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
  # Getter methods
  def get_productID(self):
    return self.productID

  def get_productName(self):
    return self.productName

  def get_productDescription(self):
    return self.productDescription

  def get_status(self):
    return self.status

  # Setter methods
  def set_productID(self, productID):
    self.productID = productID

  def set_productName(self, productName):
    self.productName = productName

  def set_productDescription(self, productDescription):
    self.productDescription = productDescription

  def set_status(self, status):
    self.status = status

  # Default methods
  def __str__(self):
    return f"ProductID: {self.productID}, ProductName: {self.productName}, ProductDescription: {self.productDescription}, Status: {self.status}"

  def __repr__(self):
    return f"Product(productID={self.productID}, productName={self.productName}, productDescription={self.productDescription}, status={self.status})"

  def __eq__(self, other):
    if isinstance(other, Product):
      return self.__dict__ == other.__dict__
    return False