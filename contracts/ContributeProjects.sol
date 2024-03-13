// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ContributeProjects {
    struct Project {
        string description;
        address owner;
        uint balance; // Balance of the project
    }

    mapping(uint => Project) public projects;
    uint public latestProjectId; // Latest ID assigned to a project

    // Create a new project
    function createProject(string memory _description) external returns (uint projectId) {
        latestProjectId++; // Increment the latest project ID
        projects[latestProjectId] = Project(_description, msg.sender, 0);
        return latestProjectId;
    }

    // Contribute to a project
    // Contribute to a project
function contribute(uint _id) external payable {
    require(msg.value >= 0, "Contribution amount must be greater than or equal to 0");
    Project storage project = projects[_id];
    require(bytes(project.description).length > 0, "Project does not exist");
    payable(project.owner).transfer(msg.value);
    project.balance += msg.value;
}


    // Retrieve projects array
    function getProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](latestProjectId);
        for (uint i = 1; i <= latestProjectId; i++) {
            allProjects[i - 1] = projects[i];
        }
        return allProjects;
    }

    // Retrieve details of a specific project by ID
    function getProjectById(uint _projectId) external view returns (string memory description, address owner, uint balance) {
        require(_projectId >= 0 && _projectId <= latestProjectId, "Invalid project ID");
        Project memory project = projects[_projectId];
        return (project.description, project.owner, project.balance);
    }

     // Retrieve details of the latest project
    function getLatestProject() external view returns ( uint ProjectID) {
        return latestProjectId;
    }
}
