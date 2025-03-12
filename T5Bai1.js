var VSHADER_SOURCE = 
"precision mediump float;" +
"attribute vec4 a_position;" +
"uniform vec4 u_trans;" +
"void main(){" +
    "gl_Position = a_position + u_trans;" +
"}"
var FSHADER_SOURCE = 
"precision mediump float;" +
"uniform vec4 u_color;" +
"void main(){" +
    "gl_FragColor = u_color;" +
"}"
function main(){
    var canvas = document.getElementById("webgl")
    var gl = getWebGLContext(canvas)
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    var a_position = gl.getAttribLocation(gl.program, "a_position")
    var u_trans = gl.getUniformLocation(gl.program, "u_trans")
    var u_color = gl.getUniformLocation(gl.program, "u_color")
    gl.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0)
    gl.uniform4f(u_trans, 0.5, 0.5, 0.0, 0.0)
    gl.uniform4f(u_color, 1.0, 1.0, 1.0, 1.0)
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])
    
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_position)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}