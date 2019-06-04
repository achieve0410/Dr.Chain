# Dr.Chain Project
> 위 프로젝트는 의료 기록과 같은 보안에 민감한 정보들을 블록체인과 DB에 이중 저장하여  
> 저장된 정보의 무결성과 보안성을 유지할 수 있도록 하는 것을 목적으로 하고 있습니다.

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
 3. 터미널을 추가로 하나 더 연 후 1번에서 내려받았던 소스 코드 디렉토리로 이동한다.  
     ```sh
     $ cd source_code_dir
     ```
 4. 프로젝트 실행을 위한 모듈들을 설치한다.  
     ```sh
     $ npm install
     ```
 5. 디렉토리 내에 node_modules폴더가 생성이 되었으면 서버를 실행시킨다.  
     ```sh
     $ node app.js
     ```
# Usage

## Testing Page
> http://drchain.na.to/
