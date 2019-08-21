<?php 
$nav_list = [
    'member' => [
        'label' => '구성원',
        'url' => '/admin/member'
    ],
    'team' => [
        'label' => '팀',
        'url' => '/admin/team'
    ],
    'result' => [
        'label' => '결과',
        'url' => '/admin/result'
    ]
];
?>

<div class="row">
    <div class="col-3">
        <div id="mySidenav" class="sidenav">
            <?php 
                foreach($nav_list as $nav) {
                ?>
                    <a href="<?=$nav['url']?>"><?=$nav['label']?></a>
                <?php
                }
            ?>
        </div>
    </div>
