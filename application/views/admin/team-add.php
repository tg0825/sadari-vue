    <?php
    $type = isset($team_id) ? '관리' : '추가';
    ?>
    <div class="col-9">
        <div class="row">
            <div class="col">
                <form
                    id=""
                    action="/admin/team/edit/submit"
                    method="post"
                    autocomplete="off"
                >
                    <input
                        type="hidden"
                        name="team_id"
                        value="<?=$team_id ?? ''?>"
                    >
                    <h4>
                        <i class="fa fa-male" aria-hidden="true"></i>
                        팀 <?=$type?>
                    </h4>
                    <div class="form-block mt-1">
                        <div class="">
                            <input
                                id="name"
                                name="team"
                                type="text"
                                placeholder="팀 한글명을 입력해주세요."
                                class="form-control"
                                required
                                value="<?=$team ?? ''?>"
                            >
                        </div>
                    </div>
                    <div class="form-block mt-1">
                        <input
                            id="name"
                            name="team_eng"
                            type="text"
                            placeholder="팀 영문명을 입력해주세요."
                            class="form-control"
                            required
                            value="<?=$team_eng ?? ''?>"
                        >
                    </div>
                    <div class="form-block mt-1">
                        <input
                            id="name"
                            name="team_color"
                            type="color"
                            placeholder="팀 색상을 선택해주세요."
                            class="form-control"
                            style="height:40px"
                            value="<?=$team_color ?? ''?>"
                            required
                        >
                    </div>

                    <div class="mt-1">
                        <button type="submit" class="btn btn-primary btn-block btn-add-mem"><?=$type?></button>

                        <?php
                            if (isset($team_id)) {
                        ?>
                                <button type="submit" class="btn btn-primary btn-block btn-add-mem">삭제</button>
                        <?php
                            }
                        ?>
                    </div>
                </form>
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
