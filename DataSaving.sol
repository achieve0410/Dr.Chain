pragma solidity >=0.4.22 <0.6.0;
library SafeMath {
  function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
      if (_a == 0) {
          return 0;
        }
      uint256 c = _a * _b;
      assert(c / _a == _b);
      return c;
  }
  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
      require(_b > 0);
      uint256 c = _a / _b;
      return c;
  }
  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
      assert(_b <= _a);
      uint256 c = _a - _b;
      return c;
  }
  function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
      uint256 c = _a + _b;
      assert(c >= _a);
      return c;
  }
}contract DataStorage{
    
    struct Info{
        address key;
        uint256 sex;  //ex: Male:0 Female:1
        uint256 birth; //ex: 19940809
    }
    
    address creator;
    uint256 public total_user;
    
    mapping(address=>Info) public user_list;
    
    modifier onlyCreator{
        require(msg.sender==creator);
        _;
    }
    
    constructor() public{
        creator=msg.sender;
        total_user=0;
    }
    
    function Input_list(address _key, uint256 _sex, uint256 _birth) public onlyCreator {
        total_user++;
        user_list[_key].key=_key;
        user_list[_key].sex=_sex;
        user_list[_key].birth=_birth;
    }
    
    function Show_list(address _key)  public view returns(address,uint256,uint256){
        return (user_list[_key].key,user_list[_key].sex,user_list[_key].birth);
    }
}
