function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function thinking(description,element_ids) {
    var header = '<h4>' + description + '</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';

    // clear out old items
    $("#current-approval").empty();

    // add spinner
    $("#current-approval").html(header + spinner);

}

function stopThinking() {
    $("#current-approval").empty();
}

