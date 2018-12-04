# sadari

## 제작동기

회사에서 사다리를 자주 돌립니다.

카카오톡 사다리 기능을 이용했는데 불편한 점들이 있었습니다.

pc버전이 없는 점, 결과를 캡쳐해서 pc로 전송해야하는 불편함, 결과를 보기 힘든 UX등이 있었습니다.

불편을 해소하고자 직접 만들었습니다.

## 작업환경

### 서버
php 내장 서버를 사용합니다.
~~~
$ php -S 0.0.0.0:8080 -t ./
~~~

### DB
맴버 테이블
~~~
CREATE TABLE `member` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `resign` date DEFAULT NULL,
  `position` varchar(30) DEFAULT NULL,
  `start_date` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
~~~

팀 테이블
~~~
CREATE TABLE `team` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(30) NOT NULL,
  `team_eng` varchar(30) DEFAULT NULL,
  `team_color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`team_id`)
);
~~~

관리자 아이디 테이블
~~~
CREATE TABLE `user` (
  `id` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~


*** 이 서비스는 개인작업용이며 아직 안정화 되지 않았습니다.**

