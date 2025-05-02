pragma solidity ^0.8.0;

contract TrustLock {
    enum EscrowState { AWAITING_DELIVERY, COMPLETE, REFUNDED }

    struct Escrow {
        address buyer;
        address seller;
        uint256 amount;
        EscrowState state;
        uint256 deadline;
    }

    mapping(uint256 => Escrow) public escrows;
    uint256 public escrowCounter;

    event EscrowCreated(uint256 escrowId, address buyer, address seller, uint256 amount, uint256 deadline);
    event DeliveryConfirmed(uint256 escrowId);
    event RefundIssued(uint256 escrowId);
    event TimeoutRefundClaimed(uint256 escrowId);

    function createEscrow(address _seller, uint256 _deadline) external payable {
        require(msg.value > 0, "Payment required");
        require(_seller != address(0), "Invalid seller address");
        require(_deadline > 0, "Deadline must be in the future");

        uint256 deadline = block.timestamp + _deadline;
        escrows[escrowCounter] = Escrow(msg.sender, _seller, msg.value, EscrowState.AWAITING_DELIVERY, deadline);
        emit EscrowCreated(escrowCounter, msg.sender, _seller, msg.value, deadline);
        escrowCounter++;
    }

    function confirmDelivery(uint256 _escrowId) external {
        Escrow storage e = escrows[_escrowId];
        require(msg.sender == e.buyer, "Only buyer can confirm");
        require(e.state == EscrowState.AWAITING_DELIVERY, "Invalid state");

        e.state = EscrowState.COMPLETE;
        payable(e.seller).transfer(e.amount);
        emit DeliveryConfirmed(_escrowId);
    }

    function refund(uint256 _escrowId) external {
        Escrow storage e = escrows[_escrowId];
        require(msg.sender == e.seller, "Only seller can refund");
        require(e.state == EscrowState.AWAITING_DELIVERY, "Invalid state");

        e.state = EscrowState.REFUNDED;
        payable(e.buyer).transfer(e.amount);
        emit RefundIssued(_escrowId);
    }

    function claimTimeoutRefund(uint256 _escrowId) external {
        Escrow storage e = escrows[_escrowId];
        require(msg.sender == e.buyer, "Only buyer can claim timeout refund");
        require(e.state == EscrowState.AWAITING_DELIVERY, "Invalid state");
        require(block.timestamp > e.deadline, "Deadline not passed yet");

        e.state = EscrowState.REFUNDED;
        payable(e.buyer).transfer(e.amount);
        emit TimeoutRefundClaimed(_escrowId);
    }
}