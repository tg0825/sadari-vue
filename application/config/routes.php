<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['admin'] = 'admin/main';

$route['admin/member'] = 'admin/member';
$route['admin/member/edit'] = 'admin/member/edit';
$route['admin/member/edit/submit'] = 'admin/member/edit-submit';
$route['admin/member/update'] = 'admin/member/update';
$route['admin/member/delete'] = 'admin/member/delete';

$route['admin/team'] = 'admin/team';
$route['admin/team/edit'] = 'admin/team/edit';
$route['admin/team/edit/(:num)'] = 'admin/team/edit/$1';
$route['admin/team/edit/submit'] = 'admin/team/edit_submit';
$route['admin/team/delete'] = 'admin/team/delete';
$route['admin/team/update'] = 'admin/team/update';

$route['admin/login'] = 'admin/main/login';
$route['admin/login-process'] = 'admin/main/login_process';
$route['admin/logout'] = 'admin/main/logout';

$route['default_controller'] = 'game';
$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;
