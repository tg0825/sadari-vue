    <div class="col-9">
        <div class="row">
            <?php
            foreach($team_list as $team) {
            ?>
                <div
                    class="col-sm-3 mb-3 team-item"
                    data-team-id="<?=$team->team_id?>"
                >
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"> <?=$team->team?> </h5>
                            <p class="card-text">
                                desc..
                            </p>
                            <a href="#" class="card-link">수정</a>
                            <a href="#" class="card-link" data-team-btn="delete">삭제</a>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>

        <div class="row mt-3">
            <div class="col text-right">
                <a
                    class="btn btn-lg btn-primary"
                    href="/admin/team/add">팀 추가</a>
            </div>
        </div>
    </div>
</div>
</div>
<script>
    var team = new Team();
</script>
</body>
</html>
