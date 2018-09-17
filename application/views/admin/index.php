        <div class="col-9">
            <div class="row mt-5">
                <div class="col">
                    <div class="row">
                        <div class="col js_total-number">
                            <?php
                            $sw = '';
                            // isset($_GET['sw']) && $sw = $_GET['sw'];
                            // $sql = "SELECT *
                            //     FROM member AS m
                            //     LEFT JOIN team AS t
                            //         ON m.team_id=t.team_id
                            //     WHERE name LIKE '%" . $sw . "%'";
                            // $result = $mysqli->query($sql);
                            ?>
                            <!-- 총 <?=$result->num_rows?> 명 -->
                        </div>
                        <div class="col">
                            <form name="search" action="" method="get">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        name="sw"
                                        class="form-control"
                                        placeholder="찾을 이름을 입력하세요."
                                        aria-label="Search term"
                                        aria-describedby="basic-addon"
                                        data-api='/admin/api-search.php'
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
                            <table id="member_list">
                                <colgroup>
                                    <col>
                                    <col>
                                    <col style="width:100px">
                                    <col style="width:200px">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>팀</th>
                                    <th>팀 컬러</th>
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
                                            <td data-member="team" data-member-eng="<?=$member->team_eng?>">
                                                <?=$member->team?>
                                            </td>
                                            <td>
                                                <input
                                                    class="team-color"
                                                    type="color"
                                                    name=""
                                                    value="<?=$member->team_color?>"
                                                >
                                                <button
                                                    type="button"
                                                    name="button"
                                                >확인</button>
                                            </td>
                                            <td class="ta-c" data-member="option">
                                                <button type="type" class="btn btn-primary" data-member="edit" name="button">수정</button>
                                                <button type="type" class="btn btn-primary" data-member="delete" name="button">삭제</button>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                } else {
                                    ?>
                                    <tr>
                                        <td colspan="4" class="ta-c">
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
