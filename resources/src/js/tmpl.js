function tmplMember(data) {
    var is_disable = data.is_disable ? "is_disable" : "";

    var member = `<label 
        class="member-list member ${is_disable}"
        data-member-id="${data.user_id}"
        style="background-color:${data.team_color}">
        <input type="checkbox" class="js-all-check-item">
            <span class="name">${data.name}</span>
            <span class="team">${data.team}</span>
        </label>`;
    return member;
}
