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
    // require(product.price > 0, "Product does not exist");
    // require(product.price <= msg.value, "Insufficient funds");

    uint256 dhubxonAmount = (msg.value * 10) / 100;
    uint256 uploaderAmount = msg.value - dhubxonAmount;

    // Transfer 10% to DHUBXON
    payable(0x4a0051552A8a8Da192f9AB73B7245e4a233e353A).transfer(dhubxonAmount);
    // Transfer 90% to uploader
    payable(product.uploader).transfer(uploaderAmount);


    emit ProductPurchased(_productId, msg.sender, product.price);
}



   
}
