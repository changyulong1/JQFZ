$('#as').classAdd('sw').next().classAdd('fg').children().get(1).classAdd('kk')

$(`<h1 id="h1">你好的是创建出来的元素</h1>`).appendTo('#as')
$("#h1").remove().classAdd('H')
const text = $('#ad').children().get(2).text()
console.log(text)

const text2 = $('#ad').children().get(0).attr('id')
console.log(text2, 456)
const text3 = $('#ad').attr({ style: "color:red;", class: 'a' })
console.log(text3)
$('#ad').css({ background: "red", color: '#fff' })
const ag = function () {
    console.log('我被点击了')
}
$('#ad').css('width', '400px').on('click', ag)
$('#ad').css('width', '400px').off('click', ag)
