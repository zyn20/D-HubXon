pragma solidity ^0.8.0;

contract ECommerce_Courses {
    struct Courses {
        string description;
        address uploader; // MetaMask address of the user who uploaded the Courses
        uint256 price; // Price of the Courses
    }

    mapping(uint256 => Courses) public courses;
    uint256 public latestCoursesd;

    event ProductUploaded(uint256 indexed productId, string description, address uploader, uint256 price);
    event ProductPurchased(uint256 indexed productId, address buyer, uint256 price);

    function uploadProduct(string memory _description, uint256 _price) external returns (uint256){
        latestCoursesd++;
        courses[latestCoursesd] = Courses(_description, msg.sender, _price);
        emit ProductUploaded(latestCoursesd, _description, msg.sender, _price);
        return latestCoursesd;
    }

    function purchase(uint256 _courseId) external payable {
    Courses storage Courses = courses[_courseId];
    require(Courses.price > 0, "Courses does not exist");
    require(Courses.price <= msg.value, "Insufficient funds");

    // Transfer funds to seller
    payable(Courses.uploader).transfer(msg.value);
    // Update buyer's balance
    // Mark Courses as purchased

    emit ProductPurchased(_courseId, msg.sender, Courses.price);
}


   
}
