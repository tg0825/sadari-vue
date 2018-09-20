    <div class="col-9">
        <div class="row">
            <div class="col">
                <form
                    id=""
                    action="/admin/team/edit/submit"
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
        </div>
    </div>
</div>
</div>
<script>
    var team = new Team();
</script>
</body>
</html>
