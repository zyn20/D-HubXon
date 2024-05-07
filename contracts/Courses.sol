// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECommerce_Courses {
    struct Course {
        string description;
        address uploader; // MetaMask address of the user who uploaded the Course
        uint256 price; // Price of the Course
        bool purchased; // Flag to indicate if the Course has been purchased
    }

    mapping(uint256 => Course) public courses;
    uint256 public latestCourseId;

    event CourseUploaded(uint256 indexed courseId, string description, address uploader, uint256 price);
    event CoursePurchased(uint256 indexed courseId, address buyer, uint256 price);

    function uploadCourse(string memory _description, uint256 _price) external returns (uint256) {
        latestCourseId++;
        courses[latestCourseId] = Course(_description, msg.sender, _price, false);
        emit CourseUploaded(latestCourseId, _description, msg.sender, _price);
        return latestCourseId;
    }

    // 
    function purchase(uint256 _courseId) external payable {
    Course storage course = courses[_courseId];
    
    // require(course.price > 0, "Course does not exist");
    // require(msg.value >= course.price, "Insufficient funds");

    uint256 dhubxonAmount = (msg.value * 10) / 100;
    uint256 uploaderAmount = msg.value - dhubxonAmount;

    // Transfer 10% to DHUBXON
    payable(0x4a0051552A8a8Da192f9AB73B7245e4a233e353A).transfer(dhubxonAmount);
    payable(course.uploader).transfer(uploaderAmount);
    
    

    emit CoursePurchased(_courseId, msg.sender, course.price);
}

}
