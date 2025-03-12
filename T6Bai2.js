var VSHADER_SOURCE =
    'precision mediump float;' +
    'attribute vec4 a_position;' +
    'uniform mat4 u_xformMatrix;' +
    'void main(){' +
    'gl_Position = u_xformMatrix*a_position;' +
    'gl_PointSize = 10.0;' +
    '}';
var FSHADER_SOURCE =
    'precision mediump float;' +
    'uniform vec4 u_color;' +
    'void main(){' +
    'gl_FragColor = u_color;' +
    '}';

var angle = 0

function main() {
    var canvas = document.getElementById("webgl")
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var u_color = gl.getUniformLocation(gl.program, 'u_color')
    var a_position = gl.getAttribLocation(gl.program, 'a_position');
    var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix")
    var xformMatrix = new Matrix4()
    gl.uniform4f(u_color, 1.0, 0.0, 0.0, 1.0)
    gl.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0)
    var vertices = new Float32Array([
        -0.5, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.0, 0.0, 0.5,
        0.5, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.0, 0.0, -0.5,
        -0.5, 0.0, 0.0
    ])

    function draw(){
        xformMatrix.setIdentity()
        xformMatrix.rotate(15, 1.0, 1.0, 0.0)
        xformMatrix.rotate(angle, 0.0, 1.0, 0.0)
        
        gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements)
        var buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_position)
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        gl.drawArrays(gl.LINE_LOOP, 0, 3)
        for(var i = 2; i < 5; i++){
            gl.drawArrays(gl.LINE_LOOP, i, 3)
        }
        angle +=1 
        requestAnimationFrame(draw)
    }
    draw()
}

