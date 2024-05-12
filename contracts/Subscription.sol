pragma solidity ^0.8.0;

contract SubscriptionContract {
    address payable public owner;
    uint256 public latestSubscriptionIndex;
    
    struct SubscriptionData {
        address userAddress;
        string subscriptionType;
        string duration;
        uint256 amount; 
        uint256 createdAt;
        bool claimed;
    }

    mapping(uint256 => SubscriptionData) public subscriptions;

    event SubscriptionCreated(address indexed userAddress, string subscriptionType, string duration, uint256 amount, uint256 createdAt);
    event SubscriptionClaimed(address indexed userAddress, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    function createSubscription(string memory _subscriptionType, string memory _duration, uint256 _amount) external payable returns (uint256) {

        latestSubscriptionIndex++;

        SubscriptionData storage subscription = subscriptions[latestSubscriptionIndex];
        subscription.userAddress = msg.sender;
        subscription.subscriptionType = _subscriptionType;
        subscription.duration = _duration;
        subscription.amount = _amount;
        subscription.createdAt = block.timestamp;

        // Send the amount to DHUBXON account
        payable(0x4a0051552A8a8Da192f9AB73B7245e4a233e353A).transfer(msg.value);

        emit SubscriptionCreated(msg.sender, _subscriptionType, _duration, _amount, block.timestamp);
        
        return latestSubscriptionIndex;
    }

    function claimSubscription(uint256 _latest) external payable {
        SubscriptionData storage subscription = subscriptions[_latest];
      

        subscription.claimed = true;
        uint256 amountToTransfer = subscription.amount;
        subscription.amount = 0; // Zero out the amount to prevent reentrancy
        payable(subscription.userAddress).transfer(msg.value);

        emit SubscriptionClaimed(msg.sender, amountToTransfer);
    }

   
}
