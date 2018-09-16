window.onload = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);

    let light = new THREE.AmbientLight(0xffffff);

    let geometry = new THREE.SphereGeometry(200, 12, 12);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let scale = 1;
    function loop() {
        geometry.rotateY(0.01);
        geometry.rotateX(0.01);
        geometry.rotateZ(0.01);
        scale += 0.0001;
        geometry.scale(scale, scale, scale);
        renderer.render(scene, camera);
        requestAnimationFrame(function() {loop();});
    }
    loop();
}