    <div class="col-9">
        <div class="row">
            <div class="col text-right">
                <a
                    class="btn btn-lg btn-primary"
                    href="/admin/team/edit">팀 추가</a>
            </div>
        </div>

        <div class="row mt-3">
            <?php
            foreach($team_list as $team) {
            ?>
                <div
                    class="col-sm-3 mb-3 team-item"
                    data-team-id="<?=$team->team_id?>"
                >
                    <div
                        class="card"
                        style="background-color:<?=$team->team_color?>"
                    >
                        <div class="card-body">
                            <h5 class="card-title"> <?=$team->team?> </h5>
                            <!-- <p class="card-text">
                                desc..
                            </p> -->
                            <a href="/admin/team/edit/<?=$team->team_id?>" class="card-link">
                                <i class="fa fa-cog" aria-hidden="true"></i>
                                관리
                            </a>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>
    </div>
</div>
</div>
<script>
    var team = new Team();
</script>
</body>
</html>
