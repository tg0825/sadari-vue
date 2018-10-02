    <?php
    $type = isset($member['id']) ? '수정' : '추가';
    ?>
    <div class="col-9">
        <div class="row">
            <div class="col">
                <form
                    id="JSFORM"
                    action="/admin/member/edit/submit<?=isset($member['id']) ? '/' . $member['id'] : ''?>"
                    method="post"
                    autocomplete="off"
                >
                    <input
                        type="hidden"
                        name="team_id"
                        value="<?=$member['id'] ?? ''?>"
                    >
                    <h4>
                        <i class="fa fa-male" aria-hidden="true"></i>
                        구성원 <?=$type?>
                    </h4>
                    <div class="form-block">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="이름을 입력해주세요."
                            class="form-control"
                            maxlength="10"
                            required
                            value="<?=$member['name'] ?? ''?>"
                        >
                    </div>
                    <div class="form-block mt-1">
                        <div class="team-list">
                            <select id="team_list" class="form-control" name="team_id">
                                <?php
                                foreach($team_item_list as $team_item) {
                                    $selected = ($member['team'] == $team_item->team);
                                ?>
                                    <option
                                        value="<?=$team_item->team_id?>"
                                        <?=$selected ? 'selected' : ''?>
                                    ><?=$team_item->team?></option>
                                <?php
                                }
                                ?>
                            </select>
                        </div>
                    </div>

                    <div class="mt-1">
                        <button type="submit" class="btn btn-primary btn-block btn-add-mem">
                            <?=$type?>
                        </button>
                    </div>
                </form>

                <?php
                    if (isset($member['id'])) {
                ?>
                <div class="mt-1">
                    <a
                        class="btn btn-primary btn-block js-member-delete"
                        data-member-id="<?=$member['id']?>"
                        href="/admin/member/delete">
                        삭제
                    </a>
                </div>
                <?php
                    }
                ?>
            </div>
        </div>
    </div>
</div>
</div>
</body>
</html>
