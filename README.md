# Dr.Chain Project
> 위 프로젝트는 의료 기록과 같은 보안에 민감한 정보들을 블록체인과 DB에 이중 저장하여  
> 저장된 정보의 무결성과 보안성을 유지하는 것을 목적으로 하고 있다.

# Setup

## Requirements
 - MYSQL DB (Install: https://www.mysql.com/downloads/)
 + Ganache (Install: https://truffleframework.com/ganache)
 - Node.js (Install: https://nodejs.org/ko/download/)
 + Source Code (Install: git clone https://github.com/jae123123/Dr.Chain)

## Installation & Start
 1. 프로젝트 소스 코드를 적당한 디렉토리에 내려받는다.  
     ```sh
     $ git clone https://github.com/jae123123/Dr.Chain
     ```
 2. 터미널(혹은 cmd창)을 하나 연 후, Ganache를 실행한다.  
     ```sh
     $ ganache-cli
     ```
 3. Remix (https://remix.ethereum.org/ )에 접속 후 Smart Contract 디렉토리의 RecordData.sol 파일의 코드를 복사해서 붙이기 
     ```sh
     Environment를 Web3 provider로 변경 후 Smart Contract Deploy
     ```
 4. 터미널을 추가로 하나 더 연 후, 1번에서 내려받았던 소스 코드 디렉토리로 이동한다.  
     ```sh
     $ cd source_code_dir
     ```    
 5. Deployed 된 Contract의 주소 및 Account Address 를 복사 및 record.js의 각 부분에 입력한다.
     ```sh
     contract_addr -> contract Address / ether_output function -> Account Address
     ```    

 6. 프로젝트 실행을 위한 모듈들을 설치한다.  
     ```sh
     $ npm install
     ```
 7. 디렉토리 내에 node_modules폴더가 생성이 되었으면 서버를 실행시킨다.  
     ```sh
     $ node app.js
     ```
# Usage
Internet Explorer(혹은 다른 브라우저도 가능) 주소창에 다음과 같이 입력한다.
```sh
localhost:30001/login
```

# Directory
```
Dr.Chain ( Root directory )
│
├── SmartContract
│   ├── DrCoin.sol
│   ├── README.md
│   ├── HospitalData.sol
│   ├── RecordData.sol
│   └── UserData.sol
│
├── global
│   └── db.js
│
├── node_modules
│   ├── module_name_1
│   ├── ...
│   └── module_name_n
│
├── public
│   ├── css
│   │   ├── d_doctorsend.css
│   │   ├── d_recordslist.css
│   │   ├── d_userList.css
│   │   ├── d_userList2.css
│   │   ├── d_writeread.css
│   │   ├── p_recordslist.css
│   │   ├── p_writeread.css
│   │   └── select.css
│   │
│   ├── html
│   │   ├── doctor
│   │   │   ├── doctorsend.html
│   │   │   ├── recordslist.html
│   │   │   ├── userList.html
│   │   │   ├── userList2.html
│   │   │   └── writeread.html
│   │   │
│   │   └── patient
│   │       ├── recordslist.html
│   │       ├── references.html
│   │       └── writeread.html
│   │
│   ├── image.jpg
│   └── style.css
│
├── router
│   └── html_router.js
│
├── signup
│   └── signup.html
│
├── use_db
│   ├── records.js
│   └── user.js
│
├── app.js
├── image.jpg
├── login.html
├── package.json
├── package-lock.json
├── README.md
└── select.html
```


## Testing Page
> http://drchain.na.to/
