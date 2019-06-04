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
}contract RecordData2{ 
    using SafeMath for uint256; 
 
 
    mapping(uint256=>string) public record_list; 
 
 
    constructor() public{ 
    } 
 
    function Input_list(uint256 _records_id, string memory _data_hash) public{ 
        record_list[_records_id]=_data_hash; 
    } 
     
    function Change_list(uint256 _records_id, string memory _data_hash) public{ 
        record_list[_records_id]=_data_hash; 
    } 
 
    function Show_list(uint256 _records_id)  public view returns(string memory){ 
        return (record_list[_records_id]); 
    } 
 
} 
