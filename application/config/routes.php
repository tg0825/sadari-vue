<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['/'] = '/game';

$route['admin'] = 'admin/main';

// 로그인
$route['admin/login'] = 'admin/auth/login';
$route['admin/login-process'] = 'admin/auth/process';
$route['admin/logout'] = 'admin/auth/logout';

// 구성원
$route['admin/member'] = 'admin/member';
$route['admin/member/detail'] = 'admin/member/detail';
$route['admin/member/detail/(:num)'] = 'admin/member/detail/$1';
$route['admin/member/detail/submit'] = 'admin/member/detail_submit';
$route['admin/member/detail/submit/(:num)'] = 'admin/member/detail_submit/$1';
$route['admin/member/update'] = 'admin/member/update';
$route['admin/member/delete'] = 'admin/member/delete';

// 팀
$route['admin/team'] = 'admin/team';
$route['admin/team/edit'] = 'admin/team/edit';
$route['admin/team/edit/(:num)'] = 'admin/team/edit/$1';
$route['admin/team/edit/submit'] = 'admin/team/detail_submit';
$route['admin/team/delete'] = 'admin/team/delete';
$route['admin/team/update'] = 'admin/team/update';

// 결과
$route['admin/result'] = 'admin/result';

// 게임
$route['game/insert'] = 'game/insert';
$route['game/last_member_list/(:any)'] = 'game/last_member_list/$1';

// API 직원 가져오기
$route['member'] = 'member';

// 게임 타입 결과
// $route['game/result/(:any)'];

$route['default_controller'] = 'game';
$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;
