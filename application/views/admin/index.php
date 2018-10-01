        <div class="col-9">
            <div class="row">
                <div class="col text-right">
                    <a
                        class="btn btn-lg btn-primary"
                        href="/admin/member/edit">구성원 추가</a>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <div class="row">
                        <div class="col js_total-number">
                            <?php
                            $sw = '';
                            ?>
                            총 <?=count($member_list)?> 명
                        </div>
                        <div class="col">
                            <form
                                name="search"
                                action="/admin/member"
                                method="get"
                            >
                                <div class="input-group">
                                    <input
                                        type="text"
                                        name="sw"
                                        class="form-control"
                                        placeholder="찾을 이름을 입력하세요."
                                        aria-label="Search term"
                                        aria-describedby="basic-addon"
                                        data-api='/admin/search'
                                        value="<?=$sw?>"
                                    >
                                    <div class="input-group-append">
                                        <button
                                            class="btn btn-secondary"
                                            type="submit"
                                        >검색</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col">

                            <div class="" style="display: none">
                                <select id="team_list" class="form-control" name="team_id">
                                    <?php
                                    foreach($team_list as $team) {
                                    ?>
                                        <option value="<?=$team->team_id?>"><?=$team->team?></option>
                                        <?php
                                    };
                                    ?>
                                </select>
                            </div>

                            <table id="member_list">
                                <colgroup>
                                    <col>
                                    <col>
                                    <col style="width:100px">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>팀</th>
                                    <th>옵션</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                if (count($member_list) > 0) {
                                    foreach($member_list as $member) {
                                        ?>
                                        <tr data-member-id="<?=$member->id?>" data-is-edit="false">
                                            <td data-member="name"><?=$member->name?></td>
                                            <td
                                                data-member="team"
                                                class="ta-c"
                                            >
                                                <?=$member->team ?? '미정'?>
                                            </td>
                                            <td class="ta-c" data-member="option">
                                                <a
                                                    href="/admin/member/edit/<?=$member->id?>"
                                                    class="btn btn-primary"
                                                >수정</a>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                } else {
                                    ?>
                                    <tr>
                                        <td colspan="3" class="ta-c">
                                        "<?=$sw?>" 의 결과가 없습니다.
                                        </td>
                                    </tr>
                                    <?php
                                }
                                ?>
                                </tbody>
                                <script id="member_list_mustache" type="text/template">
                                    {{#data}}
                                    <tr data-member-id="{{id}}" data-is-edit="false">
                                        <td data-member="name">{{name}}</td>
                                        <td data-member="team" data-member-eng="{{team_eng}}">{{team}}</td>
                                        <td data-member="option">
                                            <button type="type" class="btn btn-primary" data-member="edit" name="button">수정</button>
                                            <button type="type" class="btn btn-primary" data-member="delete" name="button">삭제</button>
                                        </td>
                                    </tr>
                                    {{/data}}
                                </script>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
