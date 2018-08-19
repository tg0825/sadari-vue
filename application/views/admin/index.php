    <div class="row">
        <div class="col-3">
            <div id="mySidenav" class="sidenav">
                <a href="#">인원추가</a>
                <a href="#">팀추가</a>
                <a href="#">팀삭제</a>
            </div>
        </div>
        <div class="col-9">
            <div class="row">
                <div class="col">
                    <form id="JSFORM" action="/admin/m-insert.php" method="post" autocomplete="off">
                        <h4>
                            <i class="fa fa-male" aria-hidden="true"></i>
                            인원추가
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
                            >
                        </div>
                        <div class="form-block mt-1">
                            <div class="team-list"></div>
                            <?php
                            $sql = "SELECT *
                                FROM team";

                            $result = $mysqli->query($sql);
                            if ($result->num_rows > 0) {
                                ?>
                                <select id="team_list" class="form-control" name="team_id">
                                    <?php
                                    while($row = $result->fetch_assoc()) {
                                        ?>
                                        <option value="<?=$row['team_id']?>"><?=$row['team']?></option>
                                        <?php
                                    };
                                    ?>
                                </select>
                                <?php
                            }
                            ?>
                        </div>
                        <div class="mt-1">
                            <button type="submit" class="btn btn-primary btn-block btn-add-mem">추가</button>
                        </div>
                    </form>
                </div>

                <div class="col">
                    <form
                        id=""
                        action="/admin/m-insert-team.php"
                        method="post"
                        autocomplete="off"
                    >
                        <h4>
                            <i class="fa fa-male" aria-hidden="true"></i>
                            팀 추가
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
                                value="#ff0000"
                                required
                            >
                        </div>

                        <div class="mt-1">
                            <button type="submit" class="btn btn-primary btn-block btn-add-mem">추가</button>
                        </div>
                    </form>
                </div>

                <div class="col">
                    <form id="" action="/admin/m-remove-team.php" method="post" autocomplete="off">
                        <h4>
                            <i class="fa fa-male" aria-hidden="true"></i>
                            팀 삭제
                        </h4>
                        <div class="form-block mt-1">
                            <?php
                            $sql_team = "SELECT *
                                FROM team";
                            $result_team = $mysqli->query($sql_team);

                            if ($result_team->num_rows > 0) {
                                ?>
                                <select id="team_list" class="form-control" name="team_id">
                                    <?php
                                    while($row = $result_team->fetch_assoc()) {
                                        ?>
                                        <option value="<?=$row['team_id']?>"><?=$row['team']?></option>
                                        <?php
                                    };
                                    ?>
                                </select>
                                <?php
                            }
                            ?>
                        </div>

                        <div class="mt-1">
                            <button type="submit" class="btn btn-primary btn-block btn-add-mem">삭제</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <div class="row">
                        <div class="col js_total-number">
                            <?php
                            $sw = '';
                            isset($_GET['sw']) && $sw = $_GET['sw'];
                            $sql = "SELECT *
                                FROM member AS m
                                LEFT JOIN team AS t
                                    ON m.team_id=t.team_id
                                WHERE name LIKE '%" . $sw . "%'";
                            $result = $mysqli->query($sql);
                            ?>
                            총 <?=$result->num_rows?> 명
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
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        ?>
                                        <tr data-member-id="<?=$row['id']?>" data-is-edit="false">
                                            <td data-member="name"><?=$row['name']?></td>
                                            <td data-member="team" data-member-eng="<?=$row['team_eng']?>">
                                                <?=$row['team']?>
                                            </td>
                                            <td>
                                                <input
                                                    class="team-color"
                                                    type="color"
                                                    name=""
                                                    value="<?=$row['team_color']?>"
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
