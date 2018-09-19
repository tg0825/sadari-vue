    <div class="col-9">
        <div class="row">
            <div class="col">
                <form
                    id="JSFORM"
                    action="/admin/member/edit-submit"
                    method="post"
                    autocomplete="off"
                >
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
                            <select id="team_list" class="form-control" name="team_id">
                                <?php
                                foreach($team_list as $team) {
                                ?>
                                    <option value="<?=$team->team_id?>"><?=$team->team?></option>
                                <?php
                                }
                                ?>
                            </select>
                        </div>

                        <div class="mt-1">
                            <button type="submit" class="btn btn-primary btn-block btn-add-mem">추가</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</body>
</html>
