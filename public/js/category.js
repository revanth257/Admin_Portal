$(document).ready(function () {
    console.log("category")
    fetchDataAndPopulateTable()
})

$(document).on('click', '.createCat', function () {
    var payload = {
        name: $('#pcName').val(),
        desc: $('#pcDesc').val()
    }
    $.ajax({
        url: "http://adminportal.localhost:8040/productCategory",
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('================**====================');
            $('#myModal').modal('hide');

            console.log('====================================');
            console.log("data", data);
            console.log('====================================');

        },
        error: function (error) {
            console.log('====================================');
            console.log("error Catch", error);
            console.log('====================================');

        }
    });
})

$(document).on('click', '.showercmodel', function () {
    console.log("showercmodel");
    $('#myModal').modal('show');
})

function fetchDataAndPopulateTable() {
    $.ajax({
        url: "http://adminportal.localhost:8040/productCategory",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            const result = data.data
            console.log("data", data);
            const tableBody = $('.catTable tbody');
            tableBody.empty(); // Clear existing data
            result.forEach((item, index) => {
                const row = $('<tr>');
                row.append($('<td>').text(index + 1));
                row.append($('<td>').text(item.pc_name));
                row.append($('<td>').text(item.pc_descr));
                const actionsCell = $('<td>');
                const editIcon = $('<i>').addClass('fas fa-edit edit-icon');
                const deleteIcon = $('<i>').addClass('fas fa-trash-alt delete-icon');
                actionsCell.append(editIcon).append(deleteIcon);
                row.append(actionsCell);
                tableBody.append(row);
            });
        },
        error: function(error) {
            console.log("error Catch", error);
        }
    });
}