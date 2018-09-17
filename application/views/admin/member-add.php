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

                        // $result = $mysqli->query($sql);
                        // $result = $user_list;
                        // if ($result->num_rows > 0) {
                            ?>
                            <select id="team_list" class="form-control" name="team_id">
                                <?php
                                // while($row = $result->fetch_assoc()) {
                                    ?>
                                    <!-- <option value="<?=$row['team_id']?>"><?=$row['team']?></option> -->
                                    <?php
                                // };
                                ?>
                            </select>
                            <?php
                        // }
                        ?>
                    </div>
                    <div class="mt-1">
                        <button type="submit" class="btn btn-primary btn-block btn-add-mem">추가</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</body>
</html>
