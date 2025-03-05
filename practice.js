var VERTEX_SHADER = 
'attribute vec4 a_position;' +
'void main(){' +
'gl_Position = a_position;' +
'}' 

var FRAGMENT_SHADER = 
'precision mediump float;'+
'uniform vec4 u_color;'+
'void main(){'+
'gl_FragColor = u_color;'+
'}'+

function main(){
    var canvas = document.getElementById('canvas')
    var gl = getWebGLContext(canvas)
    initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER)
    var u_color = gl.getUniform()
}