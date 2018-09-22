window.onload = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let cube = {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        positionY: 0, 
        positionX: 0,
        positionZ: 0
    };

    let gui = new dat.GUI();
    gui.add(cube, 'rotationY').min(-0.1).max(0.1).step(0.001);
    gui.add(cube, 'rotationX').min(-0.1).max(0.1).step(0.001);
    gui.add(cube, 'rotationZ').min(-0.1).max(0.1).step(0.001);
    gui.add(cube, 'positionY').min(-8).max(8).step(0.001); 
    gui.add(cube, 'positionX').min(-8).max(8).step(0.001); 
    gui.add(cube, 'positionZ').min(-8).max(8).step(0.001); 
     

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000000);
    camera.position.set(0, 0, 3000);
    
    let plane = new THREE.PlaneGeometry(2000, 2000, 200, 200);
    let material1 = new THREE.MeshPhongMaterial({color: 0xf56F89, vertexColors: THREE.FaceColors, wireframe: false});

    let geometry = new THREE.CylinderGeometry(200, 200, 200, 5, 5, 5, 3);
    let material = new THREE.MeshPhongMaterial({color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: false});

    for (let i = 0; i < geometry.faces.length; i++){
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }

    let meshFloor = new THREE.Mesh(plane, material1);
    meshFloor.rotation.x += Math.PI / -2;
    meshFloor.position.y += -130;
    scene.add(meshFloor);

    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    controls = new THREE.OrbitControls(camera, renderer.cube);

    let loader = new THREE.OBJLoader();

    let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
    scene.add(ambientLight);

    loader.load('models/Person.obj', function(object){
        scene.add(object);
    });

    let scale = 1;

    function loop() {
        //mesh.rotation.clone.y += cube.rotationY; 

        geometry.rotateY(cube.rotationY);
        geometry.rotateX(cube.rotationX);
        geometry.rotateZ(cube.rotationZ);

        mesh.position.x += cube.positionX;
        mesh.position.y += cube.positionY;
        mesh.position.z += cube.positionZ;

        //geometry.translate(2,0,-2);
        //scale += 0.000000001;
        //geometry.scale(scale, scale, scale);
        renderer.render(scene, camera);
        requestAnimationFrame(function() {loop();});
    }
    loop();
}