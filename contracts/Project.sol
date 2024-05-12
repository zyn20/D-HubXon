// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceMarketplace {
    uint public balanceinwei;
    struct Project {
        uint256 projectId;
        string title;
        string skillsRequired;
        string duration; // Converted to string
        string deadline; // Converted to string
        uint256 budget;
        address owner;
        address freelancer;
        bool taken;

    }

    mapping(uint256 => Project) public projects;
    uint256 public latestProjectId;

    address public constant DHUBXON_WALLET =0x4a0051552A8a8Da192f9AB73B7245e4a233e353A; // DHUBXON wallet address

    event ProjectUploaded(
        uint256 indexed projectId,
        string title,
        string skillsRequired,
        string duration,
        string deadline,
        uint256 budget,
        address owner
    );
    event ProjectTaken(uint256 indexed projectId, address freelancer);
    event PaymentReleased(
        uint256 indexed projectId,
        address freelancer,
        uint256 amount
    );

    function uploadProject(
        string memory _title,
        string memory _skillsRequired,
        string memory _duration,
        string memory _deadline,
        uint256 _budget
    ) external returns (uint256) {
        latestProjectId++;
        projects[latestProjectId] = Project(
            latestProjectId,
            _title,
            _skillsRequired,
            _duration,
            _deadline,
            _budget,
            msg.sender,
            address(0),
            false
        );
        emit ProjectUploaded(
            latestProjectId,
            _title,
            _skillsRequired,
            _duration,
            _deadline,
            _budget,
            msg.sender
        );
        return latestProjectId;
    }

    function takeProject(
        uint256 _projectId,
        address _freelancer
    ) external payable {
        Project storage project = projects[_projectId];

        require(!project.taken, "Project already taken");
        require(
            msg.sender == project.owner,
            "Only project owner can take project"
        );
        project.freelancer = _freelancer;
        project.taken = true;

        emit ProjectTaken(_projectId, _freelancer);

        // Transfer payment to DHUBXON wallet
        payable(DHUBXON_WALLET).transfer(msg.value);
    }

 function releasePayment(uint256 _projectId) external payable  {
    Project storage project = projects[_projectId];

    require(project.taken, "Project not taken yet");
    require(msg.sender == project.owner, "Only project owner can release payment");

    // Convert budget from dollars to Wei
   

    // Calculate the amounts to send
    uint256 totalAmount = msg.value;
    uint256 amountToFreelancer = (totalAmount * 90) / 100;
    uint256 amountToDHUBXON = totalAmount - amountToFreelancer;

    // Transfer payment to the freelancer
    bool freelancerSuccess = payable(project.freelancer).send(amountToFreelancer);
    require(freelancerSuccess, "Failed to send payment to freelancer");

    // Transfer payment to DHUBXON account
    bool dhubxonSuccess = payable(DHUBXON_WALLET).send(amountToDHUBXON);
    require(dhubxonSuccess, "Failed to send payment to DHUBXON");

    // Emit event for payment release
    emit PaymentReleased(_projectId, project.freelancer, amountToFreelancer);
}



function releasePaymenttofreelancer(uint256 _projectId) external payable  {
    Project storage project = projects[_projectId];

    // require(project.taken, "Project not taken yet");
    // require(msg.sender == project.owner, "Only project owner can release payment");

    // Convert budget from dollars to Wei
   
        project.taken = true;

    // Calculate the amounts to send
    // uint256 totalAmount = msg.value;
    // uint256 amountToFreelancer = (totalAmount * 90) / 100;
    // uint256 amountToDHUBXON = totalAmount - amountToFreelancer;

    // // Transfer payment to the freelancer
    // bool freelancerSuccess = payable(project.freelancer).send(amountToFreelancer);
    // require(freelancerSuccess, "Failed to send payment to freelancer");

    // // Transfer payment to DHUBXON account
    // bool dhubxonSuccess = payable(DHUBXON_WALLET).send(amountToDHUBXON);
    // require(dhubxonSuccess, "Failed to send payment to DHUBXON");

    // Emit event for payment release
    // emit PaymentReleased(_projectId, project.freelancer, amountToFreelancer);
}





}
