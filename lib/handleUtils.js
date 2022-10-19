function getTem(url, target, data) {
    fetch(url)
        .then(response => response.text())
        .then(response => {
            var template = response.toString()
            var compiled_template = Handlebars.compile(template);
            var rendered = compiled_template(data);
            // var tag=document.getElementsByTagName(target);
            // tag.forEach(element => {
            //   element.innerHTML = rendered;
            // });
            // document.getElementsByTagName(target)[0].innerHTML = rendered;
            document.getElementById(target).innerHTML = rendered;
        })
}