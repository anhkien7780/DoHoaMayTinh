var VSHADER_SOURCE =
    'precision mediump float;' +
    'attribute vec4 a_position;' +
    'void main(){' +
    'gl_Position = a_position;' +
    'gl_PointSize = 10.0;' +
    '}';
var FSHADER_SOURCE =
    'precision mediump float;' +
    'uniform vec4 u_color;' +
    'void main(){' +
    'gl_FragColor = u_color;' +
    '}';


function main() {
    var canvas = document.getElementById("webgl")
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var u_color = gl.getUniformLocation(gl.program, 'u_color')
    gl.uniform4f(u_color, 1.0, 1.0, 0.0, 1.0)
    var a_position = gl.getAttribLocation(gl.program, 'a_position');
    var vertexPosition = new Float32Array(
        [
            -0.5, 0.5,  // Top-left corner
            -0.5, -0.5,  // Bottom-left corner
            0.5, -0.5,  // Bottom-right corner

            0.5, -0.5,  // Bottom-right corner
            0.5, 0.5,  // Top-right corner
            -0.5, 0.5   // Top-left corner
        ]

    )
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosition, gl.STATIC_DRAW)
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_position)
    gl.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    gl.drawArrays(gl.LINES, 0, 6)
}