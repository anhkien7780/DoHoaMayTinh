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

function main() {
    var canvas = document.getElementById("webgl")
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var u_color = gl.getUniformLocation(gl.program, 'u_color')
    var a_position = gl.getAttribLocation(gl.program, 'a_position');
    var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix")
    var xformMatrix = new Float32Array([
        0.71, 0.71, 0.0, 0.0,
        -0.71, 0.71, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
    gl.uniform4f(u_color, 1.0, 0.0, 0.0, 1.0)
    var vertices = new Float32Array([
        0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5
    ])
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix)
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_position)
    gl.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5)
}


var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    // Store the coordinates to g_points array
    g_points.push([x, y]);
    // Store the coordinates to g_points array
    if (x < 0) {
        if (y > 0) g_colors.push([0.0, 1.0, 1.0, 1.0]) // Màu Cyan
        else g_colors.push([0.0, 0.5, 0.0, 1.0]) // Màu xanh lá
    } else if (x > 0) {
        if (y > 0) g_colors.push([1.0, 0.0, 0.0, 1.0]) // Màu đỏ
        else g_colors.push([1.0, 1.0, 0.0, 1.0]) // Màu vàng
    } else g_colors.push([1.0, 1.0, 1.0, 1.0]) // Màu trắng

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgba = g_colors[i];

        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}