sd.tmpl = {
    member: function(data) {
        var is_disable = data.is_disable ? 'is_disable' : '';

        var member = `<label
            class="member-list member ${is_disable}"
            style="background-color:${data.team_color}"
            data-member-id="${data.id}"
            data-team-eng="${data.team_eng}"
            data-team-color="${data.team_color}"
            >
            <input type="checkbox" class="js-all-check-item"/>
            <span class="name">${data.name}</span>
            <span class="team">${data.team}</span>
            <span class="position">${data.position}</span>
        </label>`;
        return member;
    }
};
