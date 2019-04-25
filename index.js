const h = require('hyperscript');
const csv = require('csv-parser');
const fs =require('fs');

const generate_page = (list) => {
    var lines = list.map((line) => {
        return h('li', line.text, {style: {'background-color': line.color}});
    });
    return h('div#page',
      h('div#header',
        h('h1.classy', 'h', { style: {'background-color': '#22f'} })),
      h('div#menu', { style: {'background-color': '#2f2'} },
      h('ul', lines
          )),
        h('h2', 'content title',  { style: {'background-color': '#f22'} }),
        h('p',
          "so it's just like a templating engine,\n",
          "but easy to use inline with javascript\n"),
        h('p',
          "the intension is for this to be used to create\n",
          "reusable, interactive html widgets. "))
    
};

const pipeline = (file) => {
    const res = [];
    fs
        .createReadStream(file)
        .pipe(csv())
        .on('data', (d) => res.push(d))
        .on('end', ()=> {
            const page = generate_page(res);
            console.log(page.outerHTML);
        });
}

pipeline(process.argv[2])

/*
var page = generate_page([{
    text: "this is the first one",
    color: 'rgb(255, 100, 0)'
},{
    text: "this is the second one",
    color: 'rgb(100, 255, 0)'
}]);
*/
        

            //console.log(page.outerHTML);
