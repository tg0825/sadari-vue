<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['admin'] = 'admin/main';

$route['admin/login'] = 'admin/main/login';
$route['admin/login-process'] = 'admin/main/login_process';
$route['admin/logout'] = 'admin/main/logout';


// 구성원
$route['admin/member'] = 'admin/member';
$route['admin/member/edit'] = 'admin/member/edit';
$route['admin/member/edit/(:num)'] = 'admin/member/edit/$1';
$route['admin/member/edit/submit'] = 'admin/member/edit_submit';
$route['admin/member/edit/submit/(:num)'] = 'admin/member/edit_submit/$1';
$route['admin/member/update'] = 'admin/member/update';
$route['admin/member/delete'] = 'admin/member/delete';

// 팀
$route['admin/team'] = 'admin/team';
$route['admin/team/edit'] = 'admin/team/edit';
$route['admin/team/edit/(:num)'] = 'admin/team/edit/$1';
$route['admin/team/edit/submit'] = 'admin/team/edit_submit';
$route['admin/team/delete'] = 'admin/team/delete';
$route['admin/team/update'] = 'admin/team/update';

$route['default_controller'] = 'game';
$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;
