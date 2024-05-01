pragma solidity ^0.8.0;

contract ECommerce {
    struct Product {
        string description;
        address uploader; // MetaMask address of the user who uploaded the product
        uint256 price; // Price of the product
    }

    mapping(uint256 => Product) public products;
    uint256 public latestProductId;

    event ProductUploaded(uint256 indexed productId, string description, address uploader, uint256 price);
    event ProductPurchased(uint256 indexed productId, address buyer, uint256 price);

    function uploadProduct(string memory _description, uint256 _price) external returns (uint256){
        latestProductId++;
        products[latestProductId] = Product(_description, msg.sender, _price);
        emit ProductUploaded(latestProductId, _description, msg.sender, _price);
        return latestProductId;
    }

    function purchase(uint256 _productId) external payable {
    Product storage product = products[_productId];
    require(product.price > 0, "Product does not exist");
    require(product.price <= msg.value, "Insufficient funds");

    // Transfer funds to seller
    payable(product.uploader).transfer(msg.value);
    // Update buyer's balance
    // Mark product as purchased

    emit ProductPurchased(_productId, msg.sender, product.price);
}


   
}
